(function() {
	var Page_manager = function() {};

	Page_manager.prototype.initialize = function() {
		this.bindEvents();
		this.streams = [];
	}

	Page_manager.prototype.bindEvents = function() {
		_.bindAll(this);
		$('#container').on('click', '.add-stream', this.add_stream);
	}

	Page_manager.prototype.add_stream = function() {
		// var stream_pane = new Twitter_stream;
		this.streams.push(new Twitter_stream().initialize());
		// console.log(this.streams);
		// this.streams[this.streams.length - 1].initialize();
	}

	var Twitter_stream = function() {};

	Twitter_stream.prototype.initialize = function() {
		this.bindEvents();
		$('#container').prepend($('<section><div class="inputs"><input type="text" placeholder="search phrase" /><input type="button" value="Stream Tweets" /></div><div class="tweet-stream"><ul></ul></div></section>'));
		this.$container = $('.tweet-stream ul');
		return this;
	}

	tweet_cache = {
		//hdhssjf.[var] = true
	}

	next_retrieval_timeout = null;

	Twitter_stream.prototype.bindEvents = function() {
		var new_binding = _.bind(this.startStream, this);
		console.log(new_binding);
		$('#container').on('click', '.inputs input[type="button"]', new_binding);
		$('#container').on('click', '.favorite-button', this.saveTweet);
		$('#container').on('click', '.remove-button', this.removeTweet);
	}

	Twitter_stream.prototype.startStream = function(e) {
		console.log(this);
		var self = this;
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
					self.$container.prepend('<li><span>' + new_tweet_user + ':</span>' + new_tweet_text + '<input type=button class="favorite-button" value="favorite?" /><input type=button class="remove-button" value="remove" /></li>');
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
		window.page = new Page_manager;
		page.initialize();
	});
})();