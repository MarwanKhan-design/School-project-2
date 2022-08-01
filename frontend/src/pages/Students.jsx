import React, { useEffect, useState } from "react";
import StudentsForm from "../components/StudentsForm";
import StudentsTable from "../components/StudentsTable";
import { fetchGetGrades } from "../services/grade";
import { fetchGetStudents, fetchSearchStudent } from "../services/student";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [formData, setFormData] = useState({
    searchQuery: "",
    grade: "",
    section: "",
  });
  const getStudents = async () => {
    const s = await fetchGetStudents();
    setStudents(s);
  };
  const getGrades = async () => {
    const g = await fetchGetGrades();
    setGrades(g);
  };
  const searchStudents = async (e) => {
    e.preventDefault();
    console.log("searched");
    const students = await fetchSearchStudent(formData);
    setStudents(students);
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

  useEffect(() => {
    if (students.length < 1) getStudents();
    if (grades.length < 1) getGrades();
  }, []);
  useEffect(() => {
    const grade = grades.find((g) => g._id === formData.grade);
    if (grade) {
      setSelectedGrade(grade);
    }
  }, [formData.grade]);
  return (
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
      <div className="row">
        <div className="col-md-6">
          <StudentsTable students={students} />
        </div>
        <div className="col-md-6">
          <StudentsForm setStudents={setStudents} grades={grades} />
        </div>
      </div>
    </div>
  );
};

export default Students;
