const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const roundElement = document.getElementById('round');

const CELL_SIZE = 30;
const ROWS = 20;
const COLS = 20;
const MOVE_DELAY = 150; // Slower movement

// Multiple maze layouts (1 = wall, 0 = dot, 2 = empty, 3 = power pellet)
const mazePatterns = [
    // Pattern 1 - Classic
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,3,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,3,1],
        [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1],
        [1,0,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,0,1],
        [1,1,1,1,0,1,1,1,2,1,1,2,1,1,1,0,1,1,1,1],
        [1,1,1,1,0,1,2,2,2,2,2,2,2,2,1,0,1,1,1,1],
        [1,1,1,1,0,1,2,1,1,2,2,1,1,2,1,0,1,1,1,1],
        [2,2,2,2,0,2,2,1,2,2,2,2,1,2,2,0,2,2,2,2],
        [1,1,1,1,0,1,2,1,2,2,2,2,1,2,1,0,1,1,1,1],
        [1,1,1,1,0,1,2,1,1,1,1,1,1,2,1,0,1,1,1,1],
        [1,1,1,1,0,1,2,2,2,2,2,2,2,2,1,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
        [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,1,0,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,1],
        [1,3,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,3,1],
        [1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    // Pattern 2 - Cross
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
        [1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,1,1,1,2,1,1,2,1,1,1,0,1,1,1,1],
        [2,2,2,2,0,2,2,1,2,2,2,2,1,2,2,0,2,2,2,2],
        [1,1,1,1,0,1,1,1,2,1,1,2,1,1,1,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1],
        [1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    // Pattern 3 - Spiral
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
        [1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
        [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0,0,1,1,0,0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0,2,1,1,2,0,1,0,1,0,1,0,1],
        [2,0,2,0,2,0,2,0,2,2,2,2,0,2,0,2,0,2,0,2],
        [1,0,1,0,1,0,1,0,2,1,1,2,0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0,0,1,1,0,0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
        [1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
];

function getCurrentMaze() {
    const patternIndex = Math.floor((round - 1) / 2) % mazePatterns.length;
    return mazePatterns[patternIndex];
}


let round = 1;


let maze = JSON.parse(JSON.stringify(getCurrentMaze()));

// Game state
let pacman = { x: 1, y: 1, direction: 'right' };
let ghosts = [
    { x: 9, y: 9, direction: 'up', color: '#ff0000', scared: false },
    { x: 10, y: 9, direction: 'up', color: '#ffb8ff', scared: false },
    { x: 9, y: 10, direction: 'down', color: '#00ffff', scared: false },
    { x: 10, y: 10, direction: 'down', color: '#ffb852', scared: false }
];
let score = 0;
let lives = 3;
let round = 1;
let totalDots = 0;
let powerMode = 0;
let powerModeStartTime = 0;
let powerDuration = 10000;
let stars = [];
let animationFrame = 0;

// Initialize stars
for (let i = 0; i < 50; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        brightness: Math.random()
    });
}
let lastMoveTime = 0;
let lastGhostMoveTime = 0;
let gameRunning = true;
let gameState = 'playing'; // 'playing', 'dying', 'paused'
let deathTimer = 0;
let deathAnimation = 0;
let dotsEaten = 0;
let bonusFruit = null;
let powerModeAudio = null;

// Count initial dots and power pellets
function countDots() {
    totalDots = 0;
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (maze[row][col] === 0 || maze[row][col] === 3) totalDots++;
        }
    }
}
countDots();

// Sound effects
const sounds = {
    eat: () => playTone(800, 100),
    powerPellet: () => { playTone(400, 300); startPowerMusic(); },
    death: () => { playTone(200, 200); setTimeout(() => playTone(150, 300), 200); },
    ghost: () => { playTone(300, 150); playTone(200, 200); },
    ghostReturn: () => { playTone(600, 100); playTone(500, 100); playTone(400, 100); },
    fruit: () => { playTone(1000, 200); playTone(1200, 200); },
    powerEnd: () => { playTone(300, 200); playTone(250, 200); }
};

let audioContext;
function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

function playTone(freq, duration) {
    try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.frequency.value = freq;
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        oscillator.start();
        oscillator.stop(ctx.currentTime + duration / 1000);
    } catch(e) {}
}

