import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { fetchGetGrades } from "../services/grade";
import { fetchGetStudents, fetchSearchStudent } from "../services/student";
import months from "../utilities/months";

const PaySlip = () => {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [formData, setFormData] = useState({
    searchQuery: "",
    grade: "",
    section: "",
  });

  const searchStudents = async (e) => {
    e.preventDefault();
    console.log("searched");
    const students = await fetchSearchStudent(formData);
    setStudents(students);
  };

  const getStudents = async () => {
    setStudents(await fetchGetStudents());
  };
  const getGrades = async () => {
    const grades = await fetchGetGrades();
    setGrades(grades);
  };

  useEffect(() => {
    const grade = grades.find((g) => g._id === formData.grade);
    if (grade) {
      setSelectedGrade(grade);
    }
  }, [formData.grade]);

  useEffect(() => {
    getStudents();
    getGrades();
  }, []);

  const getFeePaidByMonth = (student, month) => {
    let total = 0;
    student.feePaid.forEach((fee) => {
      const feeMonth = fee.when.split(" ");
      if (feeMonth[0] === month) {
        total += fee.amount;
      }
    });
    return total;
  };
  const renderInput = (label, name, type = "text") => {
    return (
      <div className="col-md-4">
        <div className="form-floating mb-3 mt-3">
          <input
            type={type}
            className="form-control"
            name={name}
            id={name}
            placeholder={label}
            onChange={(e) =>
              setFormData({ ...formData, [name]: e.target.value })
            }
          />
          <label htmlFor="floatingLabel">{label}</label>
        </div>
      </div>
    );
  };

  const renderSelect = (label, name, data) => {
    return (
      <div className="col-md-4">
        <div className="mb-3">
          <label htmlFor={name} className="form-label">
            {label}
          </label>
          <select
            className="form-control"
            name={name}
            id={name}
            onChange={(e) =>
              setFormData({ ...formData, [name]: e.target.value })
            }
          >
            <option value="">Select a {label}</option>
            {data.map((d) => (
              <option value={d._id} key={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="container">
        <div className="row">
          {renderInput("Search", "searchQuery")}
          {renderSelect("Grade", "grade", grades)}
          {selectedGrade.sections &&
            renderSelect("Section", "section", selectedGrade.sections)}
        </div>
        <div className="row">
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => searchStudents(e)}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {students.map((student) => (
        <Fragment key={student._id}>
          {StudentGeneral(student)}
          {StudentMonthsPay(getFeePaidByMonth, student)}

          <br />
          <hr />
          <br />
        </Fragment>
      ))}
    </div>
  );
};

export default PaySlip;

function StudentMonthsPay(getFeePaidByMonth, student) {
  return (
    <table className="table table-striped table-inverse table-responsive">
      <thead className="thead-inverse">
        <tr>
          {months.map((month) => (
            <th key={month.name}>{month.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {months.map((month) => (
            <td key={month.name}>{getFeePaidByMonth(student, month.name)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

function StudentGeneral(student) {
  return (
    <>
      .
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row">{student.name}</td>
            <td>{student.email}</td>
            <td>{student.address}</td>
            <td>{student.grade.name}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
