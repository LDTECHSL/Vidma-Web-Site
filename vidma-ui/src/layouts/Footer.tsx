import "../common/main.css"
import banner from "../assets/awards-banner.png";
import banner2 from "../assets/brands-banner.png";

export default function Footer() {
    return (
        <div className="footer-outer">
            <div className="footer-inner">
                <div className="footer-section">
                    <div className="f-title">
                        Our Services
                    </div>
                    <div className="f-link">Projects</div>
                    <div className="f-link">Products</div>
                    <div className="f-link">About Us </div>
                    <div className="f-link">Contact Us </div>
                </div>
                <div className="footer-section">
                    <div className="f-title">
                        Get Help
                    </div>
                    <div className="f-link">Contact Us</div>
                    <div className="f-link">WhatsApp</div>
                    <div className="f-link">info@vidma.com</div>
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
                    <div className="f-link">WhatsApp</div>
                    <div className="f-link">TikTok</div>
                </div>
            </div>

            <div className="footer-awards-outer">
                <div className="f">
                    <div className="f-title">
                        Awards & Recognitions
                    </div>

                    <img className="footer-awards-banner" src={banner} alt="Awards & Recognitions" />
                </div>

                <div className="f">
                    <div className="f-title">
                        Companies
                    </div>

                    <img className="footer-awards-banner" src={banner2} alt="Awards & Recognitions" />
                </div>

            </div>

            <div className="footer-bottom">

            </div>
        </div>
    );
}