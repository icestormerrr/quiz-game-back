import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import { generateQuestions } from "./utils/generateQuestions.js";

const port = 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/results", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Обработка подключения к MongoDB
db.on("error", console.error.bind(console, "Error connection MongoDB:"));
db.once("open", () => {
  console.log("Successful connection to MongoDB");
});

// Создание схемы и модели для данных
const resultSchema = new mongoose.Schema({
  date: Number,
  result: Number,
  time: Number,
});
const Result = mongoose.model("Result", resultSchema);

app.get("/questions", (request, response) => {
  const numberOfQuestions = parseInt(request.query.number, 10);
  const mode = request.query.mode;
  const questions = generateQuestions(numberOfQuestions, mode);

  response.json(questions);
});

app.get("/results", async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/results", async (req, res) => {
  const result = new Result({
    date: req.body.date,
    result: req.body.result,
    time: req.body.time,
  });
  try {
    const newResult = await result.save();
    res.status(201).json(newResult);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/results/:id", async (req, res) => {
  try {
    const result = await Result.findOne({ date: req.params.id });
    if (result) {
      await result.deleteOne({ date: req.params.id });
      res.json({ message: "Result successfully deleted" });
    } else {
      res.status(404).json({ message: "result is not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
