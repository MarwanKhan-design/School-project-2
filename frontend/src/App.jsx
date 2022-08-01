import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Grades from "./pages/Grades";
import Students from "./pages/Students";
import Subjects from "./pages/Subjects";
import Invoices from "./pages/Invoices";
import Student from "./pages/Student";
import PaySlip from "./pages/PaySlip";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/pay/slip" element={<PaySlip />} />
        <Route path="/student/:studentId" element={<Student />} />
      </Routes>
    </div>
  );
}

export default App;
