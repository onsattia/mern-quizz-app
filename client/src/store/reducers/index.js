import { combineReducers } from "redux";
import authReducer from "./authReducer";
import quizReducer from "./quizReducer";
import trackReducer from "./trackReducer";
import profileReducer from "./profileReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  quizzes: quizReducer,
  tracks: trackReducer,
  profile: profileReducer
});
