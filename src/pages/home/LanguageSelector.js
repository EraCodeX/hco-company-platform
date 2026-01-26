// src/components/LanguageSelector.js
import React from "react";
import Flag1 from "../../assets/images/flag1.png";
import Flag2 from "../../assets/images/flag2.png";
import "../../styles/LanguageSelector.css"; 

const LanguageSelector = ({ language, onLanguageChange }) => {
  return (
    <section className="language-flag">
      <img
        src={Flag1}
        alt="Albanian"
        onClick={() => onLanguageChange("sq")}
        className={language === "sq" ? "active" : ""}
      />
      <img
        src={Flag2}
        alt="English"
        onClick={() => onLanguageChange("en")}
        className={language === "en" ? "active" : ""}
      />
    </section>
  );
};

export default LanguageSelector;


