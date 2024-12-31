const API_URL = "https://api.themoviedb.org/3";

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
  const type = "movie";
  const page = 1;
  try {
    // get popular
    const popularMedia = await getMediaList({ type, topic: "popular", page });
    // get top rated
    const topRatedMedia = await getMediaList({
      type,
      topic: "top_rated",
      page,
    });
    return {
      popular: popularMedia.results.slice(0, 6),
      topRated: topRatedMedia.results.slice(0, 6),
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

// Discover by filters i.e. by genre, cast etc
export async function getDiscoveredMedia({ type, page, filter, id: filterId }) {
  const filters = {
    genre: "with_genres",
    cast: "with_cast",
  };
  // discover by cast
  // https://api.themoviedb.org/3/discover/movie?page=1&with_cast=16828
  // discover by genre
  // https://api.themoviedb.org/3/discover/movie?page=1&with_genres=35
  const url = `${API_URL}/discover/${type}?page=${page}&${filters[filter]}=${filterId}`;
  try {
    const results = await getFromApi(url);
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getPersonById(id) {
  const url = `${API_URL}/person/${id}`;
  console.log(url);
  try {
    const person = await getFromApi(url);
    return person.name;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getGenreById(id) {
  const url = `${API_URL}/genre/movie/list`;

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
  return `/${type}/search/${query}/${page}`;
}
// popular / top_rated
export function createTopicListUrl({ type, topic, page = 1 }) {
  return `/${type}/list/${topic}/${page}`;
}

export function createDiscoverUrl({ type, filter, id, page = 1 }) {
  return `/${type}/discover/${filter}/${id}/${page}`;
}

export const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w500";
