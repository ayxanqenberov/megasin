// src/components/AdminPanel.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminAside from "../adminComp/adminAside";
import { RootState } from "../../../redux/app/store";
import { createNews, deleteNews, fetchNews } from "../../../features/News/newsSlice";

const AdminNews: React.FC = () => {
  const dispatch = useDispatch();
  const { news } = useSelector((state: RootState) => state.news);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pict, setPict] = useState("");
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNews = {
      title,
      content,
      pict,
      createdAt: new Date().toISOString(),
    };
    dispatch(createNews(newNews));
    setTitle("");
    setContent("");
    setPict("");
  };

  const handleDelete = (id: string) => {
    dispatch(deleteNews(id));
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <AdminAside />
      <div className="flex-1 p-6 bg-white rounded-xl shadow-md mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create New News</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              News Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter news title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              placeholder="Enter news content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="pict" className="block text-sm font-medium text-gray-700 mb-1">
              Picture URL
            </label>
            <input
              id="pict"
              type="text"
              placeholder="Enter picture URL"
              value={pict}
              onChange={(e) => setPict(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto py-3 px-6 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create News
            </button>
          </div>
        </form>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">All News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={item.pict}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.content}</p>
                <span className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Delete News
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNews;
