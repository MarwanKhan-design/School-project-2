import express from "express";
import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  updateInvoice,
} from "../controllers/invoices.js";

const router = express.Router();

router.get("/", getInvoices);
router.get("/:id", getInvoice);
router.put("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);
router.post("/", createInvoice);

export default router;
