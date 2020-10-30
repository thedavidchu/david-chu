/*
56 57 58 59 60 61 62 63
48 49 50 51 52 53 54 55
40 41 42 43 44 45 46 47
32 33 34 35 36 37 38 39
24 25 26 27 28 29 30 31
16 17 18 19 20 21 22 23
08 09 10 11 12 13 14 15
00 01 02 03 04 05 06 07

81 82 83 84 85 86 87 88
71 72 73 74 75 76 77 78
61 62 63 64 65 66 67 68
51 52 53 54 55 56 57 58
41 42 43 44 45 46 47 48
31 32 33 34 35 36 37 38
21 22 23 24 25 26 27 28
11 12 13 14 15 16 17 18
*/


function on_border(position, direction){
	/*
	If you are on the border and heading off the board, then return true


	+7 +8 +9
	-1 00 +1
	-9 -8 -7
	*/
	row_one = [0, 1, 2, 3, 4, 5, 6, 7]
	row_eight = [56, 57, 58, 59, 60, 61, 62, 63]
	col_one = [0, 8, 16, 24, 32, 40, 48, 56]
	col_eight = [7, 15, 23, 31, 39, 47, 55, 63]


	if(row_one.includes(position)){
		// Check direction
		if(direction == -7 || direction == -8 || direction == -9){
			return true;
		}else{
			return false;
		}
	}else if(row_eight.includes(position)){
		// Check direction
		if(direction == 7 || direction == 8 || direction == 9){
			return true;
		}else{
			return false;
		}
	}else if(col_one.includes(position)){
		// Check direction
		if(direction == -9 || direction == -1 || direction == 7)
	}else if(col_eight.includes(position)){
		// Check direction 
		if(direction == -7 || direction == 1 || direction == 9){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}

function same_side(piece_one, piece_two){
	let one = 0, two = 0;
	if(piece_one < 16){
		one = 10;
	}else{
		one = 20;
	}

	if(piece_two < 16){
		two = 10;
	}else{
		two = 20;
	}

	return (one == two);
}

function move_generator(piece, position, direction, limit=8){
	let i = 0, moves = [], index = 0, incumbent = 0;
	if(Array.isArray(direction)){
		for(i in direction){
			moves = moves + move_generator(position, direction[i]);
		}
	}else{
		for(i=1;i<limit;i++){
			index = position + direction * i;
			incumbent = board[index];
			if(border(position, direction)){			// Hits a border
				moves = moves.append(index);
				break;
			}else if(board[index] == 0){				// Empty space
				moves = moves.append(index);
			}else if(same_side(piece, board[index])){	// Hits its own piece
				break;
			}else if(board[index]){						// Hits another piece
				moves = moves.append(index);
				break;
			}else{										// Otherwise, error
				return -1;
			}
		}
	}
	return moves
}

function get_legal_move(position, piece){
	/*
	Get all theoretically legal moves, discounting the possibility of check. What if check is preventing check?
	*/
	moves = [];
	switch(piece){
		case 10:
			if(row_two.includes(position)){
				// Give two options
				moves = 
			}else if(row_eight.includes(position)){
				// Pawn promotion
			}

			if(false){ // Right diagonal
				// Allow capture
			}else if(false){ // Left diagonal
				// Allow capture
			}

			break;
		case 11:
			break;
		case 12:
			break;
		case 13:
			break;
		case 14:
			break;
		case 15:
			break;
		case 20:
			break;
		case 21:
			break;
		case 22:
			break;
		case 23:
			break;
		case 24:
			break;
		case 25:
			break;
		default:
			return -1;
			break;
	}
}

function check_check(){
	/*Check if the king is in check*/

}