import { useRef, useEffect } from "react";
import "../common/products.css";
import img1 from "../assets/brand1.png";
import img2 from "../assets/brand2.png";
import img3 from "../assets/brand3.png";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";

const products = [
  {
    img: img1,
    title: "LUNDEV",
    description: "Tinh ru anh choi da <br/> Chua kip choi da ma em da da anh",
    config: ["2022", "2022", "2022"],
  },
  {
    img: img2,
    title: "LUNDEV",
    description: "Tinh ru anh choi da <br/> Chua kip choi da ma em da da anh",
    config: ["2022", "2022", "2022"],
  },
  {
    img: img3,
    title: "LUNDEV",
    description: "Tinh ru anh choi da <br/> Chua kip choi da ma em da da anh",
    config: ["2022", "2022", "2022"],
  },
];

export default function ProductSlider() {
  const slideRef = useRef<HTMLDivElement | null>(null);

  // Set the first slide active on mount
  useEffect(() => {
    updateActive();
  }, []);

  const updateActive = () => {
    if (!slideRef.current) return;
    const items = Array.from(slideRef.current.children);
    items.forEach((item) => (item as HTMLElement).classList.remove("active"));
    if (items[0]) (items[0] as HTMLElement).classList.add("active");
  };

  const nextSlide = () => {
    if (!slideRef.current) return;
    const items = Array.from(slideRef.current.children);
    slideRef.current.appendChild(items[0]);
    updateActive();
  };

  const prevSlide = () => {
    if (!slideRef.current) return;
    const items = Array.from(slideRef.current.children);
    slideRef.current.prepend(items[items.length - 1]);
    updateActive();
  };

  return (
    <div className="slide-container">
      <div id="slide" ref={slideRef}>
        {products.map((p, idx) => (
          <div className="item" key={idx}>
            <div className="image">
              <img src={p.img} alt={p.title} />
            </div>
            <div className="content">
              <div className="left">
                <h1>{p.title}</h1>
                <div
                  className="des"
                  dangerouslySetInnerHTML={{ __html: p.description }}
                />
                <button>
                  See more
                  <i className="fa-solid fa-angle-right"></i>
                  <i className="fa-solid fa-angle-right"></i>
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
              <div className="right">
                <h2>CẤU HÌNH</h2>
                <ul>
                  {p.config.map((year, i) => (
                    <li key={i}>
                      <p>Năm sản xuất</p>
                      <p>{year}</p>
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
