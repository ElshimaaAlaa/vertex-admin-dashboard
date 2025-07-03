// src/Auth/ProtectAuth/RedirectOnStartup.jsx
import { Navigate } from "react-router-dom";

const RedirectOnStartup = () => {
  const token = localStorage.getItem("admin token");
  return token ? (
    <Navigate to="/Dashboard/Home" replace />
  ) : (
    <Navigate to="/" replace />
  );
};

export default RedirectOnStartup;
