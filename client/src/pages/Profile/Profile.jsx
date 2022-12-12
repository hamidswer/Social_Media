import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CenterSection from "./Sections/CenterSection/CenterSection";
import LeftSection from "./Sections/LeftSection/LeftSection";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import ProfilePostAction from "../../REDUX/Action/Post/ProfilePostAction.js";
import PostShare from "../../components/Post/PostShare/PostShare";
import EditPost from "../../components/Post/EditPost/EditPost";
import { Helmet } from "react-helmet";
function Profile() {
  const params = useParams();
  const postId = params.postId;
  const { user } = useSelector((state) => state.AuthReducer.authData);
  let { posts, loading } = useSelector((state) => state.ProfilePostReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProfilePostAction(user._id, 0, 10));
  }, []);
  const fullname = user?.firstname + " " + user?.lastname;

  return (
    <div>
      <Helmet>
        <title>Profile page | {fullname}</title>
        <meta
          name="description"
          content={`${user?.firstname} works at ${user?.worksAt || `?!`}`}
        />
      </Helmet>
      <div className="two-columns">
        <LeftSection user={user} />
        <div className="center-column">
          <ProfileCard user={user} posts={posts} location="profilePage" />
          {postId ? <EditPost postId={postId} /> : <PostShare />}
          {posts && (
            <CenterSection
              posts={posts}
              loading={loading}
              location="profilePage"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
