import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiMovieCast } from "../../services/apiMovies";
import css from "./MovieCast.module.css";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ActorCard from "../ActorCard/ActorCard";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await apiMovieCast(movieId);

        setMovieCast(data.cast);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={css.mainCast}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading &&
        !isError &&
        (movieCast.length ? (
          <ul className={css.listCast}>
            {movieCast.map((actor) => {
              return (
                <li className={css.castItem} key={actor.id}>
                  <ActorCard actor={actor} />
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={css.infoMessage}>There is no data</p>
        ))}
    </div>
  );
};

export default MovieCast;
