import { useEffect, useRef, useState } from "react";
import "../common/videos.css";
import { useTranslation } from "react-i18next";
import { useLanguage } from "./LanguageContext";
import { getVideoSectionByLanguage, getVideoSectionVideos } from "../services/home-api";

export default function VideoSlider() {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [videoHeader, setVideoHeader] = useState<any>(null);
    const [videos, setVideos] = useState<string[]>([]);

    const { t } = useTranslation();
    const { language } = useLanguage();

    // Convert any YouTube URL format to a valid embed link
    const getYouTubeEmbedUrl = (url: string): string => {
        try {
            const youtubeRegex =
                /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/;
            const match = url.match(youtubeRegex);
            if (match && match[1]) {
                return `https://www.youtube.com/embed/${match[1]}`;
            }
            return url; // fallback if not YouTube
        } catch {
            return url;
        }
    };

    const handleGetVideoSection = async () => {
        try {
            const response = await getVideoSectionByLanguage(language);
            setVideoHeader(response.data);
        } catch (error) {
            console.error("Error fetching video section:", error);
        }
    }

    const handleGetVideos = async () => {
        try {
            const response = await getVideoSectionVideos();
            setVideos(response.data);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    }

    useEffect(() => {
        handleGetVideos();
        handleGetVideoSection();
    }, [language]);

    return (
        <div className="video-slider-container">
            {/* Header Section */}
            <div className="video-header">
                <div className="video-title" data-aos="fade-up">
                    <h2>{t("videoTitle")}</h2>
                </div>
                <div className="video-description" data-aos="fade-up">
                    <p>
                        “{videoHeader?.description}”
                    </p>
                    {/* <div className="nav-buttons">
                        <button onClick={() => scroll("left")} className="nav-btn">
                            ←
                        </button>
                        <button onClick={() => scroll("right")} className="nav-btn active">
                            →
                        </button>
                    </div> */}
                </div>
            </div>

            {/* Video Row */}
            <div className="video-slider" ref={sliderRef} data-aos="fade-up" data-aos-delay="100">
                {videos.map((url:any, index) => {
                    const embedUrl = getYouTubeEmbedUrl(url.videoLink);
                    const finalUrl =
                        activeIndex === index
                            ? `${embedUrl}?autoplay=1&mute=1`
                            : `${embedUrl}?mute=1`;

                    return (
                        <div
                            key={index}
                            className={`video-card ${activeIndex === index ? "active" : ""}`}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <iframe
                                src={finalUrl}
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
