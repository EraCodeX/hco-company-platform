import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Contact.css";
import contactUs from "../assets/images/contact-us.jpg";
import { useLanguage } from "../context/LanguageContext";

function Contact() {
  const { t } = useLanguage();
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(process.env.REACT_APP_FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormStatus(t("formSuccess"));
        form.reset();
      } else {
        setFormStatus(t("formError"));
      }
    } catch (error) {
      setFormStatus(t("formError"));
    }
  };

  return (
    <div>
      {/* Header Section */}
      <Header />

      {/* Contact Section */}
      <section id="gmail-details">
        <p>
          <i className="fas fa-envelope"></i> erahidaj@gmail.com
        </p>
      </section>

      <section className="contact-section">
        <div className="contact-img">
          <img src={contactUs} alt={t("contactImageAlt")} className="contact-us" />
          <h3>{t("contactDirect")}</h3>
          <p>+355 69 20 73 347</p>
        </div>

        <div className="contact-form-container">
          <h1>{t("contactUs")}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                <i className="fas fa-user"></i> {t("name")}:
              </label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i> {t("email")}:
              </label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <i className="fas fa-comment-dots"></i> {t("message")}:
              </label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>

            <button type="submit">{t("sendMessage")}</button>
          </form>
          {formStatus && <p className="form-status">{formStatus}</p>}
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Contact;

