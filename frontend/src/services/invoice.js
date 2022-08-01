import axios from "axios";
import { invoicesUri } from "../utilities/backend";

export const fetchGetInvoices = async () => {
  const { data } = await axios.get(invoicesUri);
  return data;
};

export const fetchCreateInvoice = async (formData) => {
  const { data } = await axios.post(invoicesUri, formData);
  return data;
};

export const fetchSingleInvoice = async (id) => {
  const { data } = await axios.get(`${invoicesUri}/${id}`);
  return data;
};
