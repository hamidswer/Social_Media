import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimelinePostsAction from "../../REDUX/Action/Post/TimelinePostsAction.js";
import LeftSection from "./Sections/LeftSection/LeftSection";
import CenterSection from "./Sections/CenterSection/CenterSection";
import { Helmet } from "react-helmet";
function Home() {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  let { posts, loading } = useSelector((state) => state.PostReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(TimelinePostsAction(user?._id));
  }, [user]);

  const fullname = user.firstname + " " + user.lastname;

  return (
    <div>
      <Helmet>
        <title>Home page | {fullname}</title>
      </Helmet>
      {posts && (
        <div className="two-columns">
          <LeftSection posts={posts} loading={loading} user={user} />
          <div className="center-column">
            <CenterSection posts={posts} loading={loading} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
