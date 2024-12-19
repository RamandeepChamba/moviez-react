import { useLoaderData, useNavigate } from "react-router-dom";
import MovieList from "../features/movie/MovieList";
import { createSearchUrl, getMedia } from "../services/apiTMDB";
import Pagination from "../ui/Pagination";
import { getUrlSearchParams } from "../utils/helpers";

function Movies() {
  const data = useLoaderData();
  const navigate = useNavigate();

  function handleGotoPage(page) {
    // get url params
    const { query, type } = getUrlSearchParams(window.location.href, [
      "query",
      "type",
    ]);
    // create url with new page
    const gotoUrl = createSearchUrl({ query, type, page });
    // navigate to the page
    navigate(gotoUrl);
  }

  return (
    <div>
      <MovieList movies={data?.results} />;
      <Pagination
        totalPages={data.total_pages}
        currentPage={data.page}
        onGotoPage={handleGotoPage}
      />
    </div>
  );
}

export async function loader({ request }) {
  const { query, type, page } = getUrlSearchParams(request.url, [
    "query",
    "type",
    "page",
  ]);

  if (!query || !type) throw new Error("query or type not provided");
  try {
    const results = await getMedia({ query, type, page });
    return results;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

export default Movies;
