let num1, num2;
let score = 0;

function generateQuestion() {
    num1 = Math.floor(Math.random() * 20) + 1;
    num2 = Math.floor(Math.random() * num1);

    document.getElementById("num1").innerText = num1;
    document.getElementById("num2").innerText = num2;
    document.getElementById("answer").value = "";
    document.getElementById("message").innerText = "";
}

function checkAnswer() {
    let userAnswer = Number(document.getElementById("answer").value);
    let correctAnswer = num1 - num2;

    if (userAnswer === correctAnswer) {
        document.getElementById("message").innerText = "✅ Correct!";
        score++;
    } else {
        document.getElementById("message").innerText =
            "❌ Wrong! Answer was " + correctAnswer;
    }

    document.getElementById("score").innerText = score;
    setTimeout(generateQuestion, 1000);
}

generateQuestion();
