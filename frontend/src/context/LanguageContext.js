// src/context/LanguageContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../utils/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children, defaultLang = "en" }) => {
  const [language, setLanguage] = useState(defaultLang);

  useEffect(() => {
    const storedLang = localStorage.getItem("appLanguage");
    if (storedLang) {
      setLanguage(storedLang);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      const langToSet = translations[browserLang] ? browserLang : defaultLang;
      setLanguage(langToSet);
      localStorage.setItem("appLanguage", langToSet);
    }
  }, [defaultLang]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("appLanguage", lang);
  };

  const t = (key, params = {}) => {
    let str = translations[language][key] || key;
    Object.keys(params).forEach((k) => {
      str = str.replace(`{{${k}}}`, params[k]);
    });
    return str;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
