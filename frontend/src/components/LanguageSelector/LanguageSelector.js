import React from "react";
import flagAL from "../../assets/flags/flagAL.webp";
import flagEN from "../../assets/flags/flagEN.webp";
import "./LanguageSelector.css";

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
            <div className="language-option-content">
              <img
                src={flagEN}
                alt="English"
                className="language-option-flag"
              />
              <span>English</span>
            </div>

            {language === "en" && <span className="language-check">✓</span>}
          </button>

          <button
            type="button"
            className="language-option"
            onClick={() => handleLanguageChange("sq")}
          >
            <div className="language-option-content">
              <img
                src={flagAL}
                alt="Albania"
                className="language-option-flag"
              />
              <span>Albania</span>
            </div>

            {language === "sq" && <span className="language-check">✓</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
