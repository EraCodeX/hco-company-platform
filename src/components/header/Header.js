import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import { useLanguage } from "../../context/LanguageContext";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../../context/AuthContext";
import {
  getFirebaseToken,
  onForegroundMessage,
  saveNotificationToFirestore,
} from "../../firebase";
import { toast } from "react-toastify";

import HeaderLogo from "./HeaderLogo";
import MobileMenuToggle from "./MobileMenuToggle";
import HeaderNav from "./HeaderNav";
import HeaderActions from "./HeaderActions";

const HeaderContent = () => {
  const { t, language, changeLanguage } = useLanguage();
  const { user, login, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isMobile = () => window.innerWidth <= 1024;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setOpenMenu(null);
  };

  const toggleDropdown = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
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
    onError: () => {
      console.log("Google Login Failed");
    },
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
        setOpenMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMenuOpen(false);
        setOpenMenu(null);
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
      document.documentElement.style.overflow = "hidden";
    } else if (!document.body.classList.contains("notifications-open")) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      if (!document.body.classList.contains("notifications-open")) {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="header-left">
        <HeaderLogo />
      </div>

      <div className="header-mobile-toggle">
        <MobileMenuToggle menuOpen={menuOpen} toggleMenu={toggleMenu} />
      </div>

      {menuOpen && (
        <div
          className={`mobile-menu-overlay ${menuOpen ? "show" : ""}`}
          onClick={closeMobileMenu}
        />
      )}

      <div className={`header-nav-shell ${menuOpen ? "open" : ""}`}>
        <div className="header-right">
          <div className="header-nav-wrap">
            <HeaderNav
              t={t}
              openMenu={openMenu}
              toggleDropdown={toggleDropdown}
              isActive={isActive}
              handleLinkClick={handleLinkClick}
            />
          </div>

          <div className="header-actions-wrap">
            <HeaderActions
              t={t}
              language={language}
              changeLanguage={changeLanguage}
              user={user}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              closeMobileMenu={closeMobileMenu}
              handleLinkClick={handleLinkClick}
              handleLogout={handleLogout}
              googleLogin={googleLogin}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default function Header() {
  return <HeaderContent />;
}
