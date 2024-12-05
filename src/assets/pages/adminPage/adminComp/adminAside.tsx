import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import bgImg from '../../../images/bg-pict.png';
import { BsNewspaper, BsPostcardFill } from 'react-icons/bs';
import { RiNotificationFill } from 'react-icons/ri';
import { GoHomeFill } from 'react-icons/go';
import { HiMiniUsers } from 'react-icons/hi2';
import { IoMenu } from 'react-icons/io5';

const AdminAside = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded-md shadow-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <IoMenu className="text-2xl" />
      </button>
      <div
        style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover' }}
        className={`fixed top-0 left-0 h-full transition-transform duration-300 z-10 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:translate-x-0 lg:w-[20%] w-[75%] bg-white`}
      >
        <ul className="flex flex-col text-black pr-3 justify-around w-[90%] pl-6 h-[500px]">
          <li
            onClick={() => {
              navigate('/admin/home');
              setMenuOpen(false);
            }}
            className={`flex items-center gap-1 cursor-pointer border-b pb-2 ${
              isActive('/admin/home')
                ? 'text-[#ED612A] border-b-[#ED612A]'
                : 'text-black border-b-black'
            }`}
          >
            <GoHomeFill className="text-[20px]" />
            <span className="text-[14px]">Home</span>
          </li>
          <li
            onClick={() => {
              navigate('/admin/user');
              setMenuOpen(false);
            }}
            className={`flex items-center gap-1 cursor-pointer border-b pb-2 ${
              isActive('/admin/user')
                ? 'text-[#ED612A] border-b-[#ED612A]'
                : 'text-black border-b-black'
            }`}
          >
            <HiMiniUsers className="text-[20px]" />
            <span className="text-[14px]">Users</span>
          </li>
          <li
            onClick={() => {
              navigate('/admin/posts');
              setMenuOpen(false);
            }}
            className={`flex items-center gap-1 cursor-pointer border-b pb-2 ${
              isActive('/admin/posts')
                ? 'text-[#ED612A] border-b-[#ED612A]'
                : 'text-black border-b-black'
            }`}
          >
            <BsPostcardFill className="text-[20px]" />
            <span className="text-[14px]">Posts</span>
          </li>
          <li
            onClick={() => {
              navigate('/admin/notifications');
              setMenuOpen(false);
            }}
            className={`flex items-center gap-1 cursor-pointer border-b pb-2 ${
              isActive('/admin/notifications')
                ? 'text-[#ED612A] border-b-[#ED612A]'
                : 'text-black border-b-black'
            }`}
          >
            <RiNotificationFill className="text-[20px]" />
            <span className="text-[14px]">Notifications</span>
          </li>
          <li
            onClick={() => {
              navigate('/admin/news');
              setMenuOpen(false);
            }}
            className={`flex items-center gap-1 cursor-pointer border-b pb-2 ${
              isActive('/admin/news')
                ? 'text-[#ED612A] border-b-[#ED612A]'
                : 'text-black border-b-black'
            }`}
          >
            <BsNewspaper className="text-[20px]" />
            <span className="text-[14px]">News</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminAside;
