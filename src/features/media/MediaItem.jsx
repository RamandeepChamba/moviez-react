// ============== type = "movie" =============
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

// ============== type = "tv" =============
// const tv = {
//   "adult": false,
//   "backdrop_path": "/uCsKIN7aMUoYN3686E5W6iiOEjc.jpg",
//   "genre_ids": [
//     18
//   ],
//   "id": 17780,
//   "origin_country": [
//     "US"
//   ],
//   "original_language": "en",
//   "original_name": "King",
//   "overview": "The story of Dr. Martin Luther King Jr., stretching from his days as a Southern Baptist minister in the South of the 1950s until his assassination in Memphis in 1968.",
//   "popularity": 0.8959,
//   "poster_path": "/tD71a5wWJqLFuCOXdnBP5uD5kFc.jpg",
//   "first_air_date": "1978-02-12",
//   "name": "King",
//   "vote_average": 6.8,
//   "vote_count": 10
// },
import StyledLink from "../../ui/StyledLink";
import Image from "../../ui/Image";
import styles from "./MediaItem.module.css";
import { tmdbImageBaseUrl } from "../../services/apiTMDB";
import { formatDecimalPlaces } from "../../utils/helpers";
import { HiStar } from "react-icons/hi2";
function MediaItem({ mediaItem, type }) {
  const name = type === "movie" ? mediaItem.title : mediaItem.name;
  const releaseDate =
    type === "movie"
      ? mediaItem.release_date ?? "N/A"
      : mediaItem.first_air_date ?? "N/A";

  // TODO - if medium is "tv" fetch number of seasons and display them
  return (
    <li className={styles["media_item"]}>
      <div>
        <div className={styles.img_container}>
          <Image
            src={`${tmdbImageBaseUrl}/${mediaItem.poster_path}`}
            alt={`${name} poster`}
          />
        </div>
        <div className={styles.data}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.subdata}>
            <span>
              {releaseDate === "" ? "N/A" : releaseDate.split("-")[0]}
            </span>
            <span className={styles.rating}>
              <HiStar />
              {mediaItem.vote_average
                ? formatDecimalPlaces(mediaItem.vote_average, 1)
                : "N/A"}
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
          to={`/moviez-react/${type}/${mediaItem.id}`}
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

export default MediaItem;