function startPowerMusic() {
    try {
        if (powerModeAudio) powerModeAudio.stop();
        const ctx = getAudioContext();

        // Catchy power-up jingle
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        let noteIndex = 0;

        // Catchy power-up jingle
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        let noteIndex = 0;

        function playNote() {
            if (noteIndex < notes.length) {
                const oscillator = ctx.createOscillator();
                const gainNode = ctx.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(ctx.destination);
                oscillator.frequency.value = notes[noteIndex];
                oscillator.type = 'square';
                gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(ctx.currentTime + 0.3);
                noteIndex++;
                setTimeout(playNote, 150);
            }
        }
        playNote();
    } catch(e) {}
}

function spawnBonusFruit() {
    const fruits = [
        { name: 'cherry', color: '#ff0000', points: 100 },
        { name: 'strawberry', color: '#ff69b4', points: 300 },
        { name: 'orange', color: '#ffa500', points: 500 },
        { name: 'apple', color: '#ff4500', points: 700 },
        { name: 'melon', color: '#00ff00', points: 1000 },
        { name: 'saxophone', color: '#ffd700', points: 5000 }
    ];

    const emptySpots = [];
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            // Avoid ghost base area (center 4x4 area)

            if (maze[row][col] === 2 && !(row === pacman.y && col === pacman.x) &&
            if (maze[row][col] === 2 && !(row === pacman.y && col === pacman.x) &&
                !(row >= 8 && row <= 11 && col >= 8 && col <= 11)) {
                emptySpots.push({x: col, y: row});
            }
        }
    }

    if (emptySpots.length > 0) {
        const spot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
        const fruit = fruits[Math.floor(Math.random() * fruits.length)];
        bonusFruit = { ...fruit, x: spot.x, y: spot.y, timer: 600 };
    }
}

// Input handling
const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function updatePacman() {
    if (!gameRunning || gameState !== 'playing' || Date.now() - lastMoveTime < MOVE_DELAY) return;


    let newX = pacman.x;
    let newY = pacman.y;
    let moved = false;



    let newX = pacman.x;
    let newY = pacman.y;
    let moved = false;


    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
        newY = pacman.y - 1;
        pacman.direction = 'up';
        moved = true;
    } else if (keys['ArrowDown'] || keys['s'] || keys['S']) {
        newY = pacman.y + 1;
        pacman.direction = 'down';
        moved = true;
    } else if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        newX = pacman.x - 1;
        pacman.direction = 'left';
        moved = true;
    } else if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        newX = pacman.x + 1;
        pacman.direction = 'right';
        moved = true;
    }


    if (!moved) return;



    if (!moved) return;


    // Handle tunnel wrapping
    if (newY === 9 && newX < 0) {
        newX = COLS - 1;
    } else if (newY === 9 && newX >= COLS) {
        newX = 0;
    }





    // Check boundaries and walls
    if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS && maze[newY][newX] !== 1) {
        pacman.x = newX;
        pacman.y = newY;
        lastMoveTime = Date.now();





        // Collect items
        if (maze[newY][newX] === 0) {
            maze[newY][newX] = 2;
            score += 10;
            dotsEaten++;
            sounds.eat();
            if (dotsEaten % 50 === 0) spawnBonusFruit();
        } else if (maze[newY][newX] === 3) {
            maze[newY][newX] = 2;
            score += 50;
            powerMode = 1;
            powerModeStartTime = Date.now();
            ghosts.forEach(ghost => {
                ghost.scared = true;
            });
            sounds.powerPellet();
        }





        // Collect bonus fruit
        if (bonusFruit && bonusFruit.x === newX && bonusFruit.y === newY) {
            score += bonusFruit.points;
            sounds.fruit();
            bonusFruit = null;
        }


        updateScore();
        checkWin();
    }



        updateScore();
        checkWin();
    }


    // Check collision with ghosts after movement
    checkGhostCollisions();
}

