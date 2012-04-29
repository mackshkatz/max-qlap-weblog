(function() {

	var Page_manager = function() {};
	// var streams = [];

	// var App = {

	// 	init: function(){
	// 		bindEvents();
	// 	},

	// 	bindEvents: function(){


	// 	}


	// }

	// window.App = App;

	// App.init()
	
	Page_manager.prototype.initialize = function() {
		this.bindEvents();
		this.streams = [];
	}
	
	Page_manager.prototype.bindEvents = function() {
		_.bindAll(this);
		$('#container').on('click', '.add-stream', this.add_stream);
	}
	
	Page_manager.prototype.add_stream = function() {
		this.streams.push(new Twitter_stream().initialize());
	}

	var Twitter_stream = function() {};
	
	Twitter_stream.prototype.initialize = function() {
		var self = this;

		this.bindEvents();
		
		var inputs = $('<section><div class="inputs"><input class="search-box" type="text" placeholder="search phrase" /><input type="button" value="Stream Tweets" /></div><div class="tweet-stream"><ul></ul></div></section>');
		$('.main').prepend(inputs);
		
		inputs.find('input[type="button"]').bind('click', _.bind(this.startStream, this));
		this.$container = inputs.find('.tweet-stream ul');

		return this;
	}
	
	tweet_cache = {
		//hdhssjf.[var] = true
	}
	
	next_retrieval_timeout = null;
	
	Twitter_stream.prototype.bindEvents = function() {
		$('.main').on('click', '.favorite-button', this.saveTweet);
		$('.main').on('click', '.remove-button', this.removeTweet);
	}
	
	Twitter_stream.prototype.startStream = function(e) {
		e.preventDefault();
		var self = this;

		// $('.tweet-stream ul').children().remove();
		this.user_search_input = $('input[type="text"]').val();
		var twitter_search = "http://search.twitter.com/search.json?q=" + encodeURIComponent(this.user_search_input);

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
					if ( self.next_retrieval_timeout) clearTimeout( self.next_retrieval_timeout );
					self.next_retrieval_timeout = setTimeout( function() {
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