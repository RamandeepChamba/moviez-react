import { useContext } from "react";
import { MovieContext } from "./MovieDetailed";

function Overview() {
  const { movie } = useContext(MovieContext);
  return (
    <div>
      <h2>Overview</h2>
      <p>{movie.overview}</p>
    </div>
  );
}

export default Overview;
