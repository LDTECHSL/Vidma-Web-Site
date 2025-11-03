import brand1 from "../assets/brand1.png";
import brand2 from "../assets/brand2.png";
import brand3 from "../assets/brand3.png";
import brand4 from "../assets/brand4.png";

export default function BrandNamesSlider() {
  const brands = [brand1, brand2, brand3, brand4];

  return (
    <div className="relative overflow-hidden py-6 bg-white">
      <div className="flex w-max animate-scroll">
        {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
          <img
            key={index}
            src={brand}
            alt={`brand-${index}`}
            className="h-12 sm:h-16 md:h-20 w-auto mx-8 sm:mx-12 md:mx-16 object-contain"
          />
        ))}
      </div>
    </div>
  );
}

