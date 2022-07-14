import React, { useEffect, useState } from "react";
import GradeForm from "../components/GradeForm";
import GradeTable from "../components/GradeTable";
import { fetchGetGrades } from "../services/grade";
import { fetchGetSubjects } from "../services/subject";

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const getGrades = async () => {
    const g = await fetchGetGrades();
    setGrades(g);
  };
  const getSubjects = async () => {
    const g = await fetchGetSubjects();
    setSubjects(g);
  };

  useEffect(() => {
    if (grades.length === 0) getGrades();
    if (subjects.length === 0) getSubjects();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <GradeTable grades={grades} />
        </div>
        <div className="col-md-6">
          <GradeForm setGrades={setGrades} subjects={subjects} />
        </div>
      </div>
    </div>
  );
};

export default Grades;
