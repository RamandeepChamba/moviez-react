import MovieItem from "./MovieItem";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
  return (
    <>
      {movies.length === 0 && <p>No movies found</p>}
      {movies.length > 0 && (
        <ul className={styles.list}>
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </>
  );
}

export default MovieList;
