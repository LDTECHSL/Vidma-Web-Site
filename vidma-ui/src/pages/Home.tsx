import Main from "../layouts/Main";
import { useState, useEffect } from "react";
import { useLanguage } from "../components/LanguageContext";
import BrandNamesSlider from "../components/BrandNamesSlider";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import Products from "../components/Products";
import VideoSlider from "../components/VideoSlider";
import ContactUs from "../components/ContactUs";
import ProjectsGallery from "../components/ProjectsGallery";
import Awards from "../components/Awards";
import Feedback from "../components/Feedback";
import Team from "../components/Team";
import Reviews from "../components/Reviews";
import Stats from "../components/Stats";
import { getHeroData } from "../services/home-api";

export default function Home() {
  const [slides, setSlides] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    fetchHeroDetails();
  }, [language]);

  const fetchHeroDetails = async () => {
    try {
      const res = await getHeroData(language);
      console.log(res.data.slides);
      setSlides(res.data.slides);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  return (
    <Main>
      {/* Hero Section */}
      <div className="relative w-full h-[80vh] sm:h-[70vh] xs:h-[60vh] overflow-hidden home-outer mt-5">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image.replace("dl=0", "raw=1")}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
              <h1 className="text-white text-2xl md:text-4xl font-bold mt-5 mb-5 drop-shadow-lg max-w-[800px]">
                {slide.title}
              </h1>
              <p className="text-white text-base md:text-md mt-5 mb-5 max-w-[700px] drop-shadow-md">
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
            <div className="white-mist"></div>
          </div>
        ))}

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

      {/* Other sections */}
      <BrandNamesSlider />
      <div id="about">
        <AboutUs />
      </div>
      <Services />
      <div id="products">
        <Products />
      </div>

      <div id="contact">
        <ContactUs />
      </div>
      
      <VideoSlider />
      <div id="projects">
        <ProjectsGallery />
      </div>
      
      <Awards />
      <Feedback />
      <Team />
      <Reviews />
      <Stats />
    </Main>
  );
}
