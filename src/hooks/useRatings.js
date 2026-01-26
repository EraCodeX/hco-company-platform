import { useState, useEffect } from "react";

export const useRatings = (user, hasRated, setHasRated) => {
  const [ratings, setRatings] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch ratings from backend
  const fetchRatings = () => {
    fetch(`${process.env.REACT_APP_API_BASE}/api/ratingsPage.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.ratings) {
          setRatings(data.ratings);
        }
      })
      .catch((error) => {
        console.error("Error fetching ratings:", error);
      });
  };

  // Submit new rating
  const submitRating = (ratingValue, comment) => {
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
      comment: comment,
      imageUrl: user.imageUrl,
    };

    fetch(`${process.env.REACT_APP_API_BASE}/api/ratingsPage.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ratingData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setMessage(data.message);
          setRatings((prevRatings) => [...prevRatings, ratingData]);
          setHasRated(true);
          localStorage.setItem("hasRated", true);
          localStorage.setItem("ratings", JSON.stringify([...ratings, ratingData]));
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error("Error submitting rating:", error);
        setMessage("There was an error submitting your rating. Please try again later.");
      });
  };
  useEffect(() => {
    fetchRatings();
  }, []);
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return { ratings, message, submitRating };
};