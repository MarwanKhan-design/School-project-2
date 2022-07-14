import React from "react";

const SubjectTable = ({ subjects }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
          {subjects &&
            subjects.map((subject) => (
              <tr key={subject._id}>
                <td>{subject.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectTable;
