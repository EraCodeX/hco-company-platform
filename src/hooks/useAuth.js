// src/hooks/useAuth.js
import { useState } from "react";

const safeJSONParse = (value, fallback = null) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const useAuth = () => {
  const savedUser = safeJSONParse(localStorage.getItem("user"), null);
  const [user, setUser] = useState(savedUser);
  const [hasRated, setHasRated] = useState(localStorage.getItem("hasRated") === "true");

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // keep behavior: reset rating on login
    setHasRated(false);
    localStorage.setItem("hasRated", "false");
  };

  const logout = () => {
    setUser(null);
    setHasRated(false);

    localStorage.removeItem("user");
    localStorage.removeItem("hasRated");
  };

  return { user, hasRated, setHasRated, login, logout };
};