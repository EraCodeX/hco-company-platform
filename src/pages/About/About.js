import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./About.css";
import aboutHero from "../../assets/about/company-about-hero.webp";
import safetyMain from "../../assets/about/workplace-safety-main.webp";
import safetyEquipment from "../../assets/about/workplace-safety-equipment.webp";
import workerProtection from "../../assets/about/construction-worker-protection.webp";
import siteSafety from "../../assets/about/construction-site-safety.webp";
import protectiveGear from "../../assets/about/protective-gear-construction.webp";
import { useLanguage } from "../../context/LanguageContext";

function About() {
  const { t } = useLanguage();

  return (
    <div>
      <Header />

      <section className="about-section">
        <div className="about-content">
          <div className="about-image">
            <img
              src={aboutHero}
              alt={t("companyName")}
              width="1000"
              height="700"
              loading="lazy"
            />
          </div>

          <div className="about-description">
            <h2>{t("aboutTitle")}</h2>
            <p>{t("aboutIntro")}</p>
            <p>{t("aboutProjects")}</p>
            <h3>{t("aboutStartTitle")}</h3>
            <p>{t("aboutStartDescription")}</p>
          </div>
        </div>
      </section>

      <section className="statistics-section">
        <div className="statistics-content">
          <div className="stat-item">
            <h2>128</h2>
            <p>{t("totalProjects")}</p>
          </div>
          <div className="stat-item">
            <h2>95</h2>
            <p>{t("completed")}</p>
          </div>
          <div className="stat-item">
            <h2>33</h2>
            <p>{t("inProgress")}</p>
          </div>
        </div>
      </section>

      <section className="safety-health-section">
        <div className="safety-health-content">
          <div className="safety-health-image">
            <img
              src={safetyMain}
              alt={t("safetyHealth")}
              width="1000"
              height="700"
              loading="lazy"
            />
          </div>

          <div className="safety-health-description">
            <h2>{t("safetyHealth")}</h2>
            <p>{t("safetyHealthPara1")}</p>
            <p>{t("safetyHealthPara2")}</p>
          </div>
        </div>

        <div className="image-row">
          <img
            src={safetyEquipment}
            alt={t("safetyExample1")}
            width="700"
            height="500"
            loading="lazy"
          />
          <img
            src={workerProtection}
            alt={t("safetyExample2")}
            width="700"
            height="500"
            loading="lazy"
          />
          <img
            src={siteSafety}
            alt={t("safetyExample3")}
            width="700"
            height="500"
            loading="lazy"
          />
          <img
            src={protectiveGear}
            alt={t("safetyExample4")}
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
