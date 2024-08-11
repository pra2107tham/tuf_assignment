import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="bg-[#f2f2f2] drop-shadow-xl mb-6">
        <nav className="flex justify-between items-center py-6 px-12">
          <Link to="/" className="text-2xl font-extrabold tracking-wide text-gray-600 px-8 hover:text-black">
            FLASHCARD TOOL
          </Link>
          <Link
            to="/dashboard"
            className="btn btn-outline btn-neutral font-semibold transition-colors duration-200"
          >
            Admin Dashboard
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
