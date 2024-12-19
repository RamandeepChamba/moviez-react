import { tmdbImageBaseUrl } from "../../../services/apiTMDB";
import styles from "./Poster.module.css";

function Poster() {
  return (
    <div className={styles.poster}>
      <img
        src={`${tmdbImageBaseUrl}/c54HpQmuwXjHq2C9wmoACjxoom3.jpg`}
        alt="poster"
      />
    </div>
  );
}

export default Poster;
