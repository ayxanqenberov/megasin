// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './assets/pages/Registeration/Register';
import Home from './assets/HomePage/Home';
import Profile from './assets/pages/Profile/Profile';
// import Header from './assets/Components/Header/Header';
import Login from './assets/pages/Registeration/Login';
import NewPost from './assets/pages/NewPost/NewPost';
import BlogPage from './assets/pages/Blogs/BlogPage';
import Detail from './assets/pages/Detail/Detail';
import AdminLog from './assets/pages/adminPage/AdminLog';
import AdminPage from './assets/pages/adminPage/AdminPage';
import AdminUser from './assets/pages/adminPage/pagesInAdmin/AdminUser';

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/profile/:username" element={<Profile />} />
        <Route path=':username/new' element={<NewPost/>}/>
        <Route path='/blogs' element={<BlogPage/>}/>
        <Route path='/:username/detail' element={<Detail />} /> 
        <Route path='/admin' element={<AdminLog/>}/>
        <Route path='/admin/page' element={<AdminPage/>} />
        <Route path='/admin/page?user' element={<AdminUser/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
