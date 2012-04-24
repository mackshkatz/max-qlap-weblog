(function() {
	var Cell = function() {}

	Cell.prototype.initialize = function(i, j, current_column) {
		this.column = i;
		this.row = j;
		this.cell_number = parseInt(i + "" + j);
		this.DOMNode = $('<div id="' + i + j + '" class="cell"></div>').appendTo(current_column);
	}

	// Cell.prototype.getNeighbors = function() {
	// 	grid[this.row+1]
	// }

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
			window.grid = [];
			window.x_value = $('.x-value').val();
			window.y_value = $('.y-value').val();
			var matrix_grid = $('.grid');
			for (var i = 0; i < x_value; i++) {
				var current_column = $('<div class="column"></div>').appendTo(matrix_grid);
				for (var j = 0; j < y_value; j++) {
					var current_cell = new Cell();
					current_cell.initialize(i, j, current_column);
					grid.push(current_cell);
				}
			}
			$('<input type="button" value="Start Life" class="start-life" />').appendTo('.inputs');
			$('.generate-grid').attr("disabled", "disabled");
		},

		toggleCell: function() {
			$(this).toggleClass('on');
		},

		startLife: function() {
			window.generation = 0;
			setInterval(app.cycle, 100);
		},

		cycle: function() {
			app.generateNextGrid();
			app.drawGrid();
		},

		generateNextGrid: function() {
			y_value = parseInt(y_value);
			for (var i = 0; i < grid.length; i++) {
				var score = 0;
				// cells to the left
				if ((grid[i - y_value - 1]) && (!(grid[i].cell_number % y_value == 0)) && (grid[i - y_value - 1].DOMNode.hasClass('on'))) {
					score++;
				}

				if ((grid[i - y_value]) && (grid[i - y_value].DOMNode.hasClass('on'))) {
					score++;
				}
				if ((grid[i - y_value + 1]) && (!(grid[i].cell_number % (y_value - 1) == 0)) && (grid[i - y_value + 1].DOMNode.hasClass('on'))) {
					score++;
				}

				// cells above and below
				if ((!(grid[i].cell_number % y_value == 0)) && (grid[i - 1].DOMNode.hasClass('on'))) {
					score++;
				}
				if ((!(grid[i].cell_number % (y_value - 1) == 0)) && (grid[i + 1].DOMNode.hasClass('on'))) {
					score++;
				}

				// cells to the right
				if ((grid[i + y_value - 1]) && (!(grid[i].cell_number % y_value == 0)) && (grid[i + y_value - 1].DOMNode.hasClass('on'))) {
					score++;
				}
				if ((grid[i + y_value]) && (grid[i + y_value].DOMNode.hasClass('on'))) {
					score++;
				}
				if ((grid[i + y_value + 1]) && (!(grid[i].cell_number % (y_value - 1) == 0)) && (grid[i + y_value + 1].DOMNode.hasClass('on'))) {
					score++;
				}				

				if (grid[i].cell_number == 0) {
					if (grid[i + 1].DOMNode.hasClass('on')) {
						score++;
					}
					if (grid[i + y_value].DOMNode.hasClass('on')) {
						score++;
					}
					if (grid[i + y_value + 1].DOMNode.hasClass('on')) {
						score++;
					}
				}	

				// Conway's rules
				if (grid[i].DOMNode.hasClass('on') && (score < 2 || score > 3)) {
					grid[i].nextRound = 0;
				} else if (grid[i].DOMNode.hasClass('on') && (score == 2 || score == 3)) {
					grid[i].nextRound = 1;
				} else if (!(grid[i].DOMNode.hasClass('on')) && (score == 3)) {
					grid[i].nextRound = 1;
				} else if (!(grid[i].DOMNode.hasClass('on')) && (score !== 3)) {
					grid[i].nextRound = 0;
				}
			}
		},

		drawGrid: function() {
			for (var i = 0; i < grid.length; i++) {
				if ((grid[i].DOMNode.hasClass('on')) && (grid[i].nextRound == 0)) {
					grid[i].DOMNode.removeClass('on');
				} else if ((!(grid[i].DOMNode.hasClass('on'))) && (grid[i].nextRound == 1)) {
					grid[i].DOMNode.addClass('on');
				}
			}
			console.log("generation:", generation);
		}
	}
	
	$(document).ready(function() {
		window.app = App;
		app.initialize();
	});
})();

//


// Alex's stuff
// var grid = generateGrid(5,5);

// setInterval(grid.drawNext, 500);
// grid.getCell(x, y)
// //grid.current = (array of arrays)
// //grid.next = (array of arrays)

// grid.draw(); //draw changes DOM, and resets current to next


// grid.calculateNext = function() {
// 	cells.each.alive?()
// }

// alive? = function() {
// 	//check neghbors, count alive neighbors

// 	return true/false
// }