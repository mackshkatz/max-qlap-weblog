var twitter_stream = {
	initialize: function() {
		this.bindEvents();
	},
	tweet_cache: {
		//hdhssjf.[var] = true
	},
	bindEvents: function() {
		$('input[type="button"]').bind('click', this.startStream)
	},
	startStream: function(e) {
		$('.tweet-stream ul').children().remove();
		e.preventDefault();
		user_search_input = $('input[type="text"]').val();
		twitter_search = "http://search.twitter.com/search.json?q=" + encodeURIComponent(user_search_input);
		
		var getTweets = function() {
			$.ajax({
				url: twitter_search,
				success: function(data) {
					var new_tweet_text = data.results[0].text;
					var new_tweet_user = data.results[0].from_user;
					$('.tweet-stream ul').prepend('<li><span>' + new_tweet_user + ':</span>' + new_tweet_text + '</li>');
				},
				dataType: "jsonp",
				complete: function() {
					setTimeout( function() {
						getTweets();
						capTweets();
					}, 1000);
				}
			});	
		};
		var capTweets = function() {
			var stream_size = $('.tweet-stream ul').children();
			if (stream_size.length > 20) {
				$('.tweet-stream ul li:last-child').remove();
			};
		}
		getTweets();
	}
}

$(document).ready(function() {
	twitter_stream.initialize();
});