import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './assets/pages/Registeration/Register';
import Home from './assets/HomePage/Home';
import Profile from './assets/pages/Profile/Profile';
import Login from './assets/pages/Registeration/Login';
import NewPost from './assets/pages/NewPost/NewPost';
import BlogPage from './assets/pages/Blogs/BlogPage';
import Detail from './assets/pages/Detail/Detail';
import AdminLog from './assets/pages/adminPage/AdminLog';
import AdminPage from './assets/pages/adminPage/AdminPage';
import AdminUser from './assets/pages/adminPage/pagesInAdmin/AdminUser';
import AdminPosts from './assets/pages/adminPage/pagesInAdmin/AdminPosts';
import AdminCommen from './assets/pages/adminPage/pagesInAdmin/AdminCommen';
import AdminNotf from './assets/pages/adminPage/pagesInAdmin/AdminNotf';
import AdminHome from './assets/pages/adminPage/pagesInAdmin/AdminHome';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path=':username/new' element={<NewPost />} />
        <Route path='/blogs' element={<BlogPage />} />
        <Route path='/:username/detail' element={<Detail />} />
        <Route path='/admin' element={<AdminLog />} />
        <Route path='/admin/page' element={<AdminPage />} /> 
        <Route path='/admin/home' element={<AdminHome/>} />
        <Route path='/admin/user' element={<AdminUser/>}/>
        <Route path='/admin/posts' element={<AdminPosts/>} />
        <Route path='/admin/comments' element={<AdminCommen/>} />
        <Route path='/admin/notifications' element={<AdminNotf/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
