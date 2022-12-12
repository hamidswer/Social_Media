import React from "react";
import Posts from "../../Post/Posts/Posts";

function CenterSection({ posts, loading }) {
  return (
    <div>{posts.length > 0 && <Posts posts={posts} loading={loading} />}</div>
  );
}

export default CenterSection;
