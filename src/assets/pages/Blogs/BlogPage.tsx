import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/app/store";
import { fetchPosts } from "../../features/Posts/postSlice";
import { AiFillLike } from "react-icons/ai";
import Loading from "../../Components/Loadings/Loading";

const BlogPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { posts, isLoading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) return <div className="flex justify-center items-center"><Loading /></div>;
  if (error) return <div>Error: {error}</div>;

  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
  const totalPages = Math.ceil(sortedPosts.length / itemsPerPage);
  const currentPosts = sortedPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    if (currentPage > 2) pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPages - 2) pageNumbers.push("...");
    if (currentPage < totalPages) pageNumbers.push(totalPages);
    return pageNumbers;
  };

  const handlePageClick = (pageNumber: number | string) => {
    if (pageNumber !== "..." && pageNumber !== currentPage) {
      setCurrentPage(Number(pageNumber));
    }
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Header />
      <section className="blogs w-[95%] sm:w-[90%] md:w-[70%] lg:w-[70%] mx-auto">
        {currentPosts.map(
          ({
            id,
            postPicture,
            title,
            content,
            username,
            createdAt,
            likedUsers,
          }) => (
            <div
              key={id}
              className="blog-item w-full gap-6 px-2 flex flex-col md:flex-row border-b py-4"
            >
              <img
                src={postPicture}
                alt={title || "Post Image"}
                className="w-full md:w-[30%] h-48 object-cover mb-4 md:mb-0"
              />
              <div className="w-full md:w-[60%] flex flex-col justify-between">
                <p className="text-sm text-gray-600">
                  This blog was created By {username}
                </p>
                <h2
                  style={{ fontFamily: "Oswald" }}
                  className="text-2xl uppercase font-black"
                >
                  {title}
                </h2>
                <p className="text-ellipsis">{content}</p>
                <div className="flex items-center gap-1.5">
                  <AiFillLike
                    className={likes[id] ? "text-red-500" : "text-gray-600"}
                  />
                  <span>{likedUsers.length}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Created on {new Date(createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )
        )}
      </section>
      <div className="pagination flex justify-center gap-2 mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        {getPageNumbers().map((number, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(number)}
            className={`px-3 py-1 border rounded ${typeof number === "number" && currentPage === number
              ? "bg-orange-500 text-white"
              : ""
              }`}
            disabled={number === "..."}>
            {number}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default BlogPage;
