import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../features/Admin/adminSlice";
import AdminUser from "./pagesInAdmin/AdminUser";
import AdminPosts from "./pagesInAdmin/AdminPosts";
import AdminCommen from "./pagesInAdmin/AdminCommen";
import AdminNotf from "./pagesInAdmin/AdminNotf";
import AdminHome from "./pagesInAdmin/AdminHome";
import AdminLog from "./AdminLog";

const AdminPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const adminUser = useSelector((state) => state.admin.user);
  const dispatch = useDispatch();

  // Sayfa yüklendiğinde token kontrolü
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token && !adminUser) {
      // Token varsa kullanıcı bilgilerini yükle
      dispatch(loginAdmin({ token }));
    }
  }, [dispatch, adminUser]);

  if (!adminUser) {
    return <Navigate to="/admin" replace />;
  }

  const renderPage = () => {
    switch (page) {
      case "user":
        return <AdminUser />;
      case "posts":
        return <AdminPosts />;
      case "comments":
        return <AdminCommen />;
      case "notifications":
        return <AdminNotf />;
      case "home":
        return <AdminHome />;
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
