import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import "../common/about.css";
import "../common/main.css";
import slide1 from "../assets/about-slide1.jpg";
import slide2 from "../assets/about-slide2.jpg";
import slide3 from "../assets/about-slide3.jpg";
import slide4 from "../assets/about-slide4.jpg";
import slide5 from "../assets/about-slide5.jpg";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const cards = [
    {
      image: slide1,
      icon: "🏠",
      title: "Roofing Solutions",
      desc: "Premium, durable roofing systems designed for any environment.",
    },
    {
      image: slide2,
      icon: "☀️",
      title: "Solar Systems",
      desc: "Clean, renewable energy solutions tailored to your needs.",
    },
    {
      image: slide3,
      icon: "⚙️",
      title: "Engineering Excellence",
      desc: "Where innovation meets precision and performance.",
    },
    {
      image: slide4,
      icon: "📐",
      title: "Design & Planning",
      desc: "Smart, sustainable, and aesthetic architectural design.",
    },
    {
      image: slide5,
      icon: "🤝",
      title: "After-Sales Support",
      desc: "Reliable service and maintenance for long-term performance.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="aboutus-outer" data-aos="fade-up">
      <div className="title-outer" data-aos="fade-up">
        {t("about")}
      </div>
      <div className="title-sub-outer" data-aos="fade-up">
        {t("aboutSub")}
      </div>

      <div className="about-us-content-outer" data-aos="fade-up" data-aos-delay="200">
        <div className="about-us-content">
          "Where Vision Meets Perfection. Vidma Engineering (Pvt) Ltd transforms ideas into enduring structures.
          With precision craftsmanship and cutting-edge technology, we deliver roofing and solar systems designed
          to perform — and built to last. Excellence is our standard; 10 years of reliability is our promise."
        </div>
      </div>

      {/* Card Carousel */}
      <div className="about-us-slider-outer" data-aos="fade-up" data-aos-delay="400">
        <div className="carousel-container">
          {cards.map((card, index) => {
            const total = cards.length;
            const diff = (index - current + total) % total;

            let positionClass = "hidden-card";
            if (diff === 0) positionClass = "center-card";
            else if (diff === 1) positionClass = "right-card";
            else if (diff === 2) positionClass = "far-right-card";
            else if (diff === total - 1) positionClass = "left-card";
            else if (diff === total - 2) positionClass = "far-left-card";

            return (
              <div
                key={index}
                className={`carousel-card ${positionClass}`}
                style={{ backgroundImage: `url(${card.image})` }}
                // data-aos="flip-right"
                // data-aos-delay={index * 100}
              >
                <div className="overlay">
                  {/* <div className="icon text-4xl mb-2">{card.icon}</div>
                  <div className="title text-xl font-semibold mb-1">{card.title}</div> */}
                  <div className="desc text-sm max-w-xs">{card.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
