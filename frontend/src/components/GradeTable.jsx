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
                    grade.subjects.map((subject) => <>{subject.name}, </>)}
                </td>
                <td>
                  {grade.sections &&
                    grade.sections.map((section) => <>{section.name}, </>)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeTable;
