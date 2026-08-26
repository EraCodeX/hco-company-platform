import React from "react";
import { Link } from "react-router-dom";
import { FolderKanban, Building2, BriefcaseBusiness } from "lucide-react";

export default function HeaderNav({
  t,
  openMenu,
  toggleDropdown,
  isActive,
  handleLinkClick,
}) {
  return (
    <ul className="menu menu-links">
      <li>
        <Link to="/" className={isActive("/")} onClick={handleLinkClick}>
          {t("home")}
        </Link>
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
          to="/features"
          className={isActive("/features")}
          onClick={handleLinkClick}
        >
          {t("features")}
        </Link>
      </li>

      <li className={`has-dropdown ${openMenu === "projects" ? "open" : ""}`}>
        <span
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown("projects");
          }}
        >
          {t("projects")}
          <span
            className={`projects-arrow ${openMenu === "projects" ? "open" : ""}`}
          >
            ▼
          </span>
        </span>

        <ul className="dropdown">
          <li>
            <Link
              to="/projects"
              className={isActive("/projects")}
              onClick={handleLinkClick}
            >
              <FolderKanban className="dropdown-link-icon" />
              <span>{t("allProjects")}</span>
            </Link>
          </li>

          <li>
            <Link
              to="/buildcostpro"
              className={isActive("/buildcostpro")}
              onClick={handleLinkClick}
            >
              <BriefcaseBusiness className="dropdown-link-icon" />
              <span>{t("ProBuild")}</span>
            </Link>
          </li>

          <li>
            <Link
              to="/materials"
              className={isActive("/materials")}
              onClick={handleLinkClick}
            >
              <Building2 className="dropdown-link-icon" />
              <span>{t("materials")}</span>
            </Link>
          </li>
        </ul>
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
          to="/jobs"
          className={isActive("/jobs")}
          onClick={handleLinkClick}
        >
          {t("jobs")}
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
  );
}
