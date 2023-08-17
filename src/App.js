import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import RequireAuth from "./components/require-auth/RequireAuth";
import SignIn from "./pages/SignIn/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddCigar from "./pages/AddCigar/AddCigar";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return <p>a</p>;
}
export default App;
