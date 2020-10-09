"use strict"

let current_player = "X"
let game_squares = 0
let game_state = []

window.onload = function() {
	var board = document.getElementById("board");

	setupBoard(board)
}

// Setup board
function setupBoard(board) {
	var board_children_amount = board.getElementsByTagName('div').length

	for (var i = 0; i < board_children_amount; i++) {
		board.getElementsByTagName('div')[i].classList.add('square');
		board.getElementsByTagName('div')[i].addEventListener('click', handleSquareClick);
	}
}

// Handle square click
function handleSquareClick(click_event) {
	var clicked_square = click_event.target

	if (current_player == "X") { 
		clicked_square.classList.add(current_player)
		clicked_square.innerHTML = current_player
		current_player = "0"
		game_squares = game_squares + 1
		updateGameState()
	} else {
		clicked_square.classList.add(current_player)
		clicked_square.innerHTML = current_player
		current_player = "X"
		game_squares = game_squares + 1
		updateGameState()
	}


}

// Update Game State
function updateGameState() {
	game_state.push(current_player)
}


