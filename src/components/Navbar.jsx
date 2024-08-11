import React from "react";

import { Link, Routes, Route } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className=" bg-[#F2F2F2] ">
        <nav className="flex justify-between items-center py-6  px-4">
          <Link to="/" className="text-xl font-bold px-8">
            FLASHCARD TOOL
          </Link>
          <Link to="/dashboard" className="btn btn-outline btn-neutral">
            Admin Dashboard
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
