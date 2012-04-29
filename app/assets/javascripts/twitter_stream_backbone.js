window.twitter_stream = {

	init: function() {

	},

	models: {
		Tweet: Backbone.Model.extend({})
	},

	collections: {
		Stream: Backbone.Collection.extend({})
	},

	views: {
		StreamView: Backbone.View.extend({
			
		}),

		TweetView: Backbone.View.extend({

		})
	},

};

$(document).ready(function() {
	twitter_stream.init();
}); 