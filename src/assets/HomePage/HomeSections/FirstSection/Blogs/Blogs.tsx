import React, { useEffect, useRef, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { fetchPosts } from "../../../../features/Posts/postSlice";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const Blogs = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isFollow, setIsFollow] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [sliceEnd, setSliceEnd] = useState(3);

  const divRef = useRef<HTMLDivElement>(null);

  const dispatch: AppDispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.posts);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (divRef.current) {
      const height = divRef.current.offsetHeight;

      if (height <= 1302) {
        setSliceEnd(3);
      } else if(height <= 1837) {
        setSliceEnd(5);
      }else{
        setSliceEnd(3)
      }
    }
  }, [posts]);

  const toggleFollow = () => setIsFollow(!isFollow);
  const toggleLike = () => setIsLike(!isLike);

  // Sort posts in descending order
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  // Limit posts based on sliceEnd
  const limitedPosts = sortedPosts.slice(0, sliceEnd);

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
              onClick={() => setShowWelcome(false)}
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

      <div ref={divRef} className="bg-gray-100 rounded-lg flex flex-col gap-4">
        {limitedPosts.map((item) => (
          <div
            key={item.id}
            className="w-full border rounded-md bg-white shadow-md overflow-hidden"
          >
            <img
              className="w-full h-[270px] object-cover"
              src={item.postPicture || "https://via.placeholder.com/150"}
              alt={item.title}
            />
            <div className="p-4">
              <div className="flex items-center w-[25%] gap-2">
                <img
                  className="h-8 w-8 object-cover rounded-full"
                  src={item.profilePicture || "https://via.placeholder.com/50"}
                  alt={item.username}
                />
                <span className="font-bold">{item.username}</span>
                <button
                  className={`ml-auto text-sm ${
                    isFollow ? "text-black" : "text-blue-600"
                  }`}
                  onClick={toggleFollow}
                >
                  {isFollow ? "Following" : "Follow"}
                </button>
              </div>
              <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
              <p className="text-gray-500 text-sm">{item.tags.join(" ")}</p>
              <div className="flex items-center gap-4 mt-3">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={toggleLike}
                >
                  <AiFillLike
                    className={isLike ? "text-red-500" : "text-gray-600"}
                  />
                  <span>{item.likeCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaComment />
                  <span>{item.commentCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
