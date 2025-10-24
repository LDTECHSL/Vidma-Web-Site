import { useRef, useState } from "react";
import "../common/videos.css";

export default function VideoSlider() {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const videos = [
        "https://www.youtube.com/embed/Q2CcW6vPeDA",
        "https://www.youtube.com/embed/tEGapA8iEkE",
        "https://www.youtube.com/embed/Q2CcW6vPeDA",
        "https://www.youtube.com/embed/tEGapA8iEkE",
        "https://www.youtube.com/embed/Q2CcW6vPeDA",
        "https://www.youtube.com/embed/tEGapA8iEkE",
        "https://www.youtube.com/embed/Q2CcW6vPeDA",
        "https://www.youtube.com/embed/tEGapA8iEkE",
        "https://www.youtube.com/embed/Q2CcW6vPeDA",
    ];

    const scroll = (direction: "left" | "right") => {
        if (sliderRef.current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="video-slider-container">
            {/* Header Section */}
            <div className="video-header">
                <div className="video-title" data-aos="fade-up">
                    <h2>Bringing Innovation, Integrity, and Excellence Together in Every Step</h2>
                </div>
                <div className="video-description" data-aos="fade-up">
                    <p>
                        “At Vidma Engineering (Pvt) Ltd, we believe true progress begins with integrity and innovation. Every project we undertake reflects our commitment to quality, precision, and long-term reliability — from advanced roofing solutions to sustainable solar systems. Guided by excellence at every step, we continue to build lasting trust and enduring value for our clients.”
                    </p>
                    <div className="nav-buttons">
                        <button onClick={() => scroll("left")} className="nav-btn">
                            ←
                        </button>
                        <button onClick={() => scroll("right")} className="nav-btn active">
                            →
                        </button>
                    </div>
                </div>
            </div>

            {/* Video Row */}
            <div className="video-slider" ref={sliderRef} data-aos="fade-up" data-aos-delay="100">
                {videos.map((url, index) => {
                    const embedUrl =
                        activeIndex === index
                            ? `${url}?autoplay=1&mute=1`
                            : `${url}?mute=1`;

                    return (
                        <div
                            key={index}
                            className={`video-card ${activeIndex === index ? "active" : ""
                                }`}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <iframe
                                src={embedUrl}
                                title={`video-${index}`}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                            {activeIndex !== index && <div className="play-overlay">▶</div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
