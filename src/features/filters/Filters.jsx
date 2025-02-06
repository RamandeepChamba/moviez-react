import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createFilteredListUrl, getGenres } from "../../services/apiTMDB";
import Genre from "./Genre";
import styles from "./Filters.module.css";
import Button from "../../ui/Button";

const sortByOptions = ["popular", "rating"];

function Filters() {
  const [genres, setGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  // for radio sort by
  const [sortBy, setSortBy] = useState(null);
  // for genres
  const [genresBool, setGenresBool] = useState([]);
  const hasFilters = genresBool.includes(true);
  // genre was changed, so don't use URL genres anymore
  const genresReadFromUrl = useRef(false);
  const navigate = useNavigate();
  const urlParams = useParams();

  useEffect(
    function () {
      // fetch all genres from API
      (async function getGenresFromApi() {
        try {
          const allGenres = await getGenres({ type: "movie" });
          setGenres(allGenres);
        } catch (err) {
          throw new Error(err.message);
        }
      })();
    },
    [urlParams]
  );
  useEffect(
    function () {
      if (genres.length === 0 || genresReadFromUrl.current) return;
      // fill genresBool array
      setGenresBool(genres.slice().fill(false));
    },
    [genres]
  );
  useEffect(
    function () {
      if (
        genresBool.length === 0 ||
        genresBool.includes(true) ||
        !urlParams.sortBy ||
        genresReadFromUrl.current
      )
        return;
      // Preserve applied filters (if any)
      // - read filters from URL
      const { sortBy: urlSortBy, genres: genresStr } = urlParams;
      const selectedGenres = genresStr.split("|");
      // - reflect filters in UI
      setSortBy(urlSortBy);
      setGenresBool((genBool) =>
        genBool.map((_, i) => selectedGenres.includes(genres[i].id + ""))
      );
      genresReadFromUrl.current = true;
    },
    [urlParams, genres, genresBool]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!sortBy && !genresBool.includes(true)) {
      return;
    }
    // selected genres
    const selectedGenres = genres
      .filter((_, i) => genresBool[i])
      .map((genreObj) => genreObj.id);

    const gotoUrl = createFilteredListUrl({
      sortBy,
      genres: selectedGenres.join("|"),
    });

    navigate(gotoUrl);
  }

  function toggleGenresBool(index) {
    setGenresBool((genBool) =>
      genBool.map((gen, i) => (i === index ? !gen : gen))
    );
  }

  return (
    <div>
      <Button
        className={`${styles.toggler} ${hasFilters ? styles.hasFilters : ""}`}
        onClick={() => setShowFilters((showFilters) => !showFilters)}
      >
        {showFilters ? "X" : "Filters"}
      </Button>
      {showFilters && (
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <h4 className={styles["filter-heading"]}>Genres</h4>
            <div className={styles["genres-list"]}>
              {genres.map((genre, i) => (
                <Genre
                  key={genre.id}
                  genre={genre}
                  index={i}
                  genresBool={genresBool}
                  onChange={toggleGenresBool}
                />
              ))}
            </div>
          </div>
          <div className="form-row">
            <h4 className={styles["filter-heading"]}>Sort By</h4>
            <div className={styles["sortBy-options"]}>
              {sortByOptions.map((option) => (
                <div key={option} className="form-group">
                  <label htmlFor={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </label>
                  <input
                    type="radio"
                    name="sort"
                    id={option}
                    value={option}
                    checked={sortBy === option}
                    onChange={() => setSortBy(option)}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" variation="brand" className={styles.submit}>
            Search
          </Button>
        </form>
      )}
    </div>
  );
}

export default Filters;
