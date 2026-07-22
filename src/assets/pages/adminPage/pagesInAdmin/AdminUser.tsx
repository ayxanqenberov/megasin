import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/app/store";
import { deleteUser, fetchUsers } from "../../../features/Users/userSlice";
import AdminAside from "../adminComp/adminAside";
import Loading from "../../../Components/Loadings/Loading";
interface AdminUserItem {
  id: string | number;
  username: string;
  email: string;
  followerUser: (string | number)[];
  createdAccount?: string;
  password?: string;
}

const AdminUser: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, error } = useSelector(
    (state: RootState) => state.user
  ) as { users: AdminUserItem[]; isLoading: boolean; error: string | null };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center w-full h-[100vh] items-center">
        <Loading />
      </div>
    );
  }

  const handleDelete = (id: string | number): void => {
    if (confirm("Are you sure you want to delete this user?")) {
      type DeleteUserParam = Parameters<typeof deleteUser>[0];
      const safeId = String(id) as unknown as DeleteUserParam;
      
      dispatch(deleteUser(safeId));
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminAside />
      <div className="w-[80%] flex flex-col p-6">
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
              <tr key={String(user.id)} className="hover:bg-gray-50">
                <td className="border border-gray-200 p-4">{user.id}</td>
                <td className="border border-gray-200 p-4">{user.username}</td>
                <td className="border border-gray-200 p-4">{user.email}</td>
                <td className="border border-gray-200 p-4">
                  {user.followerUser ? user.followerUser.length : 0}
                </td>
                <td className="border border-gray-200 p-4">
                  {user.createdAccount || "N/A"}
                </td>
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