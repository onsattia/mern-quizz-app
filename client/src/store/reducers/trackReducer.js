import { GET_TRACKS, TRACKS_LOADING } from "../actions/types";

const initialState = {
  tracks: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TRACKS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TRACKS:
      return {
        ...state,
        tracks: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
