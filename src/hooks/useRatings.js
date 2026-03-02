// src/hooks/useRatings.js
import { useState, useEffect, useRef } from "react";

const safeJSONParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const useRatings = (user, hasRated, setHasRated) => {
  const [ratings, setRatings] = useState(() =>
    safeJSONParse(localStorage.getItem("ratings"), [])
  );
  const [message, setMessage] = useState("");
  const abortRef = useRef(null);

  // Fetch ratings from backend
  const fetchRatings = async () => {
    // Abort any previous request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/ratingsPage.php`, {
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (Array.isArray(data.ratings)) {
        setRatings(data.ratings);
        localStorage.setItem("ratings", JSON.stringify(data.ratings));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching ratings:", error);
      }
    }
  };

  // Submit new rating
  const submitRating = async (ratingValue, comment) => {
    if (!user) {
      setMessage("Please login to rate.");
      return;
    }

    if (hasRated) {
      setMessage("You have already rated.");
      return;
    }

    const ratingData = {
      email: user.email,
      rating: ratingValue,
      comment,
      imageUrl: user.imageUrl,
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/ratingsPage.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ratingData),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data.status === "success") {
        setMessage(data.message || "Rating submitted.");

        // keep behavior: mark as rated
        setHasRated(true);
        localStorage.setItem("hasRated", "true");

        // Avoid stale state: update based on prev
        setRatings((prevRatings) => {
          const nextRatings = [...prevRatings, ratingData];
          localStorage.setItem("ratings", JSON.stringify(nextRatings));
          return nextRatings;
        });
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      setMessage("There was an error submitting your rating. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRatings();

    // cleanup: abort ongoing fetch on unmount
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return { ratings, message, submitRating };
};