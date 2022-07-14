import express from "express";
import {
  createSubject,
  deleteSubject,
  getSubject,
  getSubjects,
  updateSubject,
} from "../controllers/subjects.js";

const router = express.Router();

router.get("/", getSubjects);
router.get("/:id", getSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);
router.post("/", createSubject);

export default router;
