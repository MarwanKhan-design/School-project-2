import mongoose from "mongoose";

const Subject = mongoose.model(
  "Subject",
  new mongoose.Schema(
    {
      name: { type: String },
    },
    { versionKey: false }
  )
);

export default Subject;
