import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FollowUserAction from "../../REDUX/Action/User/FollowUserAction.js";
import UnFollowUserAction from "../../REDUX/Action/User/UnFollowUserAction.js";
import GetProfilePicture from "../../Utils/Image/GetProfilePicture.js";
import "./User.css";
function User({ person }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [following, setFollowing] = useState(
    user.following.includes(person._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(UnFollowUserAction(user._id, person._id))
      : dispatch(FollowUserAction(user._id, person._id));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower">
      <div>
        <Link className="User-link" to={`/user/${person._id}`}>
          <img src={GetProfilePicture(person)} alt="" className="img" />
        </Link>
        <div className="name">
          <Link className="User-link" to={`/user/${person._id}`}>
            <span>{person.firstname}</span>
            <span>{person.lastname}</span>
          </Link>
        </div>
      </div>

      <button className="button followerButton" onClick={handleFollow}>
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

export default User;
