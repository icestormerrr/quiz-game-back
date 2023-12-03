import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/results", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successful connection to MongoDB");
  } catch (error) {
    console.error("Error connection to MongoDB:", error);
  }
};
