import { Suspense, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { apiMoviesById } from "../../services/apiMovies";
import { getImg } from "../../services/getImg";
import css from "./MovieDetailsPage.module.css";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

const getNavLinkClassNames = ({ isActive }) =>
  clsx(css.addItems, {
    [css.active]: isActive,
  });

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function fetchMoviesById() {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await apiMoviesById(movieId);
        setMovieData(data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoviesById();
  }, [movieId]);

  const vote = Math.floor(movieData.vote_average * 10);
  const year = movieData.release_date
    ? new Date(movieData.release_date).getFullYear()
    : "?";

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading &&
        !isError &&
        (movieData ? (
          <div>
            <Link className={css.goBack} to={backLinkRef.current}>
              Go back
            </Link>
            <div className={css.mainMovieInfo}>
              <img
                className={css.movieImg}
                src={getImg(movieData.poster_path)}
                width="500"
                alt={movieData.title}
              />
              <div className={css.movieInfo}>
                <h1>
                  {movieData.title} ({year})
                </h1>
                <p>User Score: {vote}% </p>
                <span>
                  <h2>Overview:</h2>
                  <p>{movieData.overview}</p>
                </span>

                <span>
                  <h2>Genres:</h2>

                  {movieData.genres && (
                    <p className={css.genres}>
                      {movieData.genres.map((genre) => {
                        return <span key={genre.id}>{genre.name}</span>;
                      })}
                    </p>
                  )}
                </span>
              </div>
            </div>

            <div className={css.addInfo}>
              <h3>Addition information:</h3>
              <ul className={css.addLinks}>
                <li>
                  <NavLink className={getNavLinkClassNames} to="cast">
                    Cast
                  </NavLink>
                </li>
                <li>
                  <NavLink className={getNavLinkClassNames} to="reviews">
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        ) : (
          <p className={css.infoMessage}>No data to display</p>
        ))}
    </>
  );
};

export default MovieDetailsPage;
