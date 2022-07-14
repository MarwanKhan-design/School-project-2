import React, { useState } from "react";
import { fetchCreateSubject } from "../services/subject";

const SubjectForm = ({ setSubjects }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

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

  const createSubject = async (e) => {
    e.preventDefault();
    const subject = await fetchCreateSubject(formData);
    setSubjects((prevState) => [
      ...prevState,
      { ...subject, _id: prevState.length + 1 },
    ]);
    setFormData({
      name: "",
    });
  };
  return (
    <form>
      <div className="row">
        {renderInput("name", "Name")}

        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={createSubject}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SubjectForm;
