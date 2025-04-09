const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
let score = 0;
let level = 1;
let playerSpeed = 20;
let snowflakes = [];
let enemies = [];
let gameInterval;
let enemyInterval;

function createSnowflake() {
  let snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.style.left = `${Math.random() * 380}px`;
  snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
  document.querySelector('.game-container').appendChild(snowflake);
  snowflakes.push(snowflake);
}

function createEnemy() {
  let enemy = document.createElement('div');
  enemy.classList.add('enemy');
  enemy.style.left = `${Math.random() * 380}px`;
  enemy.style.animationDuration = `${Math.random() * 4 + 3}s`;
  document.querySelector('.game-container').appendChild(enemy);
  enemies.push(enemy);
}

function moveSnowflakes() {
  snowflakes.forEach(snowflake => {
    let snowflakePosition = snowflake.offsetTop;
    snowflakePosition += 5;
    snowflake.style.top = `${snowflakePosition}px`;

    if (snowflakePosition >= 600) {
      snowflake.remove();
      snowflakes = snowflakes.filter(item => item !== snowflake);
    }
    
    if (checkCollision(snowflake)) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      snowflake.remove();
      snowflakes = snowflakes.filter(item => item !== snowflake);
    }
  });
}

function moveEnemies() {
  enemies.forEach(enemy => {
    let enemyPosition = enemy.offsetTop;
    enemyPosition += 5;
    enemy.style.top = `${enemyPosition}px`;

    if (enemyPosition >= 600) {
      enemy.remove();
      enemies = enemies.filter(item => item !== enemy);
    }

    if (checkEnemyCollision(enemy)) {
      endGame();
    }
  });
}

function checkCollision(snowflake) {
  const snowflakeRect = snowflake.getBoundingClientRect();
  const playerRect = player.getBoundingClientRect();

  if (snowflakeRect.bottom >= playerRect.top && snowflakeRect.left >= playerRect.left && snowflakeRect.right <= playerRect.right) {
    return true;
  }
  return false;
}

function checkEnemyCollision(enemy) {
  const enemyRect = enemy.getBoundingClientRect();
  const playerRect = player.getBoundingClientRect();

  if (enemyRect.bottom >= playerRect.top && enemyRect.left >= playerRect.left && enemyRect.right <= playerRect.right) {
    return true;
  }
  return false;
}

function movePlayer(e) {
  const playerRect = player.getBoundingClientRect();
  
  if (e.key === 'ArrowLeft' && playerRect.left > 0) {
    player.style.left = `${playerRect.left - playerSpeed}px`;
  }
  if (e.key === 'ArrowRight' && playerRect.right < 400) {
    player.style.left = `${playerRect.left + playerSpeed}px`;
  }
}

function updateLevel() {
  if (score >= level * 10) {
    level++;
    levelDisplay.textContent = `Level: ${level}`;
    if (level % 5 === 0) {
      createEnemy();
    }
  }
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  alert(`Game Over! Your final score is ${score}`);
}

function startGame() {
  gameInterval = setInterval(() => {
    createSnowflake();
    moveSnowflakes();
    updateLevel();
  }, 500);

  enemyInterval = setInterval(() => {
    if (level % 5 === 0) {
      createEnemy();
    }
    moveEnemies();
  }, 2000);
}

document.addEventListener('keydown', movePlayer);
startGame();
