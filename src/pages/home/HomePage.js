import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/HomePage.css";
import backgroundImage from "../../assets/images/image0.jpg";
import { imagesData, servicesData, valuesData } from "../../utils/Data";
import PartnersCarousel from "./PartnersCarousel";
import LanguageSelector from "../../pages/home/LanguageSelector";
import { useLanguage } from "../../context/LanguageContext";

const HomePage = () => {
  const [activeGroup, setActiveGroup] = useState(1);
  const { language, changeLanguage, t } = useLanguage("en");

  return (
    <div>
      <Header />

      {/* Language Selector */}

      <LanguageSelector language={language} onLanguageChange={changeLanguage} />

      {/* Hero Section */}
      <section className="image-section" data-aos="fade-up">
        <img src={backgroundImage} alt="Background" className="background-image" />
        <div className="overlay-content">
          <h1>{t("welcome")}</h1>
          <p>{t("heroSubtitle")}</p>
        </div>
      </section>
      {/* Services Section */}
      <section className="services-section" data-aos="fade-up" data-aos-delay="100">
        <h2>{t("services")}</h2>
        <div className="services-list">
          {servicesData.map((service, index) => (
            <div className="service-item" key={index}>
              <i className={service.icon} aria-hidden="true"></i>
              <h3>{t(`service${index + 1}_title`)}</h3>
              <p>{t(`service${index + 1}_description`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Activity */}
      <section className="activities-section" data-aos="fade-up">
        <h2>{t("ourActivity")}</h2>
        <div className="image-container">
          {imagesData.map((groupImages, index) => (
            <div
              key={index}
              className={`image-group ${activeGroup === index + 1 ? "active" : ""}`}
            >
              {groupImages.map((img, i) => (
                <div className="image-wrapper" key={i}>
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="button1-container" data-aos="fade-right" data-aos-delay="300">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className={`btn1 ${activeGroup === num ? "active-btn" : ""}`}
              onClick={() => setActiveGroup(num)}
            >
              <i className="fas fa-square"></i>
            </button>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section" data-aos="fade-left" data-aos-delay="200">
        <h2>{t("ourValues")}</h2>
        <div className="value-container" data-aos="fade-left">
          {valuesData.map((value, index) => (
            <div className="value-item" key={index}>
              <i className={value.icon}></i>
              <h3>{t(`value${index + 1}_title`)}</h3>
              <p>{t(`value${index + 1}_description`)}</p>
              <div className="underline" style={{ backgroundColor: value.color }}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <h2>{t("partners")}</h2>
        <PartnersCarousel />
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;


