import { useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-expect-error - Swiper CSS modules might lack type definitions in strict mode
import "swiper/css";
// @ts-expect-error - Swiper Pagination CSS modules might lack type definitions in strict mode
import "swiper/css/pagination";

import "../../../../input.css";
import { Pagination } from "swiper/modules";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/app/store";
import { fetchUsers, selectAllUsers, selectUserIsLoading, selectCurrentUser } from "../../../features/Users/userSlice";
import { useNavigate } from "react-router-dom";
import FollowButton from "../../../Components/FollowBttn/FollowButton";

interface UserItem {
  id: string | number;
  username: string;
  profilePictures: string;
  followerUser: (string | number)[];
}

const UsersSect: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const users = useSelector(selectAllUsers) as UserItem[];
  const isLoading = useSelector(selectUserIsLoading);
  const user = useSelector(selectCurrentUser) as { id: string | number; username: string } | null;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const usersToDisplay = useMemo(() => {
    return [...users]
      .sort((a, b) => Number(b.id) - Number(a.id))
      .filter((item) => String(item.id) !== String(user?.id));
  }, [users, user?.id]);

  const handleUserClick = (username: string): void => {
    navigate(`/profiles/${username}`);
  };

  if (isLoading && usersToDisplay.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section
      className={
        user
          ? "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-4 block"
          : "hidden"
      }
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg md:text-xl text-gray-800 dark:text-white">
          Discover more people
        </h2>
      </div>

      <Swiper
        breakpoints={{
          320: { slidesPerView: 1.5, spaceBetween: 12 }, 
          480: { slidesPerView: 2.2, spaceBetween: 16 }, 
          640: { slidesPerView: 3, spaceBetween: 20 },   
          1024: { slidesPerView: 4, spaceBetween: 24 },  
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true, 
        }}
        modules={[Pagination]}
        className="mySwiper pb-10" 
      >
        {usersToDisplay.map((item) => (
          <SwiperSlide key={String(item.id)} className="h-auto">
            <div className="bg-white dark:bg-zinc-900 dark:text-white border dark:border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-between h-full text-center shadow-sm hover:shadow-md transition-all duration-200">
              
              <div className="flex flex-col items-center gap-3 w-full">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                  <img
                    src={item.profilePictures || "https://via.placeholder.com/150"}
                    alt={`${item.username}'s profile`}
                    className="w-full h-full object-cover rounded-full border border-gray-200 dark:border-zinc-700"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full px-2">
                  <span
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer font-bold text-sm sm:text-base truncate block"
                    onClick={() => handleUserClick(item.username)}
                    title={item.username} 
                  >
                    {item.username}
                  </span>

                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {item.followerUser ? item.followerUser.length : 0} follower
                  </span>
                </div>
              </div>
              
              <div className="w-full mt-4 pt-2 border-t border-gray-50 dark:border-zinc-800">
                {user?.username !== item.username && (
                  <FollowButton targetUserId={String(item.id)} />
                )}
              </div>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default UsersSect;