import express from "express";
import Result from "../models/result.js";

export const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (result) {
      await result.deleteOne({ _id: req.params.id });
      res.json({ message: "Result successfully deleted" });
    } else {
      res.status(404).json({ message: "Result is not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
