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
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedThickness, setSelectedThickness] = useState<string | null>(null);
  const [lengthQuantities, setLengthQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const parseCsvValues = (value?: string | null) =>
    (value || "")
      .split(",")
      .map((item) => item.trim())
      .filter((item) => !!item);

  const parseLengthNumber = (value?: string | null) => {
    const parsed = Number((value || "").trim());
    return Number.isFinite(parsed) ? parsed : null;
  };

  const formatLengthTotal = (length?: string | null, quantity?: number) => {
    const qty = quantity || 0;
    const lengthNumber = parseLengthNumber(length);
    if (lengthNumber === null) {
      return "-";
    }
    const total = lengthNumber * qty;
    return Number.isInteger(total) ? `${total}` : total.toFixed(2);
  };

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
    const lengths = parseCsvValues(item.length);
    const initialLengthQuantities = lengths.reduce((acc, len) => {
      acc[len] = 0;
      return acc;
    }, {} as Record<string, number>);

    setSelectedItem(item);
    setQuantity(0);
    setSelectedColor(null);
    setSelectedMaterial(null);
    setSelectedThickness(null);
    setLengthQuantities(initialLengthQuantities);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setSelectedColor(null);
    setSelectedMaterial(null);
    setSelectedThickness(null);
    setLengthQuantities({});
    setQuantity(0);
  };

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 0 ? q - 1 : 0));

  const updateLengthQty = (length: string, delta: number) => {
    setLengthQuantities((prev) => ({
      ...prev,
      [length]: Math.max(0, (prev[length] || 0) + delta),
    }));
  };

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
    const hasColorOptions = parseCsvValues(selectedItem?.color).length > 0;
    const materialValues = parseCsvValues(selectedItem?.material);
    const thicknessValues = parseCsvValues(selectedItem?.thickness);
    const lengthValues = parseCsvValues(selectedItem?.length);
    const hasLengthOptions = lengthValues.length > 0;

    if (materialValues.length > 0 && !selectedMaterial) {
      showError("Please select a material.");
      return;
    }

    if (hasColorOptions && !selectedColor) {
      showError("Please select a color.");
      return;
    }

    if (thicknessValues.length > 0 && !selectedThickness) {
      showError("Please select a thickness.");
      return;
    }

    if (hasLengthOptions) {
      const totalSelectedQty = lengthValues.reduce((sum, len) => sum + (lengthQuantities[len] || 0), 0);
      if (totalSelectedQty === 0) {
        showError("Please add quantity for at least one length.");
        return;
      }
    } else if (quantity === 0) {
      showError("Please select a quantity greater than 0.");
      return;
    }

    const itemsToAdd = hasLengthOptions
      ? lengthValues
          .filter((len) => (lengthQuantities[len] || 0) > 0)
          .map((len) => ({
            cartItemId: `${selectedItem.id}-${selectedMaterial || "none"}-${selectedColor || "none"}-${selectedThickness || "none"}-${len}`,
            id: selectedItem.id,
            productId: selectedItem.id,
            productName: selectedItem.productName,
            description: selectedItem.description,
            imageUrl: selectedItem.imageUrl,
            material: selectedMaterial || "",
            color: selectedColor || "",
            thickness: selectedThickness || "",
            length: len,
            quantity: lengthQuantities[len],
          }))
      : [
          {
            cartItemId: `${selectedItem.id}-${selectedMaterial || "none"}-${selectedColor || "none"}-${selectedThickness || "none"}-none`,
            id: selectedItem.id,
            productId: selectedItem.id,
            productName: selectedItem.productName,
            description: selectedItem.description,
            imageUrl: selectedItem.imageUrl,
            material: selectedMaterial || "",
            color: selectedColor || "",
            thickness: selectedThickness || "",
            length: "",
            quantity,
          },
        ];

    const updatedCart = [...cart];
    itemsToAdd.forEach((newCartItem) => {
      const existingIndex = updatedCart.findIndex((item) => item.cartItemId === newCartItem.cartItemId);
      if (existingIndex >= 0) {
        updatedCart[existingIndex].quantity += newCartItem.quantity;
      } else {
        updatedCart.push(newCartItem);
      }
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    showSuccess("Item added to cart!");
    closeModal();
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    const updated = cart.filter(item => item.cartItemId !== cartItemId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleMakeOrder = () => {
    setShowForm(true);
    setShowCart(false);
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const handleSubmitOrder = async () => {
    if (isSubmittingOrder) {
      return;
    }

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

    const uniqueColors = [...new Set(cart.map((item) => (item.color || "").trim()).filter(Boolean))];

    const orderItems = cart
      .map((item) => ({
        productId: Number(item.productId || item.id),
        color: String(item.color || "").trim(),
        quantity: Number(item.quantity) || 0,
        material: item.material || null,
        thickness: item.thickness || null,
        length: item.length || null,
      }))
      .filter((item) => Number.isFinite(item.productId) && item.quantity > 0);

    if (orderItems.length === 0) {
      showError("Your cart has invalid items. Please re-add products and try again.");
      return;
    }

    const body = {
      customerDetails: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        address: address.trim(),
        color: uniqueColors.join(","),
        orderItems,
      },
    };

    try {
      setIsSubmittingOrder(true);
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
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        (Array.isArray(error?.response?.data?.errors) && error.response.data.errors.length > 0
          ? error.response.data.errors.join(", ")
          : null) ||
        error?.response?.data?.title ||
        "Failed to submit order. Please try again.";
      showError(errorMessage);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <>
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
            <div className="modal-content product-modal" onClick={e => e.stopPropagation()}>
              {(() => {
                const colorValues = parseCsvValues(selectedItem.color);
                const materialValues = parseCsvValues(selectedItem.material);
                const thicknessValues = parseCsvValues(selectedItem.thickness);
                const lengthValues = parseCsvValues(selectedItem.length);

                return (
                  <>
              <div className="product-modal-header">
                <h2 className="product-modal-title">{selectedItem.productName}</h2>
                <button className="modal-close" onClick={closeModal}>✕</button>
              </div>
              {materialValues.length > 0 && (
                <div className="product-option-section">
                  <h4>Material</h4>
                  <div className="option-chip-list">
                    {materialValues.map((material) => (
                      <button
                        key={material}
                        type="button"
                        className={`option-chip option-chip-btn ${selectedMaterial === material ? "active" : ""}`}
                        onClick={() => setSelectedMaterial(material)}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {colorValues.length > 0 && (
                <div className="product-option-section">
                  <h4>Colour</h4>
                  <div className="color-dot-list">
                    {colorValues.map((colorValue, index) => (
                      <button
                        key={`${colorValue}-${index}`}
                        type="button"
                        className={`color-dot-btn ${selectedColor === colorValue ? "active" : ""}`}
                        style={{ backgroundColor: colorValue }}
                        onClick={() => setSelectedColor(colorValue)}
                        title={colorValue}
                      />
                    ))}
                  </div>
                </div>
              )}

              {thicknessValues.length > 0 && (
                <div className="product-option-section">
                  <h4>Thickness (mm)</h4>
                  <div className="option-chip-list">
                    {thicknessValues.map((thickness) => (
                      <button
                        key={thickness}
                        type="button"
                        className={`option-chip option-chip-btn ${selectedThickness === thickness ? "active" : ""}`}
                        onClick={() => setSelectedThickness(thickness)}
                      >
                        {thickness}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {lengthValues.length > 0 && (
                <div className="product-option-section">
                  <h4>Length (ft)</h4>
                  <div className="length-qty-list">
                    {lengthValues.map((length) => (
                      <div key={length} className="length-qty-row">
                        <span className="option-chip">{length}</span>
                        <div className="quantity-control small length-qty-control">
                          <button type="button" onClick={() => updateLengthQty(length, -1)}><FaMinus /></button>
                          <span>{lengthQuantities[length] || 0}</span>
                          <button type="button" onClick={() => updateLengthQty(length, 1)}><FaPlus /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {lengthValues.length === 0 && (
                <div className="quantity-control">
                  <button onClick={decreaseQty}><FaMinus /></button>
                  <span>{quantity}</span>
                  <button onClick={increaseQty}><FaPlus /></button>
                </div>
              )}

              <button
                className={`add-to-cart-btn ${(lengthValues.length > 0
                  ? lengthValues.reduce((sum, len) => sum + (lengthQuantities[len] || 0), 0) > 0
                  : quantity > 0)
                  ? "enabled"
                  : "disabled"}`}
                disabled={lengthValues.length > 0
                  ? lengthValues.reduce((sum, len) => sum + (lengthQuantities[len] || 0), 0) === 0
                  : quantity === 0}
                onClick={handleAddToCart}
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>
                  </>
                );
              })()}
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
            <div className="cart-modal modern-cart-modal" onClick={e => e.stopPropagation()}>
              <div className="cart-modal-header">
                <h2 className="cart-title">
                  <FaShoppingCart />
                  <span>My Cart</span>
                </h2>
                <button className="modal-close" onClick={() => setShowCart(false)}>✕</button>
              </div>

              <div className="cart-modal-body">
                {cart.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#888" }}>Your cart is empty.</p>
                ) : (
                  <div className="modern-cart-groups">
                    {Object.values(
                      cart.reduce((acc, item) => {
                        const groupKey = `${item.productId || item.id}-${item.productName}-${item.material || ""}-${item.color || ""}-${item.thickness || ""}`;

                        if (!acc[groupKey]) {
                          acc[groupKey] = {
                            groupKey,
                            productName: item.productName,
                            imageUrl: item.imageUrl,
                            material: item.material || "",
                            color: item.color || "",
                            thickness: item.thickness || "",
                            rows: [],
                          };
                        }

                        acc[groupKey].rows.push({
                          cartItemId: item.cartItemId || item.id,
                          length: item.length || "",
                          quantity: item.quantity,
                        });

                        return acc;
                      }, {} as Record<string, any>)
                    ).map((group: any) => (
                      <div className="modern-cart-group" key={group.groupKey}>
                        <div className="modern-cart-summary">
                          <img
                            src={group.imageUrl.replace("dl=0", "raw=1")}
                            alt={group.productName}
                            className="cart-item-img"
                          />
                          <div className="cart-item-info">
                            <h4 className="cart-product-title">{group.productName}</h4>
                            {group.material && <p className="cart-meta-line">Material: <span className="cart-meta-badge">{group.material}</span></p>}
                            {group.color && (
                              <div className="cart-color-row">
                                Color:
                                <span
                                  className="cart-color-swatch"
                                  style={{ backgroundColor: group.color }}
                                  title={group.color}
                                  aria-label={`Selected color ${group.color}`}
                                />
                              </div>
                            )}
                            {group.thickness && <p className="cart-meta-line">Thickness: {group.thickness} mm</p>}
                          </div>
                        </div>

                        <div className="cart-length-table">
                          <div className="cart-length-row cart-length-header">
                            <span>Length</span>
                            <span>Quantity</span>
                            <span>Total Length</span>
                            <span></span>
                          </div>

                          {group.rows.map((row: any) => (
                            <div className="cart-length-row" key={row.cartItemId}>
                              <span>{row.length ? `${row.length} ft` : "-"}</span>
                              <span>{row.quantity}</span>
                              <span>{formatLengthTotal(row.length, row.quantity)} {row.length ? "ft" : ""}</span>
                              <button
                                className="cart-row-delete"
                                type="button"
                                onClick={() => handleRemoveFromCart(row.cartItemId)}
                                aria-label="Remove row"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="cart-footer-actions">
                  <button className="cart-clear-btn" onClick={handleClearCart}>
                    <FaTrash />
                    <span>Remove</span>
                  </button>
                  <button className="make-order-btn" onClick={handleMakeOrder}>
                    <FaShoppingCart />
                    <span>Make Order</span>
                  </button>
                </div>
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

                <button
                  type="submit"
                  className="make-order-btn"
                  style={{ marginTop: "10px" }}
                  disabled={isSubmittingOrder}
                >
                  {isSubmittingOrder ? "Submitting..." : "Submit Order"}
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
                  Check your mailbox. Email sent.<br />
                  Our agent will contact you soon.
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

        {isSubmittingOrder && (
          <div className="order-loading-overlay" role="status" aria-live="polite" aria-busy="true">
            <div className="order-loading-card">
              <div className="order-loading-spinner" />
              <h3>Submitting Your Order</h3>
              <p>Please wait while we send your request and email confirmation.</p>
            </div>
          </div>
        )}

      </div>
    </>

  );
}
