import { AiFillLike } from "react-icons/ai";
import { RootState } from "../../../../redux/app/store";
import { useSelector } from "react-redux";
import moderator from "../../../../images/moderator.png";
import "../../../../../input.css";
import { FaPlus } from "react-icons/fa";

const InfoAside = () => {
  const blogs = useSelector((state: RootState) => state.posts.posts.slice(0, 6)); 
  const mostLikedBlogs = useSelector((state: RootState) =>
    [...state.posts.posts]
      .sort((a, b) => b.likeCount - a.likeCount) 
      .slice(0, 3)
  );

  return (
    <div className="w-[31%] flex flex-col gap-3">
      {/* Blogs Section */}
      <div className="blogsSection bg-[#EAEAEA] pb-2 rounded-xl">
        <h2 className="bg-white py-2 px-4">Blogs</h2>
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="blogListsAsidePart bg-white px-4 py-2 flex items-center gap-3"
          >
            <img
              src={blog.postPicture || "default-image.png"} 
              alt={blog.title}
              className="w-12 h-12 object-cover rounded-md"
            />
            <div>
              <p className="text-sm font-medium">{blog.title}</p>
              <span className="text-xs text-gray-500">{blog.likeCount} likes</span>
            </div>
          </div>
        ))}
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
      <div className="mostLikedBlogs bg-[#EAEAEA] pb-2 rounded-xl">
        <h2 className="bg-white py-2 px-4">Most Liked Blogs</h2>
        {mostLikedBlogs.map((blog) => (
          <div
            key={blog.id}
            className="blogListsAsidePart bg-white px-4 py-2 flex items-center justify-between"
          >
            <a href={`/${blog.id}`} className="text-sm font-medium">
              {blog.title}
            </a>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              {blog.likeCount} <AiFillLike />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoAside;
