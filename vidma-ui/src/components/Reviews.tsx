import { useState, useRef, useEffect } from "react";
import "../common/main.css";
import "../common/reviews.css";
import { useTranslation } from "react-i18next";

export default function Reviews() {

  const {t} = useTranslation();

  const reviews = [
    {
      title: "Good",
      text: "I think Educrat is the best theme I ever seen this year. Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance.",
      name: "Ali Tufan",
    },
    {
      title: "Excellent",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      name: "Ronald Richards",
    },
    {
      title: "Excellent",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      name: "Annette Black",
    },
    {
      title: "Excellent",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      name: "Ronald Richards",
    },
    {
      title: "Excellent",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      name: "Annette Black",
    },
    {
      title: "Excellent",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      name: "Ronald Richards",
    },
    {
      title: "Excellent",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      name: "Annette Black",
    },
    // ... add more if needed
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
