import "../common/main.css";
import banner from "../assets/awards-banner.png";
import banner2 from "../assets/brands-banner.png";
import Divider from "@mui/material/Divider";
import Lottie from "lottie-react";  // ✅ Import Lottie
import world from "../assets/world.json"; // ✅ Your animation JSON

export default function Footer() {
    return (
        <div className="footer-outer">
            <div className="footer-inner">
                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">Our Services</div>
                    <div className="f-link">Projects</div>
                    <div className="f-link">Products</div>
                    <div className="f-link">About Us</div>
                    <div className="f-link">Contact Us</div>
                </div>

                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">Get Help</div>
                    <div className="f-link">Contact Us</div>
                    <div className="f-link">WhatsApp</div>
                    <div className="f-link">info@vidma.com</div>
                </div>

                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">Legal</div>
                    <div className="f-link">Privacy Policy</div>
                    <div className="f-link">Terms of Service</div>
                </div>

                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">Follow Us</div>
                    <div className="f-link">Facebook</div>
                    <div className="f-link">WhatsApp</div>
                    <div className="f-link">TikTok</div>
                </div>
            </div>

            <div className="footer-awards-outer" data-aos="fade-up">
                <div className="f">
                    <div className="f-title">Awards & Recognitions</div>
                    <img className="footer-awards-banner" src={banner} alt="Awards & Recognitions" />
                </div>

                {/* ✅ Lottie Animation in center */}
                <div className="footer-lottie" data-aos="fade-up">
                    <Lottie 
                        animationData={world}
                        loop={true}
                        autoplay={true}
                        style={{ width: 180, height: 180 }}
                    />
                </div>

                <div className="f" data-aos="fade-up">
                    <div className="f-title">Companies</div>
                    <img className="footer-awards-banner" src={banner2} alt="Companies" />
                </div>
            </div>

            <Divider style={{ width: "65%", marginTop: "20px", marginBottom: "10px", backgroundColor: "white" }} />

            <div className="footer-bottom">
                <div className="fb-text">
                    © {new Date().getFullYear()} Vidma. All Rights Reserved. | Design and Developed by 
                    <span style={{ color: "rgba(7, 115, 223, 1)", fontWeight: "bold" }}> 2D-Coders</span>
                </div>
            </div>
        </div>
    );
}
