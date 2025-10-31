import "../common/main.css";
import banner from "../assets/awards-banner.png";
import banner2 from "../assets/brands-banner.png";
import Divider from "@mui/material/Divider";
import Lottie from "lottie-react";  // ✅ Import Lottie
import world from "../assets/world.json"; // ✅ Your animation JSON
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getContactUsData } from "../services/home-api";

export default function Footer() {
    const [data, setData] = useState<any>({});
    const { t } = useTranslation();

    const getSocialMediaLinks = async () => {
        try { 
            const res = await getContactUsData();
            setData(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSocialMediaLinks();
    }, []);

    return (
        <div className="footer-outer">
            <div className="footer-inner">
                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">{t("services")}</div>
                    <div className="f-link"><a href="#gallery">{t("gallery")}</a></div>
                    <div className="f-link"><a href="#products">{t("products")}</a></div>
                    <div className="f-link"><a href="#about">{t("about")}</a></div>
                    <div className="f-link"><a href="#contact">{t("contact")}</a></div>
                </div>

                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">{t("getHelp")}</div>
                    <div className="f-link"><a href="#contact">{t("contact")}</a></div>
                    <div className="f-link" onClick={() => window.open(data.whatsappLink, "_blank")}>{t("whatsApp")}</div>
                    {/* <div className="f-link">info@vidma.com</div> */}
                </div>

                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">{t("legal")}</div>
                    <div className="f-link">{t("privacyPolicy")}</div>
                    <div className="f-link">{t("termsOfService")}</div>
                </div>

                <div className="footer-section" data-aos="fade-up">
                    <div className="f-title">{t("followUs")}</div>
                    <div className="f-link" onClick={() => window.open(data.facebookLink, "_blank")}>{t("facebook")}</div>
                    <div className="f-link" onClick={() => window.open(data.whatsappLink, "_blank")}>{t("whatsApp")}</div>
                    <div className="f-link" onClick={() => window.open(data.tikTokLink, "_blank")}>{t("tiktok")}</div>
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
                    <span style={{ color: "rgba(7, 115, 223, 1)", fontWeight: "bold", cursor: "pointer" }}> 2D-Coders</span>
                </div>
            </div>
        </div>
    );
}
