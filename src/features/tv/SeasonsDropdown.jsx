// import Select from "../../ui/Select";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";

function SeasonsDropdown({ seasons, styles }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const options = seasons.map((season) => {
    return { label: season.name, value: season.season_number };
  });
  const selectedSeason =
    options.find((option) => option.value == searchParams.get("seasonNum")) ||
    "";

  function handleChange(e) {
    searchParams.set("seasonNum", e.value);
    // season changed so reset episodes
    searchParams.delete("episodeNum");
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      onChange={handleChange}
      value={selectedSeason}
      isSearchable={false}
      placeholder="Select a season"
      styles={styles}
    />
  );
}

export default SeasonsDropdown;
