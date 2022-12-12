import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@mantine/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import PostRequest from "../../Api/Post/PostRequest.js";
import FormatDate from "../../Utils/Date/FormatDate.js";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard.jsx";
import UserRequest from "../../Api/User/UserRequest.js";
import GetProfilePicture from "../../Utils/Image/GetProfilePicture.js";
import Header from "../../components/Menu/Header/Header.jsx";
import Comments from "../../components/Comment/Comments/Comments";

import "./Post.css";
function PostPage() {
  const userData = useSelector((state) => state.AuthReducer.authData);
  const loggedInUser = userData?.user || 2;
  const [post, setPost] = useState(null);
  const [person, setPerson] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getPost = async () => {
      const post = await PostRequest(id);
      setPost(post);
      const user = await UserRequest(post.userId._id);
      setPerson(user);
    };
    getPost();
  }, [id]);
  const serverVideoPublic =
    process.env.REACT_APP_VIDEO_PUBLIC_FOLDER + person?._id + "/";
  const serverImagePublic =
    process.env.REACT_APP_IMAGE_PUBLIC_FOLDER + person?._id + "/";

  const getAuthorName = () => {
    return post.userId.firstname;
  };

  const linkHandler = () => {
    if (person._id === loggedInUser?._id) {
      return "profile";
    } else {
      return "user";
    }
  };
  return (
    <div>
      <Helmet>
        <meta name="description" content={"Social Media Post"} />
        <meta name="twitter:title" content="Social Media" />
        <meta name="twitter:description" content={"Social Media Post"} />
        <meta name="twitter:image" content={serverImagePublic + post?.image} />
        <meta name="twitter:site" content="@SocialMedia" />
        <meta name="twitter:creator" content="@SocialMedia" />
      </Helmet>
      <div className="post-container post-page-container">
        {post && person && (
          <div>
            <ProfileCard user={person} post={post} location="postPage" />
            <div className="post post-page" key={post.createdAt}>
              <div className="author">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/${linkHandler()}/${post.userId._id || post.userId}`}
                >
                  <Avatar
                    src={GetProfilePicture(person)}
                    radius={50}
                    className="authorImage"
                    alt={getAuthorName()}
                  />
                </Link>

                <div>
                  <div className="authorName">{getAuthorName()}</div>
                  <div className="createdAt">{FormatDate(post?.createdAt)}</div>
                </div>
              </div>
              <div className="horizontalLine" />
              {post.desc && (
                <div className="description post-page-description">
                  <span> {post.desc}</span>
                </div>
              )}

              {post.image && (
                <div>
                  <img
                    src={serverImagePublic + post?.image}
                    className="postImage"
                    alt=""
                  />
                </div>
              )}
              {post.video && (
                <div>
                  <video
                    width="750"
                    height="500"
                    className="postImage"
                    alt=""
                    controls
                  >
                    <source
                      src={serverVideoPublic + post.video}
                      type="video/mp4"
                    />
                  </video>
                </div>
              )}
              <Comments postId={post._id} key={post._id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostPage;
