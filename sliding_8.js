'use strict';
let canvas = document.getElementById('canvasArena');
let moveDisplay = document.getElementById('movecount');
let moves = 0;
let ctx = canvas.getContext('2d');
let grid = new Array(3);
let tiles = new Array(9);
let arena = {
	height : 450,
	width : 450
};
let tile = {
	height : 150,
	width : 150,
	gap : 2
};

for (let p = 0; p < 3; p++){
	grid[p] = new Array(3);
	for (let q = 0; q < 3; q++){
		tiles[(p*3+q+1)%9] = {
			i : p,
			j : q
		};
	}
}
tiles = shuffleArray(tiles);

function shuffleArray(arr){
	let i = arr.length, i_rand, temp;
	while (i-- > 0){
		i_rand = Math.floor(Math.random() * i);
		temp = arr[i_rand];
		arr[i_rand] = arr[i];
		arr[i] = temp;
	}
	let count = 0;
	for (let p = arr.length - 1; p > 0; p--) {
		for (let q = p-1; q > 0; q--) {
			if (tiles[q].i * 3 + tiles[q].j > tiles[p].i * 3 + tiles[p].j) count++;
		}	
	}
	if (count & 1){//odd
		temp = arr[8];
		arr[8] = arr[7];
		arr[7] = temp;
	}
	// console.log(count);
	return arr;
}

for (let p = 0; p < 9; p++)
	grid[tiles[p].i][tiles[p].j] = p;

function initGame(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	moveDisplay.innerHTML = moves;
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
	ctx.beginPath();
	ctx.fillStyle="white";
	ctx.lineWidth="5";
	ctx.strokeStyle="#eee";
	ctx.font = "50px sans-serif";
	for (let p = 0; p < 3; p++){
		for (let q = 0; q < 3; q++){
			let index = grid[p][q];
			if (!(p == tiles[0].i && q == tiles[0].j)){
				let fillx = tile.width*tiles[index].j + tile.width/2 - 15;
				let filly = tile.height*tiles[index].i + tile.height/2 + 15;
				ctx.fillText(index, fillx, filly);
			}
			ctx.rect(tile.width*p, tile.height*q, tile.width, tile.height);
			ctx.stroke();
		}
	}
	ctx.closePath();
}
document.onkeydown = function(e){
	let key = e.which || e.keyCode;
	//37 left, 38 up, 39 right, 40 down
	if (key === 37 && tiles[0].j > 0){
		let left = grid[tiles[0].i][tiles[0].j-1];
		tiles[left].j = tiles[0].j--;
		grid[tiles[left].i][tiles[left].j] = left;
		moves++;
	}
	if (key === 39 && tiles[0].j < 2){
		let right = grid[tiles[0].i][tiles[0].j+1];
		tiles[right].j = tiles[0].j++;
		grid[tiles[right].i][tiles[right].j] = right;
		moves++;
	}
	if (key === 38 && tiles[0].i > 0){
		let up = grid[tiles[0].i-1][tiles[0].j];
		tiles[up].i = tiles[0].i--;
		grid[tiles[up].i][tiles[up].j] = up;
		moves++;
	}
	if (key === 40 && tiles[0].i < 2){
		let down = grid[tiles[0].i+1][tiles[0].j];
		tiles[down].i = tiles[0].i++;
		grid[tiles[down].i][tiles[down].j] = down;
		moves++;
	}
	grid[tiles[0].i][tiles[0].j] = 0;
}
setInterval(initGame,200);