import React, { useState } from "react";
import { FiHome, FiBarChart2, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [showReportSubMenu, setShowReportSubMenu] = useState(false);

  return (
    <div className="fixed top-14 right-0 h-full w-48 bg-gray-800 z-10">
      <ul>
        <li className="p-4 hover:bg-gray-700 cursor-pointer text-[#47c8c3] font-[fangsong]">
          <Link to="/dashboard">
            <FiHome className="inline mr-2" />
            Dashboard
          </Link>
        </li>
        <hr />
        <li
          className="p-2 hover:bg-gray-700 cursor-pointer text-[#47c8c3] font-[fangsong] flex justify-between"
          onClick={() => setShowReportSubMenu(!showReportSubMenu)}
        >
          <div className="flex items-center">
            <FiBarChart2 className="inline mr-2" />
            <a href="#">Reports</a>
          </div>
          <FiChevronDown
            className={`inline mr-2 ${
              showReportSubMenu ? "transform rotate-180" : ""
            }`}
          />
        </li>
        {showReportSubMenu && (
          <ul className="ml-4">
            <li className="p-4 hover:bg-gray-700 cursor-pointer text-[#47c8c3] font-[fangsong]">
              <a href="#">Status Reports</a>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
