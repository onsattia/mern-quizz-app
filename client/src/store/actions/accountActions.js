import axios from "axios";
import { GET_USER, USER_LOADING, GET_ERRORS } from "./types";

export const getUser = id => dispatch => {
  dispatch(loading);
  axios
    .get(`/users/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER,
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

export const editUser = (id, newUser) => dispatch => {
  axios
    .put(`/users/${id}`, newUser)
    .then(res => {
      // console.log("Updated");
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete User
export const deleteUserAccount = id => dispatch => {
  axios
    .delete(`/users/${id}`)
    .then()
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
    type: USER_LOADING
  };
};
