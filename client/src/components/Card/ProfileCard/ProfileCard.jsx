import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProfileCard.css";
import GetProfilePicture from "../../../Utils/Image/GetProfilePicture.js";
import GetCoverPicture from "../../../Utils/Image/GetCoverPicture.js";
import FollowButton from "../../Button/FollowButton/FollowButton";
import UserListModal from "../../Modal/UserListModal/UserListModal";
function ProfileCard({ location, user, posts }) {
  const userData = useSelector((state) => state.AuthReducer.authData);
  const loggedInUser = userData?.user || 2;
  const linkHandler = () => {
    if (loggedInUser._id === user._id) {
      return "profile";
    } else {
      return "user";
    }
  };
  const [followersmodalOpaned, setFollowersmodalOpaned] = useState(false);
  const [followingsmodalOpaned, setFollowingsmodalOpaned] = useState(false);
  const [clickableFollowers, setClickableFollowers] = useState(false);
  const [clickableFollowings, setClickableFollowings] = useState(false);

  useEffect(() => {
    if (
      loggedInUser._id === user._id &&
      loggedInUser.followers &&
      loggedInUser.followers.length > 0
    ) {
      setClickableFollowers(true);
    } else {
      setClickableFollowers(false);
    }
    if (loggedInUser._id === user._id && loggedInUser.following.length > 0) {
      setClickableFollowings(true);
    } else {
      setClickableFollowings(false);
    }
  }, [loggedInUser]);
  return (
    <div className="profileCard">
      <div className="profileImages">
        <img
          src={GetCoverPicture(user)}
          alt={user.firstname + " " + user.lastname + " cover picture."}
          className="cover-picture"
        />
        <img
          src={GetProfilePicture(user)}
          alt={user.firstname + " " + user.lastname + " profile picture."}
          className="profile-picture"
        />
      </div>
      <div className="profileInfo">
        <span className="title">
          {user.firstname} {user.lastname}
        </span>
        <span>{user.worksAt ? user.worksAt : "Tell use about your job"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          {clickableFollowers && (
            <div
              className="follow clickable"
              onClick={() => {
                user.followers
                  ? setFollowersmodalOpaned(true)
                  : setFollowersmodalOpaned(false);
              }}
            >
              <span>
                <b>{user.followers?.length || 0}</b> Followers
              </span>
            </div>
          )}
          {!clickableFollowers && (
            <div className="follow">
              <span>
                <b>{user.followers?.length || 0}</b> Followers
              </span>
            </div>
          )}
          {clickableFollowings && (
            <div
              className="follow clickable"
              onClick={() =>
                user.following
                  ? setFollowingsmodalOpaned(true)
                  : setFollowingsmodalOpaned(false)
              }
            >
              <span>
                <b>{user.following?.length || 0}</b> Followings
              </span>
            </div>
          )}

          {!clickableFollowings && (
            <div className="follow">
              <span>
                <b>{user.following?.length || 0}</b> Followings
              </span>
            </div>
          )}
          {location === "profilePage" && (
            <>
              <div className="follow">
                <span>
                  <b>{posts?.length || 0}</b> Posts
                </span>
              </div>
            </>
          )}
          {location === "userPage" && (
            <>
              <div className="follow">
                <span>
                  <b>{posts?.length || 0}</b> Posts
                </span>
              </div>
            </>
          )}
        </div>
        <hr />
        {location === "userPage" && <FollowButton personId={user._id} />}
      </div>
      {location === "homePage" && (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${user._id}`}
          >
            My Profile
          </Link>
        </span>
      )}
      {location === "postPage" && (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/${linkHandler()}/${user._id}`}
          >
            Profile
          </Link>
        </span>
      )}
      {loggedInUser._id === user._id && (
        <UserListModal
          modalOpaned={followersmodalOpaned}
          setModalOpaned={setFollowersmodalOpaned}
          userListsId={user.followers}
          type="followers"
        />
      )}
      {loggedInUser._id === user._id && (
        <UserListModal
          modalOpaned={followingsmodalOpaned}
          setModalOpaned={setFollowingsmodalOpaned}
          userListsId={user.following}
          type="followings"
        />
      )}
    </div>
  );
}

export default ProfileCard;
