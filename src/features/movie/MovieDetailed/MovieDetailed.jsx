/*
// Movie Details
{
  "adult": false,
  "backdrop_path": "/n5A7brJCjejceZmHyujwUTVgQNC.jpg",
  "belongs_to_collection": {
    "id": 1241,
    "name": "Harry Potter Collection",
    "poster_path": "/eVPs2Y0LyvTLZn6AP5Z6O2rtiGB.jpg",
    "backdrop_path": "/xN6SBJVG8jqqKQrgxthn3J2m49S.jpg"
  },
  "budget": 125000000,
  "genres": [
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 12,
      "name": "Adventure"
    }
  ],
  "homepage": "https://www.warnerbros.com/movies/harry-potter-and-deathly-hallows-part-2/",
  "id": 12445,
  "imdb_id": "tt1201607",
  "origin_country": [
    "GB"
  ],
  "original_language": "en",
  "original_title": "Harry Potter and the Deathly Hallows: Part 2",
  "overview": "Harry, Ron and Hermione continue their quest to vanquish the evil Voldemort once and for all. Just as things begin to look hopeless for the young wizards, Harry discovers a trio of magical objects that endow him with powers to rival Voldemort's formidable skills.",
  "popularity": 118.922,
  "poster_path": "/c54HpQmuwXjHq2C9wmoACjxoom3.jpg",
  "production_companies": [
    {
      "id": 174,
      "logo_path": "/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png",
      "name": "Warner Bros. Pictures",
      "origin_country": "US"
    },
    {
      "id": 437,
      "logo_path": "/nu20mtwbEIhUNnQ5NXVhHsNknZj.png",
      "name": "Heyday Films",
      "origin_country": "GB"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "GB",
      "name": "United Kingdom"
    },
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2011-07-12",
  "revenue": 1341511219,
  "runtime": 130,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "It all ends.",
  "title": "Harry Potter and the Deathly Hallows: Part 2",
  "video": false,
  "vote_average": 8.1,
  "vote_count": 20572
}
// Cast
[
    {
      "adult": false,
      "gender": 2,
      "id": 10980,
      "known_for_department": "Acting",
      "name": "Daniel Radcliffe",
      "original_name": "Daniel Radcliffe",
      "popularity": 55.316,
      "profile_path": "/iPg0J9UzAlPj1fLEJNllpW9IhGe.jpg",
      "cast_id": 6,
      "character": "Harry Potter",
      "credit_id": "52fe44e29251416c75044581",
      "order": 0
    },
    {
      "adult": false,
      "gender": 1,
      "id": 10990,
      "known_for_department": "Acting",
      "name": "Emma Watson",
      "original_name": "Emma Watson",
      "popularity": 69.589,
      "profile_path": "/mf0OANvWYSzU1d8yggrhyw8IbIz.jpg",
      "cast_id": 8,
      "character": "Hermione Granger",
      "credit_id": "52fe44e29251416c75044589",
      "order": 1
    },
]
*/

import Cast from "./Cast";
import Header from "./Header";
import Overview from "./Overview";
import Poster from "./Poster";
import styles from "./MovieDetailed.module.css";

function MovieDetailed() {
  return (
    <div className={styles.layout}>
      <Poster />
      <div className={styles.details}>
        <Header />
        <Overview />
        <Cast />
      </div>
    </div>
  );
}

export default MovieDetailed;
