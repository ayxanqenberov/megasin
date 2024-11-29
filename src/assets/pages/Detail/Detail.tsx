import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchPosts } from "../../features/Posts/postSlice";
import { checkup, sendComment } from "../../features/Comments/commentSlice";
import { RootState } from "../../redux/app/store";
import Header from "../../Components/Header/Header";
import { IoMdSend } from "react-icons/io";
import { useEffect, useState } from "react";

const Detail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = parseInt(queryParams.get("postId") || "0", 10);

  const dispatch = useDispatch();
  const { posts, error: postsError } = useSelector(
    (state: RootState) => state.posts
  );
  const { commentsWithDetails, error: commentsError } = useSelector(
    (state: RootState) => state.comments
  );
  const { user } = useSelector((state: RootState) => state.user);
  const [commentText, setCommentText] = useState("");
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(checkup());
  }, [dispatch]);

  const post = posts.find((item) => Number(item.id) === postId);
  if (postsError) {
    return <div>Error fetching posts: {postsError}</div>;
  }
  if (commentsError) {
    return <div>Error fetching comments: {commentsError}</div>;
  }
  if (!post) {
    return (
      <div className="flex items-center h-[100vh] text-red-600 justify-center">
        <h2>Post loading...</h2>
      </div>
    );
  }

  const filteredComments = commentsWithDetails
    .filter((comment) => comment.post?.id === postId)
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );

  const handleSendComment = () => {
    if (!user) {
      alert("You need to be logged in to comment.");
      return;
    }

    if (commentText.trim() === "") {
      alert("Comment cannot be empty.");
      return;
    }
    console.log(commentsWithDetails)
    dispatch(
      sendComment({
        comment: commentText,
        postId: postId,
      })
    );

    setCommentText("");
  };
  console.log(commentsWithDetails);

  return (
    <>
      <Header />
      <section>
        <div className="flex pt-3 items-start w-[70%] gap-[10px] m-auto">
          <div className="flex w-[65%] bg-white border-[0.5px] mb-3 border-t-none border-[#d2d1d1] flex-col">
            <h1
              className="p-2 text-2xl capitalize"
              style={{ fontFamily: "Oswald" }}
            >
              {post.title}
            </h1>
            <img
              src={post.postPicture || "https://via.placeholder.com/150"}
              alt={post.title}
              className="w-full h-auto"
            />
            <p className="p-2 font-semibold">{post.content}</p>
            <p className="p-2">Likes: {post.likedUsers.length}</p>
            <p className="p-2">Comments: {filteredComments.length}</p>
            <div className="flex items-center justify-between border-t-black border w-full">
              <input
                className="px-2 w-[70%] outline-none py-3"
                type="text"
                placeholder="Comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <IoMdSend
                onClick={handleSendComment}
                className="text-xl mr-1.5 cursor-pointer"
              />
            </div>
          </div>
          <div className="w-[35%] flex flex-col items-start gap-3 bg-white border-[0.5px] border-[#d2d1d1] p-3">
            <div className="flex items-center gap-2">
              <img
                className="w-[50px] h-[50px] object-cover rounded-[50%]"
                src={post.profilePicture}
                alt="Profile"
              />
              <span className="text-lg font-semibold">{post.username}</span>
            </div>
          </div>
        </div>
      </section>
      <div className="comment-div mt-5 w-[70%] m-auto">
        <h2>Comments</h2>
        {filteredComments.map((comment) => (
          <div
            key={comment.id}
            className="comment-card mb-3 p-3 border rounded"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={
                  comment.user?.profilePictures ||
                  "https://via.placeholder.com/50"
                }
                alt={`${comment.user?.username}'s profile`}
                className="w-[40px] h-[40px] rounded-full"
              />
              <span className="font-semibold">{comment.user?.username}</span>
            </div>
            <p>{comment.comment}</p>
            <small className="text-gray-500">
              Posted on: {new Date(comment.created).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </>
  );
};

export default Detail;
