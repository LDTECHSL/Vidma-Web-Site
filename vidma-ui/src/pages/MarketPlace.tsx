import "../common/market.css";
import { FaSearch, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getProducts, searchProducts } from "../services/home-api";
import { Skeleton } from "@mui/material";


export default function MarketPlace() {
  const [isSticky, setIsSticky] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<any[]>([]);

  // const items = [
  //   {
  //     name: "Roofing Sheet Classic",
  //     description:
  //       "Durable galvanized roofing sheet suitable for residential and commercial buildings.",
  //     colors: "Red, Green, Blue, Silver",
  //     imageLink:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmPhvU5BEGLFi93ZusQeh5wmJIZtA3oF9jBA&s",
  //   },
  //   {
  //     name: "Premium Steel Nails",
  //     description:
  //       "High-quality corrosion-resistant nails for roofing and woodwork.",
  //     colors: "Silver, Black",
  //     imageLink: "https://tiimg.tistatic.com/fp/1/001/065/nails-825.jpg",
  //   },
  //   {
  //     name: "PVC Water Pipe 1 Inch",
  //     description:
  //       "Strong and flexible PVC pipe ideal for plumbing and industrial use.",
  //     colors: "White, Gray",
  //     imageLink:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVuUn_PCSHHt_kAWMk1rFozv1POg1dZMH3Zw&s",
  //   },
  //   {
  //     name: "Aluminium Ladder 10ft",
  //     description:
  //       "Lightweight yet sturdy ladder for home and construction purposes.",
  //     colors: "Silver",
  //     imageLink:
  //       "https://slon-cdn.zenegal.store/products/4424/800-step-ladders-10ft-16893076828827.png",
  //   },
  //   {
  //     name: "Vidma Coconut Oil 1L",
  //     description:
  //       "Pure, natural coconut oil perfect for cooking and cosmetic use.",
  //     colors: "Transparent, Golden",
  //     imageLink:
  //       "https://spar2u.lk/cdn/shop/files/3018969.jpg?v=1748383604",
  //   },
  //   {
  //     name: "Ceramic Floor Tile 2x2",
  //     description:
  //       "Glossy, slip-resistant ceramic tiles ideal for indoor flooring.",
  //     colors: "White, Beige, Gray",
  //     imageLink:
  //       "https://image.made-in-china.com/365f3j00iHRcwyrWHYbf/60X60-Living-Room-Polished-Glazed-Porcelain-Ceramic-Floor-Tiles-Price.webp",
  //   },
  // ];

  // Sticky search bar
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  // Modal handlers
  const openModal = (item: any) => {
    setSelectedItem(item);
    setQuantity(0);
  };
  const closeModal = () => setSelectedItem(null);

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 0 ? q - 1 : 0));

  const handleGetProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts(currentPage);
      setItems(response.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      if (!query.trim()) {
        await handleGetProducts();
        return;
      }
      const response = await searchProducts(query);
      setItems(response.data);

      if(response.data.length === 0){
        alert("No products found matching your search.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    handleGetProducts();
  }, [currentPage]);

  return (
    <div className="market-page-outer">
      {/* Hero Section */}
      <div className={`market-page-hero ${isSticky ? "hide-hero" : ""}`}>
        <div>
          <span className="m-hero-title">VIDMA</span>
          <span className="m-hero-title2">MARKETPLACE</span>
        </div>
        <div className="m-hero-subtitle">
          Vidma — your one-stop shop for quality roofing, hardware, and export
          products. Reliable, affordable, and built to last — bringing all your
          construction and sourcing needs together under one trusted brand.
        </div>

        <div className="market-search-container">
          <input
            type="text"
            placeholder="Search for products, categories, or brands..."
            className="market-search-input"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button className="market-search-btn" onClick={() => handleSearch(searchQuery)}>
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Sticky Search Bar */}
      {isSticky && (
        <div className="sticky-search-bar">
          <div className="market-search-container small">
            <input
              type="text"
              placeholder="Search..."
              className="market-search-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="market-search-btn" onClick={() => handleSearch(searchQuery)}>
              <FaSearch />
            </button>
          </div>
        </div>
      )}

      {/* Items */}
      <div className="market-items-container">
        {loading ? (
          // 🦴 Show loading skeletons
          Array(5)
            .fill(0)
            .map((_, idx) => (
              <div className="market-item-card" key={idx}>
                <Skeleton variant="rectangular" width={250} height={180} />
                <div className="market-item-info">
                  <h3><Skeleton variant="text" width={150} /></h3>
                  <p><Skeleton variant="text" width={200} /></p>
                </div>
              </div>
            ))
        ) : items.length === 0 ? (
          // ⚠️ Show message when no results
          <div className="no-results">
            {/* <p>No products found. Try a different search.</p> */}
          </div>
        ) : (
          // ✅ Show products normally
          currentItems.map((item, idx) => (
            <div
              className="market-item-card"
              key={idx}
              onClick={() => openModal(item)}
            >
              <img
                src={item.imageUrl?.replace("dl=0", "raw=1")}
                alt={item.productName}
                className="market-item-img"
              />
              <div className="market-item-info">
                <h3>{item.productName}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && items.length > 0 && (
        <div className="market-pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}


      {/* Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()} // Prevent background click close
          >
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            <img
              src={selectedItem.imageUrl.replace("dl=0", "raw=1")}
              alt={selectedItem.productName}
              className="modal-image"
            />
            <h2 style={{ color: "#15688b" }}>{selectedItem.productName}</h2>
            <div style={{ height: "10px" }}></div>
            <p style={{ color: "grey" }}>{selectedItem.description}</p>

            <div className="quantity-control">
              <button onClick={decreaseQty}>
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={increaseQty}>
                <FaPlus />
              </button>
            </div>

            <button
              className={`add-to-cart-btn ${quantity > 0 ? "enabled" : "disabled"}`}
              disabled={quantity === 0}
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
