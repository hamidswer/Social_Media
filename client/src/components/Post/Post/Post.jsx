import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mantine/core";
import { Link } from "react-router-dom";
import "./Post.css";
import Comment from "../../../Data/Images/comment.png";
import Share from "../../../Data/Images/share.png";
import Heart from "../../../Data/Images/like.png";
import NotLike from "../../../Data/Images/notlike.png";
import LikePostRequest from "../../../Api/Post/LikePostRequest.js";
import FormatDate from "../../../Utils/Date/FormatDate.js";
import MoreOptionsMenu from "../../Menu/MoreOptionsMenu/MoreOptionsMenu";
import GetProfilePicture from "../../../Utils/Image/GetProfilePicture.js";
import GetUserId from "../../../Utils/User/GetUserId.js";
import Comments from "../../Comment/Comments/Comments";
import CommentShare from "../../Comment/CommentShare/CommentShare";
import ShareMenu from "../../Menu/ShareMenu/ShareMenu";
import ShareMenuAction from "../../../REDUX/Action/ShareMenu/ShareMenuAction.js";
import { getSocket } from "../../../Socket/Socket/Socket.js";
function Post({ data }) {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const serverImagePublic =
    process.env.REACT_APP_IMAGE_PUBLIC_FOLDER + GetUserId(data.userId) + "/";

  const serverVideoPublic =
    process.env.REACT_APP_VIDEO_PUBLIC_FOLDER + GetUserId(data.userId) + "/";

  const [commentShare, setCommentShare] = useState(false);

  const handleComment = () => {
    setCommentShare((commentShare) => !commentShare);
  };
  // number of likes
  const [liked, setLiked] = useState(
    data.likes ? data.likes.includes(user._id) : false
  );
  const [likes, setLikes] = useState(data.likes ? data.likes.length : 0);

  const handleLike = () => {
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    setLiked((prev) => !prev);
    if (data) {
      LikePostRequest(data._id, user._id);
      const notificationData = {
        personId: data.userId._id,
        userId: user._id,
        name: user.firstname + " " + user.lastname,
        profilePicture: user.profilePicture,
        postId: data._id,
        activity: "postLike",
      };
      if (!liked && notificationData.userId !== notificationData.personId)
        getSocket().emit("postLike", notificationData);
    }
  };
  const { shareMenuStatus, shareMenuPostId } = useSelector(
    (state) => state.ShareMenuReducer
  );
  const dispatch = useDispatch();
  const handleShare = () => {
    dispatch(ShareMenuAction(true, data._id));
  };

  return (
    <div className="post" key={data.createdAt}>
      <div className="author">
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/user/${data.userId._id}`}
        >
          <Avatar
            src={GetProfilePicture(data.userId)}
            radius={50}
            className="authorImage"
            alt={data.userId.firstname}
          />
        </Link>

        <div>
          <div className="authorName">{data.userId.firstname}</div>
          <div className="createdAt">
            {data.updatedAt
              ? FormatDate(data.updatedAt)
              : FormatDate(data.createdAt)}
          </div>
        </div>
        {data && (
          <MoreOptionsMenu
            postId={data._id}
            userId={user._id}
            isAuthor={data.userId._id === user._id ? true : false}
          />
        )}
      </div>
      <div className="horizontalLine" />
      {data.desc && (
        <div className="description">
          <span> {data.desc}</span>
        </div>
      )}
      {data && data.image && (
        <div>
          <img
            src={serverImagePublic + data.image}
            className="postImage"
            alt=""
          />
        </div>
      )}
      {data.video && (
        <div>
          <video width="750" height="500" className="postImage" alt="" controls>
            <source src={serverVideoPublic + data.video} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="postReaction">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img
          src={Comment}
          alt=""
          onClick={handleComment}
          className="comment-img"
        />
        <img src={Share} alt="" onClick={handleShare} className="share-image" />
      </div>
      <span className="likes">{likes} Likes</span>
      {commentShare && <CommentShare postId={data._id} />}
      <Comments postId={data._id} key={data._id} />
      {shareMenuStatus && data._id === shareMenuPostId && (
        <ShareMenu postId={shareMenuPostId} />
      )}
    </div>
  );
}

export default Post;
