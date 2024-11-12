import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/app/store";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const Blogs = () => {
  const [isFollow, setIsFollow] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); 

  const toggleFollow = () => {
    setIsFollow(!isFollow);
  };
  const toggleLike = () => {
    setIsLike(!isLike);
  };
  const { user } = useSelector((state: RootState) => state.user);
  

  return (
    <div className="flex flex-col gap-4 w-[48%]">
      {user && showWelcome && ( 
        <div className="bg-[#3B49DF] p-[30px] text-white rounded-md flex flex-col gap-4">
          <div className="w-full flex items-center justify-between">
            <p className="text-2xl font-bold text-black">
              MEGASIN<span className="text-[#E91E63]">.</span>
            </p>
            <IoCloseOutline 
              className="text-2xl cursor-pointer"
              onClick={()=>setShowWelcome(false)}
            />
          </div>
          <div>
            <p className="text-4xl w-3/4 font-bold">
              You're now a part of the community!
            </p>
            <span className="text-[#C5C9F5] text-[15px]">
              SUGGESTED THINGS YOU CAN DO
            </span>
          </div>
          <ul className="flex flex-col gap-4">
            <li className="p-3 py-5 bg-[#626de8] hover:bg-[#7680E9] duration-200 rounded-md">
              <a className="flex items-center justify-between" href="">
                <div className="flex pl-3.5 items-center gap-2">
                  <span> 😊</span>
                  <p className="font-semibold">Join the Welcome thread</p>
                </div>
                <IoIosArrowDroprightCircle className="text-xl mr-3" />
              </a>
            </li>
            <li className="p-3 py-5 bg-[#626de8] hover:bg-[#7680E9] duration-200 rounded-md">
              <a className="flex justify-between items-center" href="">
                <div className="flex pl-3.5 items-center gap-2">
                  <span>✍️</span>
                  <p className="font-semibold">Write your first Megasin post</p>
                </div>
                <IoIosArrowDroprightCircle className="text-xl mr-3" />
              </a>
            </li>
            <li className="p-3 py-5 bg-[#626de8] hover:bg-[#7680E9] duration-200 rounded-md">
              <a className="flex justify-between items-center" href="">
                <div className="flex pl-3.5 items-center gap-2">
                  <span>💅</span>
                  <p className="font-semibold">Customize your profile</p>
                </div>
                <IoIosArrowDroprightCircle className="text-xl mr-3" />
              </a>
            </li>
            <li className="p-3 py-5 bg-[#626de8] hover:bg-[#7680E9] duration-200 rounded-md">
              <a className="flex justify-between items-center" href="">
                <div className="flex pl-3.5 items-center gap-2">
                  <span>🚀</span>
                  <p className="font-semibold">Join Megasin Premium</p>
                </div>
                <IoIosArrowDroprightCircle className="text-xl mr-3" />
              </a>
            </li>
          </ul>
        </div>
      )}
      
      <div className="w-full border-2 border-red-700 rounded-md">
        <img
          className="w-full h-[270px] object-cover"
          src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*gSuR5yJljD9aFUNy"
          alt=""
        />
        <div className="postInfos p-2 bg-white ">
          <div className="flex items-center gap-2">
            <img
              className="h-8 w-8 object-cover rounded-[50%]"
              src="https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=620&dpr=2&s=none&crop=none"
              alt=""
            />
            <span className="font-bold">ayxan</span>
            <button
              className={isFollow ? "text-black" : "text-blue-600 "}
              onClick={toggleFollow}
            >
              {isFollow ? "Following" : "Follow"}
            </button>
          </div>
          <div>
            <h2 className="text-black font-semibold">
              Js de qarsima cixan errorlar
            </h2>
            <div className="postTags">
              <a className="text-blue-600" href="">
                #js
              </a>
            </div>
          </div>
          <div className="postFeatures flex items-center gap-3">
            <div className="flex items-center gap-1">
              <AiFillLike
                onClick={toggleLike}
                className={
                  isLike
                    ? "text-[17px] cursor-pointer text-red-700"
                    : "text-[17px] cursor-pointer"
                }
              />
              <span>1</span>
            </div>
            <div className="flex items-center gap-1">
              <FaComment className="text-[17px]" />
              <span>1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
