import "../common/products.css"
import "aos/dist/aos.css";
import "../common/about.css";
import "../common/main.css";
import ProductSlider from "./ProductSlider";

export default function Products() {

  return (
    <div className="products-outer" data-aos="fade-up">
      <div className="title-outer" data-aos="fade-down">
        Our Products
      </div>
      <div className="title-sub-outer" data-aos="fade-up">
        Our Premium Offerings
      </div>
      <ProductSlider />
    </div>
  );
}
