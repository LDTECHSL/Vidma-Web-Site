import "../common/services.css";
import "../common/main.css";
import { FaAlgolia } from "react-icons/fa"; // using react-icons
import { useTranslation } from "react-i18next";
import { useLanguage } from "./LanguageContext";
import { getServicesByLanguage } from "../services/home-api";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";

export default function Services() {
  const [services, setServices] = useState<any[]>([])

  const { t } = useTranslation();
  const { language } = useLanguage();

  const handleGetServices = async () => {
    try {
      const response = await getServicesByLanguage(language);
      setServices(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetServices();
  }, [language]);

  return (
    <div className="services-outer">
      <div className="title-outer white" data-aos="fade-down">
        {t("services")}
      </div>
      <div className="title-sub-outer white" data-aos="fade-up">
        {t("servicesSub")}
      </div>

      <div className="service-content-outer">
        {services.slice(0, 2).map((service, index) => (
          <div
            key={index}
            className="service-card"
            data-aos="fade-up"
            data-aos-delay={200 + index * 100}
          >
            <div className="service-icon">
              <FaAlgolia />
            </div>

            <Divider orientation="vertical" flexItem style={{ margin: '0px 10px', border: '1px solid black' }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: "center", gap: '10px' }}>
              <div className="service-title">{service.title}</div>
              <div className="service-desc">{service.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="service-content-outer">
        {services.slice(2, 4).map((service, index) => (
          <div
            key={index}
            className="service-card"
            data-aos="fade-up"
            data-aos-delay={300 + index * 100}
          >
            <div className="service-icon">
              <FaAlgolia />
            </div>
            <Divider orientation="vertical" flexItem style={{ margin: '0px 10px', border: '1px solid black' }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: "center", gap: '10px' }}>
              <div className="service-title">{service.title}</div>
              <div className="service-desc">{service.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="service-content-outer">
        {services.slice(4, 6).map((service, index) => (
          <div
            key={index}
            className="service-card"
            data-aos="fade-up"
            data-aos-delay={300 + index * 100}
          >
            <div className="service-icon">
              <FaAlgolia />
            </div>
            <Divider orientation="vertical" flexItem style={{ margin: '0px 10px', border: '1px solid black' }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: "center", gap: '10px' }}>
              <div className="service-title">{service.title}</div>
              <div className="service-desc">{service.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
