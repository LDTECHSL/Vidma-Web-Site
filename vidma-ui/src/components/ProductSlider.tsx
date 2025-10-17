import { useState } from "react";
import "../common/products.css";

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
  {
    img: "https://www.metecnolanka.com/wp-content/uploads/2022/08/Untitled-design-1-e1664354816102.png",
    title: "Roofing Gutters",
    description:
      "Durable and efficient drainage systems that channel rainwater safely away from roofs, protecting walls and foundations.",
    material: ["Galvanized Steel", "Aluminum", "PVC (Polyvinyl Chloride)"],
    colors: ["#C0C0C0", "#FFFFFF", "#654321", "#4B4B4B"],
  },
];

export default function ProductSlider() {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(false);

  const handleSelect = (idx: number) => {
    if (idx === current) return;
    setAnimate(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimate(false);
    }, 300); // matches CSS animation duration
  };

  return (
    <div className="actual-container">
      <div className="slide-container">
        {/* Main Product Display */}
        <div id="slide">
          <div className={`item active ${animate ? "fade-out" : "fade-in"}`}>
            <div className="image" data-aos="fade-up" data-aos-delay="200">
              <img src={products[current].img} alt={products[current].title} />
            </div>
            <div className="content">
              <div className="left" data-aos="fade-up" data-aos-delay="400">
                <h2>{products[current].title}</h2>
                <div className="des">{products[current].description}</div>

                {/* Color boxes */}
                <div className="color-list">
                  {products[current].colors.map((color, i) => (
                    <span
                      key={i}
                      className="color-dot"
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div>
              </div>

              <div className="right" data-aos="fade-up" data-aos-delay="400">
                <h2>Materials</h2>
                <ul>
                  {products[current].material.map((m, i) => (
                    <li key={i}>
                      <p>{m}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="thumbnail-row" data-aos="fade-up">
        {products.map((p, idx) => (
          <div
            key={idx}
            className={`thumb ${idx === current ? "active" : ""}`}
            onClick={() => handleSelect(idx)}
          >
            <img src={p.img} alt={p.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
