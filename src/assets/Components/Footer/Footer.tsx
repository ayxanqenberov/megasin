import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/app/store";
import { FaDiscord, FaFacebookSquare, FaTelegram } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import "../../../input.css";

const Footer = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const getRegister = () => {
    navigate("/register?new-account");
  };
  const getLogin = () => {
    navigate("login");
  };
  const username = useSelector((state: RootState) => state.user.user?.username);

  const getWritePost = ()=>{
    navigate(`/${username}/new`)
  }
  return (
    <footer className="w-full bg-black text-white">
      <div>
        <div className="footerPart flex flex-wrap justify-between h-[200px] w-[90%] m-auto">
          <ul className="w-[25%] max-sm:w-1/2 flex flex-col text-[17.5px] justify-between h-[90%] gap-2 pt-4 items-center">
            <li>
              <a href="">Who we are</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <div className={user ? "hidden" : "flex w-2/3 flex-col gap-2"}>
              <button
                onClick={getRegister}
                className="w-full h-10 border-red-700 text-red-700 hover:bg-red-700 hover:text-white duration-200 border rounded-md"
              >
                Create account
              </button>
              <button
                onClick={getLogin}
                className="w-full h-10 hover:text-white border border-red-700 text-red-700 hover:bg-red-700 duration-200 rounded-md"
              >
                Log in
              </button>
            </div>
            <div className={user ? "flex" : "hidden"}>
              <button onClick={getWritePost} className="border  border-[#3B49DF] p-2 rounded-md duration-200 text-[#3B49DF] font-semibold hover:bg-blue-600 hover:text-white">
                Write Post
              </button>
            </div>
          </ul>
          <ul className="flex max-sm:hidden  justify-around text-2xl  h-[90%] gap-2  pt-4 flex-col items-center w-[25%]">
            <li className=" hover:text-red-600 socialFooter flex gap-3 items-center">
              <a className=" duration-200 text-white" href="">
                <FaFacebookSquare />
              </a>
              <a className="text-xl text-red-600 socialNamesFooter" href="">
                Facebook
              </a>
            </li>
            <li className=" hover:text-red-600 socialFooter flex gap-3 items-center">
              <a className=" duration-200 text-white" href="">
                <FaDiscord />
              </a>
              <a className="text-xl text-red-600 socialNamesFooter" href="">
                Discord
              </a>
            </li>
            <li className=" hover:text-red-600 socialFooter flex gap-3 items-center">
              <a className=" duration-200 text-white" href="">
                <FaSquareInstagram />
              </a>
              <a className="text-xl text-red-600 socialNamesFooter" href="">
                Instagram
              </a>
            </li>
          </ul>
          <ul className="w-1/4 max-sm:hidden  justify-around text-2xl  h-[90%] gap-2  pt-4  flex flex-col items-center">
            <li className=" hover:text-red-600 socialFooter flex gap-3 items-center">
              <a className=" duration-200 text-white" href="">
                <FaTelegram />
              </a>
              <a className="text-xl text-red-600 socialNamesFooter" href="">
                Telegram
              </a>
            </li>
            <li className=" hover:text-red-600 socialFooter flex gap-3 items-center">
              <a className=" duration-200 text-white" href="">
                <SiGithub />
              </a>
              <a className="text-xl text-red-600 socialNamesFooter" href="">
                Github
              </a>
            </li>
            <li className=" hover:text-red-600 socialFooter flex gap-3 items-center">
              <a className=" duration-200 text-white" href="">
                <FaXTwitter />
              </a>
              <a className="text-xl text-red-600 socialNamesFooter" href="">
                Twitter
              </a>
            </li>
          </ul>
          <ul className="w-1/4 justify-around text-[17.5px] max-sm:text-[13px] h-[90%] gap-2  pt-4  flex flex-col items-center">
            <li>
              <a href="" className="hover:text-red-600 duration-200">Term of Use</a>
            </li>
            <li>
              <a href="" className="hover:text-red-600 duration-200">Privacy Policy</a>
            </li>
            <li>
              <a href="" className="hover:text-red-600 duration-200">Cookie Policy</a>
            </li>
          </ul>
        </div>
        <div className={user ? "downFooter text-center border-t-[1px] py-3 border-indigo-500 pt-2 " : "downFooter text-center border-t-[1px] py-3 border-indigo-500 pt-2 mt-5"}>
          <span>2024 © Megasin , All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
