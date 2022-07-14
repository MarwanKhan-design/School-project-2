import express from "express";
import {
  createGrade,
  deleteGrade,
  getGrade,
  getGrades,
  updateGrade,
} from "../controllers/grades.js";

const router = express.Router();

router.get("/", getGrades);
router.get("/:id", getGrade);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrade);
router.post("/", createGrade);

export default router;
