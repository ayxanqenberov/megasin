// src/components/Profile.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/app/store";
import { logout } from "../../features/Users/userSlice";
import { useNavigate } from "react-router-dom";
import Register from "../Registeration/Register";
import Header from "../../Components/Header/Header";

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const getChangeProfilePhoto = () =>{
  }
  if (!user) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center bg-red-400 w-full m-auto ">
          <p className="text-center">
            You don't have an account! If you want to continue, you must create
            a user or log in if you have one.
          </p>
          <Register />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <section>
        <div className="bannerPict relative h-[200px] w-full bg-black">
          <div className="profileContainer  w-[60%] left-[20%] absolute top-[50%] rounded-2xl flex flex-col justify-center items-center bg-white">
            <div className="w-[170px] h-[170px] border-none flex items-center justify-center bg-black overflow-hidden rounded-[50%]">
              <img
                className="w-[170px] cursor-pointer"
                src={user.profilePictures}
                alt="Profile Picture"
                onClick={getChangeProfilePhoto}
              />
            </div>
            <div>
              <p>Follower: {user.follower}</p>
              <p>Following: {user.following}</p>
              <button onClick={handleLogout}>Log out</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
