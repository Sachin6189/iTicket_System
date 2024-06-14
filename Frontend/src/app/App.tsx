import React from "react";
import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import RaiseTicket from "../components/Dashboard/RaiseTicket";
import RaiseAccessRequest from "../components/Dashboard/RaiseAccessRequest"
import Timeline from "../components/Dashboard/timeline";
// import ApproverPopUp from "../components/Dashboard/ApproverPopUp";
// import ApprovalTable from "../components/Dashboard/ApprovalTable";

// import ProtectedRoute from "../ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard /> } />
      <Route path="/dashboard/raiseTicket" element={<RaiseTicket />} />
      <Route path="/dashboard/raiseAccess" element={<RaiseAccessRequest />} />
      {/* <Route path="/dashboard/approvalPending" element={<ApprovalTable />} /> */}
    </Routes>
  //  <Timeline />
  );
};
export default App;
