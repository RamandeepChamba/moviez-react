import { Await, defer, useLoaderData } from "react-router-dom";
import { createTopicListUrl, getPopularAndTopRated } from "../services/apiTMDB";
import styles from "./Home.module.css";
import StyledLink from "../ui/StyledLink";
import MediaList from "../features/media/MediaList";
import React from "react";
import Loader from "../ui/Loader";

function Home() {
  const { results } = useLoaderData();
  return (
    <React.Suspense fallback={<Loader />}>
      <Await resolve={results}>
        {({ movies, tv }) => (
          <div className={styles.home}>
            {/* Movies Lists */}
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
              <MediaList media={movies.popular} type="movie" />
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
              <MediaList media={movies.topRated} type="movie" />
            </div>
            {/* TV Lists */}
            <div>
              <div className={styles.listHeader}>
                <h2>Most Popular</h2>
                <StyledLink
                  to={createTopicListUrl({ type: "tv", topic: "popular" })}
                  variation="brand"
                >
                  View more
                </StyledLink>
              </div>
              <MediaList media={tv.popular} type="tv" />
            </div>
            <div>
              <div className={styles.listHeader}>
                <h2>Top Rated</h2>
                <StyledLink
                  to={createTopicListUrl({ type: "tv", topic: "top_rated" })}
                  variation="brand"
                >
                  View more
                </StyledLink>
              </div>
              <MediaList media={tv.topRated} type="tv" />
            </div>
          </div>
        )}
      </Await>
    </React.Suspense>
  );
}

export async function loader() {
  try {
    const resultsPromise = getPopularAndTopRated();
    return defer({ results: resultsPromise });
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export default Home;
