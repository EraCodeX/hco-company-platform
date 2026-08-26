import React from "react";
import "./Features.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { useLanguage } from "../../context/LanguageContext";
import { featuresData } from "../../utils/data";

function Features() {
  const { t } = useLanguage();

  return (
    <>
      <Header />

      <main className="features">
        <div className="features-header">
          <h1>{t("featuresHeaderTitle")}</h1>
          <p>{t("featuresHeaderDesc")}</p>
        </div>

        <div className="features-grid">
          {featuresData.map((feature) => (
            <div key={feature.id} className="feature">
              <img src={feature.image} alt={t(feature.titleKey)} />

              <h2>{t(feature.titleKey)}</h2>

              <p>{t(feature.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Features;
