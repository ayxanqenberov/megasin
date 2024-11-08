import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

const Header = () => {
  return (
    <header className="bg-white">
      <div className="headerpart border flex justify-between items-center pr-[19px]">
        <div className="headerLeft flex items-center justify-around w-[55%] h-[75px]">
          <a href="/">
            <img
              src="https://wp.honeti.net/megasin/wp-content/uploads/2023/06/cropped-cropped-megasin_blog_news-1.png"
              alt=""
            />
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
        <div className="headerRight w-[35%] flex items-center justify-around">
          <div className="searching w-1/2">
            <input
              className="border-b border-grey outline-none w-full py-2 "
              type="text"
              placeholder="Search..."
            />
          </div>
          <div className="features flex items-center gap-3">
            <FaUserAlt className="text-lg cursor-pointer hover:text-red-700 duration-200 " />
            <IoNotifications className="text-lg cursor-pointer hover:text-red-700 duration-200 " />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
