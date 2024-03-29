import React, { useState } from "react";
import { fetchCreateGrade } from "../services/grade";

const GradeForm = ({ setGrades, subjects }) => {
  const [formData, setFormData] = useState({
    name: "",
    subjects: [],
    sections: [{ name: "A" }],
  });
  const [formSection, setFormSection] = useState("");

  const renderInput = (name, label, type = "text") => {
    return (
      <div className="col-lg-6">
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            className="form-control"
            onChange={(e) =>
              setFormData({ ...formData, [name]: e.target.value })
            }
            value={formData[name]}
          />
        </div>
      </div>
    );
  };

  const onChangeCheckbox = (name, value) => {
    let data = formData[name];
    if (data.includes(value)) {
      const filtered = data.filter((d) => d !== value);
      setFormData({ ...formData, [name]: filtered });
    } else {
      data.push(value);
      setFormData({ ...formData, [name]: data });
    }
  };

  const renderCheckboxes = (name, label, data) => {
    return (
      <div className="card border-primary">
        <div className="card-body">
          <h4 className="card-title">{label}</h4>
          {data.map((d) => (
            <div className="form-check" key={d._id}>
              <input
                className="form-check-input"
                type="checkbox"
                value={d._id}
                id={d._id}
                checked={formData[name].includes(d._id)}
                onChange={(e) => onChangeCheckbox(name, e.target.value)}
              />
              <label className="form-check-label" htmlFor={d._id}>
                {d.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCreateSections = () => {
    return (
      <div className="row">
        <div className="col-md-10">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="section"
              id="section"
              value={formSection}
              onChange={(e) => setFormSection(e.target.value)}
            />
            <label htmlFor="floatingLabel">Section</label>
          </div>
        </div>
        <div className="col-md-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setFormSection("");
              setFormData({
                ...formData,
                sections: [...formData.sections, { name: formSection }],
              });
            }}
          >
            Create Section
          </button>
        </div>
      </div>
    );
  };

  const createGrade = async (e) => {
    e.preventDefault();
    const grade = await fetchCreateGrade(formData);
    console.log(grade);
    setGrades((prevState) => [...prevState, { ...grade }]);
    setFormData({ name: "", subjects: [], sections: [{ name: "A" }] });
  };
  return (
    <form>
      <div className="row mt-3">{renderInput("name", "Name")}</div>
      <div className="row mt-3">
        <div className="col-md-6">
          {renderCheckboxes("subjects", "Subjects", subjects)}
          <button
            type="submit"
            className="btn btn-primary mt-3"
            onClick={createGrade}
          >
            Submit
          </button>
        </div>
        <div className="col-md-6">
          {renderCreateSections()}{" "}
          {formData.sections.map((section) => (
            <p key={section.name}>
              {section.name} <br />
            </p>
          ))}
        </div>
      </div>
    </form>
  );
};

export default GradeForm;
