import { subjectUri } from "../utilities/backend";
import axios from "axios";

export const fetchGetSubjects = async () => {
  const { data } = await axios.get(subjectUri);
  return data;
};

export const fetchCreateSubject = async (formData) => {
  const { data } = await axios.post(subjectUri, formData);
  return data;
};

export const fetchSingleSubject = async (id) => {
  const { data } = await axios.get(`${subjectUri}/${id}`);
  return data;
};
