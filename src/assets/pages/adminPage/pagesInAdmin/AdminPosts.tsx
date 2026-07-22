import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/app/store";
import {
  fetchPosts,
  deletePosts,
} from "../../../features/Posts/postSlice";
import AdminAside from "../adminComp/adminAside";
import Loading from "../../../Components/Loadings/Loading";

interface AdminPostItem {
  id: string | number;
  userId: string | number;
  username: string;
  title: string;
  content?: string;
  likedUsers: (string | number)[];
}

const AdminPosts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { posts, isLoading, error } = useSelector(
    (state: RootState) => state.posts
  ) as { posts: AdminPostItem[]; isLoading: boolean; error: string | null };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (postId: string | number): void => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      type DeletePostParam = Parameters<typeof deletePosts>[0];
      const safeId = String(postId) as unknown as DeletePostParam;
      
      dispatch(deletePosts(safeId));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <AdminAside />

      <div className="p-6 w-full max-sm:w-full lg:w-[80%]">
        {error && <p className="text-red-500 mb-4">Error fetching posts: {error}</p>}

        {!isLoading && !error && posts.length === 0 && (
          <p>No posts available</p>
        )}

        <h1 className="text-2xl font-bold mb-6">
          Admin Posts Management
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Post ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">User ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Content</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Likes</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr key={String(post.id)} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {post.id}
                  </td>
                  
                  <td className="border border-gray-300 px-4 py-2">
                    {post.userId}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {post.username}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {post.title}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    {post.content || "No content"}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {post.likedUsers ? post.likedUsers.length : 0}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;