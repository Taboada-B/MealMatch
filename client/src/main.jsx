import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import DiscoverPage from "./pages/DiscoverPage";
import ErrorPage from "./pages/ErrorPage";
import FavoritePage from "./pages/FavoritePage";
import AuthenticatePage from "./pages/Authenticate.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login/>,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/favorite",
        element: <FavoritePage />,
      },
      {
        path: "/home",
        element: <DiscoverPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
