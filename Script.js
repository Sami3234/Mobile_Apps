const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const gameContainer = document.getElementById("game-container");
const mirchiContainer = document.getElementById("mirchi-container");
const scoreDisplay = document.querySelector("#score span");
const timerDisplay = document.querySelector("#timer span");
const finalScore = document.getElementById("final-score");
const highScoreEnd = document.getElementById("high-score-end");
const highScoreTop = document.querySelector("#high-score span");
const gameOverScreen = document.getElementById("game-over");

let score = 0;
let timeLeft = 30;
let highScore = localStorage.getItem("highScore") || 0;
let gameInterval, mirchiInterval;

highScoreTop.textContent = highScore;

function startGame() {
  startScreen.style.display = "none";
  gameContainer.style.display = "block";
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  gameOverScreen.style.display = "none";

  gameInterval = setInterval(updateTimer, 1000);
  mirchiInterval = setInterval(spawnItem, 800);
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    endGame();
  }
}

function spawnItem() {
  const item = document.createElement("img");
  const isBomb = Math.random() < 0.2;
  item.src = isBomb ? "images/bomb.png" : "images/mirch.jpg";
  item.classList.add(isBomb ? "bomb" : "mirchi");

  item.style.left = `${Math.random() * 90}%`;
  item.style.top = "0px";
  mirchiContainer.appendChild(item);

  let falling = setInterval(() => {
    let top = parseFloat(item.style.top);
    item.style.top = `${top + 5}px`;
    if (top > 300) {
      clearInterval(falling);
      item.remove();
    }
  }, 50);

  item.addEventListener("click", () => {
    clearInterval(falling);
    if (isBomb) {
      endGame();
    } else {
      score += 1;
      timeLeft += 1;
      scoreDisplay.textContent = score;
      item.remove();
    }
  });
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(mirchiInterval);
  mirchiContainer.innerHTML = "";

  finalScore.textContent = score;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }

  highScoreTop.textContent = highScore;
  highScoreEnd.textContent = highScore;

  gameOverScreen.style.display = "block";
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
