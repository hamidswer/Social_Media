import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FollowUserAction from "../../../REDUX/Action/User/FollowUserAction.js";
import UnFollowUserAction from "../../../REDUX/Action/User/UnFollowUserAction.js";
import "./FollowButton.css";
function FollowButton({ personId }) {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [following, setFollowing] = useState(
    user.following.includes(params.id)
  );
  useEffect(() => {
    setFollowing(user.following.includes(params.id));
  }, [params]);

  const handleFollow = () => {
    following
      ? dispatch(UnFollowUserAction(user._id, personId))
      : dispatch(FollowUserAction(user._id, personId));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follow-button">
      <button className="button followerButton" onClick={handleFollow}>
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

export default FollowButton;
