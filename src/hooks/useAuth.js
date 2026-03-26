//src/hooks/useAuth.js

import { useState } from "react";

export const useAuth = () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(savedUser || null);
  const [hasRated, setHasRated] = useState(localStorage.getItem("hasRated") === "true");

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("hasRated", false);
    setHasRated(false);
  };

  const logout = () => {
    setUser(null);
    setHasRated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("hasRated");
  };

  return { user, hasRated, login, logout, setHasRated };
};