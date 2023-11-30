const board_border = 'white';
const board_background = "black";
const snake_col = '#f4ff00';
const snake_border = '#f4ff00';


let snake = [
{x: 300, y: 300},
{x: 290, y: 300},
{x: 280, y: 300},
{x: 270, y: 300},
{x: 260, y: 300}
]

let score = 0;
let speed = 55;
let changing_direction = false;
let food_x;
let food_y;
let poison_x;
let poison_y;
let dx = 10;
let dy = 0;
let grow = 5;

var running = true;

const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

main();

gen_food();
gen_poison();
document.addEventListener("keydown", change_direction);

function setSpeed() {
  var speedSet = document.getElementById('speedInput').value;
  speed = speedSet;
}

function setGrow() {
  var growSet = document.getElementById('growInput').value;
  grow = growSet;
}

function reset() {
  snake = [
  {x: 300, y: 300},
  {x: 290, y: 300},
  {x: 280, y: 300},
  {x: 270, y: 300},
  {x: 260, y: 300}
  ]
  dx = 10;
  dy = 0;
  score = 0;
  let score_dis = document.getElementById("score_dis");
  score_dis.innerHTML = "score: "+score;
}

function main() {
  if (has_game_ended()) {
    reset();
  }
  if (score == 500) {
  	alert("you won snake!");
    reset();
  }

  changing_direction = false;
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    drawPoison();
    move_snake();
    drawSnake();
    main();
  }, speed)
}

function clearCanvas() {
  snakeboard_ctx.fillStyle = board_background;
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnake() {
  snake.forEach(drawSnakePart)
}

function drawFood() {
  snakeboard_ctx.fillStyle = '#00f3ff';
  snakeboard_ctx.fillRect(food_x+2, food_y+2, 6, 6);
}

function drawPoison() {
  snakeboard_ctx.fillStyle = '#ff0000';
  snakeboard_ctx.fillRect(poison_x+2, poison_y+2, 6, 6);
}

function drawSnakePart(snakePart) {
  snakeboard_ctx.fillStyle = snake_col;
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}

function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  try {
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
  } catch (error) {
    reset();
  }
}

function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food() {
  food_x = random_food(0, snakeboard.width - 10);
  food_y = random_food(0, snakeboard.height - 10);
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}

function gen_poison() {
  poison_x = random_food(0, snakeboard.width - 10);
  poison_y = random_food(0, snakeboard.height - 10);
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == poison_x && part.y == poison_y;
    if (has_eaten) gen_poison();
  });
}

function change_direction(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  const SPACE = 32;

  if (changing_direction) return;
  changing_direction = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function move_snake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
  const has_eaten_poison = snake[0].x === poison_x && snake[0].y === poison_y;
  if (has_eaten_food) {
    for (f = 0; f < grow; f++) {
      const head = {x: snake[[snake.length - 1]].x - dx, y: snake[snake.length - 1].y - dy};
      snake.push(head);
    }
    score += 10;
    let score_dis = document.getElementById("score_dis");
    score_dis.innerHTML = "score: "+score;
    gen_food();
  } 
  else if (has_eaten_poison) {
    for (f = 0; f < grow+1; f++) {
      snake.pop();
    }
    score -= 10;
    let score_dis = document.getElementById("score_dis");
    score_dis.innerHTML = "score: "+score;
    gen_poison();
  } else {
    snake.pop();
  }
}
