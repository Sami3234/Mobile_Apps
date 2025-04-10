const board = document.getElementById("gameBoard");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gameOver = document.getElementById("gameOver");

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = {};
let interval;
const size = 20;

function drawBoard() {
  board.innerHTML = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (snake.some(s => s.x === x && s.y === y)) {
        cell.classList.add("snake");
      } else if (food.x === x && food.y === y) {
        cell.classList.add("food");
      }
      board.appendChild(cell);
    }
  }
}

function randomFood() {
  food = {
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size),
  };
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (
    head.x < 0 || head.x >= size ||
    head.y < 0 || head.y >= size ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(interval);
    gameOver.classList.remove("hidden");
    restartBtn.classList.remove("hidden");
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    randomFood();
  } else {
    snake.pop();
  }

  drawBoard();
}

function changeDirection(dir) {
  if (
    (dir === "left" && direction.x !== 1) ||
    (dir === "right" && direction.x !== -1) ||
    (dir === "up" && direction.y !== 1) ||
    (dir === "down" && direction.y !== -1)
  ) {
    direction = dir === "up" ? { x: 0, y: -1 } :
                dir === "down" ? { x: 0, y: 1 } :
                dir === "left" ? { x: -1, y: 0 } : { x: 1, y: 0 };
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") changeDirection("left");
  if (e.key === "ArrowRight") changeDirection("right");
  if (e.key === "ArrowUp") changeDirection("up");
  if (e.key === "ArrowDown") changeDirection("down");
});

startBtn.addEventListener("click", () => {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  randomFood();
  drawBoard();
  gameOver.classList.add("hidden");
  restartBtn.classList.add("hidden");
  interval = setInterval(moveSnake, 200); // Snake speed
});

restartBtn.addEventListener("click", () => {
  startBtn.click();
});

randomFood();
