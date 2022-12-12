import "./App.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import User from "./pages/User/User";
import Google from "./pages/Google/Google";
import Post from "./pages/Post/Post";
import { Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareMenuAction from "./REDUX/Action/ShareMenu/ShareMenuAction.js";
function App() {
  const user = useSelector((state) => state.AuthReducer.authData);
  const server = process.env.REACT_APP_FAVICON_PUBLIC_FOLDER;
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (e.target.classList.value !== "share-image")
      dispatch(ShareMenuAction(false, 1));
  };
  return (
    <div className="app" onClick={handleClick}>
      <Helmet>
        <title>React App</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="React application" />
        <meta property="og:type" content="Social Media" />
        <link
          rel="shortcut icon"
          sizes="16x16 24x24 32x32 48x48 64x64"
          href={server + "favicon-64.png"}
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href={server + "favicon-57.png"}
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="57x57"
          href={server + "favicon-57.png"}
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href={server + "favicon-72.png"}
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href={server + "favicon-114.png"}
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href={server + "favicon-120.png"}
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href={server + "favicon-144.png"}
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href={server + "favicon-152.png"}
        />
        <meta name="application-name" content="Scotch Scotch scotch" />
        <meta
          name="msapplication-TileImage"
          content={server + "favicon-144.png"}
        />
        <meta name="msapplication-TileColor" content="#2A2A2A" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </Helmet>
      <Routes>
        <Route path="/google" element={<Google />} />
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id/:postId"
          element={user ? <Profile id="profile" /> : <Navigate to="../auth" />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile id="profile" /> : <Navigate to="../auth" />}
        />
        <Route
          path="/user/:id"
          element={user ? <User id="user" /> : <Navigate to="../auth" />}
        />
        <Route path="/post/:id" element={<Post id="post" />} />
      </Routes>
    </div>
  );
}

export default App;
