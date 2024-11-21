import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/app/store";
import { fetchPosts } from "../../features/Posts/postSlice";
import { AiFillLike } from "react-icons/ai";
const BlogPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});

  const { posts, isLoading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  return (
    <>
      <Header />
      <section className="blogs w-[70%]  m-auto">
        {sortedPosts.map(
          ({ id, postPicture, title, content, username, createdAt , likeCount }) => (
            <div key={id} className="blog-item w-full gap-6 px-2 flex border-b py-4">
              <img
                src={postPicture}
                alt={title || "Post Image"}
                className="w-[30%] h-48 object-cover"
              />
              <div className="w-[60%] flex flex-col justify-between">
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="text-ellipsis">{content}</p>
                <div className="flex items-center gap-1.5">
                <AiFillLike
                    className={
                      likes[id] ? "text-red-500" : "text-gray-600"
                    }
                  />
                <span>{likeCount}</span>
                </div>
                <p className="text-sm text-gray-600">By {username}</p>
                <p className="text-xs text-gray-500">
                  Created on {new Date(createdAt).toLocaleDateString()} ago
                </p>
              </div>
            </div>
          )
        )}
      </section>
    </>
  );
};

export default BlogPage;
