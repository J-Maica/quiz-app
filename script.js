import { questions } from "./questionBank.js"

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answerBtns");
const nextBtn = document.getElementById("nextBtn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // choices
    currentQuestion.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerText = answer.option;
        btn.classList.add("btn", "border-dark", "w-100");
        answerBtns.appendChild(btn)

        if (answer.correct) {
            // add t of f
            btn.dataset.correct = answer.correct;
        }
        // button function
        btn.addEventListener("click", (e) => {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            //check all buttons if true
            if (isCorrect) {
                selectedBtn.style.backgroundColor = "#97d897";
                score++;
            }
            else {
                selectedBtn.style.backgroundColor = "#f09191";
            }

            //show right answer
            Array.from(answerBtns.children).forEach(button => {
                if (button.dataset.correct === "true") {
                    button.style.backgroundColor = "green";
                }
                button.disabled = true;
            });

            nextBtn.style.display = "block";
        })
    })
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        }
        else {
            showScore();
        }
    }
    else {
        startQuiz()
    }
})

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} / ${questions.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}


// remove all previous choices
function resetState() {
    nextBtn.style.display = "none";
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild)
    }
}

startQuiz() 
