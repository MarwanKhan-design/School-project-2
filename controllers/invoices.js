import Invoice from "../models/invoices.js";
import Student from "../models/students.js";

export const getInvoices = async (req, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
};

export const getInvoice = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  res.json(invoice);
};

export const createInvoice = async (req, res) => {
  const { when, amount } = req.body;
  const students = await Student.find();
  const invoice = new Invoice({ when, amount });
  invoice.save();

  students.forEach(async (student) => {
    student.invoices = [...student.invoices, invoice._id];

    await Student.findByIdAndUpdate(student._id, student, { new: true });
  });

  res.json(invoice);
};
export const updateInvoice = async (req, res) => {
  const body = req.body;
  const invoice = await Invoice.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });
  res.json(invoice);
};

export const deleteInvoice = async (req, res) => {
  const invoice = await Invoice.findByIdAndRemove(req.params.id);
  res.json(invoice);
};
