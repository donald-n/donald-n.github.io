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
ctx.font = "16px sans-serif";

let score = 0;
let droppingBlock;
let blocks;

function resetBlocks() {
	blocks = {
		0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [], 13: [], 14: [], 15: [], 16: [], 17: [], 18: [], 19: []
	};
	droppingBlock = {};
}
resetBlocks();

var dir = 0;
let player = {x: 0, y: 475};

function clearCanvas() {
	ctx.fillStyle = board_background;
	ctx.strokestyle = board_border;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawBlocks() {
	for (const [row, blockList] of Object.entries(blocks)) {
		for (block of blockList) {
			drawBlock(block);
		}
	}
	drawBlock(droppingBlock);
}

function drawBlock(block) {
	ctx.fillStyle = block_col;
	ctx.strokestyle = block_border;
	ctx.fillRect(block.x, block.y, 25, 25);
	ctx.strokeRect(block.x, block.y, 25, 25);
}

function dropBlock() {
	var row = Math.round(Math.random() * 19);
	if (Object.keys(droppingBlock).length === 0) {
		droppingBlock = {
			x: row * 25,
			y: 0,
			row: row - 1
		};
	}

	if (droppingBlock.y < 475) {
		droppingBlock.y += 25
	}
	else if (droppingBlock.y >= 475) {
		blocks[droppingBlock.row + 1].push(droppingBlock);
		droppingBlock = {};
		score += 19 - (player.y / 25);
	}

	for (const [row, blockList] of Object.entries(blocks)) {
		for (block of blockList) {
			if (droppingBlock.x === block.x && droppingBlock.y === block.y) {
				droppingBlock.y = block.y - 25;
				blocks[droppingBlock.row + 1].push(droppingBlock);
				droppingBlock = {};
				score += 19 - (player.y / 25);
			}
		}
	}
}

function drawPlayer() {
	ctx.fillStyle = player_col;
	ctx.strokestyle = player_border;
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
			console.log(19 - (player.y / 25));
			console.log(blockList.length);
			if (blockList.length - (19 - (player.y / 25)) <= 1) {
				onBlock = true;
				player.y = 475 - (blockList.length * 25);
				break;
			} else {
				console.log('here');
				player.x += 25 * dir;
			}
		}
	}
	if (!onBlock) {
		player.y = 475;
	}

}

function reset() {
	player = {x: 0, y: 475};
	score = 0;
	resetBlocks();
}

let blockDropSpeed = 0;
function main() {
	blockDropSpeed += 1;
	if (blockDropSpeed === 1) {
		blockDropSpeed = 0;
		dropBlock();
	}

	for (const [row, blockList] of Object.entries(blocks)) {
		for (block of blockList) {
			if (block.x === player.x && block.y === player.y) {
				reset();
			}
		}
	}

	if (player.y === 0) {
		reset();
	}
	ctx.fillStyle = "white";
	ctx.fillText('score: ' + score, 6, 30);
	setTimeout(function onTick() {
    	clearCanvas();
    	drawPlayer();
    	drawBlocks();
    	main();
    }, 100);
}

main();