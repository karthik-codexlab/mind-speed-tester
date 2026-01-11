const menu = document.getElementById("menu");
const game = document.getElementById("game");

const target = document.getElementById("target");
const arena = document.getElementById("arena");

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const playerEl = document.getElementById("player");

let score = 0;
let time = 30;
let totalTime = 30;
let moveInterval, timerInterval;
let playerName = "";
let controlMode = "mouse";
let gameActive = false;

/* Attach once */
target.addEventListener("click", () => {
    if (gameActive && controlMode === "mouse") hit();
});

document.addEventListener("keydown", e => {
    if (gameActive && controlMode === "keyboard" && e.code === "Space") {
        hit();
    }
});

function randomMove() {
    const x = Math.random() * (arena.clientWidth - 36);
    const y = Math.random() * (arena.clientHeight - 36);
    target.style.left = x + "px";
    target.style.top = y + "px";
}

function startGame() {
    playerName = document.getElementById("playerName").value.trim();
    if (!playerName) return alert("Enter name");

    controlMode = document.getElementById("control").value;
    totalTime = parseInt(document.getElementById("gameTime").value);
    time = totalTime;

    menu.classList.add("hidden");
    game.classList.remove("hidden");

    score = 0;
    gameActive = true;

    scoreEl.textContent = score;
    timeEl.textContent = time;
    playerEl.textContent = "Player: " + playerName;

    randomMove();

    moveInterval = setInterval(randomMove, 1200);

    timerInterval = setInterval(() => {
        time--;
        timeEl.textContent = time;
        if (time === 0) endGame();
    }, 1000);
}

function hit() {
    score++;
    scoreEl.textContent = score;
    randomMove();
}

function endGame() {
    gameActive = false;
    clearInterval(moveInterval);
    clearInterval(timerInterval);
    alert("Final Score: " + score);
    location.reload();
}
