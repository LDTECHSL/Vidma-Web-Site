import "../common/main.css";

export default function Footer() {
  return (
    <footer className="footer-outer">
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-section logo-section">
          <h2 className="footer-logo">Harry.</h2>
          <p>Unisex clothing with a minimal and bold touch.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: info@harryclothing.com</li>
            <li>Phone: +94 77 123 4567</li>
            <li>Location: Colombo, Sri Lanka</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section social-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#" aria-label="TikTok">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Harry. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
