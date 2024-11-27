import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminAside from './adminComp/adminAside';
import AdminUser from './pagesInAdmin/AdminUser';
import AdminPosts from './pagesInAdmin/AdminPosts';
import AdminCommen from './pagesInAdmin/AdminCommen';
import AdminNotf from './pagesInAdmin/AdminNotf';
import AdminHome from './pagesInAdmin/AdminHome';

const AdminPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page'); 
  const renderPage = () => {
    switch (page) {
      case 'user':
        return <AdminUser />;
      case 'posts':
        return <AdminPosts />;
      case 'comments':
        return <AdminCommen />;
      case 'notifications':
        return <AdminNotf />;
      case 'home':
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="flex">
      <div className="w-[80%] p-4">
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminPage;
