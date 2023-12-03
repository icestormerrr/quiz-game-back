import express from "express";
import { generateQuestions } from "../utils/generateQuestions.js";

const router = express.Router();

router.get("/", (request, response) => {
  const numberOfQuestions = parseInt(request.query.number, 10);
  const mode = request.query.mode;
  const questions = generateQuestions(numberOfQuestions, mode);
  response.json(questions);
});

export default router;
