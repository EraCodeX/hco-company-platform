import React from "react";
import logo from "../assets/images/logo1.png";
import "../styles/Footer.css";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo */}
        <div className="footer-column">
          <h1>H&O Company</h1>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-column">
          <h3>H&O</h3>
          <nav className="footer-nav">
            <ul>
              <li>
                <a href="/">
                  <i className="fas fa-home"></i> {t("home")}
                </a>
              </li>
              <li>
                <a href="/projects">
                  <i className="fas fa-info-circle"></i> {t("projects")}
                </a>
              </li>
              <li>
                <a href="/jobs">
                  <i className="fas fa-briefcase"></i> {t("jobs")}
                </a>
              </li>
              <li>
                <a href="/about">
                  <i className="fas fa-question-circle"></i> {t("about")}
                </a>
              </li>
              <li>
                <a href="/contact">
                  <i className="fas fa-envelope"></i> {t("contact")}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contact Info */}
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

        {/* Location Map */}
        <div className="footer-column">
          <h4>{t("location")}</h4>
          <p>{t("locationText")}</p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>{t("rightsReserved")}</p>
      </div>
    </footer>
  );
};

export default Footer;
