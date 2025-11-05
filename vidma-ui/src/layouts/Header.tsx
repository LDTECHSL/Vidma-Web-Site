import React, { useEffect, useState } from "react";
import "../common/main.css";
import { useLocation } from "react-router-dom";
import logo from "../assets/vidma-logo.png";
import { useLanguage } from "../components/LanguageContext";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  };

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const isActive = (path: string): boolean => location.pathname === path;
  const isHome = location.pathname === "/";

  return (
    <header
      className={`header ${scrolled ? "scrolled" : ""} ${!isHome ? "scrolled" : ""}`}
    >
      <div className="container flex items-center justify-between">
        <img className="logo-img" src={logo} alt="Logo" />

        {/* Show toggle only on mobile (below 900px) */}
        {isMobile && (
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        )}

        {/* Navigation */}
        {(isMobile && isMobileMenuOpen) || !isMobile ? (
          <nav className={`nav-links ${isMobile ? "mobile" : "desktop"} ${isMobileMenuOpen ? "open" : ""}`}>
            <a href="#products" className={`nav-link ${isActive("/products") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>
              {t("products")}
            </a>
            <a href="#gallery" className={`nav-link ${isActive("/gallery") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>
              {t("gallery")}
            </a>
            <a href="#contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>
              {t("contact")}
            </a>
            <a href="#about" className={`nav-link ${isActive("/about") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>
              {t("about")}
            </a>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <select value={language} onChange={(e) => {
                setIsMobileMenuOpen(false);
                handleChange(e);
              }} className="translate-select">
              <option value="en">English</option>
              <option value="si">සිංහල</option>
              <option value="ta">தமிழ்</option>
            </select>
            </div>
            
            <div>
              {/* open in new tab */}
              <button onClick={() => window.open("/marketplace", "_blank")} className="primary-button">{t("order")}</button>
            </div>
            
          </nav>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
