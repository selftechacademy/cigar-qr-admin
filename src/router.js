import AddCigar from "./pages/AddCigar/AddCigar";
import RequireAuth from "./components/require-auth/RequireAuth";
import SignIn from "./pages/SignIn/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/addcigar",
        element: <AddCigar />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);
