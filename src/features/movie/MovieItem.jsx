// const movie = {
//   poster_path: "/IfB9hy4JH1eH6HEfIgIGORXi5h.jpg",
//   adult: false,
//   overview:
//     "Jack Reacher must uncover the truth behind a major government conspiracy in order to clear his name. On the run as a fugitive from the law, Reacher uncovers a potential secret from his past that could change his life forever.",
//   release_date: "2016-10-19",
//   genre_ids: [53, 28, 80, 18, 9648],
//   id: 343611,
//   original_title: "Jack Reacher: Never Go Back",
//   original_language: "en",
//   title: "Jack Reacher: Never Go Back",
//   backdrop_path: "/4ynQYtSEuU5hyipcGkfD6ncwtwz.jpg",
//   popularity: 26.818468,
//   vote_count: 201,
//   video: false,
//   vote_average: 4.19,

// };
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
          to={`/movie/${movie.id}`}
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
