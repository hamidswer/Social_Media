import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Posts.css";
import Post from "../../../../components/Post/Post/Post";
import MoreProfilePostAction from "../../../../REDUX/Action/Post/MoreProfilePostAction.js";

function Posts({ posts, loading, location }) {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const dispatch = useDispatch();
  const [skipProfilePosts, setSkipProfilePosts] = useState(10);
  if (!posts) return "No Posts";
  const handleLoadMore = (e) => {
    e.preventDefault();
    dispatch(MoreProfilePostAction(user._id, skipProfilePosts, 10));
    setSkipProfilePosts((skip) => skip + 10);
  };
  return (
    <div>
      <div className="postsContainer">
        <div className="posts">
          {posts && loading
            ? "Fetching posts...."
            : posts.map((post) => {
                return <Post data={post} key={post._id} />;
              })}
        </div>
      </div>
      {posts && posts.length > 9 && (
        <div className="loadMoreButtonContainer">
          <button className="loadMoreButton" onClick={handleLoadMore}>
            Load more...
          </button>
        </div>
      )}
    </div>
  );
}

export default Posts;
