import Cast from "./Cast";
import Header from "./Header";
import Overview from "./Overview";
import Poster from "./Poster";
import styles from "./MediaDetailed.module.css";
import { createContext } from "react";
import { useParams } from "react-router-dom";

export const MediaItemContext = createContext();

function MediaDetailed({ mediaSingle }) {
  const { type } = useParams();
  return (
    <MediaItemContext.Provider
      value={{ mediaItem: mediaSingle.details, cast: mediaSingle.cast, type }}
    >
      <div className={styles.centerContainer}>
        <div className={styles.layout}>
          <Poster />
          <div className={styles.details}>
            <Header />
            <Overview />
            <Cast />
          </div>
        </div>
      </div>
    </MediaItemContext.Provider>
  );
}

export default MediaDetailed;
