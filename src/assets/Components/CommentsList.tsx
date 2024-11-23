import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/app/store";

const CommentsList = () => {
  const { comments, isLoading, error } = useSelector((state: RootState) => state.comments);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id} className="comment-item">
          <img
            src={comment.userPP}
            alt={`${comment.username}'s avatar`}
            className="profile-photo"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <strong>{comment.username}</strong>
          <p>{comment.comment}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
