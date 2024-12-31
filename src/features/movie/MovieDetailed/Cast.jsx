import { useContext } from "react";
import { createDiscoverUrl, tmdbImageBaseUrl } from "../../../services/apiTMDB";
import styles from "./Cast.module.css";
import { MovieContext } from "./MovieDetailed";
import { Link } from "react-router-dom";

function Cast() {
  const { cast } = useContext(MovieContext);
  return (
    <div>
      <h2>Cast</h2>
      <ul className={styles.cast}>
        {cast.map((actor) => (
          <li key={actor.id}>
            <Link
              to={createDiscoverUrl({
                type: "movie",
                filter: "cast",
                id: actor.id,
              })}
            >
              <img
                src={`${tmdbImageBaseUrl}/${actor.profile_path}`}
                alt={`${actor.name} image`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cast;
