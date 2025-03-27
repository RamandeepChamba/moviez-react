import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  createDiscoverUrl,
  createFilteredListUrl,
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
import Filters from "../features/filters/Filters";
import MediaList from "../features/media/MediaList";

function Media() {
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
      gotoUrl = createSearchUrl({ query, type: urlParams.type, page });
    }

    if (urlParams.genres) {
      // url for media list after applying filters
      gotoUrl = createFilteredListUrl({
        type: urlParams.type,
        sortBy: urlParams.sortBy,
        genres: urlParams.genres,
        page,
      });
    }
    // navigate to the page
    navigate(gotoUrl);
  }

  return (
    <div>
      <Filters />
      <Heading>Showing results for &ldquo;{resultsFor ?? ""}&rdquo;</Heading>
      <MediaList media={data?.results} type={urlParams.type} />;
      <Pagination
        totalPages={data.total_pages}
        currentPage={data.page}
        onGotoPage={handleGotoPage}
      />
    </div>
  );
}

export async function searchResultsLoader({ params }) {
  const { type, query, page } = params;

  if (!query) throw new Error("query not provided");
  try {
    const results = await getMedia({ query, type, page });
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
    const filterOptions = {
      genre: "with_genres",
      cast: "with_cast",
    };
    const results = await getDiscoveredMedia({
      page: params.page,
      filters: [{ name: filterOptions[params.filter], value: params.id }],
    });
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

export async function filteredMediaLoader({ params }) {
  try {
    const sortOptions = {
      popular: "popularity.desc",
      rating: "vote_average.desc",
    };
    const filters = [{ name: "sort_by", value: sortOptions[params.sortBy] }];

    if (params.genres !== "all") {
      filters.push({ name: "with_genres", value: params.genres });
    }

    const results = await getDiscoveredMedia({
      page: params.page,
      filters,
      type: params.type,
    });
    return { results };
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export default Media;
