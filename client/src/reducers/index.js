import { combineReducers } from "redux";

import ads from "./ads";
import alert from "./alert";
import users from "./users";

export default combineReducers({
  ads, alert, users
});
