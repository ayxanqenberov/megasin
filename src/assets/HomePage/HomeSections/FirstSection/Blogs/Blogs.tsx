import React, { useEffect, useState, useMemo } from "react";
import { AiFillLike } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { fetchPosts, likedPost, selectAllPosts, selectPostsIsLoading } from "../../../../features/Posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux/app/store";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Loading from "../../../../Components/Loadings/Loading";
import FollowButton from "../../../../Components/FollowBttn/FollowButton";
import MentionText from "../../../../Components/MentionText/MentionText";
import { selectCurrentUser, User } from "../../../../features/Users/userSlice";

interface PostType {
  id: string | number;
  userId: string | number;
  username: string;
  title: string;
  postPicture?: string;
  profilePicture?: string;
  likedUsers: (string | number)[];
  createdAt: string | number | Date;
}

const Blogs: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("welcomeDismissed") !== "true";
    }
    return false;
  });
  
  const [sliceEnd, setSliceEnd] = useState<number>(3);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector(selectAllPosts) as PostType[];
  const isLoading = useSelector(selectPostsIsLoading);
  const user = useSelector(selectCurrentUser) as User | null;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const toggleLike = (id: string | number) => {
    if (user) {
      dispatch(likedPost({ id }));
    } else {
      navigate("/register");
    }
  };
  
  const handleUserClick = (username: string) => {
    navigate(`/profiles/${username}`);
  };

  const getDetail = (username: string, id: string | number) => {
    navigate(`/@${username}/detail?postId=${id}`);
  };

  const limitedPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => Number(b.id) - Number(a.id)) 
      .slice(0, sliceEnd);
  }, [posts, sliceEnd]);

  if (isLoading)
    return (
      <div className="w-full justify-center flex pt-10">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col gap-4 w-[48%] max-lg:w-[57%] max-sm:w-full">
      {user && showWelcome && (
        <div className="max-md:hidden">
          <div className="bg-[#3B49DF] p-[30px] dark:text-black text-white rounded-md flex flex-col gap-4">
            <div className="w-full flex items-center justify-between">
              <p className="text-2xl font-bold text-black">
                MEGASIN<span className="text-[#E91E63]">.</span>
              </p>
              <IoCloseOutline
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setShowWelcome(false);
                  localStorage.setItem("welcomeDismissed", "true");
                }}
              />
            </div>
            <div className=" dark:text-black">
              <p className="text-4xl w-3/4 font-bold">
                You're now a part of the community!
              </p>
              <span className="text-[#C5C9F5] text-[15px]">
                SUGGESTED THINGS YOU CAN DO
              </span>
            </div>
            <ul className="flex flex-col gap-4">
              <li className="p-3 py-5 bg-[#626de8] hover:bg-[#7680E9] duration-200 rounded-md">
                <a className="flex items-center justify-between" href="#">
                  <div className="flex pl-3.5 items-center gap-2">
                    <span> 😊</span>
                    <p className="font-semibold">Join the Welcome thread</p>
                  </div>
                  <IoIosArrowDroprightCircle className="text-xl mr-3" />
                </a>
              </li>
              <li
                onClick={() => navigate(`/@${user?.username}/new`)}
                className="cursor-pointer p-3 py-5 bg-[#626de8] hover:bg-[#7680E9] duration-200 rounded-md"
              >
                <div className="flex justify-between items-center">
                  <div className="flex pl-3.5 items-center gap-2">
                    <span>✍️</span>
                    <p className="font-semibold">
                      Write your first Megasin post
                    </p>
                  </div>
                  <IoIosArrowDroprightCircle className="text-xl mr-3" />
                </div>
              </li>
              <li
                onClick={() => navigate(`/profile/${user?.username}`)}
                className="cursor-pointer p-3 py-5 bg-[#626de8] hover:bg-[#7680E9] duration-200 rounded-md"
              >
                <div className="flex justify-between items-center">
                  <div className="flex pl-3.5 items-center gap-2">
                    <span>💅</span>
                    <p className="font-semibold">Customize your profile</p>
                  </div>
                  <IoIosArrowDroprightCircle className="text-xl mr-3" />
                </div>
              </li>
              <li className="p-3 py-5 bg-[#626de8] hover:bg-[#7680E9] duration-200 rounded-md">
                <a className="flex justify-between items-center" href="#">
                  <div className="flex pl-3.5 items-center gap-2">
                    <span>🚀</span>
                    <p className="font-semibold">Join Megasin Premium</p>
                  </div>
                  <IoIosArrowDroprightCircle className="text-xl mr-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-6">
        {limitedPosts.map((item) => (
          <div
            key={String(item.id)}
            className="flex flex-col justify-between w-full border rounded-md bg-white shadow-md overflow-hidden"
          >
            <img
              className="w-full h-[270px] max-md:h-[200px] max-sm:h-[180px] object-cover"
              src={item.postPicture || "https://via.placeholder.com/150"}
              alt="Post"
            />
            <div className="p-4 flex dark:bg-black dark:text-white flex-col gap-4 ">
              <div className="flex items-center gap-2">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={
                    item.profilePicture ||
                    "https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798821_clzISlzMqjLxx8YjYFBfOaVvIj5qifwm.jpg"
                  }
                  alt={item.username}
                />
                <span
                  onClick={() => handleUserClick(item.username)}
                  className="font-bold cursor-pointer hover:text-blue-600 duration-200"
                >
                  {item.username}
                </span>
                {user?.username !== item.username && (
                  <FollowButton targetUserId={item.userId} /> 
                )}
              </div>

              <h2
                onClick={() => getDetail(item.username, item.id)}
                className="text-lg max-md:text-[15px] hover:text-red-600 duration-200 cursor-pointer font-semibold"
              >
                <MentionText text={item.title} />
              </h2>
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => toggleLike(item.id)}
                >
                  <AiFillLike
                    className={
                      user?.id && item.likedUsers.map(String).includes(String(user.id))
                        ? "max-sm:text-[19px] text-red-500"
                        : "max-sm:text-[19px] text-gray-600"
                    }
                  />
                  <span className="max-sm:text-[16.5px]">
                    {item.likedUsers.length}
                  </span>
                </div>
                <span className="text-gray-400 max-sm:text-[16.5px]">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                </span>
              </div>
            </div>
          </div>
        ))}

        {posts.length > limitedPosts.length && (
          <button 
            onClick={() => setSliceEnd(prev => prev + 3)}
            className="mt-2 p-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-sm font-semibold rounded-md transition-colors"
          >
            Load More Posts
          </button>
        )}
      </div>
    </div>
  );
};

export default Blogs;