import { useLoaderData } from "react-router-dom";
import MovieDetailed from "../features/movie/MovieDetailed/MovieDetailed";
import { getMediaDetails } from "../services/apiTMDB";

function Movie() {
  const movie = useLoaderData();
  return (
    <>
      <MovieDetailed movie={movie} />
    </>
  );
}

export async function loader({ params }) {
  try {
    const movie = await getMediaDetails({ type: "movie", id: params.id });
    return movie;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export default Movie;
