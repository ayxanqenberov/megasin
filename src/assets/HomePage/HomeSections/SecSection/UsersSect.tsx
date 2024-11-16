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

const UsersSect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, error } = useSelector(
    (state: RootState) =>
      state.user as { users: User[]; isLoading: boolean; error: string | null }
  );
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log("Dispatching fetchUsers...");
    dispatch(fetchUsers());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("Users from Redux state:", users);
  // }, [users]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
        {users.map((item) => (
          <SwiperSlide
            key={item.id}
          >
            <div className="bg-white flex flex-col items-center gap-2 py-4 rounded-md">
              <div className="">
                <img
                  src={item.profilePictures}
                  alt={`${item.username}'s profile`}
                  className="object-cover rounded-[50%] border w-[100px] h-[100px]"
                />
              </div>
              <span>{item.username}</span>
              <span>{item.follower}</span>
              <button>Follow</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default UsersSect;
