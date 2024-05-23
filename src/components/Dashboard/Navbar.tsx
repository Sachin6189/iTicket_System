import React, { useState } from "react";
import userlogo from "../assets/user.png";
import sidebar from "../assets/sidebar.png";

const Navbar = () => {
  const [showSignout, setShowSignout] = useState(false);

  return (
    <div>
      <nav className="bg-gray-800 p-1 flex justify-between items-center sticky z-10 pr-4">
      <div className="flex items-center gap-4 ">
         
        </div>
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <img
              src={userlogo}
              alt="userLogo"
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={() => setShowSignout(!showSignout)}
            />
            {showSignout && (
              <button className="absolute top-12 left-0 bg-gray-800 text-[#47c8c3] font-semibold font-[fangsong] px-6 py-2 rounded shadow-md border-0 whitespace-nowrap">
                Log Out
              </button>
            )}
          </div>
          <span className="text-[#47c8c3] font-semibold font-[fangsong]"></span>
          <img src={sidebar} alt="sidebar" className="h-8 w-8 cursor-pointer" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
