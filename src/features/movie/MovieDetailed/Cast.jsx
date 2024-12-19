import { tmdbImageBaseUrl } from "../../../services/apiTMDB";
import styles from "./Cast.module.css";

function Cast() {
  return (
    <div>
      <h2>Cast</h2>
      <ul className={styles.cast}>
        {[1, 2, 3, 4].map((actor) => (
          <li key={actor}>
            <img
              src={`${tmdbImageBaseUrl}/mf0OANvWYSzU1d8yggrhyw8IbIz.jpg`}
              alt="Emma Watson image"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cast;
