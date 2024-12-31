# TODOS

- Genres in MovieItem overlay
- more...

# Business Requirements

- Movies searching app
- Movies can be searched via popular, top rated.
- Movies can be searched using a query string in an input field
- Movies can be searched using filters like: genre, ratings, year (filters can be combined, horror + rating > 6 + 2021)
- Movies can be sorted based on ratings
- Results will be fetched from an API
- Resulting movies will be displayed in a movies list with pagination
- Movie from the list can be selected and it's details can be viewed
- Movie details will include summary, poster, ratings, actors, related movies

# Pages

- Homepage ('/')
- Fetch and display movie list ('/movie/search?query="hulk"&page="1"')
- Displaying movie details ('/movie/:id)

# Technologies

- Routing: React Router with Data Loading v6.4+
- Styling: CSS modules
- Remote State Management: React Router
- Global UI State Management: Redux
