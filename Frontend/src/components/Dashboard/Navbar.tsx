import React, { useState, useContext } from "react";
import userlogo from "../assets/user.png";
import sidebar from "../assets/sidebar.png";
import Logo from "../assets/logo4.png";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../LoginContext";

const Navbar = ({ toggleSidebar }: { toggleSidebar: any }) => {
  const [showSignout, setShowSignout] = useState(false);
  const { user } = useContext(LoginContext);
  const { user_id, user_name, user_email } = user;

  const navigate = useNavigate();

  const handleSignout = () => {
    navigate("/");
    setShowSignout(false);
  };

  return (
    <div>
      <nav className="bg-gray-800 p-2 flex justify-between items-center sticky z-10 pr-4">
        <div className="flex items-center gap-4 ">
          <Link to="/dashboard">
            <img src={Logo} alt="Logo" className="h-10 rounded-xl ml-2 " />
          </Link>
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
              <div className="absolute top-full right-0 mt-2 -mr-16 bg-gradient-to-b from-gray-800 bg-gray-400 text-gray-800 p-4 rounded-lg shadow-md font-[fangsong] w-72">
                <img src={userlogo} alt="User" className="h-16 w-16 rounded-full mx-auto mb-4" />
                <div className="flex justify-center items-center gap-2">
                  <h2 className="text-xl text-[#47c8c3] font-bold">{user_name}</h2>
                  <p className="text-xl text-[#47c8c3] font-bold">- {user_id}</p>
                </div>
                <p className="text-xl text-[#47c8c3] text-center mt-2">{user_email}</p>
                <button
                  className="w-full mt-4 bg-gray-500 font-semibold py-2 px-4 text-[#47c8c3] rounded"
                  onClick={handleSignout}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          <span className="text-[#47c8c3] font-semibold font-[fangsong]">
            {user.user_name}
          </span>
          <img
            src={sidebar}
            alt="sidebar"
            className="h-8 w-8 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;