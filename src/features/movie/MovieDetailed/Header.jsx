import { HiStar } from "react-icons/hi2";
import styles from "./Header.module.css";
import { useContext } from "react";
import { MovieContext } from "./MovieDetailed";
import { formatDecimalPlaces } from "../../../utils/helpers";
import { createDiscoverUrl } from "../../../services/apiTMDB";
import StyledLink from "../../../ui/StyledLink";

function Header() {
  const { movie } = useContext(MovieContext);
  return (
    <div className={styles.header}>
      <h1>
        <span className={styles.title}>{movie.title}</span>
        <span className={styles.ratingContainer}>
          <span className={styles.rating}>
            {formatDecimalPlaces(movie.vote_average, 1)}
            <HiStar />
          </span>
        </span>
      </h1>
      <p>{movie.tagline}</p>
      <ul className={styles.genres}>
        {movie.genres.map((genre) => (
          <li key={genre.id}>
            <StyledLink
              to={createDiscoverUrl({
                type: "movie",
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
