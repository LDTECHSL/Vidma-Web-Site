import { useTranslation } from "react-i18next";
import Main from "../layouts/Main";
import { useState, useEffect } from "react";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import BrandNamesSlider from "../components/BrandNamesSlider";

export default function Home() {
    const { t } = useTranslation();

    const slides = [
        {
            image: slide1,
            title: "Strength That Lasts, Style That Protects",
            text: "Discover premium-quality roofing sheets designed to withstand every season. Durable, elegant, and built to protect your home or business — our roofs combine lasting performance with modern design",
            button: "Learn More",
        },
        {
            image: slide2,
            title: "Your Trusted Partner in Roofing Excellence",
            text: "We provide top-grade roofing sheets that guarantee strength, weather resistance, and long-term value. From industrial to residential projects, trust us to cover you with quality that endures.",
            button: "Our Services",
        },
        {
            image: slide3,
            title: "Covering Dreams, One Roof at a Time",
            text: "Our roofing sheets aren’t just strong — they’re crafted to elevate your property’s look and lifespan. Get the perfect balance of durability, beauty, and affordability for any project.",
            button: "Contact Us",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <Main>
            {/* Hero Section */}
            <div className="relative w-full h-[80vh] sm:h-[70vh] xs:h-[60vh] overflow-hidden home-outer">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay content */}
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                            <h1 className="text-white text-3xl md:text-5xl font-bold mt-5 mb-5 drop-shadow-lg">
                                {slide.title}
                            </h1>
                            <p className="text-white text-base md:text-lg mt-5 mb-5 max-w-xl drop-shadow-md">
                                {slide.text}
                            </p>
                            {/* <button className="bg-white text-gray-900 px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
                                {slide.button}
                            </button> */}
                        </div>
                    </div>
                ))}

                {/* Dots Navigation */}
                <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${currentIndex === index
                                    ? "bg-white scale-110"
                                    : "bg-gray-400 opacity-70"
                                }`}
                        ></button>
                    ))}
                </div>
            </div>

            {/* Brand Names Slider */}
            <BrandNamesSlider />
        </Main>
    );
}
