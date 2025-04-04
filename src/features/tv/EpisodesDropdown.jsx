// import Select from "../../ui/Select";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";

function EpisodesDropdown({ episodes, styles }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const options = episodes.map((episode) => {
    return {
      label: `EP ${episode.episode_number}. ${episode.name}`,
      value: episode.episode_number,
    };
  });

  const selectedEpisode =
    options.find((option) => option.value == searchParams.get("episodeNum")) ||
    "";
  function handleChange(e) {
    searchParams.set("episodeNum", e.value);
    setSearchParams(searchParams);
  }
  if (!episodes.length) return null;
  return (
    <Select
      options={options}
      onChange={handleChange}
      value={selectedEpisode}
      placeholder="Select an episode"
      styles={styles}
    />
  );
}

export default EpisodesDropdown;
