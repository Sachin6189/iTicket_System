import React from "react";
import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RaiseTicket from "../components/Dashboard/RaiseTicket";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/dashboard/raiseTicket" element={<RaiseTicket />} />
      </Routes>
    </Router>
  );
};
export default App;
