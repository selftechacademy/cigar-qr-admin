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

  // Check if currentUser exists on initial render
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <Routes>
      {/* <Route path="/signup" element={<SignUp />} /> */}
      <Route
        index
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      >
        <Route
          path="AddCigar"
          element={
            <RequireAuth>
              <AddCigar />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
