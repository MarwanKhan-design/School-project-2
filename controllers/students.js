import Student from "../models/students.js";

export const getStudents = async (req, res) => {
  var students = await Student.find().populate("grade", "-subjects -sections");

  res.json(students);
};

export const getStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
};

export const createStudent = async (req, res) => {
  const body = req.body;
  const student = new Student(body);
  student.save();
  res.json(student);
};
export const updateStudent = async (req, res) => {
  const body = req.body;
  const student = await Student.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });
  res.json(student);
};

export const deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);
  res.json(student);
};
