import { useEffect, useState } from "react";
import { apiMovies } from "../../services/apiMovies";
import css from "./HomePage.module.css";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await apiMovies();

        setMovies(data.results);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className={css.movieMainPage}>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading &&
        !isError &&
        (movies.length ? (
          <MovieList movies={movies} />
        ) : (
          <p className={css.infoMessage}>No movies to display!</p>
        ))}
    </div>
  );
};

export default HomePage;
