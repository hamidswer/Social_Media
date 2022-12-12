import React, { useState } from "react";
import { useEffect } from "react";
import FollowersCard from "../../../../components/Card/FollowersCard/FollowersCard";
import InfoCard from "../../../../components/Card/InfoCard/InfoCard";
import { getSocket } from "../../../../Socket/Socket/Socket.js";
function LeftSection({ user }) {
  // Get user
  let [newButton, setNewButton] = useState(null);
  let [userListener, setUserListener] = useState(null);
  const handleUser = (e) => {
    e.preventDefault();
    getSocket().emit("getUser", { userId: "63301e3b926a9fad5f8e638a" });
  };
  useEffect(() => {
    if (userListener) return;
    getSocket().on("sendUser", (data) => {
      console.log(data);
      setNewButton(true);
      setUserListener(true);
    });
  }, [userListener]);

  useEffect(() => {
    if (!userListener) return;
    getSocket().off("sendUser");
    setUserListener(false);
  }, [userListener]);

  return (
    <div className="left-column-widgets">
      <InfoCard user={user} />
      <button className="button" onClick={handleUser}>
        Get User
      </button>
      {newButton && <button className="button">Hello</button>}
      <FollowersCard />
    </div>
  );
}

export default LeftSection;
