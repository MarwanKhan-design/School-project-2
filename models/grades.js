import mongoose from "mongoose";

const Grade = mongoose.model(
  "Grade",
  new mongoose.Schema(
    {
      name: { type: String },
      subjects: { type: Array, ref: "Subject" },
      sections: [
        new mongoose.Schema(
          { name: String },
          { _id: false, versionKey: false }
        ),
      ],
    },
    { versionKey: false }
  )
);

export default Grade;
