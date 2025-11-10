import "../common/market.css";
import { FaSearch, FaPlus, FaMinus, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getProducts, placeOrder, searchProducts } from "../services/home-api";
import { Skeleton } from "@mui/material";
import { LocalGroceryStoreTwoTone } from "@mui/icons-material";
import { showError, showSuccess } from "../components/Toast";

export default function MarketPlace() {
  const [isSticky, setIsSticky] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

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

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

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
      if (response.data.length === 0) {
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

  const handleAddToCart = () => {
    
    if (quantity === 0) {
      showError("Please select a quantity greater than 0.");
      return;
    }

    if (!selectedColor) {
      showError("Please select a color.");
      return;
    }

    const newCartItem = {
      id: selectedItem.id || new Date().getTime(),
      productName: selectedItem.productName,
      description: selectedItem.description,
      imageUrl: selectedItem.imageUrl,
      color: selectedColor,
      quantity,
    };

    const existingIndex = cart.findIndex(
      (item) =>
        item.productName === newCartItem.productName &&
        item.color === newCartItem.color
    );

    let updatedCart;
    if (existingIndex >= 0) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, newCartItem];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    showSuccess("Item added to cart!");
    closeModal();
  };

  const handleRemoveFromCart = (id: number) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleQuantityChange = (id: number, delta: number) => {
    const updated = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleMakeOrder = () => {
    setShowForm(true);
    setShowCart(false);
  };

  const handleSubmitOrder = async () => {

    if (cart.length === 0) {
      showError("Your cart is empty.");
      return;
    }

    if (!firstName || !lastName || !email || !phoneNumber || !address) {
      showError("Please fill in all customer details.");
      return;
    }

    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    if (!phoneNumber || !/^\+?[0-9]{7,15}$/.test(phoneNumber)) {
      showError("Please enter a valid phone number.");
      return;
    }

    const body = {
      customerDetails: {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        color: "",
        orderItems: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          color: item.color,
        })),
      },
    };

    try {
      await placeOrder(body);
      setCart([]);
      localStorage.removeItem("cart");
      setShowForm(false);
      setShowSuccessModal(true);
      
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
    } catch (error) {
      showError("❌ Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="market-page-outer">
      {/* HERO + SEARCH */}
      <div className={`market-page-hero ${isSticky ? "hide-hero" : ""}`}>
        <div>
          <span className="m-hero-title">VIDMA</span>
          <span className="m-hero-title2">MARKETPLACE</span>
        </div>
        <div className="m-hero-subtitle">
          Vidma — your one-stop shop for quality roofing, hardware, and export
          products.
        </div>

        <div className="market-search-container">
          <input
            type="text"
            placeholder="Search for products..."
            className="market-search-input"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button className="market-search-btn" onClick={() => handleSearch(searchQuery)}>
            <FaSearch />
          </button>
        </div>
      </div>

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

      {/* PRODUCT LIST */}
      <div className="market-items-container">
        {loading ? (
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
        ) : currentItems.map((item, idx) => (
          <div className="market-item-card" key={idx} onClick={() => openModal(item)}>
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
        ))}
      </div>

      {/* PAGINATION */}
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

      {/* PRODUCT MODAL */}
      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={()=>{
              closeModal(); setSelectedColor(null);
            }}>✕</button>
            <img
              src={selectedItem.imageUrl.replace("dl=0", "raw=1")}
              alt={selectedItem.productName}
              className="modal-image"
            />
            <h2 style={{ color: "#15688b" }}>{selectedItem.productName}</h2>
            <p style={{ color: "grey" }}>{selectedItem.description}</p>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", margin: "10px 0" }}>
              {selectedItem.color?.split(",").map((clr: string, index: number) => {
                const colorValue = clr.trim();
                return (
                  <div
                    key={index}
                    title={colorValue}
                    onClick={() => setSelectedColor(colorValue)}
                    style={{
                      backgroundColor: colorValue,
                      width: selectedColor === colorValue ? "30px" : "25px",
                      height: selectedColor === colorValue ? "30px" : "25px",
                      borderRadius: "4px",
                      border: selectedColor === colorValue ? "3px solid #15688b" : "1px solid #ccc",
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                  ></div>
                );
              })}
            </div>

            <div className="quantity-control">
              <button onClick={decreaseQty}><FaMinus /></button>
              <span>{quantity}</span>
              <button onClick={increaseQty}><FaPlus /></button>
            </div>

            <button
              className={`add-to-cart-btn ${quantity > 0 ? "enabled" : "disabled"}`}
              disabled={quantity === 0}
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      )}

      {/* CART FLOATING BUTTON */}
      <div
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          zIndex: 1000,
          cursor: "pointer",
        }}
        onClick={() => setShowCart(true)}
      >
        {cart.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              backgroundColor: "#ff3b3b",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "50%",
              width: "22px",
              height: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            {cart.length}
          </div>
        )}
        <div
          style={{
            width: "65px",
            height: "65px",
            borderRadius: "50%",
            backgroundColor: "#053e58ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
          }}
        >
          <LocalGroceryStoreTwoTone style={{ fontSize: "35px", color: "#fff" }} />
        </div>
      </div>

      {/* 🛒 CART MODAL */}
      {showCart && (
        <div className="modal-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-modal" onClick={e => e.stopPropagation()}>
            <h2>My Cart</h2>
            <button className="modal-close" onClick={() => setShowCart(false)}>✕</button>

            {cart.length === 0 ? (
              <p style={{ textAlign: "center", color: "#888" }}>Your cart is empty.</p>
            ) : (
              <div className="cart-items">
                {cart.map(item => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.imageUrl.replace("dl=0", "raw=1")} alt={item.productName} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h4 style={{ color: "#15688b" }}>{item.productName}</h4>
                      <p style={{ color: "#666" }}>Color: {item.color}</p>
                      <div className="quantity-control small">
                        <button onClick={() => handleQuantityChange(item.id, -1)}><FaMinus /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, 1)}><FaPlus /></button>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => handleRemoveFromCart(item.id)}>
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <button className="make-order-btn" onClick={handleMakeOrder}>
                Make Order
              </button>
            )}
          </div>
        </div>
      )}

      {/* 🛒 ORDER FORM MODAL */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ color: "#15688b", marginBottom: "15px" }}>Order Form</h2>
            <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>

            <form
              className="order-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitOrder();
              }}
            >
              <div className="form-group">
                <label>First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" required placeholder="Enter your first name" />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName" required placeholder="Enter your last name" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required placeholder="Enter your email" />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} name="phoneNumber" required placeholder="Enter your phone number" />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} name="address" required placeholder="Enter your full address"></textarea>
              </div>

              <button type="submit" className="make-order-btn" style={{ marginTop: "10px" }}>
                Submit Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-content success-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSuccessModal(false)}>✕</button>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <h2 style={{ color: "#15688b" }}>Order Request Sent!</h2>
              <p style={{ marginTop: "10px", color: "#333" }}>
                Your order request has been made successfully.<br />
                Our agent will contact you soon. 📞
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                style={{
                  marginTop: "20px",
                  backgroundColor: "#15688b",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
