import { useState } from "react";
import "../../../input.css";
import ToggleButtonsMultiple from "../NewPost/ToggleButtons";
import { RootState } from "../../redux/app/store";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/Posts/postSlice";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { HiOutlinePhotograph } from "react-icons/hi";
import Loading from "../../Components/Loadings/Loading";
import { AppDispatch } from "../../redux/app/store";

const NewPost: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { isLoading } = useSelector((state: RootState) => state.posts);
  
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [postPicture, setPostPicture] = useState<string>("");
  const [formats, setFormats] = useState<string[]>(["bold", "italic"]);
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const getPublish = (): void => {
    if (!title || !description) {
      alert("Title and description are required!");
      return;
    }

    const postData = {
      title,
      content: description,
      postPicture,
      tags: tags,
      formats: formats,
    };

    if (user?.username) {
      navigate(`/profile/${user.username}`);
    }
    dispatch(createPost(postData));
  };

  const getDescriptionStyles = (): React.CSSProperties => {
    const style: React.CSSProperties = {};
    if (formats.includes("bold")) style.fontWeight = "bold";
    if (formats.includes("italic")) style.fontStyle = "italic";
    if (formats.includes("underlined")) style.textDecoration = "underline";
    return style;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col">
      <div className="w-full bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 shadow-sm sticky top-0 z-50">
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] flex items-center justify-between py-3 m-auto">
          <div className="flex gap-2 items-baseline">
            <a className="text-xl md:text-2xl font-bold text-[#E91E63]" href="/">
              MEGASIN<span className="text-black dark:text-white">.</span>
            </a>
            <span className="text-gray-400 text-xs md:text-sm hidden sm:inline">Create Post</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={getPublish}
              className="h-[34px] w-[110px] hover:bg-[#0f730c] bg-[#1A8917] text-white font-medium text-sm flex items-center justify-center rounded-full transition-colors shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-full flex justify-center items-center">
                  <Loading />
                </div>
              ) : (
                "Publish"
              )}
            </button>
            {user?.profilePictures && (
              <img
                className="w-[35px] h-[35px] object-cover rounded-full ring-2 ring-gray-100 dark:ring-zinc-800"
                src={user.profilePictures}
                alt="Profile"
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] flex-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-sm my-6 p-4 sm:p-6 md:p-8 m-auto flex flex-col gap-5">
        <div className="w-full">
          {postPicture ? (
            <div className="relative w-full h-[220px] sm:h-[320px] md:h-[380px] rounded-lg overflow-hidden border dark:border-zinc-800 group shadow-sm">
              <img 
                src={postPicture} 
                alt="Cover Preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/1200x400?text=Invalid+Image+URL";
                }}
              />
              <button 
                onClick={() => { setPostPicture(""); setShowUrlInput(false); }}
                className="absolute top-3 right-3 bg-black/70 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                title="Remove image"
              >
                <TiDelete className="text-2xl" />
              </button>
            </div>
          ) : (
            <div className="w-full">
              {!showUrlInput ? (
                <button
                  onClick={() => setShowUrlInput(true)}
                  className="flex items-center gap-2 border border-dashed border-gray-300 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-500 rounded-lg p-5 w-full justify-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-all"
                >
                  <HiOutlinePhotograph className="text-xl" />
                  Add a high-quality cover image URL
                </button>
              ) : (
                <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-zinc-800/40 border dark:border-zinc-800 rounded-lg transition-all">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Image Link / URL</label>
                    <button 
                      onClick={() => setShowUrlInput(false)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <TiDelete className="text-xl" />
                    </button>
                  </div>
                  <input
                    className="w-full text-sm outline-none border border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white rounded-md p-2 focus:border-gray-400 transition-colors"
                    type="text"
                    placeholder="Paste your image URL here..."
                    value={postPicture}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.select()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostPicture(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="border-b dark:bg-zinc-900 dark:text-white border-gray-200 dark:border-zinc-800 w-full outline-none text-xl sm:text-2xl md:text-3xl py-3 placeholder:text-gray-400 placeholder:font-bold caret-gray-600 font-bold"
          placeholder="New post title here..."
          type="text"
          value={title}
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTags(e.target.value)}
          className="border-b dark:bg-zinc-900 dark:text-white border-gray-200 dark:border-zinc-800 w-full outline-none text-sm sm:text-base py-2 placeholder:text-gray-400 caret-gray-600"
          type="text"
          placeholder="Add tags"
          value={tags}
        />

        <div className="features py-1 border-b border-gray-100 dark:border-zinc-800/60 flex items-center">
          <ToggleButtonsMultiple formats={formats} setFormats={setFormats} />
        </div>
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          className="w-full flex-1 min-h-[180px] md:min-h-[280px] dark:bg-zinc-900 dark:text-white outline-none text-base sm:text-lg py-2 placeholder:text-gray-400 resize-none leading-relaxed"
          style={getDescriptionStyles()}
          placeholder="Description..."
          value={description}
        />
      </div>
    </div>
  );
};

export default NewPost;