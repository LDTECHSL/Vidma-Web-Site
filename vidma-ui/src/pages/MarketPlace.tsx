import "../common/market.css";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function MarketPlace() {
    const [isSticky, setIsSticky] = useState(false);

    const items = [
        {
            name: "Roofing Sheet Classic",
            description: "Durable galvanized roofing sheet suitable for residential and commercial buildings.",
            colors: "Red, Green, Blue, Silver",
            imageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmPhvU5BEGLFi93ZusQeh5wmJIZtA3oF9jBA&s",
        },
        {
            name: "Premium Steel Nails",
            description: "High-quality corrosion-resistant nails for roofing and woodwork.",
            colors: "Silver, Black",
            imageLink: "https://tiimg.tistatic.com/fp/1/001/065/nails-825.jpg",
        },
        {
            name: "PVC Water Pipe 1 Inch",
            description: "Strong and flexible PVC pipe ideal for plumbing and industrial use.",
            colors: "White, Gray",
            imageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVuUn_PCSHHt_kAWMk1rFozv1POg1dZMH3Zw&s",
        },
        {
            name: "Aluminium Ladder 10ft",
            description: "Lightweight yet sturdy ladder for home and construction purposes.",
            colors: "Silver",
            imageLink: "https://slon-cdn.zenegal.store/products/4424/800-step-ladders-10ft-16893076828827.png",
        },
        {
            name: "Vidma Coconut Oil 1L",
            description: "Pure, natural coconut oil perfect for cooking and cosmetic use.",
            colors: "Transparent, Golden",
            imageLink: "https://spar2u.lk/cdn/shop/files/3018969.jpg?v=1748383604",
        },
        {
            name: "Ceramic Floor Tile 2x2",
            description: "Glossy, slip-resistant ceramic tiles ideal for indoor flooring.",
            colors: "White, Beige, Gray",
            imageLink: "https://image.made-in-china.com/365f3j00iHRcwyrWHYbf/60X60-Living-Room-Polished-Glazed-Porcelain-Ceramic-Floor-Tiles-Price.webp",
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Adjust this value (e.g., 150) to when you want it to stick
            setIsSticky(scrollY > 150);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => setCurrentPage(page);

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

            <div className="market-items-container">
                {currentItems.map((item, idx) => (
                    <div className="market-item-card" key={idx}>
                        <img src={item.imageLink} alt={item.name} className="market-item-img" />
                        <div className="market-item-info">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            {/* <span className="market-item-colors">Colors: {item.colors}</span> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="market-pagination">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
