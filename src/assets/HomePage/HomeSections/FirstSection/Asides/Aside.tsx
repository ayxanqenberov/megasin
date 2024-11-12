import React from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../redux/app/store";
import { useSelector } from "react-redux";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import {
  FaDiscord,
  FaFacebookSquare,
  FaHeart,
  FaTelegram,
} from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { IoDiamondSharp } from "react-icons/io5";
import createdPost from "../../../../images/createPost.jpg";
import neon from "../../../../images/neon.png";
import tagModerator from "../../../../images/tagModerator.jpg";
import structor from "../../../../images/structure.jpg"

const Aside = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const getRegister = () => {
    navigate("/register?new-account");
  };
  const getLogin = () => {
    navigate("login");
  };
  return (
    <aside className="w-[18%] flex flex-col gap-4">
      <div
        className={
          user
            ? "hidden"
            : "usersInfo flex flex-col items-start bg-white gap-2 p-3 rounded-md"
        }
      >
        <p className="text-black font-bold text-xl">
          MEGASIN BLOG is a community of amazing users
        </p>
        <p className="text-gray-500">
          We're a place where coders share, stay up-to-date and grow their
          careers.
        </p>
        <button
          onClick={getRegister}
          className="w-full h-10 border-red-700 text-red-700 hover:bg-red-700 hover:text-white duration-200 border rounded-md"
        >
          Create account
        </button>
        <button
          onClick={getLogin}
          className="w-full hover:bg-red-500 h-10 hover:text-white duration-200 rounded-md"
        >
          Log in
        </button>
      </div>
      <div
        className={
          user
            ? "flex flex-col gap-1.5 bg-white px-4 py-2 rounded-md"
            : "hidden"
        }
      >
        <span className="pb-4 text-xl font-bold">Follow us</span>
        <div className="flex items-center gap-3 cursor-pointer text-lg hover:text-red-600 duration-100">
          <FaXTwitter />
          <a href="https://www.x.com/">Twitter</a>
        </div>
        <div className="flex items-center gap-3 cursor-pointer text-lg hover:text-red-600 duration-100">
          <FaFacebookSquare />
          <a href="https://www.facebook.com/">Facebook</a>
        </div>
        <div className="flex items-center gap-3 cursor-pointer text-lg hover:text-red-600 duration-100">
          <SiGithub />
          <a href="https://www.github.com/ayxanqenberov">Github</a>
        </div>
        <div className="flex items-center gap-3 cursor-pointer text-lg hover:text-red-600 duration-100">
          <FaSquareInstagram />
          <a href="https://www.instagram.com/">Instagram</a>
        </div>
        <div className="flex items-center gap-3 cursor-pointer text-lg hover:text-red-600 duration-100">
          <FaDiscord />
          <a href="https://www.discord.com/">Discord</a>
        </div>
        <div className="flex items-center gap-3 cursor-pointer text-lg hover:text-red-600 duration-100">
          <FaTelegram />
          <a href="https://www.telegram.com/">Telegram</a>
        </div>
      </div>
      <div className="bg-white flex flex-col gap-2 border-[4.5px] border-black rounded-md px-4 py-2">
        <div className="flex items-center gap-[6px]">
          <IoDiamondSharp className="text-blue-600 text-[14px]" />
          <span className="text-[14px] text-gray-400 font-medium">
            Megasin Diamond Sponsors
          </span>
        </div>
        <p className="text-black font-bold">
          Thank you to our Diamond Sponsor Neon
        </p>
        <a href="https://neon.tech/?ref=devto&bb=141126">
          <img className="rounded-md" src={neon} alt="" />
        </a>
        <span className="text-gray-500 font-[450] italic">
          Neon is the official database partner of MEGASIN
        </span>
        <span className="flex items-center gap-3 text-[16px]">
          Happy Coding <FaHeart className="text-red-600" />
        </span>
      </div>
      <div className="bg-white flex flex-col gap-2.5 rounded-md px-4 py-2">
        <span className="text-xl font-medium text-gray-400">Megasin</span>
        <img className="rounded-md" src={tagModerator} alt="" />
        <div className="flex flex-wrap">
          <strong>
            <a href="">Fill out this survey</a>
            and help us moderate our community by becoming a tag moderator here
            at MEGASIN.
          </strong>
        </div>
      </div>
      <div className={user ? "bg-white flex flex-col pb-3 gap-2.5 rounded-md px-4 py-2" : 'hidden'}>
      <span className="text-xl font-medium text-gray-400">Megasin</span>
      <strong className="text-xl text-[#404040]">Get Your Writing Debut Badge</strong>
        <p className="text-[15px]">Share your first MEGASIN post and join a vibrant community of tech enthusiasts!</p>
        <img className="rounded-md" src={createdPost} alt="" />
        <button className="border border-[#3B49DF] p-2 rounded-md duration-200 text-[#3B49DF] font-semibold hover:bg-blue-600 hover:text-white">Write Post</button>
      </div>
      <div className="bg-white flex flex-col gap-2.5 rounded-md px-4 py-2">
        <span className="text-xl font-medium text-gray-400">Megasin</span>
        <img className="rounded-md" src={structor} alt="" />
        <div className="flex flex-wrap">
          <span className="text-xl font-bold">
          It's time to change it up.
          </span>
          <p className="text-gray-500">You can change your feed and see more relevant posts by adding a rating to different tags on Megasin.</p>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
