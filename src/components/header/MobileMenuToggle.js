import React from "react";

export default function MobileMenuToggle({ menuOpen, toggleMenu }) {
  return (
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
  );
}
