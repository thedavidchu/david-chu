// tic tac toe

function init_board(){
	return [0,0,0, 0,0,0, 0,0,0];


function print_board(board){
	console.log(' %s | %s | %s \n-----------\n %s | %s | %s \n-----------\n %s | %s | %s ',board[0],board[1],board[2],board[3],board[4],board[5],board[6],board[7],board[8]);
}


function check_move(move,board){
	
}


function get_move(player,board){
	var move = window.prompt('%s to move!',player);
	return board;
}

function ttt_main(){
	var board = init_board();
	print_board(board);


}