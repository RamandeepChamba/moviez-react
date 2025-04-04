import Cast from "./Cast";
import Header from "./Header";
import Overview from "./Overview";
import Poster from "./Poster";
import styles from "./MediaDetailed.module.css";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SeasonsDropdown from "../../tv/SeasonsDropdown";
import EpisodesDropdown from "../../tv/EpisodesDropdown";
import { getSeasonEpisodeDetails } from "../../../services/apiTMDB";
import Loader from "../../../ui/Loader";

// NOTE - this component unmounts and mounts again everytime search params are updated (why?),
// below code is written with that in mind.
function MediaDetailed({ mediaSingle }) {
  const { type, id } = useParams();
  const [searchParams] = useSearchParams();
  const currentSeason = searchParams.get("seasonNum");
  const currentEpisode = searchParams.get("episodeNum");
  const [episodes, setEpisodes] = useState([]);

  const [castOfSpecific, setCastOfSpecific] = useState(null);
  const [detailsOfSpecific, setDetailsOfSpecific] = useState(null);
  // There's no episode poster
  const [seasonPoster, setSeasonPoster] = useState(null);
  const [fetchedEpisode, setFetchedEpisode] = useState(false);

  console.log("single", mediaSingle);
  console.log("detailed", detailsOfSpecific);

  const dropdownStyles = {
    option: (baseStyles, state) => ({
      ...baseStyles,
      color: "black",
      backgroundColor: state.isFocused
        ? "var(--color-brand-dark)"
        : state.isSelected
        ? "var(--color-brand)"
        : "white",
    }),
  };

  useEffect(
    function () {
      // If season is there and it's not fetched already
      if (currentSeason && !seasonPoster) {
        // fetch season details
        (async function () {
          try {
            const seasonData = await getSeasonEpisodeDetails({
              seriesId: id,
              seasonNum: currentSeason,
            });
            setDetailsOfSpecific(seasonData.details);
            setSeasonPoster(seasonData.details.poster_path);
            setCastOfSpecific(seasonData.cast);
            setEpisodes(seasonData.details.episodes);
          } catch (err) {
            console.error(err);
          }
        })();
      }
    },
    [currentSeason, id, seasonPoster]
  );
  useEffect(
    function () {
      // If episode is there and season details have been fetched
      if (currentEpisode && !fetchedEpisode && seasonPoster) {
        // fetch episode details
        (async function () {
          try {
            const seasonData = await getSeasonEpisodeDetails({
              seriesId: id,
              seasonNum: currentSeason,
              episodeNum: currentEpisode,
            });
            setFetchedEpisode(true);
            setDetailsOfSpecific(seasonData.details);
            setCastOfSpecific(seasonData.cast);
          } catch (err) {
            console.error(err);
          }
        })();
      }
    },
    [currentSeason, currentEpisode, id, fetchedEpisode, seasonPoster]
  );
  // Season details have not been fetched yet
  if (currentSeason && !currentEpisode && !detailsOfSpecific) return <Loader />;
  // Episode details have not been fetched yet (season details will be fetched before this for poster and episode list)
  if (currentEpisode && !fetchedEpisode) return <Loader />;
  return (
    <div>
      <div className={styles.centerContainer}>
        <div className={styles.layout}>
          <Poster
            path={
              !detailsOfSpecific
                ? mediaSingle.details.poster_path
                : seasonPoster
            }
            backdropPath={mediaSingle.details.backdrop_path}
          />
          <div className={styles.details}>
            <Header mediaItem={mediaSingle.details} type={type} />
            {type === "tv" && (
              <SeasonsDropdown
                seasons={mediaSingle.details.seasons}
                styles={dropdownStyles}
              />
            )}
            {episodes.length > 0 && (
              <EpisodesDropdown episodes={episodes} styles={dropdownStyles} />
            )}
            <Overview
              overview={
                !detailsOfSpecific
                  ? mediaSingle.details.overview
                  : detailsOfSpecific.overview
              }
            />
            <Cast cast={castOfSpecific || mediaSingle.cast} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaDetailed;
