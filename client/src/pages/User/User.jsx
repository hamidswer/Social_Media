import React, { useEffect, useState } from "react";
import CenterSection from "./Sections/CenterSection/CenterSection";
import LeftSection from "./Sections/LeftSection/LeftSection";
import PostsRequest from "../../Api/Post/PostsRequest.js";
import UserRequest from "../../Api/User/UserRequest.js";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import { Helmet } from "react-helmet";

function User() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getPosts = async () => {
      const userPosts = await PostsRequest(id, 0, 8);
      setPosts(userPosts);
      const user = await UserRequest(id);
      setUser(user);
    };
    getPosts();
  }, [id]);
  const fullname = user?.firstname + " " + user?.lastname;

  return (
    <div>
      <Helmet>
        <title>User page | {fullname}</title>
        <meta
          name="description"
          content={`${user?.firstname} works at ${user?.worksAt || `?!`}`}
        />
      </Helmet>
      {posts && user && (
        <div className="two-columns">
          <LeftSection />
          <div className="center-column">
            <ProfileCard location="userPage" user={user} posts={posts} />
            <CenterSection posts={posts} loading={false} />
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
