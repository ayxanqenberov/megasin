import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, postNotification } from "../../../features/Notificians/notifcnsSlice";
import AdminAside from "../adminComp/adminAside";

const AdminNotf = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { notifications, status } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleSendNotification = () => {
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    const notification = {
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    dispatch(postNotification(notification));
    setTitle("");
    setContent("");
    alert("Notification sent successfully!");
  };

  return (
    <div className="flex items-start justify-start">
      <AdminAside />
      <div className="flex flex-col my-4 px-3">
        <div className="max-w-md  bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Send Notification</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder="Enter notification title"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder="Enter notification content"
            />
            <button
              onClick={handleSendNotification}
              className="w-full py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300"
            >
              Send Notification
            </button>
          </div>
        </div>

        {/* Notification list */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Notifications</h2>
          {status === "loading" ? (
            <p>Loading notifications...</p>
          ) : (
            <table className="w-full table-auto border-collapse border border-gray-300 text-left text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Content</th>
                  <th className="border border-gray-300 px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notif) => (
                  <tr key={notif.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{notif.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{notif.title}</td>
                    <td className="border border-gray-300 px-4 py-2">{notif.content}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(notif.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNotf;
