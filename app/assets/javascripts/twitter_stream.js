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
		twitter_search = "http://search.twitter.com/search.json?q=" + encodeURIComponent(user_search_input)
		setInterval(function() {
			$.ajax({
				url: twitter_search,
				success: function(data) {

				},
				dataType: "jsonp"
			});	
		}, 10000);
	}
}

$('document').ready(function() {
	twitter_stream.initialize();
});