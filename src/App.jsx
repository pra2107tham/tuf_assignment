import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
