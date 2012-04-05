var twitter_stream = {
	initialize: function() {
		this.bindEvents();
	},
	tweet_cache: {
		//hdhssjf.[var] = true
	},
	next_retrieval_timeout: null,
	bindEvents: function() {
		$('.inputs input[type="button"]').on('click', this.startStream);
		$('.tweet-stream').on('click', '.favorite-button', this.saveTweet);
		$('.tweet-stream').on('click', '.remove-button', this.removeTweet);
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
					$('.tweet-stream ul').prepend('<li><span>' + new_tweet_user + ':</span>' + new_tweet_text + '<input type=button class="favorite-button" value="favorite?" /><input type=button class="remove-button" value="remove" /></li>');
				},
				dataType: "jsonp",
				complete: function() {
					if ( twitter_stream.next_retrieval_timeout) clearTimeout( twitter_stream.next_retrieval_timeout );
					twitter_stream.next_retrieval_timeout = setTimeout(function() {
						getTweets();
						capTweets();
					}, 5000);
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
	},
	saveTweet: function() {
		$(this).parent().appendTo($('.favorites'));
	},
	removeTweet: function() {
		$(this).parent().remove();
	}
}

$(document).ready(function() {
	twitter_stream.initialize();
});