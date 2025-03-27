// const movie = {
//   "adult": false,
//   "backdrop_path": null,
//   "genre_ids": [
//     18,
//     10770
//   ],
//   "id": 581510,
//   "original_language": "en",
//   "original_title": "King",
//   "overview": "A man who has had a good life in England wants to retire to Jamaica, but the celebration with his daughters doesn't go as expected.",
//   "popularity": 0.0748,
//   "poster_path": "/59OEbxgqtC1RyveO1824jchmDSv.jpg",
//   "release_date": "1984-04-03",
//   "title": "King",
//   "video": false,
//   "vote_average": 0,
//   "vote_count": 0
// },
// import { Link } from "react-router-dom";
import StyledLink from "../../ui/StyledLink";
import Image from "../../ui/Image";
import styles from "./MovieItem.module.css";
import { tmdbImageBaseUrl } from "../../services/apiTMDB";
import { formatDecimalPlaces } from "../../utils/helpers";
import { HiStar } from "react-icons/hi2";
function MovieItem({ movie }) {
  return (
    <li className={styles.movie}>
      <div>
        <div className={styles.img_container}>
          <Image
            src={`${tmdbImageBaseUrl}/${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
        </div>
        <div className={styles.data}>
          <h3 className={styles.title}>{movie.title}</h3>
          <div className={styles.subdata}>
            <span>
              {movie.release_date === ""
                ? "N/A"
                : movie.release_date.split("-")[0]}
            </span>
            <span className={styles.rating}>
              <HiStar />
              {formatDecimalPlaces(movie.vote_average, 1)}
            </span>
          </div>
        </div>
      </div>
      {/* Overlay / onHover */}
      <div className={styles.overlay}>
        {/* <ul className={styles.genres}>
          <li>Genre #1</li>
          <li>Genre #2</li>
          <li>Genre #3</li>
        </ul> */}
        <StyledLink
          to={`/moviez-react/movie/${movie.id}`}
          className={styles.cta}
          corners="pill"
        >
          View
        </StyledLink>
        {/* <Link to={`/movie/${movie.id}`} className={styles.cta}>
          View
        </Link> */}
      </div>
    </li>
  );
}

export default MovieItem;
