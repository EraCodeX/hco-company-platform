import React from "react";
import { Link } from "react-router-dom";
import { CircleHelp } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { NotificationDropdown } from "../NotificationDropdown";
import LanguageSelector from "../LanguageSelector";
import ProfileMenu from "./ProfileMenu";

export default function HeaderActions({
  t,
  language,
  changeLanguage,
  user,
  openMenu,
  setOpenMenu,
  closeMobileMenu,
  handleLinkClick,
  handleLogout,
  googleLogin,
}) {
  return (
    <div className="header-actions">
      <div className="header-actions-top">
        <div className="menu-icon-item">
          <NotificationDropdown
            isOpen={openMenu === "notifications"}
            setOpenMenu={setOpenMenu}
            closeProfileMenu={() =>
              setOpenMenu((prev) =>
                prev === "profile" || prev === "mobileProfile" ? null : prev,
              )
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

        <div className="language-selector-item">
          <LanguageSelector
            language={language}
            onLanguageChange={changeLanguage}
          />
        </div>
      </div>

      <div className="header-actions-bottom">
        <div className="menu-signin-item">
          {user ? (
            <>
              <div className="desktop-profile-menu">
                <ProfileMenu
                  user={user}
                  t={t}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  handleLogout={handleLogout}
                  handleLinkClick={handleLinkClick}
                />
              </div>

              <button
                type="button"
                className="icon-circle-btn mobile-user-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu((prev) =>
                    prev === "mobileProfile" ? null : "mobileProfile",
                  );
                }}
                aria-label="Open user menu"
                aria-expanded={openMenu === "mobileProfile"}
              >
                <img
                  src={user.imageUrl}
                  alt={user.name || t("user")}
                  className="header-user-img mobile-user-img"
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </>
          ) : (
            <button type="button" onClick={googleLogin} className="signin-btn">
              {t("signIn")}
            </button>
          )}
        </div>
      </div>

      {user && openMenu === "mobileProfile" && (
        <ProfileMenu
          user={user}
          t={t}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          handleLogout={handleLogout}
          handleLinkClick={handleLinkClick}
        />
      )}
    </div>
  );
}
