import React from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/app/store";
import { useSelector } from "react-redux";

const Aside = () => {
  const { user } = useSelector((state: RootState) => state.user);
  
  const navigate = useNavigate();
  
  const getRegister = () => {
    navigate("/register?new-account");
  };
  const getLogin = () =>{
    navigate("login")
  }
  return (
    <aside className="w-[18%]">
      <div className={user ? 'hidden' : 'usersInfo flex flex-col items-start bg-white gap-2 p-3 rounded-md'}>
        <p className="text-black font-bold text-xl">MEGASIN BLOG is a community of amazing users</p>
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
    </aside>
  );
};

export default Aside;
