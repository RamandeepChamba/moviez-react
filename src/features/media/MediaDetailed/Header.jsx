import { HiStar } from "react-icons/hi2";
import styles from "./Header.module.css";
import { useContext } from "react";
import { MediaItemContext } from "./MediaDetailed";
import { formatDecimalPlaces } from "../../../utils/helpers";
import { createDiscoverUrl } from "../../../services/apiTMDB";
import StyledLink from "../../../ui/StyledLink";

function Header() {
  const { mediaItem, type } = useContext(MediaItemContext);
  const name = type === "movie" ? mediaItem.title : mediaItem.name;
  return (
    <div className={styles.header}>
      <h1>
        <span className={styles.title}>{name}</span>
        <span className={styles.ratingContainer}>
          <span className={styles.rating}>
            {formatDecimalPlaces(mediaItem.vote_average, 1)}
            <HiStar />
          </span>
        </span>
      </h1>
      <p>{mediaItem.tagline}</p>
      <ul className={styles.genres}>
        {mediaItem.genres.map((genre) => (
          <li key={genre.id}>
            <StyledLink
              to={createDiscoverUrl({
                type,
                filter: "genre",
                id: genre.id,
              })}
              variation="brand"
              size="small"
              corners="pill"
            >
              {genre.name}
            </StyledLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;
