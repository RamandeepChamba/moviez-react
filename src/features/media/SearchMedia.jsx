import { useState } from "react";
import Button from "../../ui/Button";
import styles from "./SearchMedia.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { createSearchUrl } from "../../services/apiTMDB";
import RadioOptions from "../../ui/RadioOptions";

function SearchMediaForm() {
  const { type: typeFromUrl, query: queryFromUrl } = useParams();
  const [query, setQuery] = useState(() => queryFromUrl ?? "");
  const [type, setType] = useState(() => typeFromUrl ?? "movie");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!query || !type) return;
    navigate(createSearchUrl({ query, type }));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <RadioOptions className={styles["radio-options"]}>
        <div>
          <label htmlFor="movie">Movie</label>
          <input
            type="radio"
            name="type"
            id="movie"
            checked={type === "movie"}
            onChange={() => setType("movie")}
          />
        </div>
        <div>
          <label htmlFor="tv">TV</label>
          <input
            type="radio"
            name="type"
            id="tv"
            checked={type === "tv"}
            onChange={() => setType("tv")}
          />
        </div>
      </RadioOptions>
      <input
        type="text"
        className={styles.searchbar}
        placeholder={`Search ${type}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit" variation="brand">
        Search
      </Button>
    </form>
  );
}

export default SearchMediaForm;
