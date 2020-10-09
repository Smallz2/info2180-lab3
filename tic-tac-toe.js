"use strict"

let current_player = "X"
let game_squares = 0
let game_state = []

window.onload = function() {
	var board = document.getElementById("board")

	setupBoard(board)
}

// Setup board
function setupBoard(board) {
	var board_children_amount = board.getElementsByTagName('div').length

	for (var i = 0; i < board_children_amount; i++) {
		board.getElementsByTagName('div')[i].classList.add('square')
		board.getElementsByTagName('div')[i].setAttribute("id", i) // this is added to help find the winner
		board.getElementsByTagName('div')[i].addEventListener('click', handleSquareClick)
		board.getElementsByTagName('div')[i].addEventListener('mouseover', handleMouseOver)
		board.getElementsByTagName('div')[i].addEventListener('mouseout', handleMouseOut)
	}
}

// Handle square click
function handleSquareClick(click_event) {
	var clicked_square = click_event.target

	if (current_player == "X") { 
		clicked_square.classList.add(current_player)
		clicked_square.innerHTML = current_player
		game_squares = game_squares + 1
		updateGameState()
		checkIfGameWon()
		current_player = "0"
	} else {
		clicked_square.classList.add(current_player)
		clicked_square.innerHTML = current_player
		game_squares = game_squares + 1
		updateGameState()
		checkIfGameWon()
		current_player = "X"
	}
}

// Update Game State
function updateGameState() {
	game_state.push(current_player)
	console.log(game_state)
}

// Mouse over event handler
function handleMouseOver(over_event) {
	var hovered_square = over_event.target
	hovered_square.classList.add("hover")
}

// Mouse out event handler
function handleMouseOut(out_event) {
	var outed_square = out_event.target
	outed_square.classList.remove("hover")
}

//check if there is any winner
function checkIfGameWon() {
	//check horizontal first
	for (var i = 0; i < 3; i++) {
		var presentx = 0
		var presento = 0
		var start_value = i * 3 // to get the array position
		var end_at_value = start_value + 3 

		for (start_value; start_value < end_at_value; start_value++) {
			var element_to_check = document.getElementById(start_value).innerHTML
			if (element_to_check == "X") {
				presentx = presentx + 1
			}  

			if (element_to_check == "0") {
				presento = presento + 1
			}
		} // each row has 3 elements

		if (presentx == 3 || presento == 3 ) {
			winMessage()
		}
	} // only 3 rows are present

	//check vertically second
	for (var i = 0; i < 3; i++) {
		var presentx = 0
		var presento = 0
		var start_value = i

		for (var j = 0; j < 3; j++) {
			var element_to_check = document.getElementById(start_value).innerHTML
			if (element_to_check == "X") {
				presentx = presentx + 1
			}  

			if (element_to_check == "0") {
				presento = presento + 1
			}
			start_value = start_value + 3
		} // each row has 3 elements

		if (presentx == 3 || presento == 3 ) {
			winMessage()
		}
	} // only 3 rows are present

	//check diagonal
	var middle_element = document.getElementById(4).innerHTML
	if ( (document.getElementById(0).innerHTML == "X") && (middle_element == "X") && (document.getElementById(8).innerHTML == "X") || 
			 (document.getElementById(2).innerHTML == "X") && (middle_element == "X") && (document.getElementById(6).innerHTML == "X") ) {
		winMessage()
	}

	if ( (document.getElementById(0).innerHTML == "0") && (middle_element == "0") && (document.getElementById(8).innerHTML == "0") || 
		 	 (document.getElementById(2).innerHTML == "0") && (middle_element == "0") && (document.getElementById(6).innerHTML == "0") ) {
		winMessage()
	}
}

// Add win message
function winMessage() {
	var message_element = document.getElementById('status')
	message_element.classList.add("you-won")
	message_element.innerHTML = `Congratulations! ${current_player} is the Winner!`
}