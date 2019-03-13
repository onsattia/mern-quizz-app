import { GET_QUIZZES, QUIZZES_LOADING } from "../actions/types";

const initialState = {
  quizzes: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case QUIZZES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_QUIZZES:
      return {
        ...state,
        quizzes: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
