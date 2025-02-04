import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as popularAndTopRatedLoader } from "./pages/Home";
import Movies, {
  searchResultsLoader,
  topicListLoader,
  discoverListLoader,
  filteredMoviesLoader,
} from "./pages/Movies";
import Movie, { loader as mediaDetailsLoader } from "./pages/Movie";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/moviez-react",
        element: <Home />,
        loader: popularAndTopRatedLoader,
      },
      {
        path: "/moviez-react/movie/search/:query/:page",
        element: <Movies />,
        loader: searchResultsLoader,
      },
      {
        path: "/moviez-react/movie/:id",
        element: <Movie />,
        loader: mediaDetailsLoader,
      },
      {
        path: "/moviez-react/movie/list/:topic/:page",
        element: <Movies />,
        loader: topicListLoader,
      },
      {
        path: "/moviez-react/movie/discover/:filter/:id/:page",
        element: <Movies />,
        loader: discoverListLoader,
      },
      {
        path: "/moviez-react/movie/filter/:sortBy/:genres/:page",
        element: <Movies />,
        loader: filteredMoviesLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
