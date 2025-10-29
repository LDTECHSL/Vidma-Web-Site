import { useState, useRef, useEffect } from "react";
import "../common/main.css";
import "../common/reviews.css";
import { useTranslation } from "react-i18next";

export default function Reviews() {

  const {t} = useTranslation();

  const reviews = [
  {
    title: "Excellent",
    text: "The roofing sheets we purchased were durable and easy to install. Definitely worth every penny!",
    name: "Lasath Rathnayake",
  },
  {
    title: "Excellent",
    text: "Great service and fast delivery. The gutters fit perfectly and protect our home from heavy rain.",
    name: "Dasun Shyaminda",
  },
  {
    title: "Excellent",
    text: "The metal sheets are strong and resistant to rust. Our warehouse roof has never looked better.",
    name: "Pubudu Kalpage",
  },
  {
    title: "Good",
    text: "Excellent customer support and guidance on choosing the right roofing materials for our project.",
    name: "Deshan Wijethunga",
  },
  {
    title: "Excellent",
    text: "The roofing sheets are sturdy and lightweight. Easy to handle and perfect for large-scale construction.",
    name: "Pasindu Sankalpa",
  },
  {
    title: "Good",
    text: "The gutters and roofing sheets are high quality and built to last. Very satisfied with my purchase.",
    name: "Mihiru Jayathilake",
  },
  {
    title: "Excellent",
    text: "Delivery was on time and installation was smooth. The roofing sheets look amazing on our new building.",
    name: "Shanika Waragoda",
  },
  {
    title: "Good",
    text: "Strong and weather-resistant sheets that hold up well under heavy rain and wind. Perfect for our home.",
    name: "Sampath Karunathilake",
  },
  {
    title: "Excellent",
    text: "The range of roofing materials is excellent. I found everything I needed, from sheets to gutters.",
    name: "A.M.Kelum",
  },
  {
    title: "Good",
    text: "Professional service, top-quality materials, and easy installation. We will definitely come back for more.",
    name: "Sithum Senevirathne",
  },
];


  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll active card into center
  const scrollToCurrent = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.children[index] as HTMLElement;
    const offset =
      card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2;

    track.scrollTo({
      left: offset,
      behavior: "smooth",
    });
  };

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  // Scroll when current changes
  useEffect(() => {
    scrollToCurrent(current);
  }, [current]);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <div className="reviews-outer">
      <h2 className="title-outer white" data-aos="fade-up">{t("review")}</h2>
      <p className="title-sub-outer white" data-aos="fade-up">
        {t("reviewSub")}
      </p>

      <div className="reviews-carousel">
        <button className="nav-btn left" onClick={prevSlide}>
          ←
        </button>

        <div className="reviews-track" ref={trackRef} data-aos="fade-up">
          {reviews.map((r, index) => (
            <div
              key={index}
              className={`review-card ${index === current ? "active" : ""}`}
            >
              <div className="quote-icon">❝</div>
              <div className="reviewer">
                {r.name}
              </div>
              <h3>{r.title}</h3>
              <p className="review-text">“{r.text.length > 120 ? r.text.slice(0, 120) + "..." : r.text}”</p>
              {/* <div className="reviewer">
                <div>
                  <h4>{r.name}</h4>
                </div>
              </div> */}
            </div>
          ))}
        </div>

        <button className="nav-btn right" onClick={nextSlide}>
          →
        </button>
      </div>
    </div>
  );
}
