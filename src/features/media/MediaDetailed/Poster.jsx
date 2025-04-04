import { tmdbImageBaseUrl } from "../../../services/apiTMDB";
import styles from "./Poster.module.css";

function Poster({ path, backdropPath = "" }) {
  return (
    <div
      className={styles.poster}
      style={{
        "--backdrop-poster-path": backdropPath
          ? `${tmdbImageBaseUrl}/${backdropPath}`
          : "",
      }}
    >
      <img src={`${tmdbImageBaseUrl}/${path}`} alt="poster" />
    </div>
  );
}

export default Poster;
