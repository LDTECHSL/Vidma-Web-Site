import React from "react";
import "../common/products.css";

interface Product {
  name: string;
  imageLink: string | null;
}

interface Props {
  products: Product[];
}

const TopProductsCarousel: React.FC<Props> = ({ products }) => {
  return (
    <div className="carousel-outer">
      <div className="carousel-track">
        {[...products, ...products].map((item, index) => (
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
    </div>
  );
};

export default TopProductsCarousel;
