import React from "react";
import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import RaiseTicket from "../components/Dashboard/RaiseTicket";

// import ProtectedRoute from "../ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard /> } />
      <Route path="/dashboard/raiseTicket" element={<RaiseTicket />} />
    </Routes>
  );
};
export default App;
