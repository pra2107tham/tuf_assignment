import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";

const NotFoundPage = () => (
  <div className=" text-center ">
    <h1 className="text-8xl">404 - Not Found</h1>
    <p className="text-2xl">The page you are looking for does not exist.</p>
  </div>
);

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
