import React, { useEffect, useRef, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { fetchPosts, likedPost } from "../../../../features/Posts/postSlice";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [showWelcome, setShowWelcome] = useState(() => {
    return localStorage.getItem("welcomeDismissed") !== "true";
  });
  const [sliceEnd, setSliceEnd] = useState(3);
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});
  const [follows, setFollows] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement>(null);

  const dispatch: AppDispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.posts);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(likedPost());
  }, [dispatch]);
  useEffect(() => {
    if (showWelcome) {
      setSliceEnd(3);
    } else {
      setSliceEnd(4);
    }
  }, [showWelcome]);
  const toggleLike = (id: number, likeCount: number) => {
    if (user) {
      
      const post = posts.find((p) => p.id === id);
      if (post) {
        const newLikeCount = likes[id] ? likeCount - 1 : likeCount + 1;
        setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
        dispatch(likedPost({ id, likeCount: newLikeCount }));
      }
    } else {
      navigate(`/register`)
    }
  };
  const toggleFollow = (id: number) => {
    setFollows((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const getDetail = (user: string, title: string) => {
    navigate(`/detail?${user}&-${title}`);
  };

  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
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

      <div ref={divRef} className="flex flex-col h-full gap-6">
        {limitedPosts.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between w-full border rounded-md bg-white shadow-md overflow-hidden"
          >
            <img
              className="w-full h-[270px] object-cover"
              src={item.postPicture || "https://via.placeholder.com/150"}
              alt=""
            />
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center w-[30%] text-ellipsis gap-2">
                <img
                  className="h-8 w-8 object-cover rounded-full"
                  src={item.profilePicture || "https://via.placeholder.com/50"}
                  alt={item.username}
                />
                <span className="font-bold">{item.username}</span>
                <button
                  className={`ml-auto text-sm ${
                    follows[item.id] ? "text-black" : "text-blue-600"
                  }`}
                  onClick={() => toggleFollow(item.id)}
                >
                  {follows[item.id] ? "Following" : "Follow"}
                </button>
              </div>
              <h2
                onClick={() => getDetail(item.username, item.title)}
                className="text-lg cursor-pointer font-semibold"
              >
                {item.title}
              </h2>
              <ul>
                {item.tags.map((item) => (
                  <li>
                    <a href="">{item}</a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => toggleLike(item.id)}
                >
                  <AiFillLike
                    className={
                      likes[item.id] ? "text-red-500" : "text-gray-600"
                    }
                  />
                  <span>{item.likeCount}</span>
                </div>

                <div className="flex items-center gap-1">
                  <FaComment />
                  <span>{item.comentCount}</span>
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
