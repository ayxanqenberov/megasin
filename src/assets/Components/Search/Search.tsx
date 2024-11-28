import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/app/store";
import { setSearchQuery } from "../../features/Search/searchSlice";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value));
  };
  const location = useLocation();
  const filteredPosts = useMemo(
    () =>
      posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [posts, searchQuery]
  );
  const getDetail = (username: string, id: number) => {
    navigate(`/@${username}/detail?postId=${id}`);
  };
  const username = useSelector((state: RootState) => state.user.user?.username);

  const isProfilePage = location.pathname === `/profile/${username}`;

  return (
    <div className={isProfilePage ? "hidden" : "search w-1/2 relative"}>
      <input
        className="border-b border-gray-300 outline-none w-full py-2"
        type="text"
        placeholder="Search posts by title..."
        value={searchQuery} 
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      {searchQuery && (
        <div className="results absolute top-full left-0 bg-white w-full shadow-lg mt-2 rounded-md max-h-60 overflow-y-auto">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="result-item py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => getDetail(post.username, post.id)}
              >
                {post.title}
              </div>
            ))
          ) : (
            <p className="text-gray-500 py-2 px-4">No posts found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
