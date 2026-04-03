import React from "react";
import { useLanguage } from "../context/LanguageContext";
import flagAL from "../assets/images/flagAL.webp";
import flagEN from "../assets/images/flagEN.webp";
import "../styles/language-selector.css";

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="language-selector">
      <button
        type="button"
        className={`language-button ${language === "en" ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
        aria-label="English"
      >
        <img src={flagEN} alt="English" />
      </button>
      <button
        type="button"
        className={`language-button ${language === "sq" ? "active" : ""}`}
        onClick={() => changeLanguage("sq")}
        aria-label="Shqip"
      >
        <img src={flagAL} alt="Albanian" />
      </button>
    </div>
  );
};

export default LanguageSelector;
