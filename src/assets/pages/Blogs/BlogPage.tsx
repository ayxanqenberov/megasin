import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Loading from "../../Components/Loadings/Loading";
import MentionText from "../../Components/MentionText/MentionText";

import { AppDispatch } from "../../redux/app/store";
import {
  fetchPosts,
  selectAllPosts,
  selectPostsError,
  selectPostsIsLoading,
} from "../../features/Posts/postSlice";

const getDescriptionStyles = (formats: string[] = []): React.CSSProperties => {
  const style: React.CSSProperties = {};

  if (formats.includes("bold")) {
    style.fontWeight = "bold";
  }

  if (formats.includes("italic")) {
    style.fontStyle = "italic";
  }

  if (formats.includes("underlined")) {
    style.textDecoration = "underline";
  }

  return style;
};

const BlogPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [likes] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector(selectPostsIsLoading);
  const error = useSelector(selectPostsError);

  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => Number(b.id) - Number(a.id));
  }, [posts]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedPosts.length / itemsPerPage);
  }, [sortedPosts]);

  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;

    return sortedPosts.slice(start, end);
  }, [sortedPosts, currentPage]);

  const pageNumbers = useMemo<(number | string)[]>(() => {
    const pages: (number | string)[] = [];

    if (totalPages <= 1) return [1];

    if (currentPage > 2) pages.push(1);

    if (currentPage > 3) pages.push("...");

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (currentPage < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const getDetail = (username: string, id: number | string) => {
    navigate(`/@${username}/detail?postId=${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header />

      <section className="blogs w-[95%] sm:w-[90%] md:w-[75%] lg:w-[70%] mx-auto py-6">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="w-full flex flex-col md:flex-row gap-6 border-b border-gray-300 py-5"
          >
            <img
              src={post.postPicture}
              alt={post.title}
              className="w-full md:w-[30%] h-52 object-cover rounded"
            />

            <div className="flex flex-col justify-between flex-1">
              <p className="text-sm text-gray-500">
                This blog was created by {post.username}
              </p>

              <h2
                onClick={() => getDetail(post.username, post.id)}
                className="cursor-pointer text-2xl font-black uppercase hover:text-red-600 duration-200"
                style={{ fontFamily: "Oswald" }}
              >
                <MentionText text={post.title} />
              </h2>

              <p style={getDescriptionStyles(post.formats ?? [])}>
                <MentionText text={post.content} />
              </p>

              <div className="flex items-center gap-2">
                <AiFillLike
                  className={
                    likes[Number(post.id)]
                      ? "text-red-500 text-xl"
                      : "text-gray-500 text-xl"
                  }
                />

                <span>{post.likedUsers?.length ?? 0}</span>
              </div>

              <p className="text-xs text-gray-500">
                Created on{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </section>

      <div className="flex justify-center gap-2 py-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="border rounded px-3 py-1 disabled:opacity-50"
        >
          Previous
        </button>

        {pageNumbers.map((page, index) => (
          <button
            key={index}
            disabled={page === "..."}
            onClick={() => handlePageClick(page)}
            className={`border rounded px-3 py-1 ${
              currentPage === page
                ? "bg-orange-500 text-white"
                : ""
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="border rounded px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;