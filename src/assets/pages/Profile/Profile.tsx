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

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  // const dispatch = useDispatch();
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePictures, setProfilePictures] = useState(
    user?.profilePictures || ""
  );
  const [bannerPict, setBannerPict] = useState(user?.bannerPict || "");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleUpdateProfile = () => {
    if (user) {
      dispatch(
        updateData({
          id: user.id,
          username: user.username,
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
        <div className="bannerPict flex justify-end items-start p-5 relative h-[200px] w-full bg-black">
          <div className="profileContainer w-[60%] left-[20%] pb-4 absolute z-20 top-[50%] rounded-2xl flex flex-col justify-around items-start bg-white">
            <div className="flex px-7 w-full items-center">
              <div className="border-none overflow-hidden p-3">
                <img
                  className="w-[170px] h-[170px] border-none object-cover flex items-center justify-center overflow-hidden rounded-[50%]"
                  src={user.profilePictures || "https://www.nylabone.com/-/media/project/oneweb/nylabone/images/dog101/10-intelligent-dog-breeds/golden-retriever-tongue-out.jpg"}
                  alt="Profile Picture"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Username: {user.username}</span>
                <p>Follower: {user.follower}</p>
                <p>Following: {user.following}</p>
                <p className="text-gray-400 font-medium">
                  Account Created: {formattedDate}
                </p>
              </div>
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
          <div className="editModal w-[68%] h-[16rem] rounded-xl p-2 top-[20%] left-[16%] absolute bg-red-700 z-30">
            <div className="flex items-center justify-between">
              <h2>Edit Profile</h2>
              <TiDelete
                onClick={() => setIsEditMode(false)}
                className="text-black text-xl"
              />
            </div>
            <div>
              <div>
                <label>Email:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Bio:</label>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div>
                <label>Profile Picture URL:</label>
                <input
                  type="text"
                  value={profilePictures}
                  onChange={(e) => setProfilePictures(e.target.value)}
                />
              </div>
              <div>
                <label>Banner Picture URL:</label>
                <input
                  type="text"
                  value={bannerPict}
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

export default Profile;
