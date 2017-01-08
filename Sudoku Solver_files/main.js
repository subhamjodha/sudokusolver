var elem;
$(document).ready(function(){
	$(document.body).on('click', '.clickable', function(){
		var id = $(this).attr('id');
		elem = document.getElementById(id);	
	});
	
	$(document.body).on('click', '#submit-button', function(){
		prepare_matrix();
	});
});


$(document).keypress(function(e) {
	var x = e.which-48;
	elem.innerHTML= ""+x;	
});


function validate_square(n, x, y, board){
	
	var sx = (Math.floor(x / 3)) * 3;
	var sy = (Math.floor(y / 3)) * 3;
	
	for(var i=sx;i<sx+3;i++)
		for(var j=sy;j<sy+3;j++)
			if(board[i][j] == n)
				return false;
	return true;
}

function valid(n, x, y, board){
	//	validate row.
	
	for(var j=0;j<9;j++)
		if(board[x][j] == n)
			return false;
	
	//	validate column.
	
	for(var i=0;i<9;i++)
		if(board[i][y] == n)
			return false;
	
	//	validate containing square.
	
	return validate_square(n, x, y, board);
}

function display_solution(board){
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			var id = "cell-" + i + j;
			var elem = document.getElementById(id);
			elem.innerHTML = board[i][j];
		}
	}
}

function find_solution(board, empty_cells, idx){
	if(idx == empty_cells.length){
		display_solution(board);
		return;
	}
	var x = empty_cells[idx][0];
	var y = empty_cells[idx][1];
	
	for(var num = 1;num < 10;num++){
		if(valid(num, x, y, board)){
			board[x][y] = num;
			find_solution(board, empty_cells, idx + 1);
		}
	}
	board[x][y] = 0;
}

function solve(board){
	var empty_cells = new Array();
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			if(board[i][j] == 0){
				var tmp = new Array();
				tmp.push(i);
				tmp.push(j);
				empty_cells.push(tmp);
			}
		}
	}
	find_solution(board, empty_cells, 0);
}

function prepare_matrix(){
	var board = new Array(9);
	for(var i=0;i<9;i++)
		board[i] = new Array(9);
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			var id = "cell-" + i + j;
			var value = document.getElementById(id).innerHTML;
			if(value == ""){
				board[i][j] = 0;
				$("#" + id).addClass("gray-box");
			}
			else
				board[i][j] = value;
			$("#" + id).removeClass("clickable");
		}
	}
	solve(board);
}
