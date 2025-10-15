import React, { useEffect, useState } from 'react';
import "../common/main.css";
import { useLocation } from 'react-router-dom';
import logo from "../assets/vidma-logo.png";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const isActive = (path: string): boolean => location.pathname === path;
    const isHome = location.pathname === "/";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 150);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMobileMenuOpen(prev => !prev);

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''} ${!isHome ? "scrolled" : ""}`}>
            <div className="container flex items-center justify-between">
                <img className='logo-img' style={{ width: '60px' }} src={logo} alt="Logo" />

                <button className="menu-toggle md:hidden" onClick={toggleMenu}>
                    ☰
                </button>

                <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''} md:flex`}>
                    <a href='products' className={`nav-link ${isActive('/') ? 'active' : ''}`}>{t("products")}</a>
                    <a href='projects' className={`nav-link ${isActive('/projects') ? 'active' : ''}`}>{t("projects")}</a>
                    <a href='contact' className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>{t("contact")}</a>
                    <a href='about' className={`nav-link ${isActive('/about') ? 'active' : ''}`}>{t("about")}</a><select
                        onChange={(e) => changeLanguage(e.target.value)}
                        defaultValue="en"
                        className="border rounded px-2 py-1 text-sm bg-white"
                    >
                        <option value="en">English</option>
                        <option value="si">සිංහල</option>
                        <option value="ta">தமிழ்</option>
                    </select>
                </nav>
            </div>
        </header>
    );
};

export default Header;
