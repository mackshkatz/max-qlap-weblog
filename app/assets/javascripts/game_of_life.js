(function() {
	var Cell = function() {}

	Cell.prototype.initialize = function(i, j, current_column) {
		this.column = i;
		this.row = j;
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
			var x_value = $('.x-value').val();
			var y_value = $('.y-value').val();
			for (var i = 0; i < x_value; i++) {
				var current_column = $('<div class="column"></div>').appendTo('.grid');
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
			setInterval(app.cycle, 100);
			//loop through each cell in grid array, checking if it's on and the total score of the cells around it and determine
			//if it should be on or off in next state, and push that into window.new_grid
		},

		cycle: function() {
			this.generateNextGrid();
			this.drawGrid();
		},

		generateNextGrid: function() {
			for (var i = 0; i < grid.length; i++) {
				var current_cell = grid[i];
				if (current_cell.DOMNode.hasClass('on')) {
					
				}
			}
		},

		drawGrid: function() {

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