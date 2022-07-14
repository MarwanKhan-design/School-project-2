import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import subjectRoutes from "./routes/subjects.js";
import gradeRoutes from "./routes/grades.js";
import studentRoutes from "./routes/students.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/subjects", subjectRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/students", studentRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/school-project", () =>
  console.log("Connected to db")
);

app.listen(port, () => console.log(`Listening on port ${port}`));
