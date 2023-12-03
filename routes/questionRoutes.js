import express from "express";
import { generateQuestions } from "../utils/generateQuestions.js";

const router = express.Router();

router.get("/", (request, response) => {
  try {
    const numberOfQuestions = parseInt(request.query.number, 10);
    const mode = request.query.mode;
    const questions = generateQuestions(numberOfQuestions, mode);
    response.json(questions);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

export default router;
