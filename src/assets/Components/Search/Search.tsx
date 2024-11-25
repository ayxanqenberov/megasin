import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../redux/app/store';
import { setSearchQuery } from '../../features/Search/searchSlice';


const Search = () => {
  const location = useLocation();
  const userName = useSelector((state: RootState) => state.user.user?.username || ''); // Fallback for username
  const isProfilePage = location.pathname === `/profile/${userName}`;
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query); // Get the current search query
  const posts = useSelector((state: RootState) => state.posts.items); // Assuming posts slice exists

  const handleSearchChange = ((value: string) => {
    dispatch(setSearchQuery(value));
  }, 300);
  const filteredPosts = useMemo(
    () => posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [posts, searchQuery]
  );

  return (
    <div className={isProfilePage ? 'hidden' : 'searching w-1/2'}>
      <input
        className="border-b border-grey outline-none w-full py-2"
        type="text"
        placeholder="Search..."
        defaultValue={searchQuery} 
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <div className="results">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="result-item py-1">
              {post.title}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
