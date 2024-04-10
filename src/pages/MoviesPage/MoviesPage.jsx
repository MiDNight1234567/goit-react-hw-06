import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { noquery, notify } from "../../services/toaster";
import { apiMoviesByQuery } from "../../services/apiMovies";
import css from "./MoviesPage.module.css";

import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchMoviesByQuery() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await apiMoviesByQuery(searchQuery);

        if (data.results.length === 0) {
          noquery();
          return;
        }

        setMovies(data.results);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoviesByQuery();
  }, [searchQuery]);

  const onSetSearchQuery = (searchTerm) => {
    if (searchTerm.trim().length === 0) {
      notify();
      return;
    }
    setSearchParams({ query: searchTerm });
  };

  return (
    <div>
      <h2 className={css.searchTitle}>Find movies</h2>
      <SearchBar
        searchQuery={searchQuery}
        onSetSearchQuery={onSetSearchQuery}
      />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}

      {!isError && !isLoading && movies.length > 0 && (
        <div className={css.searchList}>
          <MovieList movies={movies} />
        </div>
      )}
      <Toaster
        toastOptions={{
          style: {
            background: "#ffff00",
            color: "#008000",
          },
        }}
      />
    </div>
  );
};

export default MoviesPage;
