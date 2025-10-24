import "../common/main.css"

export default function Footer() {
    return (
        <div className="footer-outer">
            <div className="footer-inner">
                <div className="footer-section">
                    <div className="f-title">
                        Get Help
                    </div>
                    <div className="f-link">Contact Us</div>
                    <div className="f-link">WhatsApp</div>
                </div>
                <div className="footer-section">
                    <div className="f-title">
                        Our Services
                    </div>
                    <div className="f-link">Projects</div>
                    <div className="f-link">Products</div>
                    <div className="f-link">About Us </div>
                </div>
                <div className="footer-section">
                    <div className="f-title">
                        Legal
                    </div>
                    <div className="f-link">Privacy Policy</div>
                    <div className="f-link">Terms of Service</div>
                </div>
                <div className="footer-section">
                    <div className="f-title">
                        Follow Us
                    </div>
                    <div className="f-link">Facebook</div>
                    <div className="f-link">Instagram</div>
                    <div className="f-link">LinkedIn</div>
                </div>
            </div>

            <div className="footer-bottom">
                
            </div>
        </div>
    );
}