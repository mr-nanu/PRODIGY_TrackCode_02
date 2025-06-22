let startTime = 0;
let elapsed = 0;
let timerInterval = null;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
    const centiseconds = Math.floor((ms % 1000) / 10);
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return (
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + '.' +
        (centiseconds < 10 ? '0' : '') + centiseconds
    );
}

function updateDisplay() {
    display.textContent = formatTime(elapsed);
}

function start() {
    if (!running) {
        startTime = Date.now() - elapsed;
        timerInterval = setInterval(() => {
            elapsed = Date.now() - startTime;
            updateDisplay();
        }, 10);
        running = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function pause() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(timerInterval);
    running = false;
    elapsed = 0;
    updateDisplay();
    laps = [];
    renderLaps();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

function lap() {
    if (running) {
        laps.push(elapsed);
        renderLaps();
    }
}

function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lapTime, idx) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${idx + 1}: ${formatTime(lapTime)}`;
        lapsList.appendChild(li);
    });
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
