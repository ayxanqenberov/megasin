import React from "react";
import "../../../../../input.css";
import { FaPlus } from "react-icons/fa";
import moderator from "../../../../images/moderator.png";
import { AiFillLike } from "react-icons/ai";
import { RootState } from "../../../../redux/app/store";
import { useSelector } from "react-redux";

const InfoAside = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="w-[31%] flex flex-col gap-3 ">
      <div className="flex flex-col gap-[1.3px] bg-[#EAEAEA] pb-[px] rounded-xl">
        <div className="blogListsAsidePart bg-white border-none border-b-gray-400  py-2 px-4">
          <h2 className="">Blogs</h2>
        </div>
        <div className="blogListsAsidePart bg-white px-4 py-2">
          <p>aaa</p>
          <span>13</span>
        </div>
        <div className="blogListsAsidePart bg-white px-4 py-2">
          <p>aaa</p>
          <span>13</span>
        </div>
        <div className="blogListsAsidePart bg-white px-4 py-2">
          <p>aaa</p>
          <span>13</span>
        </div>
        <div className="blogListsAsidePart bg-white px-4 py-2">
          <p>aaa</p>
          <span>13</span>
        </div>
        <div className="blogListsAsidePart bg-white px-4 py-2">
          <p>aaa</p>
          <span>13</span>
        </div>
        <div className="blogListsAsidePart bg-white px-4 py-2">
          <p>aaa</p>
          <span>13</span>
        </div>
        <div className="blogListsAsidePart bg-white px-4 py-2">
          <p>aaa</p>
          <span>13</span>
        </div>
        <div className="blogListsAsidePart bg-white px-4 py-2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias unde
            qui autem obcaecati necessitatibus ab odit tempora, placeat quae
            minima!
          </p>
          <span>13</span>
        </div>
        <div className="blogListsAsidePart bg-white px-4 py-2">
          <p>aaaa</p>
          <span>13</span>
        </div>
      </div>
      <div className="relative inline-block p-1 rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-500 rounded-lg" />
        <div className="relative flex flex-col gap-3 bg-white rounded-lg p-4">
          <span className="text-xl font-medium text-gray-400">Megasin</span>
          <div className="w-full h-[150px] inset-0 bg-gradient-to-l rounded-lg from-blue-500 to-purple-500 justify-center items-center text-white flex ">
            <span className="flex items-center gap-1 text-3xl">
              MEGASIN <FaPlus className="text-[16px]" />{" "}
              <FaPlus className="text-[16px]" />
            </span>
          </div>
          <span className="font-bold">Check out MEGASIN++</span>
          <p>
            Invest in your developer career with our value-maximizing membership
            program.
          </p>
          <button className="border border-[#3B49DF] p-2 rounded-md duration-200 text-[#3B49DF] font-semibold hover:bg-blue-600 hover:text-white">
            Learn More
          </button>
        </div>
      </div>
      <div className="flex gap-1">
        <div className="bg-white p-3 w-1/2 flex gap-2 flex-col justify-between rounded-l-xl">
          <span className="text-xl font-medium text-gray-400">Megasin</span>
          <strong className="text-xl text-[#404040]">
            Check Out Our Badge Page and Start Earning!
          </strong>
          <p className="text-[14px] text-gray-500">
            Take a tour of our badge page and embark on a quest to earn
            recognition for your amazing contributions. Your journey to becoming
            a legend starts here.
          </p>
          <button className="border border-[#3B49DF] p-2 rounded-md duration-200 text-[#3B49DF] font-semibold hover:bg-blue-600 hover:text-white">
            Need we say more?
          </button>
        </div>
        <div className="bg-white p-3 w-1/2 flex flex-col justify-between gap-2 rounded-r-xl">
          <span className="text-xl font-medium text-gray-400">Megasin</span>
          <img src={moderator} alt="" />
          <strong className="text-[14px] text-[#404040]">
            Fill out this survey and help us moderate our community by becoming
            a tag moderator here at Megasin.
          </strong>
          <button className="border border-[#3B49DF] p-2 rounded-md duration-200 text-[#3B49DF] font-semibold hover:bg-blue-600 hover:text-white">
            Learn More
          </button>
        </div>
      </div>
      <div className={user ? "flex flex-col gap-[3.5px]" : "hidden"}>
        <div className="blogListsAsidePart bg-white px-4 py-2">
          <h2>Most Liked Blogs</h2>
        </div>
          <div className="blogListsAsidePart flex items-baseline justify-between bg-white px-4 py-2">
            <a href="">hi everyone ! we are Megasin . We also support them . beacuse we are better </a>
            <span className="flex items-center gap-1">123 <AiFillLike/></span>
          </div>
          <div className="blogListsAsidePart flex items-baseline justify-between bg-white px-4 py-2">
            <a href="">hi everyone ! we are Megasin</a>
            <span className="flex items-center gap-1">123 <AiFillLike/></span>
          </div>
          <div className="blogListsAsidePart flex items-baseline justify-between bg-white px-4 py-2">
            <a href="">hi everyone ! we are Megasin</a>
            <span className="flex items-center gap-1">123 <AiFillLike/></span>
          </div>
      </div>
    </div>
  );
};

export default InfoAside;
