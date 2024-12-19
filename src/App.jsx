import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Movies, { loader as mediaLoader } from "./pages/Movies";
import Movie from "./pages/Movie";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movie/search",
        element: <Movies />,
        loader: mediaLoader,
      },
      {
        path: "/movie/:id",
        element: <Movie />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
