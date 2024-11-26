import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/app/store";
import { deleteUser, fetchUsers } from "../../../features/Users/userSlice";
import AdminAside from "../adminComp/adminAside";

const AdminUser = () => {
  const dispatch: AppDispatch = useDispatch();

  // Access the users and loading state from Redux
  const { users, isLoading, error } = useSelector((state: RootState) => state.user);

  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Loading state
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading users...</div>;
  }
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };
  // Error state
  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex">
      <div className="flex flex-col w-full p-6">
        <h1 className="text-2xl font-bold mb-6">Admin User Management</h1>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-200 p-4">ID</th>
              <th className="border border-gray-200 p-4">Username</th>
              <th className="border border-gray-200 p-4">Email</th>
              <th className="border border-gray-200 p-4">Followers</th>
              <th className="border border-gray-200 p-4">Created Accounts</th>
              <th className="border border-gray-200 p-4">Passwords</th>
              <th className="border border-gray-200 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 p-4">{user.id}</td>
                <td className="border border-gray-200 p-4">{user.username}</td>
                <td className="border border-gray-200 p-4">{user.email}</td>
                <td className="border border-gray-200 p-4">{user.follower}</td>
                <td className="border border-gray-200 p-4">{user.createdAccount}</td>
                <td className="border border-gray-200 p-4">{user.password}</td>
                <td className="border border-gray-200 p-4">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(user.id)}
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

export default AdminUser;
