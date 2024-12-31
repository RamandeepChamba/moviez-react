import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import MovieList from "../features/movie/MovieList";
import {
  createDiscoverUrl,
  createSearchUrl,
  createTopicListUrl,
  getDiscoveredMedia,
  getGenreById,
  getMedia,
  getMediaList,
  getPersonById,
} from "../services/apiTMDB";
import Pagination from "../ui/Pagination";
import Heading from "../ui/Heading";

function Movies() {
  const loaderData = useLoaderData();
  const { resultsFor, results: data } = loaderData;
  const navigate = useNavigate();
  const urlParams = useParams();

  function handleGotoPage(page) {
    let gotoUrl;
    if (urlParams.topic) {
      // url for provided topic list page
      gotoUrl = createTopicListUrl({
        type: "movie",
        topic: urlParams.topic,
        page,
      });
    }

    if (urlParams.filter) {
      const { filter, id } = urlParams;
      // url for discovered by filter list page
      gotoUrl = createDiscoverUrl({
        type: "movie",
        filter,
        id,
        page,
      });
    }

    if (urlParams.query) {
      const query = urlParams.query;
      // url for provided search results page
      gotoUrl = createSearchUrl({ query, type: "movie", page });
    }
    // navigate to the page
    navigate(gotoUrl);
  }

  return (
    <div>
      <Heading>Showing results for &ldquo;{resultsFor}&rdquo;</Heading>
      <MovieList movies={data?.results} />;
      <Pagination
        totalPages={data.total_pages}
        currentPage={data.page}
        onGotoPage={handleGotoPage}
      />
    </div>
  );
}

export async function searchResultsLoader({ params }) {
  const { query, page } = params;

  if (!query) throw new Error("query not provided");
  try {
    const results = await getMedia({ query, type: "movie", page });
    return { results, resultsFor: query };
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export async function topicListLoader({ params }) {
  const { topic, page } = params;
  try {
    const results = await getMediaList({ type: "movie", topic, page });
    return { results, resultsFor: topic };
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export async function discoverListLoader({ params }) {
  try {
    const results = await getDiscoveredMedia({ ...params, type: "movie" });

    // calculate resultsFor
    let resultsFor;
    if (params.filter === "cast") {
      // get person by id
      resultsFor = await getPersonById(params.id);
    }
    if (params.filter === "genre") {
      // get genre by id
      resultsFor = await getGenreById(params.id);
    }
    return { results, resultsFor };
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export default Movies;
