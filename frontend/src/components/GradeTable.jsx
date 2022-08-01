import React from "react";

const GradeTable = ({ grades }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Subjects</td>
            <td>Sections</td>
          </tr>
        </thead>
        <tbody>
          {grades &&
            grades.map((grade) => (
              <tr key={grade._id}>
                <td>{grade.name}</td>
                <td>
                  {grade.subjects &&
                    grade.subjects.map((subject) => (
                      <span key={subject.name}>{subject.name}, </span>
                    ))}
                </td>
                <td>
                  {grade.sections &&
                    grade.sections.map((section) => (
                      <span key={section.name}>{section.name}, </span>
                    ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeTable;
