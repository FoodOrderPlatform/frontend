import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./global.css";

// pages
import RootLayout from "./RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <p>HOME PAPE</p>,
      },
      {
        path: "*", //handle user go to wrong path
        element: <p>HOME PAPE</p>,
      },
      {
        path: "user-profile",
        element: <p>USER PROFILE PAGE</p>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
