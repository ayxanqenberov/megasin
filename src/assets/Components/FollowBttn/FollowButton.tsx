import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/app/store";
import { toggleFollowUser } from "../../features/Users/userSlice";

interface FollowButtonProps {
  targetUserId: number;
}

const FollowButton: React.FC<FollowButtonProps> = ({ targetUserId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector((state: RootState) => state.user);

  // Ensure that followerUser is defined before calling includes()
  const isFollowing = user?.followerUser?.includes(targetUserId) || false;

  const handleFollowToggle = () => {
    if (!isLoading) {
      dispatch(toggleFollowUser({ targetUserId }));
    }
  };

  return (
    <button
      id="notification-button" // Ensure this element can trigger the audio
      onClick={handleFollowToggle}
      className={`px-4 py-2 rounded ${isFollowing ? "bg-gray-200 text-black" : "bg-blue-500 text-white"}`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
