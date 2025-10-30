import "../common/main.css";
import banner from "../assets/awards-banner.png";
import banner2 from "../assets/brands-banner.png";
import Divider from "@mui/material/Divider";
import Lottie from "lottie-react";  // ✅ Import Lottie
import world from "../assets/world.json"; // ✅ Your animation JSON
import { useTranslation } from "react-i18next";

export default function Footer() {

    const { t } = useTranslation();

    return (
        <div className="footer-outer">
            <div className="footer-inner">
                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">{t("services")}</div>
                    <div className="f-link">{t("gallery")}</div>
                    <div className="f-link">{t("products")}</div>
                    <div className="f-link">{t("about")}</div>
                    <div className="f-link">{t("contact")}</div>
                </div>

                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">{t("getHelp")}</div>
                    <div className="f-link">{t("contact")}</div>
                    <div className="f-link">{t("whatsApp")}</div>
                    {/* <div className="f-link">info@vidma.com</div> */}
                </div>

                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">{t("legal")}</div>
                    <div className="f-link">{t("privacyPolicy")}</div>
                    <div className="f-link">{t("termsOfService")}</div>
                </div>

                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">{t("followUs")}</div>
                    <div className="f-link">{t("facebook")}</div>
                    <div className="f-link">{t("whatsApp")}</div>
                    <div className="f-link">{t("tiktok")}</div>
                </div>
            </div>

            <div className="footer-awards-outer" data-aos="fade-up">
                <div className="f">
                    <div className="f-title">{t("awards")}</div>
                    <img className="footer-awards-banner" src={banner} alt={t("awards")} />
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
                    <div className="f-title">{t("companies")}</div>
                    <img className="footer-awards-banner" src={banner2} alt={t("companies")} />
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
