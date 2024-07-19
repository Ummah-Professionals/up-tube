import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { Settings } from "./pages/Settings.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContactUs } from "./pages/ContactUs.jsx";
import { AddContent } from "./pages/AddContent.jsx";

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
  { path: "/about", element: <About /> },
  { path: "/settings", element: <Settings /> },
  { path: "/contactUs", element: <ContactUs /> },
  { path: "/addContent", element: <AddContent /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
