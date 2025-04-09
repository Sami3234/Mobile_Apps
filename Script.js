// Variables for the player, enemy, and snowball
const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const snowball = document.getElementById('snowball');

let playerPosition = { x: window.innerWidth / 2 - 25, y: window.innerHeight - 60 }; // Player start position
let enemyPosition = { x: 300, y: 100 }; // Enemy start position
let snowballPosition = { x: -100, y: -100 }; // Snowball start position (off-screen)

const playerSpeed = 5;
const snowballSpeed = 7;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        playerPosition.x -= playerSpeed;
    } else if (event.key === 'ArrowRight') {
        playerPosition.x += playerSpeed;
    }

    // Update the player position
    player.style.left = `${playerPosition.x}px`;
});

// Snowball shooting functionality
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') { // Spacebar to shoot snowball
        shootSnowball();
    }
});

function shootSnowball() {
    // Set snowball to player position
    snowball.style.left = `${playerPosition.x + 15}px`; // Center the snowball horizontally
    snowball.style.bottom = `${playerPosition.y + 50}px`; // Position snowball above player
    snowball.style.display = 'block'; // Show snowball

    let interval = setInterval(() => {
        snowballPosition.y += snowballSpeed; // Move snowball upwards
        snowball.style.bottom = `${snowballPosition.y}px`;

        // Check collision with enemy
        if (snowballPosition.y >= enemyPosition.y && 
            snowballPosition.x >= enemyPosition.x && 
            snowballPosition.x <= enemyPosition.x + 50) {
            clearInterval(interval);
            snowball.style.display = 'none'; // Hide snowball after collision
            alert('Enemy Defeated!');
        }

        // Hide snowball if it moves out of screen
        if (snowballPosition.y > window.innerHeight) {
            clearInterval(interval);
            snowball.style.display = 'none'; // Hide snowball
        }
    }, 20);
}

// Enemy movement (simple random horizontal movement)
function moveEnemy() {
    enemyPosition.x += Math.random() > 0.5 ? 1 : -1;
    if (enemyPosition.x < 0 || enemyPosition.x > window.innerWidth - 50) {
        enemyPosition.x = Math.max(0, Math.min(enemyPosition.x, window.innerWidth - 50));
    }
    enemy.style.left = `${enemyPosition.x}px`;
}

setInterval(moveEnemy, 50); // Move enemy every 50ms
