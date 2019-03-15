import axios from "axios";
import { GET_QUIZZES, QUIZZES_LOADING, GET_ERRORS } from "./types";

// Get All Quizzes
export const getQuizzes = () => dispatch => {
  dispatch(loading);
  axios
    .get("/quizzes")
    .then(res =>
      dispatch({
        type: GET_QUIZZES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Quizzes By Track
export const filterByTrack = id => dispatch => {
  dispatch(loading);
  axios
    .get(`/tracks/quizzes/${id}`)
    .then(res =>
      dispatch({
        type: GET_QUIZZES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Loading
export const loading = () => {
  return {
    type: QUIZZES_LOADING
  };
};
