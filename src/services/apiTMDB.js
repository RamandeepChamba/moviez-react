const APP_URL = "https://api.themoviedb.org/3";

export async function getMedia({ query, type, page = 1 }) {
  const accessToken = `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`;
  const url = `${APP_URL}/search/${type}?query=${query}&page=${page}`;
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    });
    const results = await data.json();
    if (results.success === false) throw new Error(results.status_message);
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
}

export function createSearchUrl({ query, type = "movie", page = 1 }) {
  return `/movie/search?query=${query}&type=${type}&page=${page}`;
}

export const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w500";
