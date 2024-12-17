import Button from "../../ui/Button";
import styles from "./SearchMovie.module.css";
function SearchMovie() {
  return (
    <form className={styles.form}>
      <input type="text" placeholder="Search movie" name="query" />
      <Button type="submit" variation="brand">
        Search
      </Button>
    </form>
  );
}

export default SearchMovie;
