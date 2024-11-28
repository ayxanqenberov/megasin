import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../../../input.css";
import { Pagination } from "swiper/modules";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/app/store";
import { fetchUsers } from "../../../features/Users/userSlice";
import { User } from "../../../features/Users/userSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loadings/Loading";
import FollowButton from "../../../Components/FollowBttn/FollowButton";

const UsersSect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users, isLoading, error } = useSelector(
    (state: RootState) =>
      state.user as { users: User[]; isLoading: boolean; error: string | null }
  );
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) return <div className="w-full h-full items-center justify-center"> <Loading /></div>;
  if (error) return <p>{error}</p>;

  const sortedUsers = [...users].sort((a, b) => b.id - a.id);
  const usersToDisplay = sortedUsers.filter(item => item.id !== user?.id);

  const handleUserClick = (username: string) => {
    navigate(`/profiles/${username}`);
  };

  return (
    <section className={user ? "flex flex-col justify-between w-[90%] mt-2 m-auto pt-3" : "hidden"}>
      <h2 className="font-medium text-[17px] mb-1">Discover more people</h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {usersToDisplay.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white flex flex-col items-center gap-2 py-4 rounded-md">
              <div>
                <img
                  src={item.profilePictures}
                  alt={`${item.username}'s profile`}
                  className="object-cover rounded-[50%] border w-[100px] h-[100px]"
                />
              </div>
              <span
                className="text-blue-500 cursor-pointer font-semibold"
                onClick={() => handleUserClick(item.username)}
              >
                {item.username}
              </span>
              <span>{item.followerUser.length}</span>
              <FollowButton targetUserId={item.id} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default UsersSect;
