import React, { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoBookSharp, IoNotifications } from "react-icons/io5";
import { MdDarkMode, MdHome, MdOutlineDarkMode } from "react-icons/md";
import { RiNewsLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/app/store";
import Search from "../Search/Search";
import { fetchNotifications } from "../../features/Notificians/notifcnsSlice";
import Menu from "../Menu/Menu";

interface NotificationItem {
  id: string | number;
  title: string;
  content: string;
}

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const getChangeMode = (): void => {
    setDarkMode(!darkMode);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const userName = useSelector((state: RootState) => state.user.user?.username);
  const { user } = useSelector((state: RootState) => state.user);

  const username = userName || "";

  const getProfile = (): void => {
    navigate(username ? `/profile/${username}` : `/register`);
    setMenuOpen(false);
  };
  const notifications = useSelector(
    (state: RootState) => state.notifications?.notifications || []
  ) as NotificationItem[];

  const toggleModal = (): void => {
    setModalOpen(!modalOpen);
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const getWritePost = (): void => {
    navigate(`/${username}/new`);
    setMenuOpen(false);
  };

  const getBlogs = (): void => {
    navigate(`/blogs`);
    setMenuOpen(false);
  };

  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path: string): string =>
    location.pathname === path ? "text-red-700" : "hover:text-red-700";

  return (
    <header className="bg-white text-black dark:bg-black dark:text-white relative">
      <div className="headerpart border-none flex justify-between items-center px-[19px] h-[75px]">
        <div className="headerLeft flex items-center justify-around w-[55%] max-md:w-[25%] h-[75px]">
          <a
            className="text-2xl max-[360px]:text-[19px] font-bold text-[#E91E63]"
            href="/"
          >
            MEGASIN<span className="text-black dark:text-white">.</span>
          </a>
          <ul className="flex max-md:hidden items-center justify-evenly w-[50%]">
            <li>
              <a
                href="/"
                className={`flex flex-col items-center duration-200 ${isActive("/")}`}
              >
                <MdHome className="text-[25px]" />
                <span className="text-[13px]">Home</span>
              </a>
            </li>
            <li>
              <button
                onClick={getBlogs}
                className={`flex flex-col items-center duration-200 ${isActive("/blogs")}`}
              >
                <IoBookSharp className="text-[25px]" />
                <span className="text-[13px]">Blogs</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/news")}
                className={`flex flex-col items-center duration-200 ${isActive("/news")}`}
              >
                <RiNewsLine className="text-[25px]" />
                <span className="text-[13px]">News</span>
              </button>
            </li>
            <li>
              <button
                className={`flex flex-col items-center duration-200 ${isActive(`/${username}/new`)}`}
                onClick={user ? getWritePost : getProfile}
              >
                <BsPencilSquare className="text-[25px]" />
                <span className="text-[13px]">Write</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="headerRight w-[40%] max-md:gap-5 flex items-center justify-around max-md:w-[60%] max-md:justify-between">
          <button onClick={getChangeMode} className="text-xl">
            {darkMode ? <MdDarkMode /> : <MdOutlineDarkMode />}
          </button>
          
          <Search />
          <div onClick={toggleMenu} className="min-[600px]:hidden cursor-pointer">
            <Menu />
          </div>
          <div className="features max-[600px]:hidden flex items-center gap-3">
            <FaUserAlt
              onClick={getProfile}
              className="text-lg cursor-pointer hover:text-red-700 duration-200"
            />
            <div className="relative">
              <IoNotifications
                className="text-lg cursor-pointer hover:text-red-700 duration-200"
                onClick={toggleModal}
              />
            </div>

            {modalOpen && (
              <div className="absolute dark:bg-zinc-900 dark:text-white top-12 right-4 w-80 bg-white text-black rounded-lg shadow-xl p-4 z-50 border dark:border-zinc-800">
                <h2 className="text-xl font-bold mb-3">Notifications</h2>
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((notif) => (
                    <li key={notif.id} className="border-b dark:border-zinc-800 pb-2">
                      <strong>{notif.title}</strong>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{notif.content}</p>
                    </li>
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-sm text-gray-500 py-2">No notifications</p>
                  )}
                </ul>
                <button
                  onClick={toggleModal}
                  className="mt-3 text-pink-600 hover:text-pink-800 text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="min-[600px]:hidden absolute top-[75px] left-0 w-full bg-white dark:bg-black border-t dark:border-zinc-800 shadow-lg z-40 transition-all duration-300">
          <ul className="flex flex-col p-4 space-y-4">
            <li>
              <a
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 p-2 rounded-md ${isActive("/")}`}
              >
                <MdHome className="text-[22px]" />
                <span className="text-base">Home</span>
              </a>
            </li>
            <li>
              <button
                onClick={getBlogs}
                className={`flex items-center gap-3 w-full text-left p-2 rounded-md ${isActive("/blogs")}`}
              >
                <IoBookSharp className="text-[22px]" />
                <span className="text-base">Blogs</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => { navigate("/news"); setMenuOpen(false); }}
                className={`flex items-center gap-3 w-full text-left p-2 rounded-md ${isActive("/news")}`}
              >
                <RiNewsLine className="text-[22px]" />
                <span className="text-base">News</span>
              </button>
            </li>
            <li>
              <button
                onClick={user ? getWritePost : getProfile}
                className={`flex items-center gap-3 w-full text-left p-2 rounded-md ${isActive(`/${username}/new`)}`}
              >
                <BsPencilSquare className="text-[22px]" />
                <span className="text-base">Write</span>
              </button>
            </li>
            <li className="border-t dark:border-zinc-800 pt-2 flex justify-between items-center px-2">
              <button
                onClick={getProfile}
                className="flex items-center gap-3 text-base font-medium"
              >
                <FaUserAlt className="text-[18px]" />
                <span>Profile</span>
              </button>
              
              <button onClick={toggleModal} className="relative p-2">
                <IoNotifications className="text-[22px]" />
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;