import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo1.png";
import "../styles/Header.css";
import { useLanguage } from "../context/LanguageContext";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../context/AuthContext";
import { getFirebaseToken, onForegroundMessage, saveNotificationToFirestore } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotificationDropdown } from "../components/NotificationDropdown";
import { ChevronDown, HelpCircle } from "lucide-react";

const HeaderContent = () => {
  const { t } = useLanguage();
  const { user, login, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [dropdowns, setDropdowns] = useState({ home: false, projects: false });
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = (dropdownName) => {
    if (window.innerWidth <= 1024) {
      setDropdowns((prev) => ({ ...prev, [dropdownName]: !prev[dropdownName] }));
    }
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  // Google login popup
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const profile = await res.json();
        login({
          name: profile.name,
          email: profile.email,
          imageUrl: profile.picture,
        });
        localStorage.setItem("userEmail", profile.email);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    },
    onError: () => console.log("Google Login Failed"),
  });
  useEffect(() => {
    const setupMessaging = async () => {
      await getFirebaseToken();

      // Kur vjen mesazh në foreground
      onForegroundMessage(async (payload) => {
        const { title, body } = payload.notification || {};
        if (title && body) {
          toast.info(
            <div>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>,
            { autoClose: 5000 }
          );
          await saveNotificationToFirestore(payload);
        }
      });
    };

    setupMessaging();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-menu-container") &&
        !event.target.closest(".notification-wrapper")) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Logo" loading="lazy" />
      </div>

      {/* Hamburger */}
      <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation */}
      <ul className={`menu ${menuOpen ? "open" : ""}`}>
        {/* Home Dropdown */}
        <li className={`has-dropdown ${dropdowns.home ? "open" : ""}`}>
          <span onClick={() => toggleDropdown("home")}>
            {t("home")}{" "}
            <ChevronDown
              size={20}
              className="arrow-icon"
              style={{ transform: dropdowns.home ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
            />
          </span>

          <ul className="dropdown">
            <li><Link to="/" className={isActive("/")}>{t("mainHome")}</Link></li>
            <li><Link to="/features" className={isActive("/features")}>{t("features")}</Link></li>
            <li><Link to="/dashboard" className={isActive("/dashboard")}>{t("dashboard")}</Link></li>
          </ul>
        </li>

        {/* Projects Dropdown */}
        <li className={`has-dropdown ${dropdowns.projects ? "open" : ""}`}>
          <span onClick={() => toggleDropdown("projects")}>
            {t("projects")}{" "}
            <ChevronDown
              size={20}
              className="arrow-icon"
              style={{ transform: dropdowns.projects ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
            />
          </span>
          <ul className="dropdown">
            <li><Link to="/projects" className={isActive("/projects")}>{t("projects")}</Link></li>
            <li><Link to="/buildcostpro" className={isActive("/buildcostpro")}>{t("ProBuild")}</Link></li>
            <li><Link to="/materials" className={isActive("/materials")}>{t("materials")}</Link></li>
            <li><Link to="/calendar" className={isActive("/calendar")}>{t("calendar")}</Link></li>
          </ul>
        </li>

        {/* Other Links */}
        <li><Link to="/about" className={isActive("/about")}>{t("about")}</Link></li>
        <li><Link to="/jobs" className={isActive("/jobs")}>{t("jobs")}</Link></li>
        <li><Link to="/reviews" className={isActive("/reviews")}>{t("reviews")}</Link></li>
        <li><Link to="/contact" className={isActive("/contact")}>{t("contact")}</Link></li>
        {/* Ikonat: Notifications, Theme Toggle, Profile */}

        <li className={`icon-item ${openMenu === "notifications" ? "active" : ""}`}>
          <NotificationDropdown
            isOpen={openMenu === "notifications"}
            setOpenMenu={setOpenMenu}
            closeProfileMenu={() => setOpenMenu(null)}
          />
          <ToastContainer />

          <li className="icon-item">
            <Link to="/help">
              <HelpCircle size={22} className="header-icon" />
            </Link>
          </li>
          {user ? (
            <div className="profile-menu-container">
              <img
                src={user.imageUrl}
                alt={t("User")}
                className="header-user-img"
                onClick={() =>
                  setOpenMenu(openMenu === "profile" ? null : "profile")
                }
              />
              {openMenu === "profile" && (
                <div className="menu-dropdown">
                  <p className="menu-item username">{user.name}</p>
                  <p className="menu-item logout" onClick={logout}>
                    {t("logout")}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <span onClick={() => googleLogin()} className="signin-btn">
              {t("SigIn")}
            </span>
          )}
        </li>

      </ul>
    </header>
  );
};

export default function Header() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <HeaderContent />
    </GoogleOAuthProvider>
  );
}









