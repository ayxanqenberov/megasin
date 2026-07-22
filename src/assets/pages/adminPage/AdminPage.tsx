import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAdmin, selectIsAdminAuthenticated } from "../../features/Admin/adminSlice";
import AdminUser from "./pagesInAdmin/AdminUser";
import AdminPosts from "./pagesInAdmin/AdminPosts";
import AdminNotf from "./pagesInAdmin/AdminNotf";
import AdminHome from "./pagesInAdmin/AdminHome";
import AdminLog from "./AdminLog";
import AdminWidget from "./pagesInAdmin/AdminNews";
import { AppDispatch } from "../../redux/app/store";

const AdminPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const isAuthenticated = useSelector(selectIsAdminAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token && !isAuthenticated) {
      dispatch(loginAdmin({ username: "", password: "" }));
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const renderPage = () => {
    switch (page) {
      case "user":
        return <AdminUser />;
      case "posts":
        return <AdminPosts />;
      case "notifications":
        return <AdminNotf />;
      case "home":
        return <AdminHome />;
      case "widgets":
        return <AdminWidget />;
      default:
        return <AdminLog />;
    }
  };

  return (
    <div className="flex">
      <div className="w-[80%] p-4">{renderPage()}</div>
    </div>
  );
};

export default AdminPage;