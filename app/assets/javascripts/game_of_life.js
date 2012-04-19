(function() {
	var Cell = function() {}

	Cell.prototype.initialize = function(i,j,current_column) {
		$('<div id="' + i + j + '" class="cell"></div>').appendTo(current_column);
	}

	var app = {
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function() {
			$('.inputs').on('click', 'input[type="button"]', this.generateGrid);
			$('.grid').on('click', '.cell', this.toggleCell);
		},
		generateGrid: function() {
			var x_value = $('.x-value').val();
			var y_value = $('.y-value').val();
			for (var i = 0; i < x_value; i++) {
				var current_column = $('<div class="column"></div>').appendTo('.grid');
				for (var j = 0; j < y_value; j++) {
					var current_cell = new Cell();
					current_cell.initialize(i,j,current_column);
				}
			}
		},
		toggleCell: function() {
			$(this).toggleClass('on');
		}
	}
	
	$(document).ready(function() {
		window.app = app;
		app.initialize();
	});
})();