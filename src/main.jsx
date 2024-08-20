import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Home } from "./pages/Home.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotFound } from "./pages/NotFound.jsx";
import { Watch } from "./pages/Watch.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 0,
      staleTime: 0,
      retry: false,
      retryOnMount: false,
    },
  },
});

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/watch", element: <Watch /> },
  { path: "*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