function updateGhosts() {
    if (!gameRunning || gameState !== 'playing' || Date.now() - lastGhostMoveTime < MOVE_DELAY * 2) return;


    lastGhostMoveTime = Date.now();

    ghosts.forEach(ghost => {
        const directions = ['up', 'down', 'left', 'right'];
        let validMoves = [];



    lastGhostMoveTime = Date.now();

    ghosts.forEach(ghost => {
        const directions = ['up', 'down', 'left', 'right'];
        let validMoves = [];


        directions.forEach(dir => {
            let newX = ghost.x, newY = ghost.y;
            if (dir === 'up') newY--;
            else if (dir === 'down') newY++;
            else if (dir === 'left') newX--;
            else if (dir === 'right') newX++;





            // Handle tunnel wrapping for ghosts
            if (newY === 9 && newX < 0) {
                newX = COLS - 1;
            } else if (newY === 9 && newX >= COLS) {
                newX = 0;
            }





            if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS && maze[newY][newX] !== 1) {
                validMoves.push({dir, x: newX, y: newY});
            }
        });





        if (validMoves.length > 0) {
            const move = validMoves[Math.floor(Math.random() * validMoves.length)];
            ghost.x = move.x;
            ghost.y = move.y;
            ghost.direction = move.dir;
        }





        // Check collision with Pacman
        if (ghost.x === pacman.x && ghost.y === pacman.y) {
            if (powerMode > 0 && ghost.scared) {
                score += 200;
                sounds.ghost();
                setTimeout(() => sounds.ghostReturn(), 200);
                ghost.x = 9 + Math.floor(Math.random() * 2);
                ghost.y = 9 + Math.floor(Math.random() * 2);
                ghost.scared = false;
            } else {
                lives--;
                sounds.death();
                livesElement.textContent = lives;
                gameState = 'dying';
                deathTimer = 180;
                deathAnimation = 60;
                if (lives <= 0) {
                    setTimeout(() => {
                        alert('Game Over! Final Score: ' + score);
                        location.reload();
                    }, 3000);
                }
            }
        }
    });


    // Check collision with ghosts after ghost movement
    checkGhostCollisions();



    // Check collision with ghosts after ghost movement
    checkGhostCollisions();


    if (powerMode > 0) {
        const elapsed = Date.now() - powerModeStartTime;
        if (elapsed >= powerDuration) {
            powerMode = 0;
            ghosts.forEach(ghost => {
                ghost.scared = false;
            });
            if (powerModeAudio) powerModeAudio.stop();
            sounds.powerEnd();
        }
    }





    // Update bonus fruit
    if (bonusFruit) {
        bonusFruit.timer--;
        if (bonusFruit.timer <= 0) bonusFruit = null;
    }
}

function updateScore() {
    scoreElement.textContent = score;
}

function checkWin() {
    let dotsLeft = 0;
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (maze[row][col] === 0 || maze[row][col] === 3) dotsLeft++;
        }
    }





    if (dotsLeft === 0) {
        round++;
        roundElement.textContent = round;
        powerDuration = Math.max(3000, 10000 - (round - 1) * 500);
        maze = JSON.parse(JSON.stringify(getCurrentMaze()));
        pacman.x = 1;
        pacman.y = 1;
        ghosts.forEach((ghost, i) => {
            ghost.x = 9 + (i % 2);
            ghost.y = 9 + Math.floor(i / 2);
            ghost.scared = false;
        });
        powerMode = 0;
        setTimeout(() => alert('Round ' + round + '!'), 100);
    }
}

