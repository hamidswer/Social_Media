import React from "react";
import Posts from "../../Post/Posts/Posts";

function CenterSection({ posts, loading, location }) {
  return (
    <div>
      {posts?.length > 0 && (
        <Posts posts={posts} loading={loading} location={location} />
      )}
    </div>
  );
}

export default CenterSection;
