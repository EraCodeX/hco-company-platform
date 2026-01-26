import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import "../../styles/Help.css";
import logo1 from "../../assets/images/logo2.png";
import { useLanguage } from "../../context/LanguageContext";
import { helpCategories } from "../../utils/Data";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
const Help = () => {
    const [activeCategory, setActiveCategory] = useState("projects"); 
    const [search, setSearch] = useState("");
    const [openIndex, setOpenIndex] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const { t } = useLanguage();

    // Scroll header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Filtrimi i FAQs
    const filteredFAQs = helpCategories[activeCategory].faqKeys
        .map(f => ({ question: t(f.q), answer: t(f.a) }))
        .filter(faq => faq.question.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="help-page">
            {/* Header profesional me scroll */}
            <header className={`help-header ${scrolled ? "scrolled" : ""}`}>
                <div className="header-left">
                    <Link to="/">
                        <img src={logo1} alt="Company Logo" className="header-logo" />
                    </Link>
                </div>
                <div className="header-right">
                    <span className="header-info">{t("welcomeMessage")}</span>
                </div>
            </header>

            {/* Wrapper */}
            <div className="help-wrapper">
                {/* Sidebar */}
                <aside className="help-sidebar">
                    <h2 className="sidebar-title">{t("categories")}</h2>
                    {Object.keys(helpCategories).map((key) => (
                        <div
                            key={key}
                            className={`sidebar-item ${activeCategory === key ? "active" : ""}`}
                            onClick={() => setActiveCategory(key)}
                        >
                            <span className="sidebar-icon">{helpCategories[key].icon}</span>
                            {t(helpCategories[key].titleKey)}
                        </div>
                    ))}
                </aside>

                {/* Main Content */}
                <main className="help-main">
                    <h1 className="help-main-title">{t("helpCenter")}</h1>

                    {/* Search */}
                    <div className="help-search-wrapper">
                        <input
                            type="text"
                            className="help-search"
                            placeholder={t("searchPlaceholder")}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className="help-search-icon" size={20} />
                    </div>
                    {/* FAQ List */}
                    <div className="faq-list">
                        {filteredFAQs.length === 0 && (
                            <p className="no-results">{t("noResults")}</p>
                        )}
                        {filteredFAQs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${openIndex === index ? "open" : ""}`}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <div className="faq-question">{faq.question}</div>
                                {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="help-cta">
                        <h3>{t("needAssistance")}</h3>
                        <p>{t("contactMessage")}</p>
                        <Link to="/contact" className="cta-btn">
                            {t("contactUs")}
                        </Link>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default Help;










