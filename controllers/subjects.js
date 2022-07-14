import Subject from "../models/subjects.js";

export const getSubjects = async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
};

export const getSubject = async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  res.json(subject);
};

export const createSubject = async (req, res) => {
  const { name } = req.body;
  const subject = new Subject({ name });
  subject.save();
  res.json(subject);
};
export const updateSubject = async (req, res) => {
  const body = req.body;
  const subject = await Subject.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });
  res.json(subject);
};

export const deleteSubject = async (req, res) => {
  const subject = await Subject.findByIdAndRemove(req.params.id);
  res.json(subject);
};
