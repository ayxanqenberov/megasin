import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../features/Users/userSlice";
import { RootState } from "../../redux/app/store";

interface FollowProps {
  userId: string;
}

const Follow: React.FC<FollowProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.user);

  const handleFollow = () => {
    dispatch(followUser(userId));
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className={`mt-1 py-1 px-4 rounded ${isLoading ? "bg-gray-400" : "bg-blue-500 text-white"}`}
    >
      {isLoading ? "Following..." : "Follow"}
    </button>
  );
};

export default Follow;
