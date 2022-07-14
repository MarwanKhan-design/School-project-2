import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Grades from "./pages/Grades";
import Students from "./pages/Students";
import Subjects from "./pages/Subjects";
import { fetchCreateStudent } from "./services/student";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/grades" element={<Grades />} />
      </Routes>
    </div>
  );
}

export default App;
