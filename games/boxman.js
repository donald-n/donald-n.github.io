window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
document.addEventListener("keydown", movePlayer);

const board_border = 'white';
const board_background = "black";
const player_col = "#4fe567";
const player_border = "#4fe567";
const block_col = "#4444ee";
const block_border = "#4fe567";

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let droppingBlock = {};
let blocks = [];

var dir = 0;
let player = {x: 0, y: 475};

function clearCanvas() {
  ctx.fillStyle = board_background;
  ctx.strokestyle = board_border;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawBlocks() {
	blocks.forEach(drawBlock);
	drawBlock(droppingBlock);
}

function drawBlock(block) {
	ctx.fillStyle = block_col;
	ctx.strokestyle = block_border;
	ctx.fillRect(block.x, block.y, 25, 25);
	ctx.strokeRect(block.x, block.y, 25, 25);
}

function dropBlock() {
	if (Object.keys(droppingBlock).length === 0) {
		droppingBlock = {
			x: Math.round(Math.random() * 19) * 25,
			y: 0
		};
	}

	if (droppingBlock.y < 475) {
		droppingBlock.y += 25
	}
	else if (droppingBlock.y >= 475) {
		blocks.push(droppingBlock);
		droppingBlock = {};
	}

	for (block of blocks) {
		if (droppingBlock.y === block.y && droppingBlock.x === block.x) {
			droppingBlock.y = block.y - 25;
			blocks.push(droppingBlock);
			droppingBlock = {};
		}
	}
}

function drawPlayer() {
	ctx.fillStyle = player_col;
	ctx.strokestyle = player_border;
	ctx.fillRect(player.x, player.y, 25, 25);
	ctx.strokeRect(player.x, player.y, 25, 25);
}

function movePlayer(event) {
	const LEFT_KEY = 37;
	const RIGHT_KEY = 39;
	const keyPressed = event.keyCode;

	if (keyPressed === LEFT_KEY) {
		if (player.x === 0) return;
		player.x -= 25;
	}
	else if (keyPressed === RIGHT_KEY) {
		if (player.x === 475) return;
		player.x += 25;
	}

	for (block of blocks) {
		if (player.x === block.x) {
			player.y = block.y - 25;
		} else {
			console.log('here');
			player.y = 475;
		}
	}

}

var blocksDrop = 0;
function main() {
	blocksDrop += 1;
	if (blocksDrop === 1) {
		blocksDrop = 0;
		dropBlock();
	}

	setTimeout(function onTick() {
    	clearCanvas();
    	drawBlocks();
    	drawPlayer();
    	main();
    }, 100);
}

main();