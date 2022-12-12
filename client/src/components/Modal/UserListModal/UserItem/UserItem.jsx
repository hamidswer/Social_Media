import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./UserItem.css";
import { Link } from "react-router-dom";
import UserRequest from "../../../../Api/User/UserRequest.js";
import FollowUserAction from "../../../../REDUX/Action/User/FollowUserAction.js";
import UnFollowUserAction from "../../../../REDUX/Action/User/UnFollowUserAction.js";
function UserItem({ userId, type }) {
  const dispatch = useDispatch();
  const { user: loggedInUser } = useSelector(
    (state) => state.AuthReducer.authData
  );
  const [follow, setFollow] = useState(loggedInUser.following.includes(userId));
  const [user, setUser] = useState(null);
  const imageServer = process.env.REACT_APP_IMAGE_PUBLIC_FOLDER + userId + "/";
  useEffect(() => {
    const getUser = async () => {
      const user = await UserRequest(userId);
      setUser(user);
    };
    getUser();
  }, []);

  const handleButton = async () => {
    if (loggedInUser.following.includes(userId)) {
      dispatch(UnFollowUserAction(loggedInUser._id, userId));
      setFollow(false);
    } else {
      dispatch(FollowUserAction(loggedInUser._id, userId));
      setFollow(true);
    }
  };
  return (
    <li className="userItem">
      {user && (
        <Link to={`/user/${userId}`}>
          <img
            className="userItem-image"
            src={imageServer + user.profilePicture}
            alt={user.firstname}
          />
        </Link>
      )}
      {user && (
        <Link to={`/user/${userId}`} className="userItem-name">
          {user.firstname + " " + user.lastname}
        </Link>
      )}
      {user && type !== "followings" && (
        <button className="button userItem-button" onClick={handleButton}>
          {follow ? "Unfollow" : "Follow"}
        </button>
      )}
    </li>
  );
}

export default UserItem;
