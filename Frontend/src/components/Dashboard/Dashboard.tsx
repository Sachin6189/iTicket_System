import React, {useState} from "react";
import AdminMain from "./AdminMain";
import Footer from "./Footer";
import Navbar from "./Navbar";
// import RaiseTicket from "./RaiseTicket";
import Sidebar from "./Sidebar";

const Dashboard: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);


const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };


  return (
    <div>
        <Navbar toggleSidebar={toggleSidebar} />
      {showSidebar && <Sidebar />}
        {/* <RaiseTicket /> */}
      {/* <Navbar /> */}
      <AdminMain />
      <Footer />
    </div>
  );
};

export default Dashboard;
