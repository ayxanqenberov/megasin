import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/app/store";
import { toggleFollowUser } from "../../features/Users/userSlice";

// Mövcud istifadəçi tipini dəqiqləşdirmək üçün interfeys
interface UserItem {
  id: string | number;
  username: string;
  followerUser: (string | number)[];
  profilePictures?: string;
  bio?: string;
}

interface FollowButtonProps {
  targetUserId: string | number;
}

const FollowButton: React.FC<FollowButtonProps> = ({ targetUserId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, users, isLoading } = useSelector(
    (state: RootState) => state.user
  ) as { user: UserItem | null; users: UserItem[]; isLoading: boolean };

  if (!user) return null;

  // 'any' yerinə 'UserItem' tipi ilə təhlükəsiz axtarış edirik
  const targetUser = users.find((u: UserItem) => String(u.id) === String(targetUserId));
  
  const isFollowing =
    targetUser?.followerUser?.some((followerId: string | number) => String(followerId) === String(user.id)) ?? false;

  const handleFollowToggle = () => {
    if (!isLoading) {
      // 'as any' casting ləğv edildi
      dispatch(toggleFollowUser({ targetUserId }));
    }
  };

  return (
    <button
      id="notification-button"
      onClick={handleFollowToggle}
      disabled={isLoading}
      className={`px-4 max-[450px]:px-[2.9px] max-[450px]:text-[14px] py-2 max-[450px]:py-[1.9px] rounded transition-all duration-200 ${
        isFollowing
          ? "bg-gray-200 text-black"
          : "bg-blue-500 text-white"
      }`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;