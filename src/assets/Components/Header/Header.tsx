import React, { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoBookSharp, IoNotifications } from "react-icons/io5";
import { MdDarkMode, MdHome, MdOutlineDarkMode } from "react-icons/md";
import { RiNewsLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import Search from "../Search/Search";
import { fetchNotifications } from "../../features/Notificians/notifcnsSlice";
import notfiSound from "../../pages/adminPage/adminComp/mixkit-correct-answer-tone-2870.wav"
const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const userName = useSelector((state: RootState) => state.user.user?.username);
  const getChangeMode = () => {
    setDarkMode(!darkMode);
  };
  const { user } = useSelector((state: RootState) => state.user);

  const username = userName || "";
  const getProfile = (): void => {
    navigate(username ? `/profile/${username}` : `/register`);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const notifications = useSelector(
    (state: any) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  useEffect(() => {
    if (notifications.length > 0) {
      const lastNotification = notifications[notifications.length - 1];
      const audio = new Audio(notfiSound);
      const playAudio = () => {
        audio.play().catch((err) => {
          console.error('Audio play error:', err);
        });
      };
      document.getElementById('notification-button')?.addEventListener('click', playAudio);
    }
  }, [notifications]);

  
  const getWritePost = () => {
    navigate(`/${username}/new`);
  };
  const getBlogs = () => {
    navigate(`/blogs`);
  };
  return (
    <header className="bg-white text-black">
      <div className="headerpart border-none flex justify-between items-center pr-[19px]">
        <div className="headerLeft flex items-center justify-around w-[55%] max-md:w-[25%] h-[75px]">
          <a className="text-2xl font-bold text-[#E91E63]" href="/">
            MEGASIN<span className="text-black">.</span>
          </a>
          <ul className="flex max-md:hidden items-center justify-evenly w-[50%]">
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
                href="/blogs"
                className="flex flex-col items-center hover:text-red-700 duration-200"
              >
                <IoBookSharp onClick={getBlogs} className="text-[25px]" />
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
                href=""
                className="flex flex-col items-center hover:text-red-700 duration-200"
              >
                <BsPencilSquare
                  onClick={user ? getWritePost : getProfile}
                  className="text-[25px]"
                />
                <span className="text-[13px]">Write</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="headerRight w-[40%]  flex items-center justify-around max-md:w-[60%] max-md:justify-between">
          <button onClick={getChangeMode}>
            {darkMode ? <MdDarkMode /> : <MdOutlineDarkMode />}
          </button>
          <Search />
          <div className="features flex items-center gap-3">
            <FaUserAlt
              onClick={getProfile}
              className="text-lg cursor-pointer hover:text-red-700 duration-200"
            />
            <div>
              <IoNotifications className="text-lg cursor-pointer hover:text-red-700 duration-200" onClick={toggleModal} />
            </div>

            {modalOpen && (
            <div className="absolute top-12 right-0 w-full sm:w-80 bg-white text-black rounded-lg shadow-lg p-4 z-50">
              <h2 className="text-xl font-bold mb-3">Notifications</h2>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.map((notif: any) => (
                  <li key={notif.id} className="border-b pb-2">
                    <strong>{notif.title}</strong>
                    <p className="text-sm text-gray-500">{notif.content}</p>
                  </li>
                ))}
              </ul>
              <button
                onClick={toggleModal}
                className="mt-3 text-pink-600 hover:text-pink-800"
              >
                Close
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
