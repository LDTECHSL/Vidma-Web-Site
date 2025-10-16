import Main from "../layouts/Main";
import { useState, useEffect } from "react";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import BrandNamesSlider from "../components/BrandNamesSlider";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import Products from "../components/Products";

export default function Home() {
    const slides = [
        {
            image: slide1,
            title: "Strength That Lasts, Style That Protects",
            text: "Discover premium-quality roofing sheets designed to withstand every season. Durable, elegant, and built to protect your home or business — our roofs combine lasting performance with modern design",
        },
        {
            image: slide2,
            title: "Your Trusted Partner in Roofing Excellence",
            text: "We provide top-grade roofing sheets that guarantee strength, weather resistance, and long-term value. From industrial to residential projects, trust us to cover you with quality that endures.",
        },
        {
            image: slide3,
            title: "Covering Dreams, One Roof at a Time",
            text: "Our roofing sheets aren’t just strong — they’re crafted to elevate your property’s look and lifespan. Get the perfect balance of durability, beauty, and affordability for any project.",
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
            <div className="relative w-full h-[80vh] sm:h-[70vh] xs:h-[60vh] overflow-hidden home-outer mt-5">
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
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
                            <h1 className="text-white text-2xl md:text-4xl font-bold mt-5 mb-5 drop-shadow-lg">
                                {slide.title}
                            </h1>
                            <p className="text-white text-base md:text-md mt-5 mb-5 max-w-xl drop-shadow-md">
                                {slide.text}
                            </p>
                            <div className="wrapper">
                                <a href="#" className="button">
                                    <div className="icon">
                                        <i className="fab fa-facebook-f"></i>
                                    </div>
                                    <span>Facebook</span>
                                </a>
                                <a href="#" className="button">
                                    <div className="icon">
                                        <i className="fab fa-whatsapp"></i>
                                    </div>
                                    <span>WhatsApp</span>
                                </a>
                                <a href="#" className="button">
                                    <div className="icon">
                                        <i className="fab fa-tiktok"></i>
                                    </div>
                                    <span>Tiktok</span>
                                </a>
                            </div>
                        </div>
                        <div className="white-mist">
                        </div>
                    </div>
                ))}

                {/* Left Arrow */}
                <button
                    onClick={() =>
                        setCurrentIndex((prev) =>
                            prev === 0 ? slides.length - 1 : prev - 1
                        )
                    }
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white text-3xl mt-5 px-4 py-4  hover:bg-white/70 transition z-20"
                >
                    ‹
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() =>
                        setCurrentIndex((prev) =>
                            prev === slides.length - 1 ? 0 : prev + 1
                        )
                    }
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white text-3xl mt-5 px-4 py-4 hover:bg-white/70 transition z-20"
                >
                    ›
                </button>
            </div>


            {/* Brand Names Slider */}
            <BrandNamesSlider />

            {/* About us */}
            <div id="about">
                <AboutUs />
            </div>

            {/* Services */}
            <Services />

            {/* Products */}
            <Products />

            {/* <ProductSlider /> */}
        </Main>
    );
}
