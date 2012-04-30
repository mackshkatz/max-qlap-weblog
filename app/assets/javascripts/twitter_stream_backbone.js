window.twitter_stream = {

	init: function() {
		this.bindEvents();
		var streamRouter = new twitter_stream.routers.StreamRouter();
		Backbone.history.start();
	},

	bindEvents: function() {
		$('.add-stream').click(function() {
			var stream = new twitter_stream.collections.Stream();
		})
	},

	routers: {
		StreamRouter: Backbone.Router.extend({
			routes: {
				':subject': 'automaticStream'
			},

			automaticStream: function(subject) {
				var stream = new twitter_stream.collections.Stream({
					subject: subject
				});
				stream.view.retrieveTweets();

			}
		})
	},

	models: {
		Tweet: Backbone.Model.extend({})
	},

	collections: {
		Stream: Backbone.Collection.extend({
			initialize: function(options) {
				// this.model = twitter_stream.models.Tweet;
				this.view = new twitter_stream.views.StreamView({
					collection: this,
					options: options
				});
				this.view.render();
				this.options = options;
			},

			parse: function(response) {
				return response.results;
			},

			createUrlFromQuery: function(query) {
				if (this.options && this.options.subject) {
					this.url = "http://search.twitter.com/search.json?callback=?&q=" + this.options.subject;
				} else {
					this.url = "http://search.twitter.com/search.json?callback=?&q=" + query;
				}
			},

			renderTweets: function() {
				_.each(this.models, function(tweet) {
					// render tweet model
					var tweetView = new twitter_stream.views.TweetView({
						model: tweet
					});
					tweetView.render();
				})
			}
		})
	},

	views: {
		StreamView: Backbone.View.extend({
			tagName: 'section',
			className: 'stream',

			events: {
				'keyup .stream-search': 'checkKey'
			},

			render: function() {
				var source = $("#stream-template").html();
				var markup = Handlebars.compile(source);
				this.$el.prependTo('.streams-wrapper');
				this.$el.html(markup);
			},

			checkKey: function(e) {
				if (e.keyCode == 13) {
					this.retrieveTweets();
				}
			},

			retrieveTweets: function() {
				var self = this;
				var query = this.$el.find('.stream-search').val();
				this.collection.createUrlFromQuery(query);
				// fetch completes and then calls parse so I can format the data the way
				// I want. I just want the array of tweets so I can iterate over them
				// in renderTweets and pass in each model to an instance of TweetView
				this.collection.fetch().success(function() {
					self.collection.renderTweets();
				});
			}
		}),

		TweetView: Backbone.View.extend({
			tagName: 'li',

			render: function() {
				var tweet_text = this.model.get('text');
				var tweet_user_name = this.model.get('from_user_name');
				var $collection_ul = this.model.collection.view.$el.find('ul');
				this.$el.html("<strong>" + tweet_user_name + ":</strong>" + tweet_text);
				this.$el.appendTo($collection_ul);
			}
		})
	}
};

$(document).ready(function() {
	twitter_stream.init();
}); 