import React from "react";
import "../../../input.css";
import AdminAside from "./adminComp/adminAside";
import AdminUser from "./pagesInAdmin/AdminUser";
const AdminPage = () => {
  return (
    <div className="flex">
      <AdminAside />
      <AdminUser/>
    </div>
  );
};

export default AdminPage;
