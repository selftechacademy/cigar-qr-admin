import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { SnackbarProvider } from "notistack";
import App from "./App";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <SnackbarProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SnackbarProvider>
    </RouterProvider>
  </React.StrictMode>
);
