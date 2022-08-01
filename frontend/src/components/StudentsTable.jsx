import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchPayStudentFee } from "../services/student";
import months from "../utilities/months";

const StudentTable = ({ students }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Grade</td>
            <td>Fee Left</td>
            <td>Pay Fee</td>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((student) => (
              <StudentTableBody student={student} key={student._id} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

const StudentTableBody = ({ student }) => {
  const [student2, setStudent2] = useState({ ...student });
  const [feeAmount, setFeeAmount] = useState(0);

  const totalInvoice = () => {
    let total = 0;
    student2.invoices.map((invoice) => {
      total += invoice.amount;
    });
    return total;
  };
  const totalFeePaid = () => {
    let total = 0;
    student2.feePaid.map((fee) => {
      total += fee.amount;
    });
    return total;
  };

  const payFee = async () => {
    const newDate = new Date();
    const index = newDate.getMonth();
    const when = `${
      months[index].name
    } ${newDate.getDate()} ${newDate.getFullYear()}`;
    const { when: feePaidDate, amount } = await fetchPayStudentFee(
      student2._id,
      feeAmount,
      when
    );
    setStudent2({
      ...student2,
      feePaid: [
        ...student2.feePaid,
        { when: feePaidDate, amount: parseInt(amount) },
      ],
    });
    setFeeAmount(0);
  };
  return (
    <tr key={student2._id}>
      <td>
        <Link to={`/student/${student._id}`}>
          {student2.name && student2.name}
        </Link>{" "}
      </td>
      <td>{student2.grade.name}</td>
      <td>{totalInvoice() - totalFeePaid()}</td>
      <td>
        <div className="row">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              name="payFee"
              id="payFee"
              aria-describedby="helpId"
              placeholder="Amount"
              onChange={(e) => setFeeAmount(e.target.value)}
              value={feeAmount}
            />
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-primary" onClick={payFee}>
              Pay Fee
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default StudentTable;
