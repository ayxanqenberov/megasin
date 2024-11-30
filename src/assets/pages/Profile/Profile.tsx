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
import notPost from "../../images/Empty inbox.png";

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { posts } = useSelector((state: RootState) => state.posts);
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePictures, setProfilePictures] = useState(user?.profilePictures || "");
  const [bannerPict, setBannerPict] = useState(user?.bannerPict || "");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const userPosts = posts.filter((post) => post.userId === user?.id);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const getWrite = () => {
    navigate(`/${username}/new`);
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
          style={{
            backgroundImage: `url(${bannerPict || user.bannerPict})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="bannerPict flex justify-end items-start p-5 relative h-[200px] w-full bg-black"
        >
          <div className="profileContainer w-[80%]  md:w-[60%] left-[10%] md:left-[20%] pb-4 absolute z-20 top-[50%] rounded-2xl flex flex-col justify-around items-start bg-white">
            <div className="flex px-7 max-[600px]:flex-col  max-[600px]:text-center w-full items-center">
              <div className="border border-gray-300 rounded-[50%] w-[120px] h-[120px] md:w-[150px] md:h-[150px] overflow-hidden m-3">
                <img
                  className="w-full h-full border-none object-cover flex items-center justify-center rounded-[50%]"
                  src={user.profilePictures || "https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798821_clzISlzMqjLxx8YjYFBfOaVvIj5qifwm.jpg"}
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">{user.username}</span>
                <p className="text-blue-500">{user.followerUser.length} follower</p>
                <p className="text-gray-400 flex items-center gap-1 font-medium">
                  Account Created: {formattedDate}
                  <LuCake />
                </p>
              </div>
            </div>
            <div className="text-start w-[90%] max-[600px]:text-center text-ellipsis flex flex-col justify-start mx-auto text-gray-600">
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
          <div className="editModal w-[80%] md:w-[60%] rounded-xl p-5 top-[16%] left-[10%] md:left-[20%] absolute bg-white border border-gray-600 z-30">
            <div className="flex items-center justify-between">
              <h2 className="pt-3 text-black font-bold text-lg">Edit Profile</h2>
              <TiDelete
                onClick={() => setIsEditMode(false)}
                className="text-black duration-200 hover:text-red-600 text-3xl cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-4">
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
                  className={`bio-char-count ${200 - bio.length <= 5 ? "text-red-600" : "hidden"}`}
                >
                  {`${200 - bio.length} characters remaining`}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#171717]">Profile Picture URL:</label>
                <input
                  className="border border-[#A3A3A3] p-[7px] outline-red-600 rounded-lg"
                  type="text"
                  value={profilePictures}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setProfilePictures(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#171717]">Banner Picture URL:</label>
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

      <section className={userPosts.length === 0 ? "hidden" : "flex flex-col gap-3"}>
        <div className="bg-[#f7f7f7] gap-2 rounded-b-2xl shadow-md flex justify-start px-[30px] pb-[15px] items-end w-[80%] md:w-[60%] m-auto h-[170px] max-sm:text-center max-[600px]:h-[240px]">
          <span>Posts:</span>
          <span>{userPosts.length}</span>
        </div>
        <div className="w-[80%] md:w-[60%] m-auto">
          <div className="w-full bg-[#f7f7f7] p-3 rounded-2xl shadow-md m-auto">
            <div className="post-list grid grid-cols-1 md:grid-cols-2 gap-4">
              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className="post-card border flex flex-col gap-3 rounded p-4"
                >
                  <h3 className="font-bold">{post.title}</h3>
                  <span className="text-[#9CA7BC]">
                    {new Date(post.createdAt).toLocaleDateString()}{" "}
                    {new Date(post.createdAt).toLocaleTimeString()}
                  </span>
                  <img
                    src={post.postPicture}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Likes: {post.likedUsers.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className={userPosts.length === 0 ? "flex h-[454px] flex-col justify-end pb-[30px] items-center w-full m-auto" : "hidden"}
      >
        <div className="w-[80%] md:w-[60%] rounded-xl mb-[10px] flex flex-col gap-4 justify-center items-center bg-white p-3">
          <span>Not post yet</span>
          <div className="h-[150px] [w-150px] overflow-hidden">
            <img src={notPost} className="w-[300px] object-cover" alt="" />
          </div>
          <button onClick={getWrite} className="border hover:bg-black duration-200 hover:text-white border-black p-2.5 rounded-[15px]">Get Started</button>
        </div>
      </section>
    </>
  );
};

export default Profile;