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
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Image from "../../ui/Image";
import styles from "./MovieItem.module.css";
function MovieItem() {
  return (
    <li className={styles.movie}>
      <div>
        <Image
          src="https://th.bing.com/th/id/OIP.5nVB9vXv0spgByfgIHvOqQHaLH?rs=1&pid=ImgDetMain"
          alt="movie poster"
        />
        <div className={styles.data}>
          <h3>Movie name</h3>
          <div className={styles.subdata}>
            <span>2021</span>
            <span>* 5</span>
          </div>
        </div>
      </div>
      {/* Overlay / onHover */}
      <div className={styles.overlay}>
        <ul className={styles.genres}>
          <li>Action</li>
          <li>Family</li>
          <li>Animation</li>
        </ul>
        <Link to="/movie/1" className={styles.cta}>
          View
        </Link>
      </div>
    </li>
  );
}

export default MovieItem;
