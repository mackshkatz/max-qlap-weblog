(function() {
	var app = {
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function() {
			$('.inputs').on('click', 'input[type="button"]', this.generateGrid);
			$('.grid').on('click', '.cell', this.toggleCell);
		},
		generateGrid: function() {
			console.log('started generate');
			var x_value = $('.x-value').val();
			var y_value = $('.y-value').val();
			var grid_size = x_value * y_value;
			console.log(grid_size);
			for (var i = 0; i < grid_size; i++) {
				console.log(grid_size);
				$('<div class="cell"></div>').appendTo('.grid');
			}
		},
		toggleCell: function() {
			console.log($(this));
			$(this).toggleClass('on');
		}
	}
	
	$(document).ready(function() {
		window.app = app;
		app.initialize();
	});
})();