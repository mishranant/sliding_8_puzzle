'use strict';
let canvas = document.getElementById('canvasArena');
let ctx = canvas.getContext('2d');
let grid = new Array(3);
let tiles = new Array(9);
let arena = {
	height : 300,
	width : 300
};
let tile = {
	height : 99,
	width : 99,
	gap : 1
};

for (let p = 0; p < 3; p++){
	grid[p] = new Array(3);
	for (let q = 0; q < 3; q++){
		grid[p][q] = (p*3+q+1)%9;
		tiles[(p*3+q+1)%9] = {
			i : p,
			j : q
		};
	}
}
function initGame(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawArena();
	drawTiles();
}
function drawArena(){
	ctx.beginPath();
	ctx.rect(0, 0, arena.width, arena.height);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
}
function drawTiles(){
	ctx.font = "27px sans-serif";
	for (let p = 0; p < 3; p++){
		for (let q = 0; q < 3; q++){
			if (p != tiles[0].i || q != tiles[0].j){	
				let index = grid[p][q];
				ctx.fillStyle="white";
				ctx.fillText(index, tile.width*tiles[index].j + tile.width/2 -10, tile.height*tiles[index].i + tile.height/2);
			}
		}
	}
}
document.onkeydown = function(e){
	let key = e.which || e.keyCode;
	//37 left, 38 up, 39 right, 40 down
	if (key === 37 && tiles[0].j > 0){
		let left = grid[tiles[0].i][tiles[0].j-1];
		tiles[left].j = tiles[0].j--;
		grid[tiles[left].i][tiles[left].j] = left;
	}
	if (key === 39 && tiles[0].j < 2){
		let right = grid[tiles[0].i][tiles[0].j+1];
		tiles[right].j = tiles[0].j++;
		grid[tiles[right].i][tiles[right].j] = right;
	}
	if (key === 38 && tiles[0].i > 0){
		let up = grid[tiles[0].i-1][tiles[0].j];
		tiles[up].i = tiles[0].i--;
		grid[tiles[up].i][tiles[up].j] = up;
	}
	if (key === 40 && tiles[0].i < 2){
		let down = grid[tiles[0].i+1][tiles[0].j];
		tiles[down].i = tiles[0].i++;
		grid[tiles[down].i][tiles[down].j] = down;
	}
	grid[tiles[0].i][tiles[0].j] = 0;
}
setInterval(initGame,100);