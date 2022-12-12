import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Posts.css";
import MoreTimelinePostsAction from "../../../../REDUX/Action/Post/MoreTimelinePostsAction.js";
import Post from "../../../../components/Post/Post/Post";

function Posts({ posts, loading }) {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const dispatch = useDispatch();
  if (!posts) return "No Posts";
  const handleLoadMore = (e) => {
    e.preventDefault();
    dispatch(MoreTimelinePostsAction(user._id));
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
