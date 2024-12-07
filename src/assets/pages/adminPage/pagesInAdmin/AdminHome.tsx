import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/app/store";
import { fetchUsers } from "../../../features/Users/userSlice";
import { fetchPosts } from "../../../features/Posts/postSlice";
import AdminAside from "../adminComp/adminAside";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from "../../../features/Admin/adminSlice";

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, isLoading: userLoading } = useSelector(
    (state: RootState) => state.user
  );
  const { posts, isLoading: postLoading } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, [dispatch]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const data = [
    { name: "Users", value: users?.length || 0 },
    { name: "Posts", value: posts?.length || 0 },
  ];
  const mostLikedPost = posts?.reduce(
    (prev, current) =>
      current.likedUsers.length > prev.likedUsers.length ? current : prev,
    posts[0]
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50">
      <AdminAside />
      <main className="flex-grow p-4 lg:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
            onClick={handleLogout}
          >
            <IoLogOutOutline size={20} />
            Log Out
          </button>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <span className="text-gray-600 text-sm font-medium">
              Total Users
            </span>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {userLoading ? "Loading..." : users?.length || 0}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <span className="text-gray-600 text-sm font-medium">
              Total Posts
            </span>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {postLoading ? "Loading..." : posts?.length || 0}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <span className="text-gray-600 text-sm font-medium">
              Notifications
            </span>
            <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <span className="text-gray-600 text-sm font-medium">
              Most Liked Post
            </span>
            <p className="text-sm text-gray-700 mt-2">
              {postLoading
                ? "Loading..."
                : mostLikedPost
                ? `"${mostLikedPost.title}" (${mostLikedPost.likedUsers.length} likes)`
                : "No posts available"}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Data Overview</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Most Liked Post
            </h2>
            {mostLikedPost ? (
              <BarChart width={400} height={300} data={[mostLikedPost]}>
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likedUsers.length" fill="#82ca9d" />
              </BarChart>
            ) : (
              <p className="text-gray-600">No posts available</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminHome;
