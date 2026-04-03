import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function HeaderNav({
  t,
  dropdowns,
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
          to="/features"
          className={isActive("/features")}
          onClick={handleLinkClick}
        >
          {t("features")}
        </Link>
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
              {t("Projects")}
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
  );
}
