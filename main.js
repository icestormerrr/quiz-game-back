import express from 'express';
import cors from "cors";

import {generateQuestions} from "./utils/generateQuestions.js";

const app = express();
app.use(cors());

const port = 4000;

app.get('/questions', (request, response) => {
  const numberOfQuestions = parseInt(request.query.number, 10);
  const mode = request.query.mode;
  const questions = generateQuestions(numberOfQuestions, mode);

  response.json(questions);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


