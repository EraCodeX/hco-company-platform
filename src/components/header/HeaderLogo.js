import React from "react";
import logo from "../../assets/images/brand-logo.webp";

export default function HeaderLogo() {
  return (
    <div className="logo">
      <img
        src={logo}
        alt="H&O Company Logo"
        width="180"
        height="60"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}
