import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  date: Number,
  result: Number,
  time: Number,
});

const Result = mongoose.model("Result", resultSchema);

export default Result;
