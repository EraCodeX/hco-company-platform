import React, { useEffect, useMemo, useState, lazy, Suspense } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Home.css";
import heroMobile from "../../assets/hero/homepage-hero-mobile.webp";
import heroTablet from "../../assets/hero/homepage-hero-tablet.webp";
import heroDesktop from "../../assets/hero/homepage-hero-desktop.webp";
import { imagesData, servicesData, valuesData } from "../../utils/data";
import { useLanguage } from "../../context/LanguageContext";

const PartnersCarousel = lazy(
  () => import("../../sections/PartnersCarousel/PartnersCarousel"),
);

const HomePage = () => {
  const [activeGroup, setActiveGroup] = useState(1);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const { t } = useLanguage("en");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const aosProps = useMemo(() => {
    if (isMobile) return {};
    return { "data-aos": "fade-up" };
  }, [isMobile]);

  const activeImages = useMemo(() => {
    return imagesData[activeGroup - 1] || [];
  }, [activeGroup]);

  return (
    <div className="homepage">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="image-section" {...aosProps}>
          <picture>
            <source media="(max-width: 480px)" srcSet={heroMobile} />
            <source media="(max-width: 768px)" srcSet={heroTablet} />
            <img
              src={heroDesktop}
              alt="Modern construction buildings and cranes"
              className="background-image"
              width="1280"
              height="720"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>

          <div className="overlay-content">
            <h1>{t("welcome")}</h1>
            <p>{t("heroSubtitle")}</p>
          </div>
        </section>

        {/* Services Section */}
        <section
          className="services-section"
          {...(!isMobile
            ? { "data-aos": "fade-up", "data-aos-delay": "100" }
            : {})}
        >
          <h2>{t("services")}</h2>

          <div className="services-list">
            {servicesData.map((service, index) => (
              <article className="service-item" key={index}>
                <i className={service.icon} aria-hidden="true"></i>
                <h3>{t(`service${index + 1}_title`)}</h3>
                <p>{t(`service${index + 1}_description`)}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Our Activity */}
        <section className="activities-section" {...aosProps}>
          <h2>{t("ourActivity")}</h2>

          <div className="image-container">
            <div className="image-group active">
              {activeImages.map((img, i) => (
                <div className="image-wrapper" key={`${activeGroup}-${i}`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className="button1-container"
            {...(!isMobile
              ? { "data-aos": "fade-right", "data-aos-delay": "300" }
              : {})}
          >
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                className={`btn1 ${activeGroup === num ? "active-btn" : ""}`}
                onClick={() => setActiveGroup(num)}
                aria-label={`Show activity group ${num}`}
                aria-pressed={activeGroup === num}
              >
                <i className="fas fa-square" aria-hidden="true"></i>
              </button>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section
          className="values-section"
          {...(!isMobile
            ? { "data-aos": "fade-left", "data-aos-delay": "200" }
            : {})}
        >
          <h2>{t("ourValues")}</h2>

          <div
            className="value-container"
            {...(!isMobile ? { "data-aos": "fade-left" } : {})}
          >
            {valuesData.map((value, index) => (
              <article className="value-item" key={index}>
                <i className={value.icon} aria-hidden="true"></i>
                <h3>{t(`value${index + 1}_title`)}</h3>
                <p>{t(`value${index + 1}_description`)}</p>
                <div
                  className="underline"
                  style={{ backgroundColor: value.color }}
                ></div>
              </article>
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section className="partners-section">
          <h2>{t("partners")}</h2>

          <Suspense
            fallback={
              <div className="partners-loading">Loading partners...</div>
            }
          >
            <PartnersCarousel />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
