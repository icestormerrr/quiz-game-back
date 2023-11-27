import { v4 as uuid } from "uuid"

import { gerVariantWithProbability, getRandomInt } from "./randomFunctions.js";

class ModeEnum {
  static Easy = "easy";
  static Medium = "medium";
  static Hard = "hard";
}

const bordersByMode = {
  [ModeEnum.Easy]: [1, 100],
  [ModeEnum.Medium]: [1000, 10000],
  [ModeEnum.Hard]: [100000, 1000000],
}

const previousModeByCurrent = {
  [ModeEnum.Easy]: ModeEnum.Easy,
  [ModeEnum.Medium]: ModeEnum.Easy,
  [ModeEnum.Hard]: ModeEnum.Medium,
}

export function generateQuestions(number, mode) {
  const questions = [];

  for (let i = 0; i < number; i++) {
    const currentQuestionMode = gerVariantWithProbability(mode, previousModeByCurrent[mode], 0.6);
    const [startNumber, endNumber] = bordersByMode[currentQuestionMode];
    const randQuestion = getRandomInt(startNumber, endNumber);
    const question = {
      id: uuid(),
      mode: currentQuestionMode,
      question: `Сколько будет ${randQuestion} + 1?`,
      variants: [`${randQuestion + 1}`, `${randQuestion + 2}`, `${randQuestion + 3}`, `${randQuestion + 4}`],
      answer: `${randQuestion + 1}`,
    };

    questions.push(question);
  }

  return questions;
}