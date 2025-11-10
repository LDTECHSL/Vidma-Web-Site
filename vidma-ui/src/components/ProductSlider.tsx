import { useEffect, useState } from "react";
import "../common/products.css";
import { getTopProducts } from "../services/home-api";
import TopProductsCarousel from "./TopProductsCarousel";

export default function ProductSlider() {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const handleSelect = (idx: number) => {
  if (idx === current) return;
  setCurrent(idx);
  setAnimate(true);
  setTimeout(() => setAnimate(false), 300); // only for fade animation toggle
};


  const handleGetTopProducts = async () => {
    try {
      const response = await getTopProducts();
      const data = response.data.map((item: any) => ({
        title: item.name || item.productName || "Unnamed Product",
        description: item.description || "No description available.",
        imageLink:
          item.imageLink ||
          "https://via.placeholder.com/500x300.png?text=No+Image",
        colors: item.colors
          ? item.colors.split(",").map((c: string) => c.trim())
          : [],
        material: item.materials.split(",").map((m: string) => m.trim()) || ["Material information not available"],
      }));
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetTopProducts();
  }, []);

  if (products.length === 0) {
    return <div className="actual-container">Loading products...</div>;
  }

  const product = products[current];

  return (
    <div className="actual-container">

      <div className="main-slider">
        <div className="slide-container">
          <div id="slide">
            <div className={`item active ${animate ? "fade-out" : "fade-in"}`}>
              <div className="image" data-aos="fade-up" data-aos-delay="200">
                <img
                  src={product.imageLink.replace("dl=0", "raw=1")}
                  alt={product.title}
                />
              </div>
              <div className="content">
                <div className="left" data-aos="fade-up" data-aos-delay="400">
                  <h2>{product.title}</h2>
                  <div className="des">{product.description}</div>

                  <div className="color-list">
                    {product.colors.length > 0 ? (
                      product.colors.map((color: string, i: number) => (
                        <span
                          key={i}
                          className="color-dot"
                          style={{ backgroundColor: color }}
                        ></span>
                      ))
                    ) : (
                      <p>No colors listed</p>
                    )}
                  </div>
                </div>

                <div className="right" data-aos="fade-up" data-aos-delay="400">
                  <h2>Materials</h2>
                  <ul>
                    {product.material.map((m: string, i: number) => (
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

        {/* Thumbnails */}
        <div className="thumbnail-row">
          {products.map((p, idx) => (
            <div
              key={idx}
              className={`thumb ${idx === current ? "active" : ""}`}
              onClick={() => handleSelect(idx)}
            >
              <img
                src={
                  p.imageLink
                    ? p.imageLink.replace("dl=0", "raw=1")
                    : "https://via.placeholder.com/150x100.png?text=No+Image"
                }
                alt={p.title}
              />
            </div>
          ))}
        </div>
      </div>


      <div className="top-products-carousel">
        <TopProductsCarousel products={products} />
      </div>

    </div>
  );
}
