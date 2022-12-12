import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./FollowersCard.css";
import RandomUsersRequest from "../../../Api/User/RandomUsersRequest.js";
import User from "../../User/User";

function FollowersCard() {
  const [persons, setPersons] = useState(null);
  const { user } = useSelector((state) => state.AuthReducer.authData);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await RandomUsersRequest();
      setPersons(users);
    };
    fetchUsers();
  }, []);
  return (
    <div className="followersCard">
      <h5>People you may know</h5>
      {persons?.map((person, id) => {
        if (user._id !== person._id)
          return <User person={person} key={person._id} />;
      })}
    </div>
  );
}

export default FollowersCard;
