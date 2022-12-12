import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";
function Item({ data }) {
  const profilePicture =
    process.env.REACT_APP_IMAGE_PUBLIC_FOLDER +
    data.userId +
    "/" +
    data.profilePicture;
  return (
    <div className="item-row">
      {data.activity === "postLike" && profilePicture && (
        <img className="item-picture" src={profilePicture} alt="" />
      )}
      {data.activity === "postLike" && profilePicture && (
        <Link to={`/post/${data.postId}`} className="item-link">
          {data.name} liked your post!
        </Link>
      )}
      {data.activity === "followUser" && profilePicture && (
        <img className="item-picture" src={profilePicture} alt="" />
      )}
      {data.activity === "followUser" && profilePicture && (
        <Link to={`/user/${data.userId}`} className="item-link">
          {data.name} followed you!
        </Link>
      )}
      {data.activity === "commentLike" && profilePicture && (
        <img className="item-picture" src={profilePicture} alt="" />
      )}
      {data.activity === "commentLike" && profilePicture && (
        <Link to={`/post/${data.commentPostId}`} className="item-link">
          {data.name} liked your comment!
        </Link>
      )}
    </div>
  );
}

export default Item;
