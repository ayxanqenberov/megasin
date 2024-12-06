import { Navigate, Route } from "react-router-dom";
import AdminHome from "../pagesInAdmin/AdminHome";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};
<Route
  path="/admin/home"
  element={
    <ProtectedRoute>
      <AdminHome />
    </ProtectedRoute>
  }
/>
