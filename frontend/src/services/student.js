import { studentUri } from "../utilities/backend";
import axios from "axios";

export const fetchGetStudents = async () => {
  const { data } = await axios.get(studentUri);
  return data;
};

export const fetchCreateStudent = async (formData) => {
  const { data } = await axios.post(studentUri, formData);
  return data;
};

export const fetchSingleStudent = async (id) => {
  const { data } = await axios.get(`${studentUri}/${id}`);
  return data;
};

export const fetchPayStudentFee = async (id, amount, when) => {
  const { data } = await axios.post(`${studentUri}/pay/fee/${id}`, {
    amount,
    when,
  });
  return data;
};

export const fetchSearchStudent = async (formData) => {
  const { data } = await axios.post(`${studentUri}/search`, formData);
  return data;
};
