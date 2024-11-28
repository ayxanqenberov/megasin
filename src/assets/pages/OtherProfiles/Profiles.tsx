import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/app/store";
import { fetchPosts } from "../../features/Posts/postSlice";
import { fetchUsers } from "../../features/Users/userSlice";
import Loading from "../../Components/Loadings/Loading";
import Header from "../../Components/Header/Header";

const Profiles = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { posts, isLoading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const allUsers = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    if (allUsers.length === 0) {
      dispatch(fetchUsers());
    }
    dispatch(fetchPosts());
  }, [dispatch, allUsers.length]);

  if (allUsers.length === 0)
    return (
      <div className="w-full h-[100vh] items-center justify-center">
        <Loading />
      </div>
    );
  if (isLoading)
    return (
      <div className="w-full h-[100vh] items-center justify-center">
        <Loading />
      </div>
    );
  if (error) return <p className="text-red-600">{error}</p>;

  const visitedUser = allUsers.find((user) => user.username === username);

  if (!visitedUser) return <p>User not found</p>;

  const userPosts = posts.filter((post) => post.userId === visitedUser.id);

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${visitedUser.bannerPict})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="bannerPict flex justify-end items-start p-5 relative h-[220px] w-full bg-black"
      ></div>
      <section className="w-full flex items-start lg:flex-row gap-8 p-6 lg:p-12 bg-gray-50">
        <div className="lg:w-1/3 w-full bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center gap-4">
            <img
              src={visitedUser.profilePictures}
              alt={`${visitedUser.username}'s profile`}
              className="w-32 h-32 rounded-full object-cover border"
            />
            <h2 className="text-xl font-bold text-gray-800">
              {visitedUser.username}
            </h2>
            <p className="text-gray-600 text-center">
              This is {visitedUser.username}'s profile. Welcome!
            </p>
            <p>{visitedUser.bio}</p>
            <div className="flex gap-2">
              <span>Created At:</span>
              <span className="text-gray-500 text-[13px]">
                {visitedUser.createdAccount
                  ? new Date(visitedUser.createdAccount).toLocaleDateString()
                  : "Unknown date"}
              </span>
            </div>

            <span className="text-blue-500">
              {visitedUser.followerUser.length} follower
            </span>
          </div>
        </div>
        <div className="lg:w-2/3 w-full">
          <h2 className="text-2xl font-semibold mb-4">
            {visitedUser.username}'s Posts
          </h2>
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <img
                    src={post.postPicture}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600">{post.content}</p>
                    <div className="mt-2 flex items-center gap-4 text-gray-500 text-sm">
                      <span>Likes: {post.likedUsers.length}</span>
                      <span>Comments: {post.comentCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              {visitedUser.username} doesn't have any posts yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Profiles;
