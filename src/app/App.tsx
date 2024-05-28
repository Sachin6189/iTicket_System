import React from "react";
import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RaiseTicket from "../components/Dashboard/RaiseTicket";
import { LoginProvider } from "../LoginContext";
import ProtectedRoute from '../ProtectedRoute'; 

const App = () => {
  return (
    <Router>
      <LoginProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/raiseTicket" element={<ProtectedRoute><RaiseTicket /></ProtectedRoute>} />
        </Routes>
      </LoginProvider>
    </Router>
  );
};
export default App;