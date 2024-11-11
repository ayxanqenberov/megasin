// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './assets/pages/Registeration/Register';
import Home from './assets/HomePage/Home';
import Profile from './assets/pages/Profile/Profile';
// import Header from './assets/Components/Header/Header';
import Login from './assets/pages/Registeration/Login';

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
