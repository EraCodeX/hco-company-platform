import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo1.png";
import "../styles/Header.css";
import { useLanguage } from "../context/LanguageContext";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../context/AuthContext";
import {
  getFirebaseToken,
  onForegroundMessage,
  saveNotificationToFirestore,
} from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotificationDropdown } from "../components/NotificationDropdown";
import { ChevronDown, CircleHelp } from "lucide-react";

const HeaderContent = () => {
  const { t } = useLanguage();
  const { user, login, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [dropdowns, setDropdowns] = useState({
    home: false,
    projects: false,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const isMobile = () => window.innerWidth <= 1024;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setDropdowns({
      home: false,
      projects: false,
    });
  };

  const toggleDropdown = (dropdownName) => {
    if (isMobile()) {
      setDropdowns((prev) => ({
        ...prev,
        [dropdownName]: !prev[dropdownName],
      }));
    }
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const handleLinkClick = () => {
    closeMobileMenu();
    setOpenMenu(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("userEmail");
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      closeMobileMenu();
      setOpenMenu(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );

        const profile = await res.json();

        login({
          name: profile.name,
          email: profile.email,
          imageUrl: profile.picture,
        });

        closeMobileMenu();
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    },
    onError: () => console.log("Google Login Failed"),
  });

  useEffect(() => {
    const setupMessaging = async () => {
      await getFirebaseToken();

      onForegroundMessage(async (payload) => {
        const { title, body } = payload.notification || {};

        if (title && body) {
          toast.info(
            <div>
              <strong>{title}</strong>
              <p style={{ margin: "6px 0 0" }}>{body}</p>
            </div>,
            { autoClose: 5000 },
          );

          await saveNotificationToFirestore(payload);
        }
      });
    };

    setupMessaging();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideProfile = event.target.closest(
        ".profile-menu-container",
      );
      const clickedInsideNotification = event.target.closest(
        ".notification-wrapper",
      );
      const clickedInsideHamburger = event.target.closest(".hamburger");
      const clickedInsideNavShell = event.target.closest(".header-nav-shell");

      if (!clickedInsideProfile && !clickedInsideNotification) {
        setOpenMenu(null);
      }

      if (
        isMobile() &&
        !clickedInsideNavShell &&
        !clickedInsideHamburger &&
        !clickedInsideProfile &&
        !clickedInsideNotification
      ) {
        setMenuOpen(false);
        setDropdowns({
          home: false,
          projects: false,
        });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMenuOpen(false);
        setDropdowns({
          home: false,
          projects: false,
        });
      }
      setOpenMenu(null);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    closeMobileMenu();
    setOpenMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else if (!document.body.classList.contains("notifications-open")) {
      document.body.style.overflow = "";
    }

    return () => {
      if (!document.body.classList.contains("notifications-open")) {
        document.body.style.overflow = "";
      }
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" loading="lazy" />
      </div>

      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
        aria-label="Toggle menu"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleMenu();
          }
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {menuOpen && (
        <div
          className={`mobile-menu-overlay ${menuOpen ? "show" : ""}`}
          onClick={closeMobileMenu}
        />
      )}

      <div className={`header-nav-shell ${menuOpen ? "open" : ""}`}>
        <ul className="menu menu-links">
          <li className={`has-dropdown ${dropdowns.home ? "open" : ""}`}>
            <span onClick={() => toggleDropdown("home")}>
              {t("home")}
              <ChevronDown
                size={18}
                className={`arrow-icon ${dropdowns.home ? "rotate" : ""}`}
              />
            </span>

            <ul className="dropdown">
              <li>
                <Link
                  to="/"
                  className={isActive("/")}
                  onClick={handleLinkClick}
                >
                  {t("mainHome")}
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className={isActive("/features")}
                  onClick={handleLinkClick}
                >
                  {t("features")}
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className={isActive("/dashboard")}
                  onClick={handleLinkClick}
                >
                  {t("dashboard")}
                </Link>
              </li>
            </ul>
          </li>

          <li className={`has-dropdown ${dropdowns.projects ? "open" : ""}`}>
            <span onClick={() => toggleDropdown("projects")}>
              {t("projects")}
              <ChevronDown
                size={18}
                className={`arrow-icon ${dropdowns.projects ? "rotate" : ""}`}
              />
            </span>

            <ul className="dropdown">
              <li>
                <Link
                  to="/projects"
                  className={isActive("/projects")}
                  onClick={handleLinkClick}
                >
                  {t("projects")}
                </Link>
              </li>
              <li>
                <Link
                  to="/buildcostpro"
                  className={isActive("/buildcostpro")}
                  onClick={handleLinkClick}
                >
                  {t("ProBuild")}
                </Link>
              </li>
              <li>
                <Link
                  to="/materials"
                  className={isActive("/materials")}
                  onClick={handleLinkClick}
                >
                  {t("materials")}
                </Link>
              </li>
              <li>
                <Link
                  to="/calendar"
                  className={isActive("/calendar")}
                  onClick={handleLinkClick}
                >
                  {t("calendar")}
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              to="/about"
              className={isActive("/about")}
              onClick={handleLinkClick}
            >
              {t("about")}
            </Link>
          </li>

          <li>
            <Link
              to="/jobs"
              className={isActive("/jobs")}
              onClick={handleLinkClick}
            >
              {t("jobs")}
            </Link>
          </li>

          <li>
            <Link
              to="/reviews"
              className={isActive("/reviews")}
              onClick={handleLinkClick}
            >
              {t("reviews")}
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className={isActive("/contact")}
              onClick={handleLinkClick}
            >
              {t("contact")}
            </Link>
          </li>
        </ul>

        <div className="header-actions">
          <div className="menu-icon-item">
            <NotificationDropdown
              isOpen={openMenu === "notifications"}
              setOpenMenu={setOpenMenu}
              closeProfileMenu={() =>
                setOpenMenu((prev) => (prev === "profile" ? null : prev))
              }
              closeMobileMenu={closeMobileMenu}
            />
            <ToastContainer />
          </div>

          <div className="menu-icon-item menu-help-item">
            <Link
              to="/help"
              className="help-icon-link"
              onClick={handleLinkClick}
              aria-label="Help Center"
            >
              <CircleHelp className="header-icon help-header-icon" />
            </Link>
          </div>

          {user && (
            <div className="menu-icon-item mobile-user-item">
              <button
                type="button"
                className="icon-circle-btn mobile-user-trigger"
                aria-label="User"
              >
                <img
                  src={user.imageUrl}
                  alt={t("User")}
                  className="header-user-img mobile-user-img"
                />
              </button>
            </div>
          )}

          <div className="menu-signin-item">
            {user ? (
              <>
                <div className="profile-menu-container desktop-profile-menu">
                  <button
                    type="button"
                    className="profile-trigger"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu((prev) =>
                        prev === "profile" ? null : "profile",
                      );
                    }}
                    aria-expanded={openMenu === "profile"}
                    aria-label="Open profile menu"
                  >
                    <img
                      src={user.imageUrl}
                      alt={t("User")}
                      className="header-user-img"
                    />
                  </button>

                  {openMenu === "profile" && (
                    <div
                      className="menu-dropdown profile-dropdown-open"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <div className="menu-profile-info">
                        <img
                          src={user.imageUrl}
                          alt={t("User")}
                          className="menu-profile-avatar"
                        />
                        <div className="menu-profile-text">
                          <p className="menu-profile-name">{user.name}</p>
                          <p className="menu-profile-email">{user.email}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="menu-item logout-btn"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLogout();
                        }}
                      >
                        {t("logout")}
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="mobile-logout-btn"
                  onClick={handleLogout}
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={googleLogin}
                className="signin-btn"
              >
                {t("SignIn")}
              </button>
            )}
          </div>
        </div>
      </div>
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
