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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  };


  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  console.log(location.pathname);


  const isActive = (path: string): boolean => location.pathname === path;
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <header
      className={`header ${scrolled ? "scrolled" : ""} ${!isHome ? "scrolled" : ""
        }`}
    >
      <div className="container flex items-center justify-between">
        <img className="logo-img" src={logo} alt="Logo" />

        <button className="menu-toggle md:hidden" onClick={toggleMenu}>
          ☰
        </button>

        <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""} md:flex`}>
          <a
            href="#products"
            className={`nav-link ${isActive("/products") ? "active" : ""}`}
          >
            {t("products")}
          </a>
          <a
            href="#projects"
            className={`nav-link ${isActive("/projects") ? "active" : ""}`}
          >
            {t("projects")}
          </a>
          <a
            href="#contact"
            className={`nav-link ${isActive("/contact") ? "active" : ""}`}
          >
            {t("contact")}
          </a>
          <a
            href="#about"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
          >
            {t("about")}
          </a>

          {/* 🌐 Language Selector */}
          <select
            value={language}
            onChange={handleChange}
            className="translate-select"
          >
            <option value="en">English</option>
            <option value="si">සිංහල</option>
            <option value="ta">தமிழ்</option>
          </select>

          <button className="primary-button">{t("order")}</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
