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
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = `${Math.random() * 380}px`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    document.querySelector('.game-container').appendChild(snowflake);
    snowflakes.push(snowflake);
}

function createEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = `${Math.random() * 380}px`;
    enemy.style.animationDuration = `${Math.random() * 4 + 3}s`;
    document.querySelector('.game-container').appendChild(enemy);
    enemies.push(enemy);
}

function moveSnowflakes() {
    snowflakes.forEach(snowflake => {
        const snowflakePosition = snowflake.offsetTop + 5;
        snowflake.style.top = `${snowflakePosition}px`;

        if (snowflakePosition >= 600) {
            snowflake.remove();
            snowflakes = snowflakes.filter(item => item !== snowflake);
        } else if (checkCollision(snowflake)) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            snowflake.remove();
            snowflakes = snowflakes.filter(item => item !== snowflake);
        }
    });
}

function moveEnemies() {
    enemies.forEach(enemy => {
        const enemyPosition = enemy.offsetTop + 5;
        enemy.style.top = `${enemyPosition}px`;

        if (enemyPosition >= 600) {
            enemy.remove();
            enemies = enemies.filter(item => item !== enemy);
        } else if (checkEnemyCollision(enemy)) {
            endGame();
        }
    });
}

function checkCollision(item) {
    const itemRect = item.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    return (
        itemRect.bottom >= playerRect.top &&
        itemRect.left >= playerRect.left &&
        itemRect.right <= playerRect.right
    );
}

function checkEnemyCollision(enemy) {
    return checkCollision(enemy);
}

function movePlayer(e) {
    const playerRect = player.getBoundingClientRect();

    if (e.key === 'ArrowLeft' && playerRect.left > 0) {
        player.style.left = `${player.offsetLeft - playerSpeed}px`;
    }
    if (e.key === 'ArrowRight' && playerRect.right < 400) {
        player.style.left = `${player.offsetLeft + playerSpeed}px`;
    }
}

function updateLevel() {
    if (score >= level * 10) {
        level++;
        levelDisplay.textContent = `Level: ${level}`;
        playerSpeed += 5;
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