import MovieItem from "./MovieItem";
import styles from "./MovieList.module.css";

function MovieList() {
  return (
    <ul className={styles.list}>
      <MovieItem />
      <MovieItem />
      <MovieItem />
      <MovieItem />
      <MovieItem />
      <MovieItem />
    </ul>
  );
}

export default MovieList;
