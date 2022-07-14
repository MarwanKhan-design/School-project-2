import mongoose from "mongoose";

const Student = mongoose.model(
  "Student",
  new mongoose.Schema(
    {
      name: { type: String },
      email: { type: String },
      address: { type: String },
      grade: { type: String, ref: "Grade" },
      section: { type: String },
      invoices: [
        new mongoose.Schema(
          { amount: Number, when: String },
          { _id: false, versionKey: false }
        ),
      ],
      feePaid: [
        new mongoose.Schema(
          { amount: Number, when: String },
          { _id: false, versionKey: false }
        ),
      ],
    },
    { versionKey: false }
  )
);

export default Student;
