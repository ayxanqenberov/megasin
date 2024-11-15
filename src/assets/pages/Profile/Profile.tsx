// Profile.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/app/store";
import { logout, updateData } from "../../features/Users/userSlice";
import { fetchPosts } from "../../features/Posts/postSlice";
import { useNavigate } from "react-router-dom";
import Register from "../Registeration/Register";
import Header from "../../Components/Header/Header";
import { FaPen } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { LuCake } from "react-icons/lu";

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { posts } = useSelector((state: RootState) => state.posts);

  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePictures, setProfilePictures] = useState(
    user?.profilePictures || ""
  );
  const [bannerPict, setBannerPict] = useState(user?.bannerPict || "");
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const userPosts = posts.filter((post) => post.userId === user?.id);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleUpdateProfile = () => {
    if (user && bio.length <= 200) {
      dispatch(
        updateData({
          id: user.id,
          username,
          email,
          bio,
          profilePictures,
          bannerPict,
        })
      );
      setIsEditMode(false);
    }
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className="flex pt-5 flex-col items-center justify-center w-full m-auto">
          <p className="text-center">
            You don't have an account! If you want to continue, you must create
            a user or log in if you have one.
          </p>
          <Register />
        </div>
      </>
    );
  }

  const formattedDate = new Date(user.createdAccount).toLocaleDateString();

  return (
    <>
      <Header />
      <section>
        <div
          style={{ backgroundImage: `url(${bannerPict || user.bannerPict})` }}
          className={`bannerPict flex justify-end items-start p-5 relative h-[200px] w-full bg-black`}
        >
          <div className="profileContainer w-[60%] left-[20%] pb-4 absolute z-20 top-[50%] rounded-2xl flex flex-col justify-around items-start bg-white">
            <div className="flex px-7 w-full items-center">
              <div className="border-none w-[150px] h-[150px] overflow-hidden m-3">
                <img
                  className="w-full h-full border-none object-cover flex items-center justify-center overflow-hidden rounded-[50%]"
                  src={
                    user.profilePictures ||
                    "https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798821_clzISlzMqjLxx8YjYFBfOaVvIj5qifwm.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Username: {user.username}</span>
                <p>Follower: {user.follower}</p>
                <p>Following: {user.following}</p>
                <p className="text-gray-400 flex items-center gap-1 font-medium">
                  Account Created: {formattedDate}
                  <LuCake />
                </p>
              </div>
            </div>
            <div className="text-start w-[90%] text-ellipsis flex flex-col justify-start mx-auto text-gray-600">
              {user.bio}
            </div>
          </div>
          <div className="flex items-center gap-4 pr-5">
            <div
              onClick={() => setIsEditMode(true)}
              className="edit cursor-pointer flex items-center justify-center w-[35px] h-[35px] bg-white hover:text-red-600 duration-200 hover:bg-[#f1f3ff] p-2 rounded-[50%] text-black"
            >
              <FaPen />
            </div>
            <button
              className="text-white bg-red-700 h-[35px] flex items-center duration-200 hover:bg-[#da0404] justify-center gap-2 px-3 rounded-lg"
              onClick={handleLogout}
            >
              Log out <CiLogin className="text-white text-lg" />
            </button>
          </div>
        </div>

        {isEditMode && (
          <div className="editModal w-[60%] rounded-xl p-5 top-[16%] left-[20%] absolute bg-white border border-gray-600 z-30">
            <div className="flex items-center justify-between">
              <h2 className="pt-3 text-black font-bold text-lg">
                Edit Profile
              </h2>
              <TiDelete
                onClick={() => setIsEditMode(false)}
                className="text-black duration-200 hover:text-red-600 text-3xl cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 pt-5">
                <label className="font-medium text-[#171717]">Username:</label>
                <input
                  className="border border-[#A3A3A3] p-[7px] outline-red-600 rounded-lg"
                  type="text"
                  placeholder={username}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#171717]">Email:</label>
                <input
                  className="border border-[#A3A3A3] p-[7px] outline-red-600 rounded-lg"
                  type="text"
                  value={email}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#171717]">Bio:</label>
                <input
                  className="border border-[#A3A3A3] p-[7px] outline-red-600 rounded-lg"
                  type="text"
                  value={bio}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={200}
                />
                <span
                  className={`bio-char-count ${
                    200 - bio.length <= 5 ? "text-red-600" : "hidden"
                  }`}
                >
                  {`${200 - bio.length} characters remaining`}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#171717]">
                  Profile Picture URL:
                </label>
                <input
                  className="border border-[#A3A3A3] outline-red-600 rounded-lg"
                  type="text"
                  value={profilePictures}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setProfilePictures(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#171717]">
                  Banner Picture URL:
                </label>
                <input
                  className="border border-[#A3A3A3] p-[7px] outline-red-600 rounded-lg"
                  type="text"
                  value={bannerPict}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setBannerPict(e.target.value)}
                />
              </div>
              <button
                className="bg-green-400 w-[15%] m-auto p-2 rounded-md text-[#2b2b2b] font-bold text-[13px] hover:bg-green-500 duration-200 hover:text-black"
                onClick={handleUpdateProfile}
                disabled={bio.length > 200}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </section>
      <section className="flex flex-col gap-3">
        <div className="bg-[#f7f7f7]  gap-2 rounded-b-2xl shadow-md flex justify-start px-[30px] pb-[15px] items-end w-[60%] m-auto h-[170px]">
          <span>Posts:</span>
          <span>{userPosts.length}</span>
        </div>
        <div className="w-[60%] m-auto">
          <div className="w-full bg-[#f7f7f7] p-3 rounded-2xl shadow-md m-auto">
            {/* {isLoading && <p>Loading posts...</p>} */}
            {/* {!isLoading && userPosts.length === 0 && <p>No posts to display.</p>} */}
            <div className="post-list grid grid-cols-1 md:grid-cols-2 gap-4">
              {userPosts.map((post) => (
                <div key={post.id} className="post-card border flex flex-col gap-3 rounded p-4">
                  <h3 className="font-bold">{post.title}</h3>
                  <img
                    src={post.postPicture}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <p className="text-gray-600">{post.content}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Likes: {post.likeCount}</span>
                    <span>Comments: {post.comentCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
