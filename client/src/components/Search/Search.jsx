import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSearchRequest from "../../Api/User/UserSearchRequest.js";
import "./Search.css";
import { useSelector, useDispatch } from "react-redux";
import SearchAction from "../../REDUX/Action/User/SearchAction.js";
function Search() {
  const search = useRef();
  const [searchValue, setSearchValue] = useState(null);
  const [users, setUsers] = useState(null);
  const status = useSelector((state) => state.SearchReducer.search.status);
  const inputField = useSelector(
    (state) => state.SearchReducer.search.inputField
  );
  const dispatch = useDispatch();
  const searchHandle = async () => {
    setSearchValue(search.current.value);
  };
  useEffect(() => {
    const getUsers = async () => {
      dispatch(SearchAction(true, true));
      const data = {
        searchName: searchValue,
      };
      const response = await UserSearchRequest(data);
      setUsers(response);
    };
    if (searchValue && searchValue.length > 3) {
      getUsers();
    } else if (searchValue && searchValue.length < 3) {
      setSearchValue(null);
      dispatch(SearchAction(false, true));
    }
  }, [searchValue]);

  useEffect(() => {
    if (inputField) {
      setSearchValue(null);
    }
  }, [inputField]);
  return (
    <div className="searchInput">
      <input
        type="text"
        placeholder="#Search"
        ref={search}
        onChange={searchHandle}
      />
      {users && status && (
        <div className="search-result">
          <ul className="search-list">
            {users.map((person) => {
              return <UserList user={person} key={person._id} />;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

const UserList = ({ user }) => {
  const serverImage = process.env.REACT_APP_IMAGE_PUBLIC_FOLDER;
  let profilePicture;
  if (user.profilePicture) {
    profilePicture = serverImage + user._id + "/" + user.profilePicture;
  } else {
    profilePicture = serverImage + "default/profilePicture.png";
  }
  const dispatch = useDispatch();
  const handleSearchClick = () => {
    dispatch(SearchAction(false, true));
  };
  return (
    <Link
      to={`/user/${user._id}`}
      className="search-link"
      onClick={handleSearchClick}
    >
      <li className="search-item">
        <img className="search-image" src={profilePicture} alt="" />
        <p className="search-name">
          {user.firstname.toLowerCase()} {user.lastname.toLowerCase()}
        </p>
      </li>
      <hr className="search-input-seperator"></hr>
    </Link>
  );
};
export default Search;
