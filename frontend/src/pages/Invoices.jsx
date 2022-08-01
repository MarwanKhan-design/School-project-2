import React, { useEffect, useState } from "react";
import InvoiceTable from "../components/InvoiceTable";
import InvoiceForm from "../components/InvoiceForm";
import { fetchGetInvoices } from "../services/invoice";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  const getInvoices = async () => {
    const s = await fetchGetInvoices();
    setInvoices(s);
  };

  useEffect(() => {
    if (invoices.length === 0) getInvoices();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <InvoiceTable invoices={invoices} />
        </div>
        <div className="col-md-6">
          <InvoiceForm setInvoices={setInvoices} />
        </div>
      </div>
    </div>
  );
};

export default Invoices;
