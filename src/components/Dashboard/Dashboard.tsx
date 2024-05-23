import React from "react";
import AdminMain from "./AdminMain";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Navbar />
      <AdminMain />
      <Footer />
    </div>
  );
};

export default Dashboard;
