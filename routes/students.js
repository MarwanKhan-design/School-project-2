import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  payStudentFee,
  searchStudents,
  updateStudent,
} from "../controllers/students.js";

const router = express.Router();

router.get("/", getStudents);
router.post("/search", searchStudents);
router.post("/pay/fee/:id", payStudentFee);
router.get("/:id", getStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/", createStudent);

export default router;
