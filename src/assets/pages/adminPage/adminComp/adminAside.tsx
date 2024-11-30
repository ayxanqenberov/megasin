import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import bgImg from '../../../images/bg-pict.png';
import { BsPostcardFill } from 'react-icons/bs';
import { RiNotificationFill } from 'react-icons/ri';
import { MdWidgets } from 'react-icons/md';
import { GoHomeFill } from 'react-icons/go';
import { HiMiniUsers } from 'react-icons/hi2';

const AdminAside = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover' }}
      className="dashboard flex justify-between h-[100vh] w-[20%]"
    >
      <ul className="flex flex-col text-black pr-3 justify-around w-[90%] pl-6 h-[500px]">
        <li
          onClick={() => navigate('/admin/home')}
          className={`flex items-center gap-1 cursor-pointer border-b pb-2 ${isActive('/admin/home') ? 'text-[#ED612A] border-b-[#ED612A]' : 'text-black border-b-black'}`}
        >
          <GoHomeFill className="text-[20px]" />
          <span className="text-[14px]">Home</span>
        </li>
        <li
          onClick={() => navigate('/admin/user')}
          className={`flex items-center gap-1 cursor-pointer border-b pb-2 ${isActive('/admin/user') ? 'text-[#ED612A] border-b-[#ED612A]' : 'text-black border-b-black'}`}
        >
          <HiMiniUsers className="text-[20px]" />
          <span className="text-[14px]">Users</span>
        </li>
        <li
          onClick={() => navigate('/admin/posts')}
          className={`flex items-center gap-1 cursor-pointer border-b pb-2 ${isActive('/admin/posts') ? 'text-[#ED612A] border-b-[#ED612A]' : 'text-black border-b-black'}`}
        >
          <BsPostcardFill className="text-[20px]" />
          <span className="text-[14px]">Posts</span>
        </li>
        <li
          onClick={() => navigate('/admin/notifications')}
          className={`flex items-center gap-1 cursor-pointer border-b pb-2 ${isActive('/admin/notifications') ? 'text-[#ED612A] border-b-[#ED612A]' : 'text-black border-b-black'}`}
        >
          <RiNotificationFill className="text-[20px]" />
          <span className="text-[14px]">Notifications</span>
        </li>
        <li
          onClick={() => navigate('/admin/widgets')}
          className={`flex items-center gap-1 cursor-pointer border-b pb-2 ${isActive('/admin/widgets') ? 'text-[#ED612A] border-b-[#ED612A]' : 'text-black border-b-black'}`}
        >
          <MdWidgets className="text-[20px]" />
          <span className="text-[14px]">Widgets</span>
        </li>
      </ul>
    </div>
  );
};

export default AdminAside;
