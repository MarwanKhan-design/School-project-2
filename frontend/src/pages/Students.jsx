import React, { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import { fetchGetGrades } from "../services/grade";
import { fetchGetStudents } from "../services/student";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);

  const getStudents = async () => {
    const s = await fetchGetStudents();
    setStudents(s);
  };
  const getGrades = async () => {
    const g = await fetchGetGrades();
    setGrades(g);
  };

  useEffect(() => {
    if (students.length < 1) getStudents();
    if (grades.length < 1) getGrades();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <StudentTable students={students} />
        </div>
        <div className="col-md-6">
          <StudentForm setStudents={setStudents} grades={grades} />
        </div>
      </div>
    </div>
  );
};

export default Students;
