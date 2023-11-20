import express from 'express';
import cors from "cors";

const app = express();
app.use(cors());

const port = 4000;

app.get('/questions', (req, res) => {
  const numberOfQuestions = parseInt(req.query.number, 10);
  const mode = req.query.mode;
  const questions = generateQuestions(numberOfQuestions, mode);

  res.json(questions);
});

function generateQuestions(number, mode) {
  const questions = [];
  let startNumber;
  let endNumber;
  switch (mode) {
    case "easy":
      startNumber = 1;
      endNumber = 100;
      break;
    case "medium":
      startNumber = 1000;
      endNumber = 10000;
      break;
    case "hard":
      startNumber = 100000;
      endNumber = 1000000;
      break;
  }

  for (let i = 0; i < number; i++) {
    const randQuestion = getRandomInt(startNumber, endNumber);
    const question = {
      id: `question${i}`,
      mode: "easy",
      question: `Сколько будет ${randQuestion} + 1?`,
      variants: [`${randQuestion + 1}`, `${randQuestion + 2}`, `${randQuestion + 3}`, `${randQuestion + 4}`],
      answer: `${randQuestion + 1}`,
  };

    questions.push(question);
  }

  return questions;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


