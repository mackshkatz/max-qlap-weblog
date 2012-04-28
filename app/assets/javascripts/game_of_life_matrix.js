"use strict";
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
			$('.grid').on('click', '.cell', function() {
				app.toggleCell(this);
			});
			$('.grid').mousedown(function() {
				$('.grid').on('mouseenter', '.cell', function() {
					app.toggleCell(this);
				});
			});
			$(document).mouseup(function() {
				$('.grid').off('mouseenter', '.cell');
			});
		},

		generateGrid: function() {
			app.matrix = [];
			app.x_value = $('.x-value').val();
			app.y_value = $('.y-value').val();
			var grid = $('.grid');
			for (var x = 0; x < app.x_value; x++) {
				var columnStructure = $('<div class="column"></div>').appendTo(grid);
				app.matrix[x] = [];
				for (var y = 0; y < app.y_value; y++) {
					app.matrix[x][y] = new Cell();
					app.matrix[x][y].initialize(x, y, columnStructure);
				}
			}
			$('.start-life').show();
			$('.generate-grid').attr("disabled", "disabled");
		},

		toggleCell: function(current_cell) {
			$(current_cell).toggleClass('on');
		},

		startLife: function() {
			setInterval(app.cycle, 200);
		},

		cycle: function() {
			app.generateNextGrid();
			app.drawGrid();
		},

		generateNextGrid: function() {
			for (var x = 0; x < app.x_value; x++) {
				for (var y = 0; y < app.y_value; y++) {
					var score = 0;

					// cells to the left
					if ((app.matrix[x-1]) && (app.matrix[x-1][y-1]) && (app.matrix[x-1][y-1].node.hasClass('on'))) {
						score++;
					}
					if ((app.matrix[x-1]) && (app.matrix[x-1][y]) && (app.matrix[x-1][y].node.hasClass('on'))) {
						score++;
					}
					if ((app.matrix[x-1]) && (app.matrix[x-1][y+1]) && (app.matrix[x-1][y+1].node.hasClass('on'))) {
						score++;
					}

					// cells above and below
					if ((app.matrix[x][y-1]) && (app.matrix[x][y-1].node.hasClass('on'))) {
						score++;
					}
					if ((app.matrix[x][y+1]) && (app.matrix[x][y+1].node.hasClass('on'))) {
						score++;
					}

					// cells to the right
					if ((app.matrix[x+1]) && (app.matrix[x+1][y-1]) && (app.matrix[x+1][y-1].node.hasClass('on'))) {
						score++;
					}
					if ((app.matrix[x+1]) && (app.matrix[x+1][y]) && (app.matrix[x+1][y].node.hasClass('on'))) {
						score++;
					}
					if ((app.matrix[x+1]) && (app.matrix[x+1][y+1]) && (app.matrix[x+1][y+1].node.hasClass('on'))) {
						score++;
					}

					// Conway's rules
					var is_on = app.matrix[x][y].node.hasClass('on');
					if ((is_on) && (score < 2 || score > 3)) {
						app.matrix[x][y].nextRound = 0;
					} else if ((is_on) && (score == 2 || score == 3)) {
						app.matrix[x][y].nextRound = 1;
					} else if (!(is_on) && (score == 3)) {
						app.matrix[x][y].nextRound = 1;
					} else if (!(is_on) && (score !== 3)) {
						app.matrix[x][y].nextRound = 0;
					}
				}
			}
		},

		drawGrid: function() {
			for (var x = 0; x < app.x_value; x++) {
				for (var y = 0; y < app.y_value; y++) {
					if ((app.matrix[x][y].node.hasClass('on')) && (app.matrix[x][y].nextRound == 0)) {
						app.matrix[x][y].node.removeClass('on');
					} else if (!(app.matrix[x][y].node.hasClass('on')) && (app.matrix[x][y].nextRound == 1)) {
						app.matrix[x][y].node.addClass('on');
					}
				}
			}
		}
	};

	window.app = App;

	$(document).ready(function() {
		app.initialize();
	});
})();;