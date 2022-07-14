import Grade from "../models/grades.js";

export const getGrades = async (req, res) => {
  const grades = await Grade.find().populate("subjects");
  res.json(grades);
};

export const getGrade = async (req, res) => {
  const grade = await Grade.findById(req.params.id).populate("subjects");
  res.json(grade);
};

export const createGrade = async (req, res) => {
  const body = req.body;
  const grade = new Grade(body);
  grade.save();

  const populatedGrade = Grade.findById(grade._id).populate("subjects");
  res.json(populatedGrade);
};
export const updateGrade = async (req, res) => {
  const body = req.body;
  const grade = await Grade.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });
  res.json(grade);
};

export const deleteGrade = async (req, res) => {
  const grade = await Grade.findByIdAndRemove(req.params.id);
  res.json(grade);
};
