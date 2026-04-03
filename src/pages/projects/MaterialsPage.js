import React from "react";
import "../../styles/materials-page.css";
import Header from "../../components/SiteHeader";
import Footer from "../../components/SiteFooter";
import { materials } from "../../utils/Data";
import { useLanguage } from "../../context/LanguageContext";

const Materials = () => {
  const { t } = useLanguage();

  return (
    <div>
      <Header />

      <div className="materials-container">
        <h1 className="materials-title">{t("exploreMaterials")}</h1>
        <p className="materials-intro">{t("materialsIntro")}</p>

        <div className="materials-grid">
          {materials.map((material, index) => (
            <div key={index} className="material-card">
              <img
                src={material.image}
                alt={t(material.name)}
                className="material-image"
                width="600"
                height="400"
                loading="lazy"
                decoding="async"
              />
              <div className="material-details">
                <h2 className="material-name">{t(material.name)}</h2>
                <p className="material-description">
                  {t(material.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Materials;
