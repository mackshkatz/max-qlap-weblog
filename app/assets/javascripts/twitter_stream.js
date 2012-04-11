(function() {
	var Page_manager = function() {};

	Page_manager.prototype.initialize = function() {
		this.bindEvents();
	}

	Page_manager.prototype.bindEvents = function() {
		$('#container').on('click', '.add-stream', this.add_stream);
	}

	var streams = [];

	Page_manager.prototype.add_stream = function() {
		var stream_pane = new Twitter_stream;
		streams.push(stream_pane);
		console.log(streams)
		streams[streams.length - 1].initialize();
	}

	var Twitter_stream = function() {};

	Twitter_stream.prototype.initialize = function() {
		this.bindEvents();
		this.createStream();
	}

	tweet_cache = {
		//hdhssjf.[var] = true
	}

	next_retrieval_timeout = null;

	Twitter_stream.prototype.bindEvents = function() {
		$('#container').on('click', '.inputs input[type="button"]', this.startStream);
		$('.tweet-stream').on('click', '.favorite-button', this.saveTweet);
		$('.tweet-stream').on('click', '.remove-button', this.removeTweet);
	}

	Twitter_stream.prototype.createStream = function() {
		$('#container').prepend($('<div class="inputs"><input type="text" placeholder="search phrase" /><input type="button" value="Stream Tweets" /></div><div class="tweet-stream"><ul></ul></div>'));
	}

	Twitter_stream.prototype.startStream = function(e) {
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
					if ( Twitter_stream.next_retrieval_timeout) clearTimeout( Twitter_stream.next_retrieval_timeout );
					Twitter_stream.next_retrieval_timeout = setTimeout( function() {
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
	}

	Twitter_stream.prototype.saveTweet = function() {
		var animate_tweet = $(this).parent();
		animate_tweet.fadeOut();
		setTimeout( function() {
			animate_tweet.fadeIn().appendTo($('.favorites'));
		}, 500);
	}

	Twitter_stream.prototype.removeTweet = function() {
		$(this).parent().remove();
	}

	$(document).ready(function() {
		var page = new Page_manager;
		page.initialize();
	});
})();