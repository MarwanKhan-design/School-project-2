import React from "react";

const StudentTable = ({ students }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Address</td>
            <td>Grade</td>
            <td>Fee Left</td>
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
  const totalInvoice = () => {
    let total = 0;
    student.invoices.map((invoice) => {
      total += invoice.amount;
    });
    return total;
  };
  const totalFeePaid = () => {
    let total = 0;
    student.feePaid.map((fee) => {
      total += fee.amount;
    });
    return total;
  };
  return (
    <tr key={student._id}>
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td>{student.address}</td>
      <td>{student.grade.name}</td>
      <td>{totalInvoice() - totalFeePaid()}</td>
    </tr>
  );
};

export default StudentTable;
