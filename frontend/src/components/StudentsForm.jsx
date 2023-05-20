import React, { useState } from "react";
import { fetchCreateStudent } from "../services/student";

const StudentForm = ({ setStudents, grades }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    grade: "",
    section: "",
  });

  const renderInput = (name, label, type = "text") => {
    return (
      <div className="col-lg-6">
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <input
            name={name}
            id={name}
            type={type}
            className="form-control"
            autocomplete="off"
            value={formData[name]}
            onChange={(e) =>
              setFormData({ ...formData, [name]: e.target.value })
            }
          />
        </div>
      </div>
    );
  };

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
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
          value={formData[name]}
        >
          <option value="">Select {name}</option>
          {data &&
            data.map((d) => (
              <option value={d._id} key={d._id}>
                {d.name}
              </option>
            ))}
        </select>
      </div>
    );
  };

  const findGradeSections = (gradeId) => {
    const grade = grades.find((g) => g._id === gradeId);
    return grade.sections;
  };

  const createStudent = async (e) => {
    e.preventDefault();
    const student = await fetchCreateStudent(formData);
    setStudents((prevState) => [
      ...prevState,
      { ...student, _id: prevState.length + 1 },
    ]);
    setFormData({ name: "", email: "", address: "", grade: "", section: "" });
  };
  return (
    <form>
      <div className="row">
        {renderInput("name", "Name")}
        {renderInput("email", "Email")}
        {renderInput("address", "Address")}
        {renderSelect("grade", "Grade", grades)}
        {formData.grade !== "" &&
          renderSelect("section", "Section", findGradeSections(formData.grade))}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={createStudent}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
