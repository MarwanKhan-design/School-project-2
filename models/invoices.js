import mongoose from "mongoose";

const Invoice = mongoose.model(
  "Invoice",
  new mongoose.Schema(
    {
      when: String,
      amount: Number,
    },
    { versionKey: false }
  )
);

export default Invoice;
