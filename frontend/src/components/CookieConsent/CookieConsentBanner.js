import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./CookieConsent.css";
import { useLanguage } from "../../context/LanguageContext";
import loadChatbase from "../ChatbaseLoader/ChatbaseLoader";

const CookieConsent = () => {
  const { t } = useLanguage();

  const [isVisible, setIsVisible] = useState(false);
  const [cookiesPreferences, setCookiesPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    const savedPreferences = Cookies.get("cookiePreferences");

    if (!consent) {
      setIsVisible(true);
      document.body.classList.add("no-scroll");
      document.body.classList.add("hide-chatbase");
      return;
    }

    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);

        const nextPreferences = {
          essential: true,
          analytics: !!parsedPreferences.analytics,
          marketing: !!parsedPreferences.marketing,
        };

        setCookiesPreferences(nextPreferences);

        if (nextPreferences.marketing) {
          document.body.classList.remove("hide-chatbase");
          loadChatbase();
        } else {
          document.body.classList.add("hide-chatbase");
        }
      } catch (error) {
        console.error("Failed to parse cookie preferences:", error);
        document.body.classList.add("hide-chatbase");
      }
    } else {
      document.body.classList.add("hide-chatbase");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };

    Cookies.set("cookieConsent", "true", { expires: 365, path: "/" });
    Cookies.set("cookiePreferences", JSON.stringify(allAccepted), {
      expires: 365,
      path: "/",
    });

    setCookiesPreferences(allAccepted);
    document.body.classList.remove("no-scroll");
    document.body.classList.remove("hide-chatbase");
    loadChatbase();
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    Cookies.set("cookieConsent", "true", { expires: 365, path: "/" });
    Cookies.set("cookiePreferences", JSON.stringify(cookiesPreferences), {
      expires: 365,
      path: "/",
    });

    document.body.classList.remove("no-scroll");

    if (cookiesPreferences.marketing) {
      document.body.classList.remove("hide-chatbase");
      loadChatbase();
    } else {
      document.body.classList.add("hide-chatbase");
    }

    setIsVisible(false);
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;

    setCookiesPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="cookie-overlay"></div>

      <div
        className="cookie-bar"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
      >
        <div className="cookie-left">
          <strong id="cookie-title">
            {t("cookieTitle") || "We use cookies"}
          </strong>

          <p>
            {t("cookieBannerMessage") ||
              "We use cookies to improve your experience. Please choose your preferences:"}
          </p>
        </div>

        <div className="cookie-options">
          <label>
            <input type="checkbox" checked disabled />
            {t("essentialCookies") || "Essential Cookies"}
          </label>

          <label>
            <input
              type="checkbox"
              name="analytics"
              checked={cookiesPreferences.analytics}
              onChange={handlePreferenceChange}
            />
            {t("analyticsCookies") || "Analytics Cookies"}
          </label>

          <label>
            <input
              type="checkbox"
              name="marketing"
              checked={cookiesPreferences.marketing}
              onChange={handlePreferenceChange}
            />
            {t("marketingCookies") || "Marketing Cookies"}
          </label>
        </div>

        <div className="cookie-buttons">
          <button
            type="button"
            className="cookie-save-btn"
            onClick={handleSavePreferences}
          >
            {t("savePreferences") || "Save"}
          </button>

          <button
            type="button"
            className="cookie-accept-btn"
            onClick={handleAcceptAll}
          >
            {t("acceptAll") || "Accept all"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