function drawMaze() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const x = col * CELL_SIZE;
            const y = row * CELL_SIZE;





            if (maze[row][col] === 1) {
                // Wall
                ctx.fillStyle = '#4169e1';
                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            } else if (maze[row][col] === 0) {
                // Dot
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(x + CELL_SIZE/2, y + CELL_SIZE/2, 3, 0, Math.PI * 2);
                ctx.fill();
            } else if (maze[row][col] === 3) {
                // Power pellet
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(x + CELL_SIZE/2, y + CELL_SIZE/2, 8, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

function drawPacman() {
    const x = pacman.x * CELL_SIZE + CELL_SIZE/2;
    const y = pacman.y * CELL_SIZE + CELL_SIZE/2;
    const radius = CELL_SIZE/2 - 2;





    if (gameState === 'dying' && deathAnimation > 0) {
        // Death animation - shrinking circle
        const shrinkFactor = deathAnimation / 60;
        ctx.fillStyle = '#ff0';
        ctx.beginPath();
        ctx.arc(x, y, radius * shrinkFactor, 0, Math.PI * 2);
        ctx.fill();
        deathAnimation--;
        return;
    }


    ctx.fillStyle = '#ff0';
    ctx.beginPath();

    // Draw Pacman with mouth based on direction
    let startAngle = 0;
    let endAngle = Math.PI * 2;



    ctx.fillStyle = '#ff0';
    ctx.beginPath();

    // Draw Pacman with mouth based on direction
    let startAngle = 0;
    let endAngle = Math.PI * 2;


    switch(pacman.direction) {
        case 'right':
            startAngle = 0.2 * Math.PI;
            endAngle = 1.8 * Math.PI;
            break;
        case 'left':
            startAngle = 1.2 * Math.PI;
            endAngle = 0.8 * Math.PI;
            break;
        case 'up':
            startAngle = 1.7 * Math.PI;
            endAngle = 1.3 * Math.PI;
            break;
        case 'down':
            startAngle = 0.7 * Math.PI;
            endAngle = 0.3 * Math.PI;
            break;
    }


    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineTo(x, y);
    ctx.fill();



    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineTo(x, y);
    ctx.fill();


    // Cyberpunk glasses
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(x - 12, y - 8, 8, 4);
    ctx.fillRect(x + 4, y - 8, 8, 4);
    ctx.fillStyle = '#0080ff';
    ctx.fillRect(x - 2, y - 6, 4, 1);





    // Lens glow effect
    ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.fillRect(x - 12, y - 8, 8, 4);
    ctx.fillRect(x + 4, y - 8, 8, 4);
}

function drawGhosts() {
    ghosts.forEach(ghost => {
        const x = ghost.x * CELL_SIZE + CELL_SIZE/2;
        const y = ghost.y * CELL_SIZE + CELL_SIZE/2;
        const radius = CELL_SIZE/2 - 2;





        let ghostColor = ghost.color;
        if (powerMode > 0 && ghost.scared) {
            // Blink when power mode is about to end
            const elapsed = Date.now() - powerModeStartTime;
            if (elapsed > (powerDuration - 2000) && Math.floor(elapsed / 150) % 2 === 0) {
                ghostColor = '#ffffff';
            } else {
                ghostColor = '#0000ff';
            }
        }





        ctx.fillStyle = ghostColor;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();





        // Eyes
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x - 5, y - 3, 3, 0, Math.PI * 2);
        ctx.arc(x + 5, y - 3, 3, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawBonusFruit() {
    if (!bonusFruit) return;


    const x = bonusFruit.x * CELL_SIZE + CELL_SIZE/2;
    const y = bonusFruit.y * CELL_SIZE + CELL_SIZE/2;



    const x = bonusFruit.x * CELL_SIZE + CELL_SIZE/2;
    const y = bonusFruit.y * CELL_SIZE + CELL_SIZE/2;


    ctx.fillStyle = bonusFruit.color;
    if (bonusFruit.name === 'saxophone') {
        // Draw saxophone shape
        ctx.fillRect(x - 8, y - 4, 16, 8);
        ctx.fillRect(x + 8, y - 2, 4, 4);
    } else {
        // Draw fruit as circle
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}

function getBackgroundColors() {
    const colors = [
        { bg: '#062a0f', accent: '#0f5a1f' }, // Dark forest
        { bg: '#1a0d4d', accent: '#3d1a7a' }, // Deep purple
        { bg: '#4d0d1a', accent: '#7a1a3d' }, // Dark red
        { bg: '#0d1a4d', accent: '#1a3d7a' }, // Deep blue
        { bg: '#4d4d0d', accent: '#7a7a1a' }, // Dark yellow
        { bg: '#4d1a0d', accent: '#7a3d1a' }, // Dark orange
        { bg: '#0d4d4d', accent: '#1a7a7a' }, // Dark teal
        { bg: '#2d0d4d', accent: '#5a1a7a' }  // Dark violet
    ];
    return colors[(round - 1) % colors.length];
}

function drawLevelArtwork() {
    const levelType = (round - 1) % 8;





    switch(levelType) {
        case 0: // Cyberpunk 2077
            // Neon skyscrapers
            const buildings = [
                {x: 50, width: 40, height: 200, color: '#1a1a2e'},
                {x: 120, width: 60, height: 250, color: '#16213e'},
                {x: 200, width: 35, height: 180, color: '#0f3460'},
                {x: 260, width: 50, height: 220, color: '#1a1a2e'},
                {x: 340, width: 45, height: 190, color: '#16213e'},
                {x: 410, width: 55, height: 240, color: '#0f3460'},
                {x: 490, width: 40, height: 200, color: '#1a1a2e'},
                {x: 550, width: 35, height: 170, color: '#16213e'}
            ];





            buildings.forEach((building, i) => {
                // Building base
                ctx.fillStyle = building.color;
                ctx.fillRect(building.x, 600 - building.height, building.width, building.height);





                // Animated neon windows
                const windowRows = Math.floor(building.height / 25);
                for (let row = 0; row < windowRows; row++) {
                    for (let col = 0; col < Math.floor(building.width / 12); col++) {
                        const windowX = building.x + col * 12 + 3;
                        const windowY = 600 - building.height + row * 25 + 5;





                        // Flickering effect
                        const flicker = Math.sin(animationFrame * 0.1 + i + row + col) > 0.3;
                        if (flicker) {
                            const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'];
                            ctx.fillStyle = colors[(i + row + col) % colors.length];
                            ctx.fillRect(windowX, windowY, 6, 8);
                        }
                    }
                }





                // Neon building outlines
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.7;
                ctx.strokeRect(building.x, 600 - building.height, building.width, building.height);
                ctx.globalAlpha = 1;
            });





            // Flying cars/drones
            for (let i = 0; i < 3; i++) {
                const carX = (animationFrame * 2 + i * 200) % 700 - 50;
                const carY = 300 + Math.sin(animationFrame * 0.02 + i) * 20;


                ctx.fillStyle = '#ff0080';
                ctx.fillRect(carX, carY, 20, 8);



                ctx.fillStyle = '#ff0080';
                ctx.fillRect(carX, carY, 20, 8);


                // Light trail
                ctx.fillStyle = 'rgba(255, 0, 128, 0.3)';
                ctx.fillRect(carX - 30, carY + 2, 30, 4);
            }





            // Holographic advertisements
            const ads = [
                {x: 100, y: 350, text: 'NEON', color: '#00ffff'},
                {x: 300, y: 320, text: 'CYBER', color: '#ff00ff'},
                {x: 500, y: 380, text: '2077', color: '#ffff00'}
            ];





            ads.forEach((ad, i) => {
                const pulse = Math.sin(animationFrame * 0.05 + i) * 0.3 + 0.7;
                ctx.fillStyle = ad.color;
                ctx.globalAlpha = pulse;
                ctx.font = '16px Arial';
                ctx.fillText(ad.text, ad.x, ad.y);
                ctx.globalAlpha = 1;
            });





            // Digital rain effect
            for (let i = 0; i < 15; i++) {
                const rainX = (i * 40 + animationFrame * 0.5) % 600;
                const rainY = (animationFrame * 3 + i * 50) % 600;





                ctx.fillStyle = 'rgba(0, 255, 0, 0.6)';
                ctx.font = '12px monospace';
                ctx.fillText(String.fromCharCode(65 + Math.floor(Math.random() * 26)), rainX, rainY);
            }
            break;





        case 1: // Purple mystical
            // Floating crystals
            for (let i = 0; i < 6; i++) {
                const x = i * 100 + 50;
                const y = 400 + Math.sin(animationFrame * 0.02 + i) * 30;
                ctx.fillStyle = '#8a2be2';
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(animationFrame * 0.01);
                ctx.fillRect(-15, -15, 30, 30);
                ctx.restore();
            }
            break;





        case 2: // Red volcanic
            // Lava bubbles
            for (let i = 0; i < 10; i++) {
                const x = i * 60 + 30;
                const size = 20 + Math.sin(animationFrame * 0.03 + i) * 10;
                ctx.fillStyle = '#ff4500';
                ctx.beginPath();
                ctx.arc(x, 550, size, 0, Math.PI * 2);
                ctx.fill();
            }
            break;





        case 3: // Blue ocean
            // Waves
            ctx.fillStyle = '#4682b4';
            ctx.beginPath();
            ctx.moveTo(0, 500);
            for (let x = 0; x <= 600; x += 20) {
                const y = 500 + Math.sin((x + animationFrame * 2) * 0.02) * 20;
                ctx.lineTo(x, y);
            }
            ctx.lineTo(600, 600);
            ctx.lineTo(0, 600);
            ctx.fill();
            break;





        case 4: // Desert
            // Sand dunes
            ctx.fillStyle = '#daa520';
            ctx.beginPath();
            ctx.moveTo(0, 450);
            ctx.quadraticCurveTo(150, 400, 300, 450);
            ctx.quadraticCurveTo(450, 500, 600, 450);
            ctx.lineTo(600, 600);
            ctx.lineTo(0, 600);
            ctx.fill();
            break;





        case 5: // Orange sunset
            // Sun
            ctx.fillStyle = '#ff6347';
            ctx.beginPath();
            ctx.arc(500, 350, 50, 0, Math.PI * 2);
            ctx.fill();
            // Clouds
            for (let i = 0; i < 4; i++) {
                const x = i * 150 + 50;
                ctx.fillStyle = '#ffa500';
                ctx.beginPath();
                ctx.arc(x, 300, 30, 0, Math.PI * 2);
                ctx.fill();
            }
            break;





        case 6: // Teal underwater
            // Seaweed
            for (let i = 0; i < 8; i++) {
                const x = i * 75 + 40;
                const sway = Math.sin(animationFrame * 0.02 + i) * 10;
                ctx.fillStyle = '#20b2aa';
                ctx.fillRect(x + sway, 400, 8, 200);
            }
            break;





        case 7: // Violet cosmic
            // Planets
            for (let i = 0; i < 3; i++) {
                const x = i * 200 + 100;
                const y = 350 + Math.sin(animationFrame * 0.01 + i) * 20;
                ctx.fillStyle = '#9370db';
                ctx.beginPath();
                ctx.arc(x, y, 40, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
    }
}

function drawAnimatedBackground() {
    animationFrame++;
    const bgColors = getBackgroundColors();





    // Base background with subtle pulse
    const pulse = Math.sin(animationFrame * 0.02) * 0.1 + 0.9;
    if (powerMode > 0 && Math.floor(animationFrame / 10) % 2 === 0) {
        ctx.fillStyle = `rgba(0, 17, 34, ${pulse})`; // Flashy power mode
    } else {
        const rgb = hexToRgb(bgColors.bg);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${pulse})`;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // Level-specific artwork
    drawLevelArtwork();



    // Level-specific artwork
    drawLevelArtwork();


    // Animated stars/particles
    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = -5;
            star.x = Math.random() * canvas.width;
        }





        star.brightness = Math.sin(animationFrame * 0.05 + star.x) * 0.5 + 0.5;
        const starColors = ['144, 238, 144', '186, 85, 211', '255, 69, 0', '70, 130, 180', '255, 215, 0', '255, 140, 0', '32, 178, 170', '147, 112, 219'];
        const starColor = starColors[(round - 1) % 8];
        ctx.fillStyle = `rgba(${starColor}, ${star.brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {r: 0, g: 0, b: 0};
}

function drawDeathScreen() {
    // Show death animation first, then countdown
    if (deathAnimation > 0) {
        // Death animation is handled in drawPacman
        return;
    }


    // Show countdown overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);



    // Show countdown overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = '#ff0000';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PACMAN DIED!', canvas.width/2, canvas.height/2 - 50);


    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';
    ctx.fillText(`Lives Remaining: ${lives}`, canvas.width/2, canvas.height/2);



    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';
    ctx.fillText(`Lives Remaining: ${lives}`, canvas.width/2, canvas.height/2);


    const countdown = Math.ceil(deathTimer / 60);
    ctx.fillStyle = '#ffff00';
    ctx.font = '36px Arial';
    ctx.fillText(countdown.toString(), canvas.width/2, canvas.height/2 + 80);
}

function gameLoop() {
    if (!gameRunning) return;


    // Draw animated background
    drawAnimatedBackground();



    // Draw animated background
    drawAnimatedBackground();


    // Handle death state
    if (gameState === 'dying' && lives > 0) {
        if (deathAnimation > 0) {
            deathAnimation--;
        } else {
            deathTimer--;
            if (deathTimer <= 0) {
                gameState = 'playing';
                pacman.x = 1;
                pacman.y = 1;
                // Reset ghosts to safe positions
                ghosts.forEach((ghost, i) => {
                    ghost.x = 9 + (i % 2);
                    ghost.y = 9 + Math.floor(i / 2);
                    ghost.scared = false;
                });
            }
        }
    }


    // Update game
    updatePacman();
    updateGhosts();



    // Update game
    updatePacman();
    updateGhosts();


    // Draw everything
    drawMaze();
    drawBonusFruit();
    if (gameState === 'playing') {
        drawPacman();
    }
    drawGhosts();





    // Draw death screen overlay
    if (gameState === 'dying') {
        drawDeathScreen();
    }





    requestAnimationFrame(gameLoop);
}

function checkGhostCollisions() {
    if (gameState !== 'playing') return;





    ghosts.forEach(ghost => {
        if (ghost.x === pacman.x && ghost.y === pacman.y) {
            if (powerMode > 0 && ghost.scared) {
                score += 200;
                sounds.ghost();
                setTimeout(() => sounds.ghostReturn(), 200);
                ghost.x = 9 + Math.floor(Math.random() * 2);
                ghost.y = 9 + Math.floor(Math.random() * 2);
                ghost.scared = false;
                updateScore();
            } else {
                lives--;
                sounds.death();
                livesElement.textContent = lives;
                gameState = 'dying';
                deathTimer = 180;
                deathAnimation = 60;
                if (lives <= 0) {
                    setTimeout(() => {
                        alert('Game Over! Final Score: ' + score);
                        location.reload();
                    }, 3000);
                }
            }
        }
    });
}

// Start game
gameLoop();
