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
  const { posts, isLoading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const { commentsWithDetails} = useSelector(
    (state: RootState) => state.comments
  );
  const { user } = useSelector((state: RootState) => state.user);

  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const post = posts.find((item) => Number(item.id) === postId);
  useEffect(() => {
    dispatch(checkup());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error fetching comments: {error}</div>;
  }

  const filteredComments = commentsWithDetails?.filter(
    (comment) => comment.post?.id === postId
  ) || [];
  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error fetching posts: {error}</div>;
  }

  if (!post) {
    return (
      <div>
        <h2>Post not found</h2>
      </div>
    );
  }

  const handleSendComment = () => {
    if (!user) {
      alert("You need to be logged in to comment.");
      return;
    }

    if (commentText.trim() === "") {
      alert("Comment cannot be empty.");
      return;
    }

    dispatch(
      sendComment({
        userId: user.id, 
        comment: commentText,
        postId: post.id,
      })
    );

    setCommentText(""); 
  };

  return (
    <>
      <Header />
      <section>
        <div className="flex pt-3 items-start w-[70%] gap-[10px] m-auto">
          <div className="flex w-[65%] bg-white border-[0.5px] mb-3 border-t-none border-[#d2d1d1] flex-col">
            <h1 className="p-2">{post.title}</h1>
            <img
              src={post.postPicture || "https://via.placeholder.com/150"}
              alt={post.title}
            />
            <p className="p-2">{post.content}</p>
            <p className="p-2">Likes: {post.likeCount}</p>
            <p className="p-2">Comments: {post.comentCount}</p>
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
          <div className="w-[35%] bg-white border-[0.5px] border-[#d2d1d1]">
            <div className="flex items-center gap-2">
              <img
                className="w-[50px] h-[50px] object-cover rounded-[50%]"
                src={post.profilePicture}
                alt=""
              />
              <span className="text-lg font-semibold">{post.username}</span>
            </div>
            <button>Follow</button>
            <p></p>
            <div className="flex gap-3">
              <span>Contact:</span>
              <span>{}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="comment-section">
        <h2>Comments</h2>
        {filteredComments.length === 0 ? (
          <p>No comments for this post.</p>
        ) : (
          filteredComments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="user-info">
                <img
                  src={comment.user?.profilePicture || "https://via.placeholder.com/50"}
                  alt={`${comment.user?.name}'s profile`}
                  className="profile-picture"
                />
                <span>{comment.user?.name}</span>
              </div>
              <p>{comment.comment}</p>
              <small>Posted on: {new Date(comment.created).toLocaleString()}</small>
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default Detail;
