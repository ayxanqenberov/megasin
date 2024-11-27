import React, { useState } from "react";
import "../../../input.css";
import ToggleButtonsMultiple from "../NewPost/ToggleButtons";
import { RootState } from "../../redux/app/store";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/Posts/postSlice";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import Loading from "../../Components/Loadings/Loading";

const NewPost = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { isLoading} = useSelector((state: RootState) => state.posts);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [formats, setFormats] = useState(["bold", "italic"]);
  const [isOpenImg, setOpenImg] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    navigate(`/profile/${user?.username}`);
    dispatch(createPost(postData));
  };

  const getDescriptionStyles = () => {
    let style = {};
    if (formats.includes("bold")) style.fontWeight = "bold";
    if (formats.includes("italic")) style.fontStyle = "italic";
    if (formats.includes("underlined")) style.textDecoration = "underline";
    return style;
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
            className="h-[30px] w-[100px] hover:bg-[#0F730C] bg-[#1A8917] text-white px-5 flex items-center justify-center rounded-[50px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-full flex justify-center items-center">
                <Loading/>
              </div>
            ) : (
              "Publish"
            )}
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
            style={getDescriptionStyles()}
            type="text"
            placeholder="Description..."
          />
          <div className="features">
            <ToggleButtonsMultiple formats={formats} setFormats={setFormats} />
          </div>
          <div className="relative w-[40%]">
            <button
              onClick={() => setOpenImg(true)}
              className="border-[1.5px] border-[#D6D6D7] text-[14px] font-medium hover:bg-[#F5F5F5] duration-200 hover:text-[#7d7d7d] rounded-md p-2"
            >
              Add a cover image
            </button>
            {isOpenImg && (
              <div className="absolute flex flex-col justify-around px-3 top-0 right-0 rounded-lg left-[50%] bg-[#d0d0d0] h-[87px]">
                <div className="flex justify-between items-center">
                  <label htmlFor="">URL</label>
                  <TiDelete
                    onClick={() => setOpenImg(false)}
                    className="text-black duration-200 hover:text-red-600 text-[20px] cursor-pointer"
                  />
                </div>
                <input
                  className="w-full outline-none rounded-md px-1 placeholder:text-gray-500  placeholder:font-bold"
                  type="text"
                  placeholder="POST IMAGE"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setPostPicture(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
