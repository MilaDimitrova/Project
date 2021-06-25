const question = document.querySelector("#question");
console.log(question);
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Столицата на България е?",
    choice1: "Варна",
    choice2: "Бургас",
    choice3: "София",
    choice4: "Пловдив",
    answer: 3,
  },

  {
    question: "Кой е най-високият връх в България?",
    choice1: "Мусала",
    choice2: "Вихрен",
    choice3: "Кутело",
    choice4: "Ботев",
    answer: 1,
  },

  {
    question: "Кой е президент на България?",
    choice1: "Бойко Борисов",
    choice2: "Румен Радев",
    choice3: "Корнелия Нинова",
    choice4: "Слави Трифонов",
    answer: 2,
  },

  {
    question: "Колко е площта на България?",
    choice1: "236 хил.",
    choice2: "110 хил.",
    choice3: "50 хил",
    choice4: "300 хил.",
    answer: 2,
  },

  {
    question: "Коя е най-дългата река?",
    choice1: "Марица",
    choice2: "Волга",
    choice3: "Искър",
    choice4: "Дунав",
    answer: 4,
  },

  {
    question: "Коя година е създадена България?",
    choice1: "1018 г.",
    choice2: "2010 г.",
    choice3: "681 г.",
    choice4: "413 г.",
    answer: 3,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestions();
};

getNewQuestions = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("./end.html");
  }

  questionCounter++;
  progressText.innerText = `Въпрос ${questionCounter} от ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestions();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
