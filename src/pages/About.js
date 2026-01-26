import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/About.css";
import aboutlogo from "../assets/images/logo2.png";
import aboutimage1 from "../assets/images/aboutimage1.png";
import aboutimage2 from "../assets/images/aboutimage2.png";
import aboutimage3 from "../assets/images/aboutimage3.png";
import aboutimage4 from "../assets/images/aboutimage4.png";
import aboutimage5 from "../assets/images/aboutimage5.png";
import { useLanguage } from "../context/LanguageContext";

function About() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Header Section */}
      <Header />

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-image">
            <img src={aboutlogo} alt={t("companyName")} />
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

      {/* Statistics Section */}
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

      {/* Safety and Health Section */}
      <section className="safety-health-section">
        <div className="safety-health-content">
          <div className="safety-health-image">
            <img src={aboutimage1} alt={t("safetyHealth")} />
          </div>
          <div className="safety-health-description">
            <h2>{t("safetyHealth")}</h2>
            <p>{t("safetyHealthPara1")}</p>
            <p>{t("safetyHealthPara2")}</p>
          </div>
        </div>
        <div className="image-row">
          <img src={aboutimage2} alt={t("safetyExample1")} />
          <img src={aboutimage3} alt={t("safetyExample2")} />
          <img src={aboutimage4} alt={t("safetyExample3")} />
          <img src={aboutimage5} alt={t("safetyExample4")} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
