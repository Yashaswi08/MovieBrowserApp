import axios from 'axios';
import React from 'react';

const BASE_ENDPOINT_URL = 'https://api.themoviedb.org/3/';
export const DETAILS_ENDPOINT = 'movie/';
export const LATEST_MOVIES_ENDPOINT = 'trending/movie/day?language=en-US&page=';
export const SEARCH_MOVIES_ENDPOINT = 'search/movie?language=en-US&query=';

export const axios_instance = axios.create({
  baseURL: BASE_ENDPOINT_URL,
  timeout: 10000,
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWQ2NGI4MzU2OGVjY2MwMGM2NjM3ZTExODkyOTAzZSIsIm5iZiI6MTcyMTkwOTk0NC4xMDI5NzIsInN1YiI6IjY2YTIzNTc5Zjk5MTI5MDM5YjBhMGQ4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VmcemigFoNOue6UNN9T_HKZnx5jSDJ6gA8Hj68DLDdE',
  },
});

export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';

export const HomeTabContext = React.createContext({});
