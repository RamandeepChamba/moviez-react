import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFilteredListUrl, getGenres } from "../../services/apiTMDB";

const sortByOptions = ["popular", "rating"];

function Filters() {
  const [genres, setGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  // for radio sort by
  const [sortBy, setSortBy] = useState(null);
  // for genres
  const [genresBool, setGenresBool] = useState([]);
  const navigate = useNavigate();

  useEffect(function () {
    // fetch all genres from API
    (async function getGenresFromApi() {
      try {
        const allGenres = await getGenres({ type: "movie" });
        setGenres(allGenres);
      } catch (err) {
        throw new Error(err.message);
      }
    })();
  }, []);
  useEffect(
    function () {
      // fill genresBool array
      setGenresBool(genres.slice().fill(false));
    },
    [genres]
  );

  function handleSubmit(e) {
    e.preventDefault();
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
      <button onClick={() => setShowFilters((showFilters) => !showFilters)}>
        {showFilters ? "X" : "Filters"}
      </button>
      {showFilters && (
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <h4>Genre</h4>
            {genres.map(({ id, name }, i) => (
              <div key={id}>
                <label htmlFor={id}>{name}</label>
                <input
                  type="checkbox"
                  name="genre"
                  id={id}
                  value={id}
                  checked={genresBool[i]}
                  onChange={() => toggleGenresBool(i)}
                />
              </div>
            ))}
          </div>
          <div className="form-row">
            <h4>Sort By</h4>
            <div>
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
          <button>Search</button>
        </form>
      )}
    </div>
  );
}

export default Filters;
