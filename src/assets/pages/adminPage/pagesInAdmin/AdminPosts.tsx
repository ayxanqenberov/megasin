import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePosts } from "../../../features/Posts/postSlice";
import AdminAside from "../adminComp/adminAside";
import { RootState } from "../../../redux/app/store";
import Loading from "../../../Components/Loadings/Loading";

const AdminPosts = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePosts(postId));
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading/>
      </div>
    );
  }
  return (
    <div className="flex">
      <AdminAside />
      <div className="p-6 w-[80%]">
        {isLoading && <p>Loading posts...</p>}
        {error && <p>Error fetching posts: {error}</p>}
        {!isLoading && !error && posts.length === 0 && (
          <p>No posts available</p>
        )}
        <h1 className="text-2xl font-bold mb-6">Admin Posts Management</h1>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Username
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Content
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Likes
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
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
                  {post.content}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {post.likedUsers.length}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
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
  );
};

export default AdminPosts;
