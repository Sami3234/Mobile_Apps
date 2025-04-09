const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = 600;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 160, y: 160 }];
let direction = 'right';
let food = {};
let gameOver = false;
let gameStarted = false;
let gameInterval;

function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
  };
}

function drawGame() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  snake.forEach((part, i) => {
    ctx.fillStyle = i === 0 ? "#00FF00" : "#00CC99";
    ctx.fillRect(part.x, part.y, gridSize, gridSize);
  });

  ctx.fillStyle = "#FF0066";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function updateGame() {
  if (gameOver) return;

  const head = { ...snake[0] };
  if (direction === 'up') head.y -= gridSize;
  if (direction === 'down') head.y += gridSize;
  if (direction === 'left') head.x -= gridSize;
  if (direction === 'right') head.x += gridSize;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    generateFood();
  } else {
    snake.pop();
  }

  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize ||
    snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    clearInterval(gameInterval);
    gameOver = true;
    document.getElementById('gameOver').classList.remove('hidden');
  }

  drawGame();
}

// Keyboard Controls
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
  if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

// Touch Buttons
document.getElementById('up').addEventListener('click', () => {
  if (direction !== 'down') direction = 'up';
});
document.getElementById('down').addEventListener('click', () => {
  if (direction !== 'up') direction = 'down';
});
document.getElementById('left').addEventListener('click', () => {
  if (direction !== 'right') direction = 'left';
});
document.getElementById('right').addEventListener('click', () => {
  if (direction !== 'left') direction = 'right';
});

// Start Game Button
document.getElementById('startBtn').addEventListener('click', () => {
  startGame();
});

// Restart Game Button
document.getElementById('restartBtn').addEventListener('click', () => {
  startGame();
});

function startGame() {
  snake = [{ x: 160, y: 160 }];
  direction = 'right';
  gameOver = false;
  gameStarted = true;
  generateFood();
  drawGame();
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('gameOver').classList.add('hidden');

  clearInterval(gameInterval);
  gameInterval = setInterval(updateGame, 200); // Slow for mobile
}
