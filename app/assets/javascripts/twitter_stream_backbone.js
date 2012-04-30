window.twitter_stream = {

	init: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		$('.add-stream').click(function() {
			var stream = new twitter_stream.collections.Stream();
			// stream.view.render();
		})
	},

	models: {
		Tweet: Backbone.Model.extend({})
	},

	collections: {
		Stream: Backbone.Collection.extend({
			initialize: function() {
				console.log("initialized Stream");
				this.view = new twitter_stream.views.StreamView({});
				this.view.render();
			}
		})
	},

	views: {
		StreamView: Backbone.View.extend({
			tagName: 'section',
			className: 'stream',

			render: function() {
				var source = $("#stream-template").html();
				var markup = Handlebars.compile(source);
				this.$el.appendTo('.streams-wrapper');
				this.$el.html(markup);
			}
		}),

		TweetView: Backbone.View.extend({

		})
	}
};

$(document).ready(function() {
	twitter_stream.init();
}); 