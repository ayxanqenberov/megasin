import React, { useEffect, useState } from 'react';
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
import AdminNotf from './assets/pages/adminPage/pagesInAdmin/AdminNotf';
import AdminHome from './assets/pages/adminPage/pagesInAdmin/AdminHome';
import NotFound from './assets/Components/NotFound/NotFound';
import Loading from './assets/Components/Loadings/Loading';
import Profiles from './assets/pages/OtherProfiles/Profiles';
import AdminNews from './assets/pages/adminPage/pagesInAdmin/AdminNews';
import News from './assets/pages/News/News';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-white">
        <Loading />
      </div>
    );
  }
  return (
    <BrowserRouter future={{ v7_startTransition: true , v7_relativeSplatPath: true }}>
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
        <Route path='/admin/notifications' element={<AdminNotf/>} />
        <Route path='/admin/news' element={<AdminNews/>}/>
        <Route path='/news' element={<News/>} />
        <Route path='/profiles/:username' element={<Profiles/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
