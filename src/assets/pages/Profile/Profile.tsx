import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/app/store";
import { logout, updateData } from "../../features/Users/userSlice";
import { useNavigate } from "react-router-dom";
import Register from "../Registeration/Register";
import Header from "../../Components/Header/Header";
import { FaPen } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { LuCake } from "react-icons/lu";
const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  // console.log(user);
  
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePictures, setProfilePictures] = useState(user?.profilePictures || "");
  const [bannerPict, setBannerPict] = useState(user?.bannerPict || "");
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleUpdateProfile = () => {
    if (user) {
      dispatch(updateData({ id: user.id, username, email, bio, profilePictures, bannerPict }));
      setIsEditMode(false);
    }
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className="flex pt-5 flex-col items-center justify-center w-full m-auto">
          <p className="text-center">
            You don't have an account! If you want to continue, you must create a user or log in if you have one.
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
          className={`bannerPict flex justify-end items-start p-5 relative h-[200px] w-full bg-[url(${bannerPict || user.bannerPict})] bg-black`}
        >
          <div className="profileContainer w-[60%] left-[20%] pb-4 absolute z-20 top-[50%] rounded-2xl flex flex-col justify-around items-start bg-white">
            <div className="flex px-7 w-full items-center">
              <div className="border-none w-[150px] h-[150px] overflow-hidden m-3">
                <img
                  className="w-full h-full border-none object-cover flex items-center justify-center overflow-hidden rounded-[50%]"
                  src={user.profilePictures || "https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798821_clzISlzMqjLxx8YjYFBfOaVvIj5qifwm.jpg"}
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
              {/* <div className="flex justify-end items-start p-1.5 h-[97.59px] w-[50%] "><button className="px-2 m-[2px] rounded-[4px] text-white bg-blue-600 ">Follow</button></div> */}
            </div>
            <div className="text-start w-[90%] flex justify-start mx-auto text-gray-600">
              {user.bio}
            </div>
          </div>
          <div className="flex items-center gap-4 pr-5">
            <div
              onClick={() => setIsEditMode(true)}
              className="edit cursor-pointer flex items-center justify-center w-[35px] h-[35px] bg-white p-2 rounded-[50%] text-red-600"
            >
              <FaPen />
            </div>
            <button
              className="text-white bg-red-700 h-[35px] flex items-center justify-center gap-2 px-3 rounded-lg"
              onClick={handleLogout}
            >
              Log out <CiLogin className="text-white text-lg" />
            </button>
          </div>
        </div>

        {isEditMode && (
          <div className="editModal w-[60%] rounded-xl p-5 top-[24%] left-[20%] absolute bg-white border border-gray-600 z-30">
            <div className="flex items-center justify-between">
              <h2 className="pt-3 text-black font-bold text-lg">Edit Profile</h2>
              <TiDelete onClick={() => setIsEditMode(false)} className="text-black text-3xl cursor-pointer" />
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
                />
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
              <button onClick={handleUpdateProfile}>Save Changes</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
export default Profile