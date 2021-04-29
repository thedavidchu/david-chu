/**
 * # Sudoku Solver
 * 
 * ## Purpose
 * Solve a 9x9 Sudoku board using backtracking.
 * 
 * ## Motivation
 * Solving Sudoku is a relatively simple Constraint 
 * Satisfaction Problem. This was an exam question
 * for ROB311, however it was implemented using Python
 * and used a different algorithm.
 * I figured that I may as well write a Javascript
 * version to host on my Github!
 * 
 * Based on the Python code from:
 * https://www.geeksforgeeks.org/sudoku-backtracking-7/
 * 
 * N.B. I did not use this website as a resource during
 * ROB311.
 * 
 * ## Notation
 * The Sudoku board is a 9x9 grid with the following
 * coordinates:
 * 
 * 	00 01 02 | 03 04 05 | 06 07 08
 * 	09 10 11 | 12 13 14 | 15 16 17
 * 	18 19 20 | 21 22 23 | 24 25 26
 * 	------------------------------
 * 	27 28 29 | 30 31 32 | 33 34 35
 * 	36 37 38 | 39 40 41 | 42 43 44
 * 	45 46 47 | 48 49 50 | 51 52 53
 * 	------------------------------
 * 	54 55 56 | 57 58 59 | 60 61 62
 * 	63 64 65 | 66 67 68 | 69 70 71
 * 	72 73 74 | 75 76 77 | 78 79 80
 * */

function legal_move(board, move, index) {
	/** 
	 * Determine whether a move at index is legal.
	 * 
	 * N.B. I do not error check type yet.
	 * N.B. I do not error check that board[index] == 0.
	 *
	 * :param board: array (81,) - board representing
	 * the state of the board. 0 represents a blank space.
	 * :param move: int - desired move, from 1 to 9.
	 * :param index: int (0 to 80) - index of the square 
	 * that the move should fall on.
	 * 
	 * :return: bool - true or false of whether the move 
	 * is legal.
	 * */
	
	// Error check board - assume array
	if (board.length != 81) {
		return 0;
	}
	// Error Check Move - assume int
	if (move < 1 || move > 9) {
		return 0;
	}
	// Error check index - assume int
	if (index < 0 || move > 80) {
		return 0;
	}

	// Define row and column
	let col = index % 9;
	let row = (index - col) / 9;

	// Check block
	let init_row = row - row % 3;
	let init_col = col - col % 3;
	for (let i = init_row; i < init_row + 3; i++) {
		for (let j = init_col; j < init_col + 3; j++) {
			if (board[9*i + j] == move) {
				return false;
			}
		}
	}

	// Check row
	let init_idx = 9 * row;
	for (let i = init_idx; i < init_idx + 9; i++) {
		if (board[i] == move) {
			return false;
		}
	}

	// Check column
	init_idx = col;
	for (let i = init_idx; i < init_idx + 81; i += 9) {
		if (board[i] == move) {
			return false;
		}
	}

	return true;
}


function backtrack(board, index) {
	/**
	 * Guess a value and test. If the value is incorrect, 
	 * then backtrack.
	 * 
	 * N.B. There are efficiencies that one can implement
	 * to make this solver better. For example, performing
	 * inference on each board state so that we are not
	 * guessing every value is one. We can also intelligently
	 * choose the order of the index and candidate moves.
	 * 
	 * :param board: array (81,) - board representing
	 * the state of the board. 0 represents a blank space.
	 * :param index: int (0 to 80) - index of the square 
	 * that the move should fall on.
	 * 
	 * :return: 
	 * 	1. board = array (81,) - updated board 
	 * 	2. valid = bool - whether the value was valid or not
	 * */
	
	// Check if finished
	if (index == 81) {
		return [board, true];
	}

	// If non-zero, continue
	if (board[index] > 0) {
		return backtrack(board, index + 1);
	}
	
	// Iterate through possible values
	for (let move = 1; move < 10; move++) {
		let legal = legal_move(board, move, index);
		console.log(legal);
		if (legal) {
			board[index] = move;
			let soln = backtrack(board, index + 1);
			let valid = soln[1];
			if (valid) {
				return soln; // [board, valid]
			}
		}
		// If any conditions are false, then backtrack
		board[index] = 0;
	}

	// If all possibilities fail, then return failure
	return [board, false];
}


// ========== SETUP HTML BOARD ========== //
function board_string(board) {
	/**
	 * Create the HTML string defining the board.
	 * 
 	 * TODO: Create intelligent borders to help user.
	 * :return: string - HTML string defining board.
	 * */
	let string = '';
	let k = 0;
	for (let i = 0; i < 9; i++) {
		string += '<tr>\n';
		for (let j = 0; j < 9; j++) {
			string += '\t<td id="' + k + '-sudoku">' + board[k] + '</td>\n';
			k++;
		}
		string += '</tr>\n';
	}
	return string;
}


function setup_board(board, element_id='sudoku_board') {
	let board_element = document.getElementById(element_id);
	let string = board_string(board);
	board_element.innerHTML = string;
	return string;
}


let board = [9, 0, 4, 0, 6, 0, 0, 8, 0,
             8, 0, 0, 0, 1, 0, 0, 0, 2,
             1, 0, 0, 9, 0, 0, 0, 7, 0,
             4, 0, 0, 0, 0, 0, 5, 0, 0,
             0, 1, 6, 0, 0, 0, 0, 0, 0,
             7, 0, 0, 0, 3, 1, 0, 0, 0,
             0, 3, 0, 0, 0, 7, 0, 9, 0,
             6, 0, 0, 2, 0, 4, 0, 0, 0,
             0, 0, 0, 0, 0, 0, 0, 0, 0]

let soln = backtrack(board, 0);
let solved_board = soln[0], valid = soln[1];

if (valid) {
	console.log(solved_board);
}
else {
	console.log('Unsolveable!');
}
