import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies = [] }) => {
  const location = useLocation();
  return (
    <>
      {movies.length > 0 ? (
        <ul className={css.listMovies}>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link
                className={css.linkOfAllMovies}
                state={location}
                to={`/movies/${movie.id}`}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.infoMessage}>There is no data</p>
      )}
    </>
  );
};

export default MovieList;
