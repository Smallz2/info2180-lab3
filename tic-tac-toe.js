"use strict"

let current_player = "X" // start with the current player being X
let game_squares = 0
let game_active = true

window.onload = function() {
	var board = document.getElementById("board")
	setupBoard(board)

	// Set listener to new_game button
	document.querySelector(".btn").addEventListener('click', resetGame)
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
	
	if (!game_active || !clicked_square.innerHTML == "") { // if game not active, return this function
		return
	}

	game_squares = game_squares + 1

	clicked_square.classList.add(current_player)	
	clicked_square.innerHTML = current_player

	if (!checkIfGameWon()) {
		if (current_player == "X") { 
			current_player = "O"
			clicked_square.classList.remove(current_player)	
		} else {
			current_player = "X"
			clicked_square.classList.remove(current_player)	
		}
	}
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

			if (element_to_check == "O") {
				presento = presento + 1
			}
		} // each row has 3 elements

		if (presentx == 3 || presento == 3 ) {
			winMessage()
			return true
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

			if (element_to_check == "O") {
				presento = presento + 1
			}
			start_value = start_value + 3
		} // each row has 3 elements

		if (presentx == 3 || presento == 3 ) {
			winMessage()
			return true 
		}
	} // only 3 rows are present

	//check diagonal
	var middle_element = document.getElementById(4).innerHTML
	if ( (document.getElementById(0).innerHTML == "X") && (middle_element == "X") && (document.getElementById(8).innerHTML == "X") || 
			 (document.getElementById(2).innerHTML == "X") && (middle_element == "X") && (document.getElementById(6).innerHTML == "X") ) {
		winMessage()
		return true
	}

	if ( (document.getElementById(0).innerHTML == "O") && (middle_element == "O") && (document.getElementById(8).innerHTML == "O") || 
		 	 (document.getElementById(2).innerHTML == "O") && (middle_element == "O") && (document.getElementById(6).innerHTML == "O") ) {
		winMessage()
		return true
	}

	//handle game draw
	if (game_squares == 9 && game_active) {
		var message_element = document.getElementById('status')
		message_element.innerHTML = "Draw game, hit new game and try again"
		game_active = false
	} 
}

// Add win message
function winMessage() {
	var message_element = document.getElementById('status')
	message_element.classList.add("you-won")
	message_element.innerHTML = `Congratulations! ${current_player} is the Winner!`
	game_active = false
}
 
// Reset game
function resetGame() {
  var reset = confirm("Are you sure?");
  if (reset) {
  	var squares = document.getElementsByClassName("square")
		for (var i = 0; i < squares.length; i++) {
		   squares[i].innerHTML = ""
		   squares[i].classList.remove("O")
		   squares[i].classList.remove("X")  
		}
		var message_element = document.getElementById('status')
		message_element.classList.remove("you-won")
		message_element.innerHTML = "Move your mouse over a square and click to play an X or an O."

		game_active = true
		game_squares = 0
  } 
}