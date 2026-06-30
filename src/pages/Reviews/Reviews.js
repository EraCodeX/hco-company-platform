import React, { useState, useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import { useRatings } from "../../hooks/useRatings";
import { useLanguage } from "../../context/LanguageContext";
import { translateComment } from "../../utils/translateComment";
import "./Reviews.css";

const RatingsPage = () => {
  const { t, language } = useLanguage();
  const { user, hasRated, setHasRated } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const { ratings, message, submitRating } = useRatings(
    user,
    hasRated,
    setHasRated,
  );
  const [translatedRatings, setTranslatedRatings] = useState([]);

  const renderStars = (ratingValue, interactive = true) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < ratingValue ? "filled" : ""}`}
        onClick={() => interactive && submitRating(index + 1, comment)}
      >
        ★
      </span>
    ));
  };

  // Përkthimi i komenteve sa herë ndryshon gjuha ose vijnë komente të reja
  useEffect(() => {
    const translateAll = async () => {
      const promises = ratings.map(async (r) => {
        const translatedComment = await translateComment(r.comment, language);
        return { ...r, comment: translatedComment };
      });
      const results = await Promise.all(promises);
      setTranslatedRatings(results);
    };

    if (ratings.length > 0) {
      translateAll();
    }
  }, [ratings, language]);

  return (
    <div>
      <Header />
      <div className="ratings-page">
        <div className="ratings-columns">
          {/* Kolona e majtë */}
          <div className="left-column">
            <h2>{t("shareExperience")}</h2>
            <p>{t("feedbackDesc")}</p>
            {user && !hasRated ? (
              <>
                <div className="stars">{renderStars(0, true)}</div>
                <textarea
                  className="rating-textarea"
                  placeholder={t("leaveComment")}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={() => submitRating(5, comment)}
                  className="rating-btn"
                >
                  {t("submitRating")}
                </button>
              </>
            ) : !user ? (
              <div className="stars">{renderStars(0, false)}</div>
            ) : (
              <p>{t("alreadyRated")}</p>
            )}
          </div>

          {/* Kolona e djathtë */}
          <div className="right-column">
            <h2 className="section-title">{t("topReviews")}</h2>
            <div className="average-rating">
              <span className="avg-score">4.6</span>
              <div className="stars">{renderStars(5, false)}</div>
              <p>{t("basedOnReviews", { count: 120 })}</p>
            </div>

            <div className="rating-progress">
              {[5, 4, 3, 2, 1].map((star, index) => (
                <div key={star} className="rating-row">
                  <p>{star} ★</p>
                  <div className="progress">
                    <div
                      style={{ width: `${[70, 20, 7, 2, 1][index]}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="ratings-grid">
          <h2>{t("whatCustomersSay")}</h2>
          <div className="ratings-list">
            {translatedRatings.map((rating, index) => (
              <div key={index} className="rating-item">
                <img
                  src={rating.imageUrl}
                  alt={rating.email}
                  className="rating-avatar"
                />
                <p className="rating-email">{rating.email}</p>
                <div className="stars">{renderStars(rating.rating, false)}</div>
                <p className="rating-comment">{rating.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {message && <p className="message">{message}</p>}
      </div>

      <Footer />
    </div>
  );
};

export default RatingsPage;
