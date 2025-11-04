import "../common/market.css";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function MarketPlace() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Adjust this value (e.g., 150) to when you want it to stick
      setIsSticky(scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="market-page-outer">
      {/* Hero Section */}
      <div className={`market-page-hero ${isSticky ? "hide-hero" : ""}`}>
        <div>
          <span className="m-hero-title">VIDMA</span>
          <span className="m-hero-title2">MARKETPLACE</span>
        </div>
        <div className="m-hero-subtitle">
          Vidma — your one-stop shop for quality roofing, hardware, and export products.
          Reliable, affordable, and built to last — bringing all your construction and sourcing needs together under one trusted brand.
        </div>

        <div className="market-search-container">
          <input
            type="text"
            placeholder="Search for products, categories, or brands..."
            className="market-search-input"
          />
          <button className="market-search-btn">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Sticky Search Bar (appears when scrolled down) */}
      {isSticky && (
        <div className="sticky-search-bar">
          <div className="market-search-container small">
            <input
              type="text"
              placeholder="Search..."
              className="market-search-input"
            />
            <button className="market-search-btn">
              <FaSearch />
            </button>
          </div>
        </div>
      )}

      <div style={{ height: "200vh", background: "#f4f4f4" }}></div>
    </div>
  );
}
