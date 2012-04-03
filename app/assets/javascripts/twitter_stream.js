var twitter_stream = {
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		$('input[type="button"]').bind('click', this.startStream)
	},
	startStream: function(e) {
		e.preventDefault();
		user_search_input = $('input[type="text"]').val();
		twitter_search = "http://search.twitter.com/search.json?q=" + encodeURIComponent(user_search_input);
		
		var getTweets = function() {
			$.ajax({
				url: twitter_search,
				success: function(data) {
					console.log(data);
					var new_tweet_text = data.results[0].text;
					var new_tweet_user = data.results[0].from_user;
					$('.tweet-stream').after('<div><p><span>' + new_tweet_user + ':</span>' + new_tweet_text + '</p></div>');
				},
				dataType: "jsonp",
				complete: function() {
					setTimeout(getTweets, 1000);
				}
			});	
		};
		getTweets();
	}
}

$(document).ready(function() {
	twitter_stream.initialize();
});