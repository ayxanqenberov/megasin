import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/app/store";
import { fetchUsers } from "../../../features/Users/userSlice";
import { fetchPosts } from "../../../features/Posts/postSlice";
import { checkup } from "../../../features/Comments/commentSlice";
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

const AdminHome = () => {
  const dispatch = useDispatch();

  const { users, isLoading: userLoading } = useSelector(
    (state: RootState) => state.user
  );
  const { posts, isLoading: postLoading } = useSelector(
    (state: RootState) => state.posts
  );
  const { commentsWithDetails, isLoading: commentLoading } = useSelector(
    (state: RootState) => state.comments
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
    dispatch(checkup());
  }, [dispatch]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const data = [
    { name: "Users", value: users?.length || 0 },
    { name: "Posts", value: posts?.length || 0 },
    { name: "Comments", value: commentsWithDetails?.length || 0 },
  ];
  const mostLikedPost = posts?.reduce(
    (prev, current) => (current.likeCount > prev.likeCount ? current : prev),
    posts[0]
  );

  return (
    <div className="flex">
      <AdminAside />
      <div className="w-[80%] p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="w-full ]">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded shadow">
              <span className="font-semibold text-lg">Total User Count</span>
              <p className="text-2xl mt-2">
                 {users?.length}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <span className="font-semibold text-lg">Total Post Count</span>
              <p className="text-2xl mt-2">
                {postLoading ? "Loading..." : posts?.length || 0}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <span className="font-semibold text-lg">Total Comment Count</span>
              <p className="text-2xl mt-2">
                {commentLoading
                  ? "Loading..."
                  : commentsWithDetails?.length || 0}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <span className="font-semibold text-lg">Most Liked Post</span>
              <p className="mt-2">
                {postLoading
                  ? "Loading..."
                  : mostLikedPost
                  ? `"${mostLikedPost.title}" (${mostLikedPost.likeCount} likes)`
                  : "No posts available"}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Data Overview</h2>
            <PieChart width={400} height={300}>
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
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Most Liked Post</h2>
            {mostLikedPost ? (
              <BarChart width={400} height={300} data={[mostLikedPost]}>
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likeCount" fill="#82ca9d" />
              </BarChart>
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
