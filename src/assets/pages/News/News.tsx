import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { fetchNews, sortNewsAlphabetically, sortNewsByDate } from "../../features/News/newsSlice";

const News: React.FC = () => {
  const dispatch = useDispatch();
  const { news, status } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNews());
    }
  }, [status, dispatch]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "newest") {
      dispatch(sortNewsByDate());
    } else if (e.target.value === "alphabetical") {
      dispatch(sortNewsAlphabetically());
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <select
            onChange={handleSortChange}
            className="px-4 py-2 border rounded-md text-sm"
          >
            <option value="newest">Newest</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
          <span className="text-lg font-semibold">News List</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {item.pict && (
                <img
                  src={item.pict}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.content}</p>
                <span className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default News;
