import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommentsAction from "../../../REDUX/Action/Comments/CommentsAction.js";
import { Link } from "react-router-dom";
import "./Comment.css";
import heart from "../../../Data/Images/like.png";
import LikeCommentRequest from "../../../Api/Comment/LikeCommentRequest.js";
import DeleteCommentRequest from "../../../Api/Comment/DeleteCommentRequest.js";
import notLike from "../../../Data/Images/notlike.png";
import remove from "../../../Data/Images/remove.png";
import GetProfilePicture from "../../../Utils/Image/GetProfilePicture.js";
import { getSocket } from "../../../Socket/Socket/Socket.js";
function Comment({ data }) {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const { commentsCounter } = useSelector((state) => state.CommentReducer);
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(
    data.likes ? data.likes.includes(user._id) : false
  );
  const handleLike = async () => {
    setLiked((prev) => !prev);
    if (data) {
      const postId = await LikeCommentRequest(data._id, user._id);
      const notificationData = {
        personId: data.userId._id,
        userId: user._id,
        name: user.firstname + " " + user.lastname,
        profilePicture: user.profilePicture,
        commentPostId: postId,
        commentId: data._id,
        activity: "commentLike",
      };
      if (!liked && notificationData.userId !== notificationData.personId)
        getSocket().emit("commentLike", notificationData);
    }
  };
  const handleDeleteComment = async () => {
    await DeleteCommentRequest(data._id, user._id);
    dispatch(CommentsAction(commentsCounter));
  };
  // const serverImage = process.env.REACT_APP_IMAGE_PUBLIC_FOLDER;
  // let profilePicture;
  // if (data.userId.profilePicture) {
  //   profilePicture =
  //     serverImage + data.userId._id + "/" + data.userId.profilePicture;
  // } else {
  //   profilePicture = serverImage + "default/profile.png";
  // }
  return (
    <div className="comments-container">
      {data && (
        <div className="comment-container">
          <div className="comment-header">
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/user/${data.userId._id}`}
            >
              <img
                className="author-image"
                src={GetProfilePicture(data?.userId)}
                alt={data?.userId?.firstname}
              />
            </Link>
            <span className="author-name">{data?.userId?.firstname}</span>{" "}
            <span className="comment-desc">{data?.desc}</span>
            <div className="comment-buttons">
              {data?.userId?._id === user._id ? (
                <img
                  className="comment-delete"
                  src={remove}
                  alt="like"
                  onClick={handleDeleteComment}
                />
              ) : (
                ""
              )}
              <img
                className="comment-like"
                src={liked ? heart : notLike}
                alt="like"
                onClick={handleLike}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;
