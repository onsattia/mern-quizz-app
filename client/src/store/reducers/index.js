import { combineReducers } from "redux";
import authReducer from "./authReducer";
import quizzReducer from "./quizzReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  quizzes: quizzReducer
});
