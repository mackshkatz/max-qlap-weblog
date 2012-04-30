window.twitter_stream = {

	init: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		$('.add-stream').click(function() {
			var stream = new twitter_stream.collections.Stream();
		})
	},

	models: {
		Tweet: Backbone.Model.extend({})
	},

	collections: {
		Stream: Backbone.Collection.extend({
			initialize: function() {
				this.view = new twitter_stream.views.StreamView({
					collection: this
				});
				this.view.render();
			},

			parse: function(response) {
				console.log(response);
			},

			createUrlFromQuery: function(query) {
				this.url = "http://search.twitter.com/search.json?callback=?&q=" + query
			},

			renderTweets: function() {
				_.each(this.models, function(tweet) {
					// render tweet model
					var tweetView = new twitter_stream.views.TweetView({
						model: tweet
					})
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
				'keyup .stream-search': 'retrieveTweets'
			},

			render: function() {
				var source = $("#stream-template").html();
				var markup = Handlebars.compile(source);
				this.$el.appendTo('.streams-wrapper');
				this.$el.html(markup);
			},

			retrieveTweets: function(e) {
				var self = this;
				console.log(e);
				if (!(e.keyCode == 13)) {
					return false;
				}
				console.log(this.$el);
				var query = this.$el.find('.stream-search').val();
				console.log("this.collection", this.collection);
				this.collection.createUrlFromQuery(query);
				this.collection.fetch().success(function() {
					self.collection.renderTweets();
				});
			}
		}),

		TweetView: Backbone.View.extend({
			tagName: 'li',

			render: function() {

			}
		})
	}
};

$(document).ready(function() {
	twitter_stream.init();
}); 