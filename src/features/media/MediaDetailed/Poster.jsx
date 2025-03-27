import { useContext } from "react";
import { tmdbImageBaseUrl } from "../../../services/apiTMDB";
import styles from "./Poster.module.css";
import { MediaItemContext } from "./MediaDetailed";

function Poster() {
  const { mediaItem } = useContext(MediaItemContext);
  return (
    <div className={styles.poster}>
      <img src={`${tmdbImageBaseUrl}/${mediaItem.poster_path}`} alt="poster" />
    </div>
  );
}

export default Poster;
