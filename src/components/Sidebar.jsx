// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-base-200 text-gray-900 p-4">
      <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
      
      <ul className="menu bg-base-200 rounded-box w-full space-y-2">
        {/* Dashboard Link */}
        <li>
          <Link to="/dashboard" className="menu-item">
            Dashboard
          </Link>
        </li>
        {/* SQL Changes Link */}
        <li>
          <Link to="/admin/sql-changes" className="menu-item">
            SQL Changes
          </Link>
        </li>
        {/* Projects Section */}
        <li>
          <details className="bg-base-100 rounded-md p-2">
            <summary className="cursor-pointer font-semibold">
              Projects
            </summary>
            <ul className="pl-4 space-y-1">
              <li>
                <details>
                  <summary className="cursor-pointer font-medium">
                    Project 1
                  </summary>
                  <ul className="pl-4 space-y-1">
                    <li><a href="#" className="menu-item">Table 1</a></li>
                    <li><a href="#" className="menu-item">Table 2</a></li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary className="cursor-pointer font-medium">
                    Project 2
                  </summary>
                  <ul className="pl-4 space-y-1 open">
                    <li><a href="#" className="menu-item">Table 1</a></li>
                    <li><a href="#" className="menu-item">Table 2</a></li>
                    <li><a href="#" className="menu-item">Table 3</a></li>
                    <li><a href="#" className="menu-item">Table 4</a></li>
                    <li><a href="#" className="menu-item">Table 5</a></li>
                    <li><a href="#" className="menu-item">Table 6</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
