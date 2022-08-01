import React, { useState } from "react";
import { useEffect } from "react";
import { fetchCreateInvoice } from "../services/invoice";
import months from "../utilities/months";

const InvoiceForm = ({ setInvoices }) => {
  const [formData, setFormData] = useState({
    when: "",
    amount: 0,
  });

  const [monthAndDate, setMonthAndDate] = useState({
    month: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    setFormData({
      ...formData,
      when: `${monthAndDate.month} ${monthAndDate.year}`,
    });
  }, [monthAndDate]);

  const renderSelect = (name, label, data) => {
    return (
      <div className="col-lg-6">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <select
          className="form-control"
          name={name}
          id={name}
          onChange={(e) =>
            setMonthAndDate({ ...monthAndDate, [name]: e.target.value })
          }
          value={monthAndDate[name]}
        >
          <option value="">Select a {label}</option>
          {data &&
            data.map((d) => (
              <option value={d._id} key={d.name}>
                {d.name}
              </option>
            ))}
        </select>
      </div>
    );
  };

  const renderInput = (name, label, type = "text") => {
    return (
      <div className="col-lg-6">
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            className="form-control"
            value={formData[name]}
            onChange={(e) =>
              setFormData({ ...formData, [name]: e.target.value })
            }
          />
        </div>
      </div>
    );
  };

  const createInvoice = async (e) => {
    e.preventDefault();
    const invoice = await fetchCreateInvoice(formData);
    setInvoices((prevState) => [
      ...prevState,
      { ...invoice, _id: prevState.length + 1 },
    ]);
    setFormData({
      name: "",
    });
  };
  return (
    <form>
      <div className="row">
        {renderSelect("month", "Month", months)}

        {renderInput("amount", "Amount", "number")}

        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={createInvoice}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
