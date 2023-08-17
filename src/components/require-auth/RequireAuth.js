import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  const { currentUser } = useContext(AuthContext);
  console.log("current User", currentUser);
  let location = useLocation();

  if (!currentUser.email) {
    // Redirect the user to the home page.
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default RequireAuth;
