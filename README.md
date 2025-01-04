# TODOS

- Genres in MovieItem overlay
- Add feature for TV series
- more...

# Business Requirements

- Movies searching app
- Movies can be searched via popular, top rated. ✅
- Movies can be searched using a query string in an input field ✅
- Movies can be searched using filters like: genre, ratings, year (filters can be combined, horror + rating > 6 + 2021)
- Movies can be sorted based on ratings
- Results will be fetched from an API
- Resulting movies will be displayed in a movies list with pagination ✅
- Movie from the list can be selected and it's details can be viewed ✅
- Movie details will include summary, poster, ratings, actors, related movies

# Pages

- Homepage: ('/moviez-react')
- Fetch and display movie list: ('/moviez-react/movie/search/:query/:page')
- Displaying movie details: ('/moviez-react/movie/:id)
- Discover popular or top_rated: ('/moviez-react/movie/list/:topic/:page')
- Discover by person or genre ('/moviez-react/movie/discover/:filter/:id/:page')

# Technologies

- Routing: React Router with Data Loading v6.4+
- Styling: CSS modules
- Remote State Management: N/A
- Global UI State Management: React Router
