import { useState } from "react";
import Button from "../../ui/Button";
import styles from "./SearchMovie.module.css";
import { useNavigate } from "react-router-dom";
import { createSearchUrl } from "../../services/apiTMDB";

function SearchMovie() {
  const [query, setQuery] = useState("");
  const type = "movie"; // tv/movie [radio button] (change to state var later)
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!query || !type) return;
    navigate(createSearchUrl({ query, type }));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit" variation="brand">
        Search
      </Button>
    </form>
  );
}

export default SearchMovie;
