import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

const Blogs = () => {
  const [isFollow, setIsFollow] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const toggleFollow = () => {
    setIsFollow(!isFollow);
  };
  const toggleLike = () => {
    setIsLike(!isLike);
  };
  return (
    <div className="flex flex-col gap-4 w-[48%]">
      <div className="w-full border-2 border-red-700 rounded-md">
        <img
          className="w-full h-[320px] object-cover"
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
            <button className="text-blue-600 " onClick={toggleFollow}>
              {isFollow ? "Following" : "Follow"}
            </button>
          </div>
          <div>
            <h2 className="text-black font-semibold">
              Js de qarsima cixan errorlar
            </h2>
            <div className="postTags">
              <span>#js</span>
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
      <div className="w-full">
        <img
          className="w-full h-[320px] object-cover"
          src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*gSuR5yJljD9aFUNy"
          alt=""
        />
        <div className="postInfos">
          <div>
            <img src="" alt="" />
            <span>ayxan</span>
          </div>
          <div>
            <h2>Js de qarsima cixan errorlar</h2>
            <div className="postTags">
              <span>#js</span>
            </div>
          </div>
          <div className="postFeatures flex gap-3">
            <AiFillLike className="text-[17px]" />
            <FaComment className="text-[17px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
