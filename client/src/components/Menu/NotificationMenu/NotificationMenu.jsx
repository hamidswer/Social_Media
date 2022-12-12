import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import "./NotificationMenu.css";
import ProfileModal from "../../Modal/ProfileModal/ProfileModal.jsx";
import { UilHeartSign } from "@iconscout/react-unicons";
import GetNotificationRequest from "../../../Api/Notification/GetNotificationRequest.js";
import Item from "./Item/Item";
import { getSocket } from "../../../Socket/Socket/Socket.js";

const NotificationMenu = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [modalOpaned, setModalOpaned] = useState(false);
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    const getNotify = async () => {
      const notificationData = await GetNotificationRequest(user._id);
      setNotifications(notificationData);
    };
    getNotify();
  }, [user.notification]);

  let [notificationMenuCount, setNotificationMenuCount] = useState(null);
  let [notificationMenu, setNotificationMenu] = useState(
    user.notification.length
  );
  useEffect(() => {
    setNotificationMenuCount(user.notification.length);
  }, [user.notification]);

  const handleMenuClick = () => {
    setNotificationMenu(false);
  };

  const [notficationListener, setNotficationListener] = useState(false);

  useEffect(() => {
    if (notficationListener || !getSocket() || !notifications) return;
    getSocket().on("sendNotification", (data) => {
      if (data.activity === "postLike") {
        const useram = notifications.find(
          (noti) => noti.userId === data.userId
        );
        if (useram && useram.postId === data.postId) {
          return;
        }
        setNotifications((notification) => [data, ...notification]);
        setNotficationListener(true);
      }
    });
  }, [getSocket(), notifications, notficationListener]);

  // turn off the the notification listener
  useEffect(() => {
    if (!notficationListener) return;
    getSocket().off("sendNotification");
    setNotficationListener(false);
  }, [notficationListener]);

  useEffect(() => {
    if (!notifications) return;
    setNotificationMenuCount(notifications.length);
    setNotificationMenu(true);
  }, [notifications]);

  return (
    <div className="header-user" onClick={handleMenuClick}>
      {notifications && notificationMenuCount > 0 && (
        <Dropdown className="menu">
          {notificationMenu && (
            <Dropdown.Toggle className="menuDropdown" id="dropdown-basic">
              <p className="header-notification-counter">
                {notificationMenuCount}
              </p>
              <UilHeartSign className="header-notification-active" />
            </Dropdown.Toggle>
          )}
          {!notificationMenu && (
            <Dropdown.Toggle className="menuDropdown" id="dropdown-basic">
              <UilHeartSign className="header-notification-deactive" />
            </Dropdown.Toggle>
          )}

          <Dropdown.Menu className="notification-menu">
            {notifications.map((notifi) => {
              return <Item data={notifi} />;
            })}
          </Dropdown.Menu>
        </Dropdown>
      )}
      {notificationMenuCount > 0 && (
        <ProfileModal
          modalOpaned={modalOpaned}
          setModalOpaned={setModalOpaned}
          data={user}
        />
      )}
    </div>
  );
};

export default NotificationMenu;
