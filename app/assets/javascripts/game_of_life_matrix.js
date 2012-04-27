(function() {
	var Cell = function() {};

	Cell.prototype.initialize = function(x, y, columnStructure) {
		this.column = x;
		this.row = y;
		this.node = $('<div class="cell"></div>').appendTo(columnStructure);
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
			var grid = $('.grid');
			for (var x = 0; x < x_value; x++) {
				var columnStructure = $('<div class="column"></div>').appendTo(grid);
				window.matrix[x] = [];
				for (var y = 0; y < y_value; y++) {
					matrix[x][y] = new Cell();
					matrix[x][y].initialize(x, y, columnStructure);
				}
			}
			$('<input type="button" value="Start Life" class="start-life" />').appendTo('.inputs');
			$('.generate-grid').attr("disabled", "disabled");
		},

		toggleCell: function() {
			$(this).toggleClass('on');
		},

		startLife: function() {
			setInterval(app.cycle, 200);
		},

		cycle: function() {
			app.generateNextGrid();
			app.drawGrid();
		},

		generateNextGrid: function() {
			for (var x = 0; x < x_value; x++) {
				for (var y = 0; y < y_value; y++) {
					var score = 0;

					// cells to the left
					if ((matrix[x-1]) && (matrix[x-1][y-1]) && (matrix[x-1][y-1].node.hasClass('on'))) {
						score++;
					}
					if ((matrix[x-1]) && (matrix[x-1][y]) && (matrix[x-1][y].node.hasClass('on'))) {
						score++;
					}
					if ((matrix[x-1]) && (matrix[x-1][y+1]) && (matrix[x-1][y+1].node.hasClass('on'))) {
						score++;
					}

					// cells above and below
					if ((matrix[x][y-1]) && (matrix[x][y-1].node.hasClass('on'))) {
						score++;
					}
					if ((matrix[x][y+1]) && (matrix[x][y+1].node.hasClass('on'))) {
						score++;
					}

					// cells to the right
					if ((matrix[x+1]) && (matrix[x+1][y-1]) && (matrix[x+1][y-1].node.hasClass('on'))) {
						score++;
					}
					if ((matrix[x+1]) && (matrix[x+1][y]) && (matrix[x+1][y].node.hasClass('on'))) {
						score++;
					}
					if ((matrix[x+1]) && (matrix[x+1][y+1]) && (matrix[x+1][y+1].node.hasClass('on'))) {
						score++;
					}

					// Conway's rules
					if ((matrix[x][y].node.hasClass('on')) && (score < 2 || score > 3)) {
						matrix[x][y].nextRound = 0;
					} else if ((matrix[x][y].node.hasClass('on')) && (score == 2 || score == 3)) {
						matrix[x][y].nextRound = 1;
					} else if (!(matrix[x][y].node.hasClass('on')) && (score == 3)) {
						matrix[x][y].nextRound = 1;
					} else if (!(matrix[x][y].node.hasClass('on')) && (score !== 3)) {
						matrix[x][y].nextRound = 0;
					}
				}
			}
		},

		drawGrid: function() {
			for (var x = 0; x < x_value; x++) {
				for (var y = 0; y < y_value; y++) {
					if ((matrix[x][y].node.hasClass('on')) && (matrix[x][y].nextRound == 0)) {
						matrix[x][y].node.removeClass('on');
					} else if (!(matrix[x][y].node.hasClass('on')) && (matrix[x][y].nextRound == 1)) {
						matrix[x][y].node.addClass('on');
					}
				}
			}
		}
	}

	$(document).ready(function() {
		window.app = App;
		app.initialize();
	});
})();;