import "../common/products.css"
import "aos/dist/aos.css";
import "../common/about.css";
import "../common/main.css";
import ProductSlider from "./ProductSlider";
import { useTranslation } from "react-i18next";

export default function Products() {

  const {t} = useTranslation();

  return (
    <div className="products-outer" data-aos="fade-up">
      <div className="title-outer" data-aos="fade-up">
        {t("ourProducts")}
      </div>
      <div className="title-sub-outer" data-aos="fade-up">
        {t("ourProductsSub")}
      </div>
      <ProductSlider />
    </div>
  );
}
