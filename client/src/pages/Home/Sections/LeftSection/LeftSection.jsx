import React from "react";
import ProfileCard from "../../../../components/Card/ProfileCard/ProfileCard";
import FollowersCard from "../../../../components/Card/FollowersCard/FollowersCard";

function LeftSection({ user, posts }) {
  return (
    <div className="left-column-widgets">
      <ProfileCard location="homePage" user={user} posts={posts} />
      <FollowersCard />
    </div>
  );
}

export default LeftSection;
