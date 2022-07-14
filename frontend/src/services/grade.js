import axios from "axios";
import { gradesUri } from "../utilities/backend";

export const fetchGetGrades = async () => {
  const { data } = await axios.get(gradesUri);
  return data;
};

export const fetchCreateGrade = async (formData) => {
  const { data } = await axios.post(gradesUri, formData);
  return data;
};

export const fetchSingleGrade = async (id) => {
  const { data } = await axios.get(`${gradesUri}/${id}`);
  return data;
};
