"use strict"

window.onload = function() {
	var board = document.getElementById("board");
	setupBoard(board)
}

// Setup board
function setupBoard(board) {
	var board_children_amount = board.getElementsByTagName('div').length

	for (var i = 0; i < board_children_amount; i++) {
		board.getElementsByTagName('div')[i].classList.add('square');
	}
}
