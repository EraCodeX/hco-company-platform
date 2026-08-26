import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, LogOut, X } from "lucide-react";

export default function ProfileMenu({
  user,
  t,
  openMenu,
  setOpenMenu,
  handleLogout,
  handleLinkClick,
}) {
  const isDesktopProfileOpen = openMenu === "profile";
  const isMobileProfileOpen = openMenu === "mobileProfile";

  return (
    <>
      {/* Desktop profile dropdown */}
      <div className="profile-menu-container desktop-profile-menu">
        <button
          type="button"
          className={`profile-trigger ${isDesktopProfileOpen ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenu((prev) => (prev === "profile" ? null : "profile"));
          }}
          aria-expanded={isDesktopProfileOpen}
          aria-label="Open profile menu"
        >
          <img
            src={user.imageUrl}
            alt={user.name || t("user")}
            className="header-user-img"
            width="44"
            height="44"
            loading="lazy"
            decoding="async"
          />
        </button>

        {isDesktopProfileOpen && (
          <div
            className="menu-dropdown profile-dropdown-open"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="menu-profile-info">
              <img
                src={user.imageUrl}
                alt={user.name || t("user")}
                className="menu-profile-avatar"
                width="46"
                height="46"
                loading="lazy"
                decoding="async"
              />
              <div className="menu-profile-text">
                <p className="menu-profile-name">{user.name}</p>
                <p className="menu-profile-email">{user.email}</p>
              </div>
            </div>

            <Link
              to="/dashboard"
              className="menu-item profile-menu-action"
              onClick={handleLinkClick}
            >
              <LayoutDashboard size={18} aria-hidden="true" />
              <span>{t("dashboard")}</span>
            </Link>

            <button
              type="button"
              className="menu-item profile-menu-action profile-logout-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLogout();
              }}
            >
              <LogOut size={18} aria-hidden="true" />
              <span>{t("logout")}</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile / iPad full profile window */}
      {isMobileProfileOpen && (
        <div className="mobile-profile-modal" onClick={() => setOpenMenu(null)}>
          <div
            className="mobile-profile-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-profile-modal-header">
              <button
                type="button"
                className="mobile-profile-close"
                onClick={() => setOpenMenu(null)}
                aria-label="Close profile panel"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mobile-profile-main">
              <img
                src={user.imageUrl}
                alt={user.name || t("user")}
                className="mobile-profile-avatar large"
                width="64"
                height="64"
                loading="lazy"
                decoding="async"
              />
              <div className="mobile-profile-text centered">
                <p className="mobile-profile-name large">{user.name}</p>
                <p className="mobile-profile-email">{user.email}</p>
              </div>
            </div>

            <div className="mobile-profile-actions">
              <Link
                to="/dashboard"
                className="mobile-profile-link"
                onClick={handleLinkClick}
              >
                <LayoutDashboard size={18} />
                <span>{t("dashboard")}</span>
              </Link>

              <button
                type="button"
                className="mobile-profile-link mobile-logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={18} aria-hidden="true" />
                <span>{t("logout")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
