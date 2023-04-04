const quizData = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    a: "<script>",
    b: "<js>",
    c: "<javascript>",
    d: "<scripting>",
    correctAnswer: "a",
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    a: "the <body> section",
    b: "the <head> section",
    c: "both the <head> section and the <body> section are correct",
    d: "anywhere",
    correctAnswer: "c",
  },
  {
    question: "How do you create a function in JavaScript?",
    a: "function: myFunction()",
    b: "function myFunction()",
    c: "function = myFunction()",
    d: "myFunction() = function",
    correctAnswer: "b",
  },
  {
    question: "How do you call a function named 'myFunction'?",
    a: "myFunction()",
    b: "call function myFunction()",
    c: "call myFunction()",
    d: "call myFunction",
    correctAnswer: "a",
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    a: "let colors = (1:'red', 2:'green', 3:'blue')",
    b: "let colors = 'red', 'green', 'blue'",
    c: "let colors = {'red', 'green', 'blue'}",
    d: "let colors = ['red', 'green', 'blue']",
    correctAnswer: "d",
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    a: "top(x,y)",
    b: "ceil(x,y)",
    c: "Math.ceil(x,y)",
    d: "Math.max(x,y)",
    correctAnswer: "d",
  },
];

const answerEls = document.querySelectorAll(".answer");
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const btnSubmit = document.getElementById("btn_submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

btnSubmit.addEventListener("click", () => {
  const myAnswer = getSelected();

  console.log(myAnswer);

  if (myAnswer) {
    if (myAnswer === quizData[currentQuiz].correctAnswer) {
      score++;
    }
    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      //   alert("I wish you! Finished!");
      quiz.innerHTML = `
            <button class="btn-goback" type="button">
        <a href="../main-project/index.html">Go back</a>
      </button>
      <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
      <button type="button" onClick="window.location.reload()">
   start again
    </button>`;
    }
  }
});
