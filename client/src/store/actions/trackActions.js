import axios from "axios";
import { GET_TRACKS, TRACKS_LOADING, GET_ERRORS } from "./types";

// Get All Tracks
export const getTracks = () => dispatch => {
  dispatch(loading);
  axios
    .get("/tracks")
    .then(res =>
      dispatch({
        type: GET_TRACKS,
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
    type: TRACKS_LOADING
  };
};
