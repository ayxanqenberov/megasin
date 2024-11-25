import React, { useState } from "react";
import bgImg from "../../../images/bg-pict.png";
import { BsPostcardFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { RiNotificationFill } from "react-icons/ri";
import { MdWidgets } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { HiMiniUsers } from "react-icons/hi2";

const AdminAside = () => {
  const [home, setHome] = useState(true);
  const [posts, setPosts] = useState(false);
  const [comment, setComment] = useState(false);
  const [notificians, setNotificians] = useState(false);
  const [widget,setWidget] = useState(false)
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const getUser = () => {
    setPosts(!posts)
    navigate("/adminpage?user");
  };
  const getHome = () => {
    setHome(!home)
    // navigate("/admin/page");
  };
  const getPosts = () =>{
    navigate("/adminpage?posts")
    setPosts(!posts)
  }
  const getComments = ()=>{
    navigate("/adminpage?comments")
    setComment(!comment)
  }
  const getNotificians = () =>{
    navigate("/adminpage?notificians")
    setNotificians(!notificians)
  }
  const getWidget = () =>{
    navigate("/adminpage?widgets")
    setWidget(!widget)
  }
  return (
    <div
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }}
      className="dashboard flex justify-between h-[100vh] w-[20%]"
    >
      <ul className="flex flex-col text-black pr-3 justify-around w-[90%] pl-6 h-[500px]">
        <li onClick={getHome} className={"flex items-center gap-1 cursor-pointer border-b border-b-black hover:border-b-[#ED612A] hover:text-[#ED612A] duration-200 pb-2"}>
          <GoHomeFill className="text-[20px]" />
          <span className="text-[14px]">Home</span>
        </li>
        <li
          onClick={getUser}
          className="flex items-center gap-1 cursor-pointer border-b border-b-black hover:border-b-[#ED612A] hover:text-[#ED612A] duration-200 pb-2"
        >
          <HiMiniUsers className="text-[20px]" />
          <span className="text-[14px]">users</span>
        </li>
        <li onClick={getPosts} className="flex items-center gap-1 cursor-pointer border-b border-b-black hover:border-b-[#ED612A] hover:text-[#ED612A] duration-200 pb-2">
          <BsPostcardFill className="text-[20px]" />
          <span className="text-[14px]">posts</span>
        </li>
        <li onClick={getComments} className="flex items-center gap-1 cursor-pointer border-b border-b-black hover:border-b-[#ED612A] hover:text-[#ED612A] duration-200 pb-2">
          <FaCommentAlt className="text-[20px]" />
          <span className="text-[14px]">comments</span>
        </li>
        <li onClick={getNotificians} className="flex items-center gap-1 cursor-pointer border-b border-b-black hover:border-b-[#ED612A] hover:text-[#ED612A] duration-200 pb-2">
          <RiNotificationFill className="text-[20px]" />
          <span className="text-[14px]">notificians</span>
        </li>
        <li onClick={getWidget} className="flex items-center gap-1 cursor-pointer border-b border-b-black hover:border-b-[#ED612A] hover:text-[#ED612A] duration-200 pb-2">
          <MdWidgets className="text-[20px]" />
          <span className="text-[14px]">widgets</span>
        </li>
      </ul>
      <div className="line"></div>
    </div>
  );
};

export default AdminAside;
