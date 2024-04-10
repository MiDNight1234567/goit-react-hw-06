import { getImg } from "../../services//getImg";
import css from "./ActorCard.module.css";

const ActorCard = ({ actor }) => {
  return (
    <div className={css.actorCard}>
      <div>
        <p>{actor.name}</p>
        <p>
          Character:{" "}
          <span>
            <i>
              <b>{actor.character || "Character"}</b>
            </i>
          </span>
        </p>
      </div>
      <div className={css.actorCardContainer}>
        <img
          className={css.actorImg}
          src={getImg(actor.profile_path)}
          width="120"
          alt={actor.name}
        />
      </div>
    </div>
  );
};

export default ActorCard;
