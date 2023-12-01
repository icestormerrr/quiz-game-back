import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { generateQuestions } from "./utils/generateQuestions.js";

const app = express();
app.use(cors());
const jsonParser = bodyParser.json();

const port = 4000;
let results = [
  { date: 2144565, result: 2, time: 12 },
  { date: 5676878, result: 10, time: 30 },
  { date: 7634584, result: 6, time: 60 },
  { date: 9843593, result: 7, time: 45 },
];

app.get("/questions", (request, response) => {
  const numberOfQuestions = parseInt(request.query.number, 10);
  const mode = request.query.mode;
  const questions = generateQuestions(numberOfQuestions, mode);

  response.json(questions);
});

app.get("/results", (request, response) => {
  try {
    response.json(results);
  } catch (e) {
    response.status(400).json({ message: err.message });
  }
});

app.post("/results", jsonParser, async (request, response) => {
  try {
    results.push({
      date: request.body.date,
      result: request.body.result,
      time: request.body.time,
    });

    response.status(201).json(results);
  } catch (err) {
    response.status(400).json({ message: err.message });
  }
});

// app.put("/results/:id", async (request, response) => {
//   try {
//     const result = results.find((res) => res.date === request.params.id);
//     if (result) {
//       result.date = request.body.date;
//       result.result = request.body.result;
//       result.time = request.body.time;
//       response.json({ date: result.date, result: result.result, time: result.time });
//     } else {
//       response.status(404).json({ message: "Результат не найден" });
//     }
//   } catch (err) {
//     response.status(400).json({ message: err.message });
//   }
// });

app.delete("/results/:id", async (request, response) => {
  try {
    const targetId = parseInt(request.params.id, 10);
    const result = results.find((res) => res.date === targetId);

    if (result) {
      results = results.filter((res) => res.date !== targetId);
    } else {
      response.status(404).json({ message: "Результат не найден" });
    }
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
