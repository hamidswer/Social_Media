import { combineReducers } from "redux";
import AuthReducer from "./User/AuthReducer.js";
import AuthFormsReducer from "./User/AuthFormsReducer.js";
import PostReducer from "./Post/PostReducer.js";
import UserReducer from "./User/UserReducer.js";
import ProfilePostReducer from "./Post/ProfilePostReducer.js";
import CommentReducer from "./Comment/CommentReducer.js";
import SearchReducer from "./Search/SearchReducer.js";
import ShareMenuReducer from "./ShareMenu/ShareMenuReducer.js";
export const reducers = combineReducers({
  AuthReducer,
  AuthFormsReducer,
  PostReducer,
  UserReducer,
  ProfilePostReducer,
  CommentReducer,
  SearchReducer,
  ShareMenuReducer,
});
