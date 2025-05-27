// src/actions/movieActions.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const fetchMovies = () => async dispatch => {
  dispatch({ type: FETCH_MOVIES_REQUEST });
  try {
    const response = await axios.get('https://itunes.apple.com/search?term=jumanji');
    const movies = response.data.results;
    await AsyncStorage.setItem('movies', JSON.stringify(movies));
    dispatch({ type: FETCH_MOVIES_SUCCESS, payload: movies });
  } catch (error) {
    const cachedData = await AsyncStorage.getItem('movies');
    if (cachedData) {
      dispatch({ type: FETCH_MOVIES_SUCCESS, payload: JSON.parse(cachedData) });
    } else {
      dispatch({ type: FETCH_MOVIES_FAILURE, error: error.message });
    }
  }
};
