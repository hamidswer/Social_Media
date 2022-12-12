import React from "react";
import Posts from "../../Post/Posts/Posts";
import PostShare from "../../../../components/Post/PostShare/PostShare";

function CenterSection({ posts, loading }) {
  return (
    <div>
      <PostShare />
      {posts.length > 0 && <Posts posts={posts} loading={loading} />}
    </div>
  );
}

export default CenterSection;
