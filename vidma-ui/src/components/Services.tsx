import "../common/services.css";
import "../common/main.css";
import { FaHome, FaSolarPanel, FaCogs, FaHandsHelping, FaComments, FaCheckCircle } from "react-icons/fa"; // using react-icons
import { useTranslation } from "react-i18next";

export default function Services() {
  const services = [
    {
      icon: <FaHome />,
      title: "Roofing Solutions",
      desc: "Premium and durable roofing systems designed to protect and enhance every building.",
    },
    {
      icon: <FaSolarPanel />,
      title: "Solar Power Systems",
      desc: "Clean, renewable energy solutions customized for residential and commercial spaces.",
    },
    {
      icon: <FaCogs />,
      title: "Engineering & Design",
      desc: "Innovative engineering and architectural design services that turn your ideas into functional, efficient, and visually appealing structures.",
    },
    {
      icon: <FaHandsHelping />,
      title: "Maintenance & Support",
      desc: "Reliable after-sales maintenance and support for all installed systems, ensuring long-term performance and peace of mind.",
    },
    {
      icon: <FaComments />,
      title: "Project Consultation",
      desc: "Expert guidance from concept to completion, ensuring every project meets your vision, budget, and timeline.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Quality Inspection",
      desc: "Comprehensive inspection and quality assurance for all installations, guaranteeing safety, performance, and reliability.",
    },
  ];

  const { t } = useTranslation();

  return (
    <div className="services-outer">
      <div className="title-outer white" data-aos="fade-down">
        {t("services")}
      </div>
      <div className="title-sub-outer white" data-aos="fade-up">
        {t("servicesSub")}
      </div>

      <div className="service-content-outer">
        {services.slice(0, 3).map((service, index) => (
          <div
            key={index}
            className="service-card"
            data-aos="fade-up"
            data-aos-delay={200 + index * 100}
          >
            <div className="service-icon">{service.icon}</div>
            <div className="service-title">{service.title}</div>
            <div className="service-desc">{service.desc}</div>
          </div>
        ))}
      </div>

      <div className="service-content-outer">
        {services.slice(3, 6).map((service, index) => (
          <div
            key={index}
            className="service-card"
            data-aos="fade-up"
            data-aos-delay={300 + index * 100}
          >
            <div className="service-icon">{service.icon}</div>
            <div className="service-title">{service.title}</div>
            <div className="service-desc">{service.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
