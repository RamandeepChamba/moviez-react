import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as popularAndTopRatedLoader } from "./pages/Home";
import Media, {
  searchResultsLoader,
  topicListLoader,
  discoverListLoader,
  filteredMediaLoader,
} from "./pages/Media";
import MediaSingle, { loader as mediaDetailsLoader } from "./pages/MediaSingle";
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
        path: "/moviez-react/:type/search/:query/:page",
        element: <Media />,
        loader: searchResultsLoader,
      },
      {
        path: "/moviez-react/:type/:id",
        element: <MediaSingle />,
        loader: mediaDetailsLoader,
      },
      {
        path: "/moviez-react/:type/list/:topic/:page",
        element: <Media />,
        loader: topicListLoader,
      },
      {
        path: "/moviez-react/:type/discover/:filter/:id/:page",
        element: <Media />,
        loader: discoverListLoader,
      },
      {
        path: "/moviez-react/:type/filter/:sortBy/:genres/:page",
        element: <Media />,
        loader: filteredMediaLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
