import React from "react";
import FollowersCard from "../../../../components/Card/FollowersCard/FollowersCard";

function LeftSection({ User }) {
  return (
    <div className="left-column-widgets">
      <FollowersCard />
    </div>
  );
}

export default LeftSection;
