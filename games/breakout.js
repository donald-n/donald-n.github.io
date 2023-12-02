window.addEventListener("keydown", function(e) {
		if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
				e.preventDefault();
		}
}, false);
document.addEventListener("keydown", movePlayer);

const tileSize = .5;

const board_border = 'black';
const board_background = "black";
const player_col = "#00db4d";
const player_border = "black";
const block_col = "#4444ee";
const block_border = "black";
const ballColor = "#ffffff";

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let level = 1;
let ball = {
	x: 250,
	y: 250,
	hitBoxSize: 8
};
let ballDirX = 10;
let ballDirY = 3;
const blockWidth = 30;
const blockHeight = 8;

let levelOne = [
	{x: 0, y: 110, hit: false}
];

function drawLevel() {
	for (block of levelOne) {
		drawBlock(block);
	}
}

function drawBall() {
	ctx.fillStyle = ballColor;
	ctx.fillRect(ball.x+2, ball.y, 4, 1);
	ctx.fillRect(ball.x+1, ball.y+1, 6, 1);
	ctx.fillRect(ball.x, ball.y+2, 8, 4);
	ctx.fillRect(ball.x+1, ball.y+6, 6, 1);
	ctx.fillRect(ball.x+2, ball.y+7, 4, 1);
}

function moveBall() {
	if (ball.x <= 0 || ball.x + ball.hitBoxSize >= 500) {
		ballDirX = -ballDirX;
	}
	if (ball.y <= 0 || ball.y + ball.hitBoxSize >= 500) {
		ballDirY = -ballDirY;
	}

	for (block of levelOne) {
		if (ball.x >= block.x && ball.x <= block.x+blockWidth && ball.y >= block.y && ball.y <= block.y+blockHeight) {
			// ballDirX = -ballDirX;
			ballDirY = -ballDirY;
		}
		// if (ball.y <= 0 || ball.y + ball.hitBoxSize >= 500) {
		// 	ballDirY = -ballDirY;
		// }
	}

	ball.x += ballDirX * tileSize;
	ball.y += ballDirY * tileSize;
}

var dir = 0;
let player = {x: 0, y: 490};

function clearCanvas() {
	ctx.fillStyle = board_background;
	ctx.strokeStyle = board_border;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawBlock(block) {
	ctx.fillStyle = block_col;
	ctx.fillRect(block.x, block.y, blockWidth, blockHeight);
	ctx.strokeStyle = block_border;
	ctx.strokeRect(block.x, block.y, blockWidth, blockHeight);
	ctx.stroke();
}

function drawPlayer() {
	ctx.fillStyle = player_col;
	ctx.strokeStyle = player_border;
	ctx.fillRect(player.x + 5, player.y + 10, 15, 15);
	ctx.fillStyle = "black";
	ctx.fillRect(player.x + 8, player.y + 13, 3, 3);
	ctx.fillRect(player.x + 14, player.y + 13, 3, 3);
	ctx.fillRect(player.x + 8, player.y + 21, 9, 2);
	ctx.strokeRect(player.x + 5, player.y + 10, 15, 15);
}

function movePlayer(event) {
	const LEFT_KEY = 37;
	const RIGHT_KEY = 39;
	const keyPressed = event.keyCode;
	let dir = 0;

	if (keyPressed === LEFT_KEY) {
		if (player.x === 0) return;
		dir = 1;
	}
	else if (keyPressed === RIGHT_KEY) {
		if (player.x === 475) return;
		dir = -1;
	}

	player.x += 25 * -dir;

	let onBlock = false;
	for (const [row, blockList] of Object.entries(blocks)) {
		if (player.x / 25 == row) {
			if (blockList.length - (19 - (player.y / 25)) <= 1) {
				onBlock = true;
				player.y = 475 - (blockList.length * 25);
				break;
			} else {
				player.x += 25 * dir;
			}
		}
	}
}

function reset() {
	player = {x: 0, y: 475};
	level = 1;
}

function main() {
	moveBall();

	drawLevel();

	setTimeout(function onTick() {
			clearCanvas();
			drawBall();
			main();
	}, 10);
}

main();
