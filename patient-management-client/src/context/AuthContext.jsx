import { createContext, useContext, useState } from "react";
import { login as loginRequest } from "../api/authService";

// Context lets us share "is the user logged in" state with any component
// in the app, without passing props down manually through every level.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize straight from localStorage so a page refresh doesn't log
  // the user out.
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [username, setUsername] = useState(() =>
    localStorage.getItem("username")
  );

  async function login(usernameInput, password) {
    const receivedToken = await loginRequest(usernameInput, password);
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("username", usernameInput);
    setToken(receivedToken);
    setUsername(usernameInput);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  }

  const value = {
    token,
    username,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook so components can just call useAuth() instead of
// importing useContext + AuthContext every time.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
