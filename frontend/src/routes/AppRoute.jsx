import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CompanySignup from "../components/CompanySignup";
import CompanyLogin from "../components/CompanyLogin";
import Dashboard from "../components/Dashboard";

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Default route redirects to signup */}
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<CompanySignup />} />
      <Route path="/login" element={<CompanyLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

export default AppRoutes;
