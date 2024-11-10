import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [darkMode, setDarkMode] = useState(Boolean);
  const getChangeMode = () => {
    setDarkMode(!darkMode);
  };
  const navigate= useNavigate();
  const getProfile = () => {
    navigate("/profile");
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
              <a className="hover:text-red-700 duration-200 text-lg" href="">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-red-700 duration-200 text-lg" href="">
                Blogs
              </a>
            </li>
            <li>
              <a className="hover:text-red-700 duration-200 text-lg" href="">
                About
              </a>
            </li>
            <li>
              <a className="hover:text-red-700 duration-200 text-lg" href="">
                Write
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
              className="border-b border-grey outline-none w-full py-2 "
              type="text"
              placeholder="Search..."
            />
          </div>
          <div className="features flex items-center gap-3">
            <FaUserAlt
              onClick={getProfile}
              className="text-lg cursor-pointer hover:text-red-700 duration-200 "
            />
            <IoNotifications className="text-lg cursor-pointer hover:text-red-700 duration-200 " />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
