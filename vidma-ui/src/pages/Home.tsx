import { useTranslation } from "react-i18next";
import Main from "../layouts/Main";

export default function Home() {
    const { t, i18n } = useTranslation();

    return (
        <Main>
            <div className="hero">
                <div className="hero-content">
                    <div className="hero-title">
                        Ultimate Roofing Services ...
                    </div>
                    <div>
                        <button className="primary-button">{t("order")}</button>
                    </div>
                </div>
                <div className="hero-content hc"></div>
            </div>
        </Main>
    );
}