// fetchAlbums.ts (or .js if not using TypeScript)
import axios from 'axios';

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const fetchMovies = () => async (dispatch) => {
  dispatch({ type: FETCH_MOVIES_REQUEST });

  try {
    const response = await axios.get(
      'https://itunes.apple.com/search?term=jumanji&media=movie'
    );

    dispatch({
      type: FETCH_MOVIES_SUCCESS,
      payload: response.data.results,
    });
  } catch (error) {
    console.error('API fetch failed:', error.message);
    dispatch({
      type: FETCH_MOVIES_FAILURE,
      payload: error.message || 'Something went wrong',
    });
  }
};
