import { useLoaderData } from "react-router-dom";
import MediaDetailed from "../features/media/MediaDetailed/MediaDetailed";
import { getMediaDetails } from "../services/apiTMDB";

function MediaSingle() {
  const mediaSingle = useLoaderData();
  return (
    <>
      <MediaDetailed mediaSingle={mediaSingle} />
    </>
  );
}

export async function loader({ params }) {
  try {
    const mediaSingle = await getMediaDetails({
      type: params.type,
      id: params.id,
    });
    return mediaSingle;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export default MediaSingle;
