import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/app/store";
import { logout, updateData } from "../../features/Users/userSlice";
import { deletePosts, fetchPosts } from "../../features/Posts/postSlice";
import Register from "../Registeration/Register";
import Header from "../../Components/Header/Header";
import { FaPen } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { LuCake } from "react-icons/lu";
import notPost from "../../images/Empty inbox.png";
import { RiDeleteBinLine } from "react-icons/ri";
import MentionText from "../../Components/MentionText/MentionText";

interface UserType {
  id: string | number;
  username: string;
  email: string;
  bio: string;
  profilePictures: string;
  bannerPict: string;
  followerUser: string[] | number[];
  createdAccount: string | number | Date;
}

interface PostType {
  id: string | number;
  userId: string | number;
  title: string;
  content: string;
  postPicture?: string;
  likedUsers: string[] | number[];
  createdAt: string | number | Date;
}

const Profile: React.FC = () => {
  const user = useSelector(
    (state: RootState) => state.user.user,
  ) as UserType | null;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { posts } = useSelector((state: RootState) => state.posts) as {
    posts: PostType[];
  };

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profilePictures, setProfilePictures] = useState<string>("");
  const [bannerPict, setBannerPict] = useState<string>("");

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
      setProfilePictures(user.profilePictures || "");
      setBannerPict(user.bannerPict || "");
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const userPosts = posts.filter(
    (post) => String(post.userId) === String(user?.id),
  );

  const handleLogout = (): void => {
    dispatch(logout());
    navigate("/");
  };

  const deletePost = (postId: string | number): void => {
    type DeletePostsParam = Parameters<typeof deletePosts>[0];
    const safePostId = String(postId) as unknown as DeletePostsParam;
    
    dispatch(deletePosts(safePostId));
  };

  const getWrite = (): void => {
    navigate(`/${username}/new`);
  };

  const handleUpdateProfile = (): void => {
    if (user && bio.length <= 200) {
      dispatch(
        updateData({
          id: String(user.id),
          username,
          email,
          bio,
          profilePictures,
          bannerPict,
        }),
      );
      setIsEditMode(false);
    }
  };

  const getDetail = (userNm: string, id: string | number): void => {
    navigate(`/@${userNm}/detail?postId=${id}`);
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className="flex pt-5 flex-col dark:bg-black dark:text-white items-center justify-center w-full m-auto">
          <p className="text-center dark:bg-black dark:text-white">
            You don't have an account! If you want to continue, you must create
            a user or log in if you have one.
          </p>
          <Register />
        </div>
      </>
    );
  }

  const formattedDate = user.createdAccount
    ? new Date(user.createdAccount).toLocaleDateString()
    : "Unknown Date";

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
          <div className="profileContainer dark:bg-black dark:text-white w-[80%] md:w-[60%] left-[10%] md:left-[20%] pb-4 absolute z-20 top-[50%] rounded-2xl flex flex-col justify-around items-start bg-white shadow-lg">
            <div className="flex px-7 max-[600px]:flex-col dark:bg-black dark:text-white max-[600px]:text-center w-full items-center">
              <div className="border border-gray-300 rounded-full w-[120px] h-[120px] md:w-[150px] md:h-[150px] overflow-hidden m-3">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={
                    user.profilePictures ||
                    "https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798821_clzISlzMqjLxx8YjYFBfOaVvIj5qifwm.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">{user.username}</span>
                <p className="text-blue-500">
                  {user.followerUser ? user.followerUser.length : 0} follower
                </p>
                <div className="text-gray-400 flex items-center gap-1 font-medium justify-center max-[600px]:justify-center">
                  <span>Account Created: {formattedDate}</span>
                  <LuCake />
                </div>
              </div>
            </div>
            <div className="text-start w-[90%] dark:bg-black dark:text-white max-[600px]:text-center text-ellipsis flex gap-1 justify-start mx-auto text-gray-600">
              <MentionText text={user.bio} />
            </div>
          </div>
          <div className="flex items-center gap-4 pr-5 z-30">
            <div
              onClick={() => setIsEditMode(true)}
              className="edit cursor-pointer flex items-center justify-center w-[35px] h-[35px] bg-white hover:text-red-600 duration-200 hover:bg-[#f1f3ff] p-2 rounded-full text-black"
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
          <div className="editModal dark:bg-black dark:text-white w-[80%] md:w-[60%] rounded-xl p-5 top-[16%] left-[10%] md:left-[20%] absolute bg-white border border-gray-600 z-50 shadow-2xl">
            <div className="flex dark:bg-black dark:text-white items-center justify-between">
              <h2 className="pt-3 dark:bg-black dark:text-white text-black font-bold text-lg">
                Edit Profile
              </h2>
              <TiDelete
                onClick={() => setIsEditMode(false)}
                className="text-black duration-200 dark:bg-black dark:text-white hover:text-red-600 text-3xl cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex dark:bg-black dark:text-white flex-col gap-2 pt-5">
                <label className="font-medium dark:bg-black dark:text-white text-[#171717]">
                  Username:
                </label>
                <input
                  className="border border-[#A3A3A3] dark:bg-black dark:text-white p-[7px] outline-red-600 rounded-lg"
                  type="text"
                  value={username}
                  placeholder="Enter username"
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.select()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const noSpaces = e.target.value.replace(/\s/g, "");
                    setUsername(noSpaces);
                  }}
                />
              </div>
              <div className="flex flex-col dark:bg-black dark:text-white gap-2">
                <label className="font-medium dark:bg-black dark:text-white text-[#171717]">
                  Email:
                </label>
                <input
                  className="border dark:bg-black dark:text-white border-[#A3A3A3] p-[7px] outline-red-600 rounded-lg"
                  type="text"
                  value={email}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.select()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex dark:bg-black dark:text-white flex-col gap-2">
                <label className="font-medium dark:bg-black dark:text-white text-[#171717]">
                  Bio:
                </label>
                <input
                  className="border dark:bg-black dark:text-white border-[#A3A3A3] p-[7px] outline-red-600 rounded-lg"
                  type="text"
                  value={bio}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.select()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBio(e.target.value)}
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
                <label className="font-medium dark:bg-black dark:text-white text-[#171717]">
                  Profile Picture URL:
                </label>
                <input
                  className="border border-[#A3A3A3] dark:bg-black dark:text-white p-[7px] outline-red-600 rounded-lg"
                  type="text"
                  value={profilePictures}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.select()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfilePictures(e.target.value)}
                />
              </div>
              <div className="flex dark:bg-black dark:text-white flex-col gap-2">
                <label className="font-medium dark:bg-black dark:text-white text-[#171717]">
                  Banner Picture URL:
                </label>
                <input
                  className="border dark:bg-black dark:text-white border-[#A3A3A3] p-[7px] outline-red-600 rounded-lg"
                  type="text"
                  value={bannerPict}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.select()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBannerPict(e.target.value)}
                />
              </div>
              <button
                className="bg-green-400 w-[150px] m-auto p-2 rounded-md text-[#2b2b2b] font-bold text-[13px] hover:bg-green-500 duration-200 hover:text-black disabled:opacity-50"
                onClick={handleUpdateProfile}
                disabled={bio.length > 200}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </section>

      <section
        className={
          userPosts.length === 0
            ? "hidden"
            : "flex dark:text-white flex-col gap-3 mt-36 sm:mt-28"
        }
      >
        <div className="bg-[#f7f7f7] gap-2 rounded-b-2xl dark:bg-gray-950 dark:text-white shadow-md flex justify-start px-[30px] pb-[15px] items-end w-[80%] md:w-[60%] m-auto h-[100px] max-sm:text-center">
          <span>Posts:</span>
          <span>{userPosts.length}</span>
        </div>

        <div className="w-[80%] md:w-[60%] m-auto">
          <div className="w-full dark:bg-black dark:text-white bg-[#f7f7f7] p-3 rounded-2xl shadow-md m-auto">
            <div className="post-list dark:bg-black dark:text-white grid grid-cols-1 md:grid-cols-2 gap-4">
              {userPosts.map((post) => (
                <div
                  key={String(post.id)}
                  className="post-card border flex flex-col gap-3 rounded p-4"
                >
                  <div className="w-full flex items-start justify-between">
                    <h3
                      onClick={() => getDetail(user.username, post.id)}
                      className="cursor-pointer hover:text-red-600 duration-200 font-bold w-[97%]"
                    >
                      <MentionText text={post.title} />
                    </h3>
                    <RiDeleteBinLine
                      onClick={() => deletePost(post.id)}
                      className="cursor-pointer w-[40px] hover:text-red-600 duration-200"
                    />
                  </div>
                  <span className="text-[#9CA7BC] text-xs">
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleString()
                      : ""}
                  </span>
                  {post.postPicture && (
                    <img
                      src={post.postPicture}
                      alt={post.title}
                      className="w-full h-40 object-cover rounded"
                    />
                  )}
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      Likes: {post.likedUsers ? post.likedUsers.length : 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className={
          userPosts.length === 0
            ? "flex h-[350px] flex-col justify-end pb-[30px] items-center w-full m-auto mt-36 sm:mt-28"
            : "hidden"
        }
      >
        <div className="w-[80%] md:w-[60%] rounded-xl dark:bg-black dark:text-white mb-[10px] flex flex-col gap-4 justify-center items-center bg-white p-3 shadow-md">
          <span className="dark:bg-black dark:text-white font-medium">
            No posts yet
          </span>
          <div className="h-[150px] overflow-hidden">
            <img src={notPost} className="w-[200px] object-cover" alt="Empty" />
          </div>
          <button
            onClick={getWrite}
            className="border hover:bg-black duration-200 hover:text-white border-black px-4 py-2 rounded-xl text-sm font-medium"
          >
            Get Started
          </button>
        </div>
      </section>
    </>
  );
};

export default Profile;