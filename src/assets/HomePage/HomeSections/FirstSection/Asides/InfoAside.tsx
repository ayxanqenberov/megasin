import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { selectAllPosts, Posts } from "../../../../features/Posts/postSlice"; 
import moderator from "../../../../images/moderator.png";
import "../../../../../input.css";

const InfoAside: React.FC = () => {
  const navigate = useNavigate();
  const posts = useSelector(selectAllPosts) as Posts[];

  const blogs = useMemo(() => {
    return posts.slice(0, 6);
  }, [posts]);
  const mostLikedBlogs = useMemo(() => {
    return [...posts]
      .sort((a, b) => (b.likedUsers?.length || 0) - (a.likedUsers?.length || 0))
      .slice(0, 3);
  }, [posts]);

  const getDetail = (username: string, id: string | number): void => {
    navigate(`/@${username}/detail?postId=${id}`);
  };

  return (
    <div className="w-[31%] max-sm:hidden max-lg:w-[40%] flex flex-col gap-3">
      <div className="blogsSection bg-[#EAEAEA] dark:bg-black dark:text-white pb-2 rounded-xl">
        <h2 className="bg-white dark:bg-black dark:text-white py-2 px-4 font-bold">Blogs</h2>
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="blogListsAsidePart bg-white dark:bg-black dark:text-white px-4 py-2 flex items-center gap-3"
          >
            <img
              src={blog.postPicture || "default-image.png"}
              alt={blog.title}
              onClick={() => getDetail(blog.username || "", blog.id)}
              className="w-[70px] cursor-pointer h-[60px] object-cover rounded-md"
            />
            <div>
              <p
                onClick={() => getDetail(blog.username || "", blog.id)}
                className="text-sm max-lg:text-[13px] max-md:text-[10px] cursor-pointer hover:text-red-600 duration-200 font-medium"
              >
                {blog.title}
              </p>
              <span className="text-xs text-gray-500">
                {blog.likedUsers?.length || 0} likes
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="relative inline-block p-1 rounded-lg max-md:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-500 rounded-lg" />
        <div className="relative flex dark:bg-black dark:text-white flex-col gap-3 bg-white rounded-lg p-4">
          <span className="text-xl font-medium text-gray-400">Megasin</span>
          <div className="w-full h-[150px] bg-gradient-to-l rounded-lg from-blue-500 to-purple-500 justify-center items-center text-white flex ">
            <span className="flex items-center gap-1 text-3xl font-bold">
              MEGASIN <FaPlus className="text-[16px]" /> <FaPlus className="text-[16px]" />
            </span>
          </div>
          <span className="font-bold">Check out MEGASIN++</span>
          <p className="text-sm">
            Invest in your developer career with our value-maximizing membership program.
          </p>
          <button className="border border-[#3B49DF] p-2 rounded-md duration-200 text-[#3B49DF] font-semibold hover:bg-blue-600 hover:text-white text-sm">
            Learn More
          </button>
        </div>
      </div>
      
      <div className="flex gap-1 max-lg:hidden">
        <div className="bg-white p-3 w-1/2 flex dark:bg-black dark:text-white gap-2 flex-col justify-between rounded-l-xl border-r dark:border-zinc-800">
          <span className="text-xl font-medium text-gray-400">Megasin</span>
          <strong className="text-sm dark:text-white text-[#404040] leading-tight">
            Check Out Our Badge Page and Start Earning!
          </strong>
          <p className="text-[12px] text-gray-500 dark:text-gray-400">
            Take a tour of our badge page and embark on a quest to earn recognition.
          </p>
          <button className="border border-[#3B49DF] p-1.5 rounded-md duration-200 text-[#3B49DF] font-semibold hover:bg-blue-600 hover:text-white text-xs mt-2">
            Need we say more?
          </button>
        </div>
        
        <div className="bg-white p-3 w-1/2 dark:bg-black dark:text-white flex flex-col justify-between gap-2 rounded-r-xl">
          <span className="text-xl font-medium text-gray-400">Megasin</span>
          <img src={moderator} alt="Moderator" className="w-full h-auto object-contain max-h-[60px]" />
          <strong className="text-[12px] dark:text-white text-[#404040] leading-tight">
            Fill out this survey and help us moderate our community.
          </strong>
          <button className="border border-[#3B49DF] p-1.5 rounded-md duration-200 text-[#3B49DF] font-semibold hover:bg-blue-600 hover:text-white text-xs mt-2">
            Learn More
          </button>
        </div>
      </div>
      
      <div className="mostLikedBlogs dark:bg-zinc-900 bg-[#EAEAEA] pb-2 rounded-xl">
        <h2 className="bg-white dark:bg-black dark:text-white py-2 px-4 font-bold">Most Liked Blogs</h2>
        {mostLikedBlogs.map((blog) => (
          <div
            key={blog.id}
            className="blogListsAsidePart dark:bg-black dark:text-white max-md:items-baseline max-md:gap-3 bg-white px-4 py-2 flex items-center justify-between border-t dark:border-zinc-800"
          >
            <span 
              onClick={() => getDetail(blog.username || "", blog.id)}
              className="text-sm max-md:text-[13px] font-medium cursor-pointer hover:text-red-600 transition-colors"
            >
              {blog.title}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              {blog.likedUsers?.length || 0} <AiFillLike />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoAside;