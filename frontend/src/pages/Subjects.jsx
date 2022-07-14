import React, { useEffect, useState } from "react";
import SubjectTable from "../components/SubjectTable";
import SubjectForm from "../components/SubjectForm";
import { fetchGetSubjects } from "../services/subject";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);

  const getSubjects = async () => {
    const s = await fetchGetSubjects();
    setSubjects(s);
  };

  useEffect(() => {
    if (subjects.length === 0) getSubjects();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <SubjectTable subjects={subjects} />
        </div>
        <div className="col-md-6">
          <SubjectForm setSubjects={setSubjects} />
        </div>
      </div>
    </div>
  );
};

export default Subjects;
