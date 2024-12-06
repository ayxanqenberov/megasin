import { IoMdSend } from "react-icons/io";
import Header from "../../Components/Header/Header";

import { useEffect, useState } from "react";
import { fetchPosts } from "../../features/Posts/postSlice";
import { fetchUsers } from "../../features/Users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import { useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

const Detail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = parseInt(queryParams.get("postId") || "0", 10);

  const dispatch = useDispatch();
  const { posts, error: postsError } = useSelector(
    (state: RootState) => state.posts
  );
  const { users } = useSelector((state: RootState) => state.user);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPosts());
    if (users.length === 0) dispatch(fetchUsers());
  }, [dispatch, posts.length, users.length]);

  const post = posts.find((item) => Number(item.id) === postId);
  const postUser = users.find((user) => user.id === post?.userId);

  if (postsError) {
    return <div>Error fetching posts: {postsError}</div>;
  }
  if (!post) {
    return (
      <div className="flex items-center h-[100vh] text-red-600 justify-center">
        <h2>Post loading...</h2>
      </div>
    );
  }

  const handleSendComment = () => {
    if (!commentText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }
    setCommentText("");
  };

  return (
    <>
      <Header />
      <section>
        <div className="flex pt-3 items-start w-[70%] gap-[10px] m-auto">
          <div className="flex w-[65%] bg-white border-[0.5px] mb-3 border-t-none border-[#d2d1d1] flex-col">
            <h1 className="p-2 text-2xl capitalize" style={{ fontFamily: "Oswald" }}>
              {post.title}
            </h1>
            <img
              src={post.postPicture || "https://via.placeholder.com/150"}
              alt={post.title}
              className="w-full h-auto"
            />
            <p className="p-2 font-semibold">{post.content}</p>
            <p className="p-2">Likes: {post.likedUsers.length}</p>
          </div>
          <div className="w-[35%] flex flex-col items-start gap-3 bg-white border-[0.5px] border-[#d2d1d1] p-3">
            <div className="flex items-center gap-2">
              <img
                className="w-[50px] h-[50px] object-cover rounded-[50%]"
                src={postUser?.profilePictures || "https://via.placeholder.com/50"}
                alt="Profile"
              />
              <span className="text-lg font-semibold">{postUser?.username}</span>
            </div>
            <p className="text-gray-600">{postUser?.bio}</p>
            <span className="text-blue-500">
              Followers: {postUser?.followerUser.length || 0}
            </span>
            <span className="text-gray-500 text-sm">
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
