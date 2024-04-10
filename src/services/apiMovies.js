import axios from "axios";

// Api key = 1dfa9729475330a54f84484be540df90

// Token
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGZhOTcyOTQ3NTMzMGE1NGY4NDQ4NGJlNTQwZGY5MCIsInN1YiI6IjY1ZmI0MzkwOTQwOGVjMDE0YWZiMzc0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zbGg0tFiTlNOGuTqjfd30E - 1hcD3f8UH_XDMy6NnfqQ

const BASE_URL = "https://api.themoviedb.org/3/";

const params = {
  language: "en-US",
  include_adult: false,
  page: 1,
};

const options = {
  headers: {
    Authorization:
      " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGZhOTcyOTQ3NTMzMGE1NGY4NDQ4NGJlNTQwZGY5MCIsInN1YiI6IjY1ZmI0MzkwOTQwOGVjMDE0YWZiMzc0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zbGg0tFiTlNOGuTqjfd30E-1hcD3f8UH_XDMy6NnfqQ",
  },
};

const apiMovies = async () => {
  const urlMovie = `${BASE_URL}trending/movie/day?${params}`;
  const { data } = await axios.get(urlMovie, options);
  return data;
};

const apiMoviesById = async (movieId) => {
  const urlId = `${BASE_URL}movie/${movieId}${params}`;
  const { data } = await axios.get(urlId, options);
  return data;
};

const apiMovieCast = async (movieId) => {
  const urlCast = `${BASE_URL}movie/${movieId}/credits?${params}`;
  const { data } = await axios.get(urlCast, options);
  return data;
};

const apiMovieReviews = async (movieId) => {
  const urlReviews = `${BASE_URL}movie/${movieId}/reviews?${params}`;
  const { data } = await axios.get(urlReviews, options);
  return data;
};

const apiMoviesByQuery = async (query) => {
  const urlQuery = `${BASE_URL}search/movie?query=${query}&${params}`;
  const { data } = await axios.get(urlQuery, options);
  return data;
};

export {
  apiMovies,
  apiMoviesById,
  apiMoviesByQuery,
  apiMovieCast,
  apiMovieReviews,
};
