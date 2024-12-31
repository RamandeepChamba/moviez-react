import { useContext } from "react";
import { tmdbImageBaseUrl } from "../../../services/apiTMDB";
import styles from "./Poster.module.css";
import { MovieContext } from "./MovieDetailed";

function Poster() {
  const { movie } = useContext(MovieContext);
  return (
    <div className={styles.poster}>
      <img src={`${tmdbImageBaseUrl}/${movie.poster_path}`} alt="poster" />
    </div>
  );
}

export default Poster;
