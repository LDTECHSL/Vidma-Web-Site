import { useState } from "react";
import "../common/products.css";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";

const products = [
  {
    img: "https://www.metecnolanka.com/wp-content/uploads/2022/08/Untitled-design-1-e1664354816102.png",
    title: "Roofing Gutters",
    description:
      "Durable and efficient drainage systems that channel rainwater safely away from roofs, protecting walls and foundations.",
    material: ["Galvanized Steel", "Aluminum", "PVC (Polyvinyl Chloride)"],
    colors: ["#C0C0C0", "#FFFFFF", "#654321", "#4B4B4B"],
  },
  {
    img: "https://www.metecnolanka.com/wp-content/uploads/2022/08/Untitled-design-3-copy-e1664354901180.png",
    title: "Mineral Wool Sandwich Panels",
    description:
      "Insulated wall and roof panels designed for superior thermal, acoustic, and fire resistance in industrial and commercial buildings.",
    material: [
      "Outer & Inner Layers: Pre-painted Galvanized Steel (PPGI) or Aluminum",
      "Core: Mineral Wool Insulation",
    ],
    colors: ["#F8F8F0", "#DDDCD6", "#87CEEB", "#B22222"],
  },
  {
    img: "https://www.metecnolanka.com/wp-content/uploads/2022/08/Untitled-design-5-copy-e1664354975582.png",
    title: "Trimcurve",
    description:
      "Stylish curved roof edging that delivers a seamless finish while improving water flow and adding architectural elegance.",
    material: ["Pre-painted Galvanized Steel (PPGI)", "Aluminum"],
    colors: ["#0077BE", "#4B4B4B", "#B22222", "#FFFFFF"],
  },
];

export default function ProductSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="slide-container">
      <div id="slide">
        {products.map((p, idx) => (
          <div
            className={`item ${idx === current ? "active" : ""}`}
            key={idx}
          >
            <div className="image" data-aos="fade-up" data-aos-delay="200">
              <img src={p.img} alt={p.title} />
            </div>
            <div className="content">
              <div className="left" data-aos="fade-up" data-aos-delay="400">
                <h2>{p.title}</h2>
                <div className="des">{p.description}</div>

                {/* Color boxes */}
                <div className="color-list">
                  {p.colors.map((color, i) => (
                    <span
                      key={i}
                      className="color-dot"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></span>
                  ))}
                </div>
              </div>

              <div className="right" data-aos="fade-up" data-aos-delay="400">
                <h2>Materials</h2>
                <ul>
                  {p.material.map((m, i) => (
                    <li key={i}>
                      <p>{m}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="directional">
        <button onClick={prevSlide}>
          <FaLeftLong />
        </button>
        <button onClick={nextSlide}>
          <FaRightLong />
        </button>
      </div>
    </div>
  );
}
