import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/app/store";
import AdminAside from "../adminComp/adminAside";
import { checkup } from "../../../features/Comments/commentSlice";

const AdminCommen = () => {
  const dispatch = useDispatch();
  const { commentsWithDetails, isLoading, error } = useSelector(
    (state: RootState) => state.comments
  );

  useEffect(() => {
    dispatch(checkup);
  }, [dispatch]);

  return (
    <div className="flex">
      <AdminAside />
      <div className="w-[80%] p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Comments Management</h1>
        {isLoading && <p>Loading comments...</p>}
        {error && <p>Error fetching comments: {error}</p>}
        {!isLoading && !error && commentsWithDetails.length === 0 && (
          <p>No comments available</p>
        )}
        {!isLoading && !error && commentsWithDetails.length > 0 && (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Comment</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {commentsWithDetails.map((comment) => (
                <tr key={comment.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {comment.user?.username || "Unknown User"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {comment.comment}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(comment.created).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminCommen;
