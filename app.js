import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { connectDb } from "./config/db.js";
import questionRoutes from "./routes/questionRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

connectDb();

app.use("/questions", questionRoutes);
app.use("/results", resultRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
