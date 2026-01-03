let num1, num2, answer;
let topPos = 0;
let speed = 1;
let score = 0;
let fallInterval;

function setLevel() {
    let level = document.getElementById("level").value;
    if (level === "beginner") speed = 1;
    if (level === "pro") speed = 2;
    if (level === "expert") speed = 3;
    startGame();
}

function startGame() {
    score = 0;
    document.getElementById("score").innerText = score;
    generateQuestion();
}

function generateQuestion() {
    clearInterval(fallInterval);
    topPos = 0;

    let max = speed === 1 ? 20 : speed === 2 ? 50 : 100;
    num1 = Math.floor(Math.random() * max) + 1;
    num2 = Math.floor(Math.random() * num1);
    answer = num1 - num2;

    let q = document.getElementById("question");
    q.innerText = `${num1} − ${num2}`;
    q.style.top = "0px";

    fallInterval = setInterval(() => {
        topPos += speed;
        q.style.top = topPos + "px";

        if (topPos > 160) {
            gameOver();
        }
    }, 30);
}

function pressKey(num) {
    document.getElementById("answer").value += num;
}

function clearAnswer() {
    document.getElementById("answer").value = "";
}

function checkAnswer() {
    let user = Number(document.getElementById("answer").value);

    if (user === answer) {
        document.getElementById("correctSound").play();
        score++;
        document.getElementById("score").innerText = score;
        document.getElementById("answer").value = "";
        generateQuestion();
    } else {
        document.getElementById("wrongSound").play();
        clearAnswer();
    }
}

function gameOver() {
    clearInterval(fallInterval);
    document.getElementById("gameOverSound").play();
    alert("Game Over! Score: " + score);
    startGame();
}

setLevel();

