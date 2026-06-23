import React from "react";
import flagAL from "../assets/images/flagAL.webp";
import flagEN from "../assets/images/flagEN.webp";
import "../styles/language-selector.css";

const LanguageSelector = ({
  language,
  onLanguageChange,
  openMenu,
  setOpenMenu,
}) => {
  const isOpen = openMenu === "language";

  const handleLanguageChange = (lang) => {
    onLanguageChange(lang);
    setOpenMenu(null);
  };

  return (
    <div className="language-dropdown">
      <button
        type="button"
        className="language-trigger"
        onClick={(e) => {
          e.stopPropagation();

          setOpenMenu((prev) => (prev === "language" ? null : "language"));
        }}
      >
        <span className="language-text">
          {language === "en" ? "English" : "Albania"}
        </span>

        <span className={`language-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-menu" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="language-option"
            onClick={() => handleLanguageChange("en")}
          >
            <img src={flagEN} alt="English" className="language-option-flag" />
            <span>English</span>
          </button>

          <button
            type="button"
            className="language-option"
            onClick={() => handleLanguageChange("sq")}
          >
            <img src={flagAL} alt="Albania" className="language-option-flag" />
            <span>Albania</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
