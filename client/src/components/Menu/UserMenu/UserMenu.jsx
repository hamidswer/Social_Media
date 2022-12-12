import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import GetProfilePicture from "../../../Utils/Image/GetProfilePicture.js";
import "./UserMenu.css";
import LogOutAction from "../../../REDUX/Action/Authentication/LogOutAction.js";
import ProfileModal from "../../Modal/ProfileModal/ProfileModal.jsx";
import DeleteUserRequest from "../../../Api/User/DeleteUserRequest.js";
function UserMenu() {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const dispatch = useDispatch();
  const userPicture = GetProfilePicture(user);
  const [modalOpaned, setModalOpaned] = useState(false);
  const handleDeleteAccount = async () => {
    await DeleteUserRequest(user._id);
    dispatch(LogOutAction());
  };
  const handleLogout = () => {
    dispatch(LogOutAction());
  };

  return (
    <div className="header-user" key="headerUser">
      <Dropdown className="menu" key="menu">
        <Dropdown.Toggle
          className="menuDropdown"
          id="dropdown-basic"
          key="menuDropdown"
        >
          <img
            className="user-menu-picture"
            src={userPicture}
            alt=""
            key="userMenuPicture"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu key="Menu2">
          <Dropdown.Item href={`/profile/${user._id}`} eventKey="Profile">
            Profile
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() => setModalOpaned(true)}
            eventKey="EditProfile"
          >
            Edit Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteAccount} eventKey="DeleteAccount">
            Delete account
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout} eventKey="Logout">
            Log out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ProfileModal
        modalOpaned={modalOpaned}
        setModalOpaned={setModalOpaned}
        data={user}
        key="profileModal"
      />
    </div>
  );
}

export default UserMenu;
