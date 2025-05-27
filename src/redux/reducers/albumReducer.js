// src/reducers/movieReducer.js
import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE
} from '../actions/fetchAlbums';

const initialState = {
  movies: [],
  loading: false,
  error: null
};

export default function albumReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MOVIES_SUCCESS:
      return { ...state, movies: action.payload, loading: false };
    case FETCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
