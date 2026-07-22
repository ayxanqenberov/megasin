import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import MentionText from "../../Components/MentionText/MentionText";
import { fetchPosts } from "../../features/Posts/postSlice";
import { fetchUsers } from "../../features/Users/userSlice";
import { RootState, AppDispatch } from "../../redux/app/store";

interface PostItem {
  id: string | number;
  userId: string | number;
  title: string;
  content: string;
  postPicture?: string;
  likedUsers: (string | number)[];
}

interface UserItem {
  id: string | number;
  username: string;
  bio?: string;
  profilePictures?: string;
  followerUser: (string | number)[];
  createdAccount?: string | number | Date;
}

const Detail: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId") || "0";

  const dispatch: AppDispatch = useDispatch();
  const { posts, error: postsError } = useSelector(
    (state: RootState) => state.posts
  ) as { posts: PostItem[]; error: string | null };
  
  const { users } = useSelector(
    (state: RootState) => state.user
  ) as { users: UserItem[] };

  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPosts());
    if (users.length === 0) dispatch(fetchUsers());
  }, [dispatch, posts.length, users.length]);

  const post = posts.find((item) => String(item.id) === String(postId));
  const postUser = users.find((user) => String(user.id) === String(post?.userId));

  if (postsError) {
    return (
      <div className="flex items-center h-[100vh] text-red-600 justify-center">
        <h2>Error fetching posts: {postsError}</h2>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="flex items-center h-[100vh] text-blue-600 justify-center">
        <h2>Post loading...</h2>
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="min-h-[80vh] dark:bg-black py-6">
        <div className="flex flex-col md:flex-row dark:text-white items-start w-[90%] md:w-[75%] lg:w-[70%] gap-4 m-auto">
          <div className="flex w-full md:w-[65%] dark:bg-zinc-900 dark:text-white bg-white border border-[#d2d1d1] dark:border-zinc-800 rounded-md overflow-hidden flex-col shadow-sm">
            <h1 className="p-4 text-2xl md:text-3xl font-bold capitalize" style={{ fontFamily: "Oswald" }}>
              <MentionText text={post.title} />
            </h1>
            <img
              src={post.postPicture || "https://via.placeholder.com/150"}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
            <div className="p-4 flex flex-col gap-4">
              <p className="font-medium text-base leading-relaxed">
                <MentionText text={post.content} />
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                Likes: {post.likedUsers?.length || 0}
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-[35%] dark:bg-zinc-900 dark:text-white flex flex-col items-start gap-3 bg-white border border-[#d2d1d1] dark:border-zinc-800 p-4 rounded-md shadow-sm">
            <div className="flex items-center gap-3">
              <img
                className="w-[50px] h-[50px] object-cover rounded-full border border-gray-200"
                src={postUser?.profilePictures || "https://via.placeholder.com/50"}
                alt="Profile"
              />
              <span className="text-lg font-bold truncate max-w-[180px]">
                {postUser?.username || "Unknown User"}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm ">
              {postUser?.bio || "No bio available."}
            </p>
            <hr className="w-full border-gray-200 dark:border-zinc-800 my-1" />
            <span className="text-blue-500 font-medium text-sm">
              Followers: {postUser?.followerUser?.length || 0}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              Joined:{" "}
              {postUser?.createdAccount
                ? new Date(postUser.createdAccount).toLocaleDateString()
                : "Unknown date"}
            </span>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default Detail;