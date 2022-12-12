import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Search from "../../Search/Search";
import UserMenu from "../UserMenu/UserMenu";
import NotificationMenu from "../NotificationMenu/NotificationMenu";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setSocket } from "../../../Socket/Socket/Socket.js";
const socket = io("http://localhost:5000");

function Header() {
  setSocket(socket);
  const user = useSelector((state) => state.AuthReducer.authData);

  useEffect(() => {
    if (!socket) return;
    if (!user) return;
    if (!user.user) return;
    socket.on("connect", () => {
      socket.emit("addUser", { socketId: socket.id, userId: user.user._id });
    });
    socket.on("disconnect", () => {});
  }, [socket]);

  return (
    <div className="header">
      <div className="header-home">
        <Link to={`/home`} className="header-link">
          <p className="header-text">Social Media</p>
        </Link>
      </div>

      {user && <Search />}
      {user && (
        <div className="header-menu">
          <NotificationMenu />
          <UserMenu />
        </div>
      )}
    </div>
  );
}

export default Header;
