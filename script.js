/************ FIREBASE INIT ************/
const firebaseConfig = {
  apiKey: "AIzaSyDbEt8Ao254mBULrzxFesd5Mr0AjBrn5NI",
  authDomain: "subtraction-game-leaderboard.firebaseapp.com",
  projectId: "subtraction-game-leaderboard",
  storageBucket: "subtraction-game-leaderboard.firebasestorage.app",
  messagingSenderId: "54257847906",
  appId: "1:54257847906:web:189567408a681b8dc5cb3b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/************ GAME STATE ************/
let num1, num2, correctAnswer;
let topPos = 0;
let speed = 1;
let score = 0;
let fallInterval;

/************ LEVEL ************/
function setLevel() {
    const level = document.getElementById("level").value;
    speed = level === "beginner" ? 1 : level === "pro" ? 2 : 3;
    restartGame();
}

/************ GAME CONTROL ************/
function restartGame() {
    score = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("saveScoreSection").classList.add("hidden");
    document.getElementById("leaderboardSection").classList.add("hidden");
    generateQuestion();
}

function generateQuestion() {
    clearInterval(fallInterval);
    topPos = 0;
    document.getElementById("answer").value = "";

    const max = speed === 1 ? 20 : speed === 2 ? 50 : 100;
    num1 = Math.floor(Math.random() * max) + 1;
    num2 = Math.floor(Math.random() * num1);
    correctAnswer = num1 - num2;

    const q = document.getElementById("question");
    q.innerText = `${num1} − ${num2}`;
    q.style.top = "0px";

    fallInterval = setInterval(() => {
        topPos += speed;
        q.style.top = topPos + "px";
        if (topPos > 160) endGame();
    }, 30);
}

/************ INPUT ************/
function pressKey(n) {
    document.getElementById("answer").value += n;
}

function clearAnswer() {
    document.getElementById("answer").value = "";
}

function checkAnswer() {
    const userAnswer = Number(document.getElementById("answer").value);
    if (userAnswer === correctAnswer) {
        document.getElementById("correctSound").play();
        score++;
        document.getElementById("score").innerText = score;
        generateQuestion();
    } else {
        document.getElementById("wrongSound").play();
        clearAnswer();
    }
}

/************ GAME OVER ************/
function endGame() {
    clearInterval(fallInterval);
    document.getElementById("gameOverSound").play();
    document.getElementById("saveScoreSection").classList.remove("hidden");
}

/************ SAVE SCORE ************/
function saveScore() {
    const name = document.getElementById("playerName").value.trim();
    if (!name) {
        alert("Please enter your name");
        return;
    }

    db.collection("leaderboard").add({
        name: name,
        score: score,
        time: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById("saveScoreSection").classList.add("hidden");
    document.getElementById("leaderboardSection").classList.remove("hidden");
}

/************ LIVE LEADERBOARD ************/
db.collection("leaderboard")
  .orderBy("score", "desc")
  .limit(10)
  .onSnapshot(snapshot => {
      const list = document.getElementById("leaderboard");
      list.innerHTML = "";
      let rank = 1;
      snapshot.forEach(doc => {
          const d = doc.data();
          const li = document.createElement("li");
          li.innerText = `${rank}. ${d.name} — ${d.score}`;
          list.appendChild(li);
          rank++;
      });
  });

setLevel();
