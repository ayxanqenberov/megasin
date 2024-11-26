import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../features/Posts/postSlice';  
import AdminAside from '../adminComp/adminAside';
import { RootState } from '../../../redux/app/store';

const AdminPosts = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state: RootState) => state.posts); 

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="flex">
      <AdminAside />
      <div className="w-[80%] p-6">
        {isLoading && <p>Loading posts...</p>}
        {error && <p>Error fetching posts: {error}</p>}
        {!isLoading && !error && posts.length === 0 && <p>No posts available</p>}
        
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Content</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Likes</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Comments</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{post.title}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">{post.content}</td>
                <td className="border border-gray-300 px-4 py-2">{post.likeCount}</td>
                <td className="border border-gray-300 px-4 py-2">{post.comentCount}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
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
