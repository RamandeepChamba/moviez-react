import { createDiscoverUrl, tmdbImageBaseUrl } from "../../../services/apiTMDB";
import styles from "./Cast.module.css";
import { Link } from "react-router-dom";

function Cast({ cast }) {
  return (
    <div>
      <h2>Cast</h2>
      <ul className={styles.cast}>
        {cast.map((actor) => (
          <li key={actor.id}>
            <Link
              to={createDiscoverUrl({
                type: "movie", // Don't have discover by cast for Tv
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
