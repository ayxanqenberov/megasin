import React, { useState } from "react";
import '../../../input.css';
import ToggleButtonsMultiple from "../NewPost/ToggleButtons";
import { RootState } from "../../redux/app/store";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/Posts/postSlice";
import CircularIndeterminate from "../../Components/Loadings/LoadBttn";

const NewPost = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { isLoading, error } = useSelector((state: RootState) => state.posts);  // Corrected selector
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [postPicture, setPostPicture] = useState(""); 
  const dispatch = useDispatch();

  const getPublish = () => {
    if (!title || !description) {
      alert("Title and description are required!");
      return;
    }

    const postData = {
      title,
      content: description,
      postPicture,
      userId: user?.id,
      tags: tags, 
    };

    dispatch(createPost(postData));
  };

  return (
    <div className="h-[100vh]">
      <div className="upPosting w-[80%] flex items-center justify-between py-4 m-auto">
        <div className="flex gap-2 items-baseline">
          <a className="text-2xl font-bold text-[#E91E63]" href="/">
            MEGASIN<span className="text-black">.</span>
          </a>
          <span className="text-gray-500">Create Post</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={getPublish} 
            className="h-[30px] hover:bg-[#0F730C] bg-[#1A8917] text-white px-5 flex items-center justify-center rounded-[50px]"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? <CircularIndeterminate/> : "Publish"}
          </button>
          <img
            className="w-[35px] h-[35px] object-cover rounded-[50%]"
            src={user?.profilePictures}
            alt=""
          />
        </div>
      </div>

      <div className="bg-white rounded-md w-[80%] h-[80%] flex flex-col m-auto">
        <div className="flex flex-col h-3/4 justify-between items-baseline w-[90%] m-auto">
          <input 
            onChange={(e) => setTitle(e.target.value)}  
            className="border-b border-[#D6D6D7] w-full outline-none placeholder:text-gray-500 placeholder:text-2xl p-5 placeholder:font-bold caret-gray-600 cursorInputPost" 
            placeholder="New post title here..." 
            type="text" 
          />
          <input 
            onChange={(e) => setTags(e.target.value)} 
            className="border-b border-[#D6D6D7] w-full outline-none placeholder:text-gray-500 placeholder:text-2xl p-5 placeholder:font-bold caret-gray-600 cursorInputPost" 
            type="text" 
            placeholder="Add tags" 
          />
          <input 
            onChange={(e) => setDescription(e.target.value)} 
            className="border-b border-[#D6D6D7] w-full outline-none placeholder:text-gray-500 placeholder:text-2xl p-5 placeholder:font-bold caret-gray-600 cursorInputPost" 
            type="text" 
            placeholder="Description..." 
          />
          <div className="features">
            <ToggleButtonsMultiple />
          </div>
          <button className="border-[1.5px] border-[#D6D6D7] text-[14px] font-medium hover:bg-[#F5F5F5] duration-200 hover:text-[#7d7d7d] rounded-md p-2">Add a cover image</button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
