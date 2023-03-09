import { ObjectId } from "mongodb";
import Student from "../models/students.js";

export const getStudents = async (req, res) => {
  var students = await Student.find()
    .populate("grade", "-subjects -sections")
    .populate("invoices", "-_id");

  res.json(students);
};

export const getStudent = async (req, res) => {
  const student = await Student.findById(req.params.id)
    .populate("grade", "-subjects -sections")
    .populate("invoices", "-_id");
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

export const payStudentFee = async (req, res) => {
  const { when, amount } = req.body;
  const student = await Student.findById(req.params.id);
  student.feePaid = [...student.feePaid, { when, amount }];
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    student,
    { new: true }
  );
  res.json({ when, amount });
};

export const searchStudents = async (req, res) => {
  const { searchQuery, grade, section } = req.body;

  let students;

  if (searchQuery) {
    // students = await Student.find({
    //   $or: [
    //     { name: { $regex: searchQuery } },
    //     { email: { $regex: searchQuery } },
    //     { address: { $regex: searchQuery } },
    //   ],
    // })
    //   .sort("name")
    //   .populate("grade");
    students = await Student.find()
      .sort("name")
      .populate("grade")
      .populate("invoices");

    students = students.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else {
    students = await Student.find()
      .sort("name")
      .populate("grade")
      .populate("invoices");
  }
  if (grade) {
    students = students.filter(
      (s) => ObjectId(s.grade._id).valueOf() === grade
    );
  }
  if (section) {
    students = students.filter((s) => s.section === section);
  }

  res.json(students);
};
