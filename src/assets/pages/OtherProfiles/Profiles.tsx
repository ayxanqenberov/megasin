import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/app/store";
import { fetchPosts } from "../../features/Posts/postSlice";
import { fetchUsers } from "../../features/Users/userSlice";
import Loading from "../../Components/Loadings/Loading";
import Header from "../../Components/Header/Header";
import FollowButton from "../../Components/FollowBttn/FollowButton";
import MentionText from "../../Components/MentionText/MentionText";

interface User {
  id: string | number;
  username: string;
  profilePictures: string;
  bannerPict?: string;
  bio?: string;
  createdAccount?: string;
  followerUser: (string | number)[];
}

interface Post {
  id: string | number;
  userId: string | number;
  title: string;
  content: string;
  postPicture?: string;
  likedUsers: (string | number)[];
}

const Profiles: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { posts, isLoading, error } = useSelector((state: RootState) => state.posts) as {
    posts: Post[];
    isLoading: boolean;
    error: string | null;
  };
  const allUsers = useSelector((state: RootState) => state.user.users) as User[];

  useEffect(() => {
    if (allUsers.length === 0) {
      dispatch(fetchUsers());
    }
    dispatch(fetchPosts());
  }, [dispatch, allUsers.length]);

  if (error) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[60vh] px-4">
          <p className="text-red-600 bg-red-50 dark:bg-zinc-900 dark:text-red-400 p-4 rounded-lg w-full max-w-md text-center shadow">
            {error}
          </p>
        </div>
      </>
    );
  }

  const visitedUser = allUsers.find((user) => user.username === username);

  if (!visitedUser && allUsers.length > 0) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-gray-500 dark:text-gray-400 text-lg">User not found</p>
        </div>
      </>
    );
  }

  const userPosts = visitedUser
    ? posts.filter((post) => String(post.userId) === String(visitedUser.id))
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header />
      
      <div
        style={{
          backgroundImage: visitedUser?.bannerPict ? `url(${visitedUser.bannerPict})` : 'none',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        className="bannerPict w-full h-[150px] sm:h-[200px] md:h-[250px] bg-gradient-to-r from-purple-900 to-indigo-950 relative"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {allUsers.length === 0 || isLoading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <Loading />
          </div>
        ) : visitedUser ? (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            <div className="w-full lg:w-1/3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm text-center lg:sticky lg:top-24">
              <div className="flex flex-col items-center gap-4">
                
                <div className="relative -mt-20 sm:-mt-24 lg:-mt-24 mb-2">
                  <img
                    src={visitedUser.profilePictures || "https://via.placeholder.com/150"}
                    alt={`${visitedUser.username}'s profile`}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white dark:border-zinc-900 shadow-md"
                  />
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate max-w-full">
                  {visitedUser.username}
                </h2>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This is {visitedUser.username}'s profile. Welcome!
                </p>

                {visitedUser.bio && (
                  <div className="text-gray-600 dark:text-zinc-300 text-sm break-words max-w-full my-2 bg-gray-50 dark:bg-zinc-800/50 p-3 rounded-xl w-full">
                    <MentionText text={visitedUser.bio} />
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
                  <span>Created At:</span>
                  <span className="font-medium">
                    {visitedUser.createdAccount
                      ? new Date(visitedUser.createdAccount).toLocaleDateString()
                      : "Unknown date"}
                  </span>
                </div>

                <div className="text-sm font-semibold text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-4 py-1.5 rounded-full my-2">
                  {visitedUser.followerUser ? visitedUser.followerUser.length : 0} follower
                </div>

                <div className="w-full mt-2">
                  <FollowButton targetUserId={visitedUser.id} />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span>{visitedUser.username}'s Posts</span>
                <span className="text-sm font-normal text-gray-400 dark:text-zinc-500 bg-gray-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full">
                  {userPosts.length}
                </span>
              </h2>

              {userPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {userPosts.map((post) => (
                    <div
                      key={String(post.id)}
                      className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full"
                    >
                      {post.postPicture && (
                        <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-gray-100 dark:bg-zinc-800">
                          <img
                            src={post.postPicture}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-2 break-words">
                            <MentionText text={post.title} />
                          </h3>

                          <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 line-clamp-3 break-words">
                            <MentionText text={post.content} />
                          </p>
                        </div>

                        <div className="pt-3 border-t border-gray-50 dark:border-zinc-800/60 flex items-center text-xs text-gray-400 dark:text-zinc-500 font-medium">
                          <span>Likes: {post.likedUsers ? post.likedUsers.length : 0}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800">
                  <p className="text-gray-400 dark:text-zinc-500 text-sm sm:text-base px-4">
                    {visitedUser.username} doesn't have any posts yet.
                  </p>
                </div>
              )}
            </div>

          </div>
        ) : null}
      </main>
    </div>
  );
};

export default Profiles;