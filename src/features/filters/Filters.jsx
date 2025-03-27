import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createFilteredListUrl, getGenres } from "../../services/apiTMDB";
import Genre from "./Genre";
import styles from "./Filters.module.css";
import Button from "../../ui/Button";
import RadioOptions from "../../ui/RadioOptions";

const sortByOptions = ["popular", "rating"];
const genreFunctionOptions = ["or", "and"];

function Filters() {
  const urlParams = useParams();
  const [genres, setGenres] = useState([]);
  const movieGenres = useRef(null);
  const tvGenres = useRef(null);
  const [showFilters, setShowFilters] = useState(false);
  // for type
  const [type, setType] = useState(() => urlParams.type ?? "movie");
  // for radio sort by
  const [sortBy, setSortBy] = useState(() => urlParams.sortBy ?? "popular");
  // for genre combinator type = or (|)/ and (,)
  const [genreFunction, setGenreFunction] = useState("or");
  // for genres
  const [genresBool, setGenresBool] = useState([]);
  const hasFilters = genresBool.includes(true) || sortBy || type;
  // genre was changed, so don't use URL genres anymore
  const genresReadFromUrl = useRef(false);
  const navigate = useNavigate();

  // Fetch genres based on type on start and whenever type changes
  // and set genres to them
  useEffect(
    function () {
      (async function () {
        if (type === "movie") {
          if (!movieGenres.current) {
            // fetch movie genres
            movieGenres.current = await getGenres({ type: "movie" });
          }
          setGenres(movieGenres.current);
        }
        if (type === "tv") {
          if (!tvGenres.current) {
            // fetch movie genres
            tvGenres.current = await getGenres({ type: "tv" });
          }
          setGenres(tvGenres.current);
        }
      })();
    },
    [type]
  );

  // create genresBool array based on the genres whenever genres changes
  useEffect(
    function () {
      if (genres.length === 0) return;
      // fill genresBool array
      setGenresBool(genres.slice().fill(false));
    },
    [genres]
  );

  // read genres from URL
  useEffect(
    function () {
      // if genres already read from URL or no genres in url - return
      if (
        genresReadFromUrl.current ||
        urlParams.genres === "all" ||
        !urlParams.genres ||
        genres.length === 0
      )
        return;
      // else, select genres which are in the URL
      const { genres: genresStr } = urlParams;
      // find genre function used
      const urlGenreFn =
        genresStr.indexOf("|") != -1
          ? "or"
          : genresStr.indexOf(",") != -1
          ? "and"
          : "or";
      const selectedGenres = genresStr.split(urlGenreFn === "or" ? "|" : ",");
      setGenreFunction(urlGenreFn);
      setGenresBool((genBool) =>
        genBool.map((_, i) => selectedGenres.includes(genres[i].id + ""))
      );
      console.log();
      genresReadFromUrl.current = true;
    },
    [genresBool]
  );

  function handleSubmit(e) {
    e.preventDefault();

    // selected genres
    const selectedGenres = genres
      .filter((_, i) => genresBool[i])
      .map((genreObj) => genreObj.id);

    // apply genre function
    const gotoUrl = createFilteredListUrl({
      sortBy,
      genres: selectedGenres.join(genreFunction === "or" ? "|" : ","),
      type,
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
        {showFilters ? "X" : "Browse"}
      </Button>
      {showFilters && (
        <form onSubmit={handleSubmit}>
          {/* Type */}
          <div className={styles["form-row"]}>
            <h4 className={styles["filter-heading"]}>Type</h4>
            <RadioOptions>
              <div>
                <label htmlFor="filter-movie">Movie</label>
                <input
                  type="radio"
                  name="type"
                  id="filter-movie"
                  checked={type === "movie"}
                  onChange={() => setType("movie")}
                />
              </div>
              <div>
                <label htmlFor="filter-tv">TV</label>
                <input
                  type="radio"
                  name="type"
                  id="filter-tv"
                  checked={type === "tv"}
                  onChange={() => setType("tv")}
                />
              </div>
            </RadioOptions>
          </div>
          {/* Genre function */}
          <div className={styles["form-row"]}>
            <h4 className={styles["filter-heading"]}>Genre Function</h4>
            <div className={styles["radio-options"]}>
              {genreFunctionOptions.map((option) => (
                <div key={option} className="form-group">
                  <label htmlFor={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </label>
                  <input
                    type="radio"
                    name="genre_function"
                    id={option}
                    value={option}
                    checked={genreFunction === option}
                    onChange={() => setGenreFunction(option)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Genres */}
          <div className={styles["form-row"]}>
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
          {/* Sort By */}
          <div className={styles["form-row"]}>
            <h4 className={styles["filter-heading"]}>Sort By</h4>
            <div className={styles["radio-options"]}>
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
