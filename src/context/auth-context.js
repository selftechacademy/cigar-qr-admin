import { useNavigate } from "react-router-dom";
import { SignOutUser, userStateListener } from "../firebase-config";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  currentUser: {},
  setCurrentUser: (_user) => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, [setCurrentUser]);

  // As soon as setting the current user to null,
  // the user will be redirected to the home page.
  const signOut = () => {
    SignOutUser();
    setCurrentUser({});
    navigate("/");
  };

  const value = {
    currentUser,
    setCurrentUser,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
