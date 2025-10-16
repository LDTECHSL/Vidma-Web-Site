import "../common/products.css"
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

export default function Products() {
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

  return (
    <div className="products-outer" data-aos="fade-up">
      <div className="title-outer" data-aos="fade-down">
        Our Products
      </div>
      <div className="title-sub-outer" data-aos="fade-up">
        Our Premium Offerings
      </div>
      
    </div>
  );
}
