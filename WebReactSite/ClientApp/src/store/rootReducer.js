import { combineReducers } from "redux";
import UsersReducers from "./user/reducers";
import ForumReducers from "./forum/reducers";

export default combineReducers({
  UsersReducers,
  ForumReducers
});
