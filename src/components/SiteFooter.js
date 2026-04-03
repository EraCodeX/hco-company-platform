import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/company-about-hero.webp";
import "../styles/footer.css";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo */}
        <div className="footer-column">
          <h1>H&O Construction</h1>

          <div className="logo">
            <img
              src={logo}
              alt="H&O Construction company logo"
              width="160"
              height="60"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-column">
          <h3>H&O</h3>

          <nav className="footer-nav">
            <ul>
              <li>
                <Link to="/">
                  <i className="fas fa-home"></i> {t("home")}
                </Link>
              </li>

              <li>
                <Link to="/projects">
                  <i className="fas fa-info-circle"></i> {t("projects")}
                </Link>
              </li>

              <li>
                <Link to="/jobs">
                  <i className="fas fa-briefcase"></i> {t("jobs")}
                </Link>
              </li>

              <li>
                <Link to="/about">
                  <i className="fas fa-question-circle"></i> {t("about")}
                </Link>
              </li>

              <li>
                <Link to="/contact">
                  <i className="fas fa-envelope"></i> {t("contact")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <div id="details">
            <h4>{t("contacts")}</h4>

            <p>
              <i className="fas fa-map-marker-alt"></i> {t("address")}
            </p>

            <p>
              <i className="fas fa-phone"></i> {t("phone")}
            </p>

            <p>
              <i className="fas fa-envelope"></i> {t("email")}
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="footer-column">
          <h4>{t("location")}</h4>

          <p>{t("locationText")}</p>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Company location on map"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t("rightsReserved")}</p>
      </div>
    </footer>
  );
};

export default Footer;
