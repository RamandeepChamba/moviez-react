const API_URL = "https://api.themoviedb.org/3";
const BASE_SITE_URL = "/moviez-react";

async function getFromApi(url) {
  const accessToken = `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    });
    const data = await response.json();
    if (data.success === false) throw new Error(data.status_message);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Get media list
// Should work for both movies and tv, depending on type
export async function getMedia({ query, type, page = 1 }) {
  const url = `${API_URL}/search/${type}?query=${query}&page=${page}`;
  try {
    const media = await getFromApi(url);
    return media;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Get media details
export async function getMediaDetails({ type, id }) {
  // https://api.themoviedb.org/3/movie/76341
  const baseUrl = `${API_URL}/${type}/${id}`;
  const urlCredits = `${API_URL}/${type}/${id}/credits`;
  try {
    // Get details
    const mediaDetails = await getFromApi(baseUrl);
    // Get cast
    const credits = await getFromApi(urlCredits);
    const cast = credits.cast;
    // - from cast arr only select elements where role is acting
    const actors = cast.filter(
      (person) => person["known_for_department"] === "Acting"
    );
    return { details: mediaDetails, cast: actors.slice(0, 4) };
  } catch (err) {
    throw new Error(err.message);
  }
}

// get top_rated / popular list
export async function getMediaList({ type, topic, page = 1 }) {
  // type = movie / tv
  // topic = popular / top_rated
  // https://api.themoviedb.org/3/movie/popular?page=1
  const url = `${API_URL}/${type}/${topic}?page=${page}`;
  try {
    const results = await getFromApi(url);
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getPopularAndTopRated() {
  const page = 1;
  const movies = {};
  const tv = {};
  try {
    // get popular movies
    movies.popular = await getMediaList({
      type: "movie",
      topic: "popular",
      page,
    });
    // get top rated movies
    movies.topRated = await getMediaList({
      type: "movie",
      topic: "top_rated",
      page,
    });
    // get popular tv
    tv.popular = await getMediaList({
      type: "tv",
      topic: "popular",
      page,
    });
    // get top rated tv
    tv.topRated = await getMediaList({
      type: "tv",
      topic: "top_rated",
      page,
    });
    return {
      movies: {
        popular: movies.popular.results.slice(0, 6),
        topRated: movies.topRated.results.slice(0, 6),
      },
      tv: {
        popular: tv.popular.results.slice(0, 6),
        topRated: tv.topRated.results.slice(0, 6),
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

// ===== Filters =======
// (page, filters = [{name: 'sort_by', value='...'}, {...}])
// 'https://api.themoviedb.org/3/discover/movie?page=1&sort_by=popularity.desc&with_genres=id_1|id_2|...'

export async function getDiscoveredMedia({ type = "movie", page, filters }) {
  const filtersStr = filters.reduce(
    (acc, filter) => `${acc}&${filter.name}=${filter.value}`,
    ""
  );
  // Note: Tv doesn't have discover by cast option
  const url = `${API_URL}/discover/${type}?page=${page}${filtersStr}`;
  try {
    const results = await getFromApi(url);
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
}

// ===== Get genres =======
// 'https://api.themoviedb.org/3/genre/movie/list'
// ================
export async function getGenres({ type = "movie" }) {
  const url = `${API_URL}/genre/${type}/list`;
  try {
    const genres = await getFromApi(url);
    return genres.genres;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getPersonById(id) {
  const url = `${API_URL}/person/${id}`;
  try {
    const person = await getFromApi(url);
    return person.name;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getGenreById({ id, type }) {
  const url = `${API_URL}/genre/${type}/list`;

  try {
    const genresObj = await getFromApi(url);
    const genre = genresObj.genres.find((g) => g.id == id);
    return genre.name;
  } catch (err) {
    throw new Error(err.message);
  }
}

// search query
export function createSearchUrl({ query, type = "movie", page = 1 }) {
  return `${BASE_SITE_URL}/${type}/search/${query}/${page}`;
}
// popular / top_rated
export function createTopicListUrl({ type, topic, page = 1 }) {
  return `${BASE_SITE_URL}/${type}/list/${topic}/${page}`;
}

export function createDiscoverUrl({ type, filter, id, page = 1 }) {
  return `${BASE_SITE_URL}/${type}/discover/${filter}/${id}/${page}`;
}

export function createFilteredListUrl({
  type = "movie",
  sortBy,
  genres,
  page = 1,
}) {
  // /moviez-react/movie/filter/:query/:sortBy/:genres
  return `${BASE_SITE_URL}/${type}/filter/${sortBy ? sortBy : "popular"}/${
    genres ? genres : "all"
  }/${page}`;
}

export const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w500";
