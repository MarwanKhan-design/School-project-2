import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleStudent } from "../services/student";

const Student = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    address: "",
    section: "",
    invoices: [],
    feePaid: [],
    grade: { name: "" },
  });

  let { studentId } = useParams();

  const getStudent = async (id) => {
    const s = await fetchSingleStudent(id);
    setStudent(s);
  };

  useEffect(() => {
    console.log("********************** Student ***********************");
    getStudent(studentId);
  }, []);

  const listGroupItems = [
    { label: "Name", value: student.name },
    { label: "Email", value: student.email },
    { label: "Grade", value: student.grade.name },
    { label: "Address", value: student.address },
    { label: "Section", value: student.section },
  ];
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          {listGroupItems &&
            listGroupItems.map((item) => (
              <Fragment key={item.name}>{listGroup(item)}</Fragment>
            ))}
        </div>
        <div className="col-md-3"></div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6 ">
          {FeePaidAndInvoiceTable("Invoices", student.invoices)}
        </div>
        <div className="col-md-6">
          {FeePaidAndInvoiceTable("Fee Paid", student.feePaid)}
        </div>
      </div>
    </div>
  );
};

export default Student;
function FeePaidAndInvoiceTable(label, data) {
  return (
    <>
      <center className="mt-3 fs-3">{label}</center>
      <table className="table table-striped table-inverse table-responsive mt-3">
        <thead className="thead-inverse">
          <tr>
            <th>When</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((d, i) => (
              <tr key={i}>
                <td scope="row">{d.when}</td>
                <td>{d.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

function listGroup(item) {
  return (
    <ul class="list-group list-group-horizontal-sm">
      <li class="list-group-item w-100 list-group-item-light">
        {item.label && item.label}
      </li>
      <li class="list-group-item w-100 list-group-item-light">
        {item.value && item.value}
      </li>
    </ul>
  );
}
