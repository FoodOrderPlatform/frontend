import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./global.css";

// pages
import RootLayout from "./RootLayout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "*", //handle user go to wrong path
        element: <Navigate to="/" />,
      },
      {
        path: "auth-callback",
        element: <AuthCallbackPage />,
      },
      {
        path: "user-profile",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <UserProfilePage />,
          },
        ],
      },
      {
        path: "manage-restaurant",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <ManageRestaurantPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
