import React from "react";
import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import "./MoreOptionsMenu.css";
import DeletePostAction from "../../../REDUX/Action/Post/DeletePostAction.js";

function MoreOptionsMenu({ postId, userId, isAuthor }) {
  const dispatch = useDispatch();
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(DeletePostAction(postId, userId));
  };
  return (
    <Dropdown className="menu">
      <Dropdown.Toggle className="menuDropdown" id="dropdown-basic">
        ...
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {isAuthor && (
          <Dropdown.Item href={`/profile/${userId}/${postId}`}>
            Edit post
          </Dropdown.Item>
        )}
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        {isAuthor && (
          <Dropdown.Item onClick={handleDelete}>Delete post</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MoreOptionsMenu;
