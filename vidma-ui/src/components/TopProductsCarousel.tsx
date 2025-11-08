import React, { useRef } from "react";
import "../common/products.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Product {
  name: string;
  imageLink: string | null;
}

interface Props {
  products: Product[];
}

const TopProductsCarousel: React.FC<Props> = ({ products }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const itemWidth = trackRef.current.firstElementChild?.clientWidth || 250;
      const scrollAmount = direction === "left" ? -itemWidth - 20 : itemWidth + 20;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="carousel-outer">
      <button className="carousel-arrow left" onClick={() => scroll("left")}>
        <FaChevronLeft />
      </button>
      <div className="carousel-track" ref={trackRef}>
        {products.map((item, index) => (
          <div className="carousel-item" key={index}>
            <img
              src={
                item.imageLink?.replace("dl=0", "raw=1") ||
                "https://via.placeholder.com/250x200?text=No+Image"
              }
              alt={item.name}
            />
            {/* <p className="carousel-name">{item.name}</p> */}
          </div>
        ))}
      </div>
      <button className="carousel-arrow right" onClick={() => scroll("right")}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default TopProductsCarousel;
