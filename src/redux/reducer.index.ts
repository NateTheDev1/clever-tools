import { combineReducers } from "redux";
import { userReducer } from "./User/userReducer";

export const allReducers = combineReducers({
  user: userReducer,
});
