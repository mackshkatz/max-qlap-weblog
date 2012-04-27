(function() {
	var Cell = function() {};

	Cell.prototype.initialize = function(x, y) {
		this.column = x;
		this.row = y;
		this.node = $('<div class="cell"></div>').appendTo('.grid');
	};

	var App = {
		initialize: function() {
			this.bindEvents();
		},

		bindEvents: function() {
			$('.inputs').on('click', '.generate-grid', this.generateGrid);
			$('.inputs').on('click', '.start-life', this.startLife);
			$('.grid').on('click', '.cell', this.toggleCell);
		},

		generateGrid: function() {
			window.matrix = [];
			window.x_value = $('.x-value').val();
			window.y_value = $('.y-value').val();
			for (var x = 0; x < x_value; x++) {
				// window.matrix.push(x);
				window.matrix[x] = [];
				// console.log(window.matrix[x]);
				for (var y = 0; y < y_value; y++) {
					// window.matrix[x].push(y);
					matrix[x][y] = new Cell();
					matrix[x][y].initialize(x, y);
					// console.log("X:", x, "Y:", y);
					// window.matrix[x][y] = new Cell();
					// window.matrix[x][y].initialize(x, y)
					// console.log(window.matrix[x][y]);
				}
			}
		},

		toggleCell: function() {
			$(this).toggleClass('on');
		},
	}

	$(document).ready(function() {
		window.app = App;
		app.initialize();
	});
})();;