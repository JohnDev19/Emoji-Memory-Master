// Sound effects
const sounds = {
    flip: new Audio('assets/flip.mp3'),
    match: new Audio('assets/match.mp3'),
    fail: new Audio('assets/fail.mp3'),
    victory: new Audio('assets/victory.mp3'),
    gameover: new Audio('assets/gameover.mp3'),
    background: new Audio('assets/background.mp3')
};

const emojis = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
    '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🦄', '🦋', '🐙', '🦑', '🦐', '🐠',
    '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🥭', '🍍',
    '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥕', '🌽', '🌶️', '🫑', '🥒', '🥬'
];

let cards = [];
let flipped = [];
let solved = [];
let level = 1;
let moves = 0;
let gameStarted = false;
let muted = false;
let timeLeft = 60;
let score = 0;
let highScore = 0;
let theme = 'nature';
let difficulty = 'normal';
let timer;

const gameBoard = document.getElementById('gameBoard');
const newGameBtn = document.getElementById('newGameBtn');
const muteBtn = document.getElementById('muteBtn');
const themeSelect = document.getElementById('themeSelect');
const difficultySelect = document.getElementById('difficultySelect');
const timeLeftSpan = document.getElementById('timeLeft');
const levelSpan = document.getElementById('level');
const scoreSpan = document.getElementById('score');
const highScoreSpan = document.getElementById('highScore');
const levelSlider = document.getElementById('levelSlider');

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function initializeGame() {
    const numberOfPairs = Math.min(4 + Math.floor(level / 2), 24);
    const selectedEmojis = shuffleArray(emojis).slice(0, numberOfPairs);
    cards = shuffleArray([...selectedEmojis, ...selectedEmojis]);
    flipped = [];
    solved = [];
    moves = 0;
    gameStarted = false;
    timeLeft = difficulty === 'easy' ? 90 : difficulty === 'normal' ? 60 : 45;
    score = 0;
    updateUI();
    renderCards();
    adjustGridSize();
}

function renderCards() {
    gameBoard.innerHTML = '';
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card bg-indigo-300 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300';
        card.innerHTML = `
            <div class="card-face card-front flex items-center justify-center text-3xl bg-indigo-400">?</div>
            <div class="card-face card-back bg-white flex items-center justify-center text-3xl">${emoji}</div>
        `;
        card.addEventListener('click', () => handleCardClick(index));
        gameBoard.appendChild(card);
    });
}

function handleCardClick(index) {
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
        playSound('background', true);
    }

    if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;

    playSound('flip');
    flipped.push(index);
    document.querySelectorAll('.card')[index].classList.add('flipped');

    if (flipped.length === 2) {
        moves++;
        const [firstIndex, secondIndex] = flipped;
        if (cards[firstIndex] === cards[secondIndex]) {
            solved.push(...flipped);
            score += 10;
            playSound('match');
            if (solved.length === cards.length) {
                handleLevelComplete();
            }
        } else {
            setTimeout(() => {
                document.querySelectorAll('.card')[firstIndex].classList.remove('flipped');
                document.querySelectorAll('.card')[secondIndex].classList.remove('flipped');
                score = Math.max(0, score - 5);
                playSound('fail');
            }, 1000);
        }
        flipped = [];
    }

    updateUI();
}

function handleLevelComplete() {
    const levelBonus = level * 20;
    const timeBonus = timeLeft * 2;
    score += levelBonus + timeBonus;
    highScore = Math.max(highScore, score);
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    playSound('victory');
    setTimeout(() => {
        level = Math.min(level + 1, 10);
        initializeGame();
    }, 2000);
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        updateUI();
        if (timeLeft === 0) {
            handleGameOver();
        }
    }, 1000);
}

function handleGameOver() {
    clearInterval(timer);
    gameStarted = false;
    playSound('gameover');
    alert(`Game Over! Your score: ${score}`);
}

function playSound(soundType, loop = false) {
    if (muted) return;
    const sound = sounds[soundType];
    if (sound) {
        sound.currentTime = 0;
        sound.loop = loop;
        sound.play().catch(error => console.error('Error playing sound:', error));
    }
}

function stopAllSounds() {
    Object.values(sounds).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
}

function updateUI() {
    timeLeftSpan.textContent = timeLeft;
    levelSpan.textContent = level;
    scoreSpan.textContent = score;
    highScoreSpan.textContent = highScore;
    levelSlider.value = level;
}

function setTheme(newTheme) {
    theme = newTheme;
    document.body.className = `min-h-screen flex items-center justify-center ${getBackgroundStyle()}`;
}

function getBackgroundStyle() {
    switch (theme) {
        case 'nature':
            return 'bg-gradient-to-r from-green-400 to-blue-500';
        case 'space':
            return 'bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900';
        case 'candy':
            return 'bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500';
        default:
            return 'bg-gradient-to-r from-gray-700 via-gray-900 to-black';
    }
}

function adjustGridSize() {
    const cardCount = cards.length;
    let cols;
    if (window.innerWidth < 640) {
        cols = 3;
    } else if (window.innerWidth < 1025) {
        cols = 4;
    } else {
        cols = 6;
    }
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
}

// Event Listeners
newGameBtn.addEventListener('click', initializeGame);
muteBtn.addEventListener('click', () => {
    muted = !muted;
    muteBtn.innerHTML = muted ? '<i class="bi bi-volume-mute-fill"></i>' : '<i class="bi bi-volume-up-fill"></i>';
    if (muted) {
        stopAllSounds();
    } else if (gameStarted) {
        playSound('background', true);
    }
});
themeSelect.addEventListener('change', (e) => setTheme(e.target.value));
difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value;
    initializeGame();
});
levelSlider.addEventListener('input', (e) => {
    level = parseInt(e.target.value);
    initializeGame();
});
window.addEventListener('resize', adjustGridSize);

initializeGame();