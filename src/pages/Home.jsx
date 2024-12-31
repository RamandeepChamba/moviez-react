import { Link, useLoaderData } from "react-router-dom";
import { createTopicListUrl, getPopularAndTopRated } from "../services/apiTMDB";
import MovieList from "../features/movie/MovieList";
import styles from "./Home.module.css";
import StyledLink from "../ui/StyledLink";

function Home() {
  const list = useLoaderData();
  return (
    <div className={styles.home}>
      <div>
        <div className={styles.listHeader}>
          <h2>Most Popular</h2>
          <StyledLink
            to={createTopicListUrl({ type: "movie", topic: "popular" })}
            variation="brand"
          >
            View more
          </StyledLink>
        </div>
        <MovieList movies={list.popular} />
      </div>
      <div>
        <div className={styles.listHeader}>
          <h2>Top Rated</h2>
          <StyledLink
            to={createTopicListUrl({ type: "movie", topic: "top_rated" })}
            variation="brand"
          >
            View more
          </StyledLink>
        </div>
        <MovieList movies={list.topRated} />
      </div>
    </div>
  );
}

export async function loader() {
  try {
    const results = await getPopularAndTopRated();
    return results;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export default Home;
