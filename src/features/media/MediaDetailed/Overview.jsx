import { useContext } from "react";
import { MediaItemContext } from "./MediaDetailed";
function Overview() {
  const { mediaItem } = useContext(MediaItemContext);
  return (
    <div>
      <h2>Overview</h2>
      <p>{mediaItem.overview}</p>
    </div>
  );
}

export default Overview;
