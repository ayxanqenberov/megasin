import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoBookSharp, IoNotifications } from "react-icons/io5";
import { MdDarkMode, MdHome, MdOutlineDarkMode } from "react-icons/md";
import { RiNewsLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store"; // Adjust the path as needed

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const userName = useSelector((state: RootState) => state.user.user?.username);
  const getChangeMode = () => {
    setDarkMode(!darkMode);
  };

  
  const getProfile = (): void => {
    const username = userName || '';
    navigate(username ? `/profile/${username}` : `/register`);
  };

  return (
    <header className="bg-white text-black">
      <div className="headerpart border-none flex justify-between items-center pr-[19px]">
        <div className="headerLeft flex items-center justify-around w-[55%] h-[75px]">
          <a className="text-2xl font-bold text-[#E91E63]" href="/">
            MEGASIN<span className="text-black">.</span>
          </a>
          <ul className="flex items-center justify-evenly w-[50%]">
            <li>
              <a
                href="/"
                className="flex flex-col items-center hover:text-red-700 duration-200"
              >
                <MdHome className="text-[25px]" />
                <span className="text-[13px]">Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex flex-col items-center hover:text-red-700 duration-200"
              >
                <IoBookSharp className="text-[25px]" />
                <span className="text-[13px]">Blogs</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex flex-col items-center hover:text-red-700 duration-200"
              >
                <RiNewsLine className="text-[25px]" />
                <span className="text-[13px]">News</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex flex-col items-center hover:text-red-700 duration-200"
              >
                <BsPencilSquare className="text-[25px]" />
                <span className="text-[13px]">Write</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="headerRight w-[40%] flex items-center justify-around">
          <button onClick={getChangeMode}>
            {darkMode ? <MdDarkMode /> : <MdOutlineDarkMode />}
          </button>
          <div className="searching w-1/2">
            <input
              className="border-b border-grey outline-none w-full py-2"
              type="text"
              placeholder="Search..."
            />
          </div>
          <div className="features flex items-center gap-3">
            <FaUserAlt
              onClick={getProfile}
              className="text-lg cursor-pointer hover:text-red-700 duration-200"
            />
            <IoNotifications className="text-lg cursor-pointer hover:text-red-700 duration-200" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
