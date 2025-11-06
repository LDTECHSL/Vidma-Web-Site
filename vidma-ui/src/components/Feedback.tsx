import React, { useState } from "react";
import "../common/main.css";
import "../common/feedback.css";
import { useTranslation } from "react-i18next";
import { createForm } from "../services/home-api";

export default function Feedback() {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        comment: "",
    });

    const { t } = useTranslation();

    const moods = [
        { id: 1, emoji: "😩", label: t("verybad") },
        { id: 2, emoji: "😔", label: t("bad") },
        { id: 3, emoji: "😐", label: t("medium") },
        { id: 4, emoji: "🙂", label: t("good") },
        { id: 5, emoji: "😁", label: t("excellent") },
    ];

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !selectedMood) {
            alert("Please fill in all required fields.");
            return;
        }

        const body = {
            name: formData.name,
            email: formData.email,
            reaction: moods.find(mood => mood.id === selectedMood)?.label || "",
            comment: formData.comment,
        }

        try {
            await createForm(body)
            alert("Feedback sent!")
        } catch (error) {
            alert("Server Error! Please try again later.")
        } finally {
            setFormData({
                name: "",
                email: "",
                comment: "",
            });
            setSelectedMood(null);
        }
    };

    const handleMoodClick = (moodId: number, event: React.MouseEvent) => {
        setSelectedMood(moodId);
        const emoji = moods.find((m) => m.id === moodId)?.emoji || "😊";

        createEmojiExplosion(event.clientX, event.clientY, emoji);
    };

    const createEmojiExplosion = (x: number, y: number, emoji: string) => {
        const container = document.createElement("div");
        container.className = "emoji-explosion";
        document.body.appendChild(container);

        for (let i = 0; i < 6; i++) {
            const span = document.createElement("span");
            span.textContent = emoji;
            span.className = "emoji-particle";
            container.appendChild(span);

            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 120 + 30;
            const translateX = Math.cos(angle) * distance;
            const translateY = Math.sin(angle) * distance;

            span.animate(
                [
                    { transform: "translate(0, 0)", opacity: 1 },
                    {
                        transform: `translate(${translateX}px, ${translateY}px) scale(0.5)`,
                        opacity: 0,
                    },
                ],
                {
                    duration: 1000 + Math.random() * 500,
                    easing: "ease-out",
                    fill: "forwards",
                }
            );
        }

        container.style.position = "fixed";
        container.style.left = `${x}px`;
        container.style.top = `${y}px`;
        container.style.pointerEvents = "none";
        container.style.zIndex = "9999";

        setTimeout(() => {
            container.remove();
        }, 1500);
    };


    return (
        <div className="feedback-outer">
            {/* <div className="feedback-inner1"></div> */}
            {/* <div className="wave-layer wave1"></div>
            <div className="wave-layer wave2"></div> */}
            {/* <div className="wave-layer wave3"></div> */}
            {/* <div className="feedback-inner"></div> */}
            <div className="feedback-inner">
                <div className="feedback-form-card">
                    <h2 className="feedback-title" data-aos="fade-up">{t("feeling")}</h2>
                    <p className="feedback-subtitle" data-aos="fade-up">
                        {t("feelingSub")}
                    </p>

                    <form className="feedback-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder={t("name")}
                            className="feedback-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            data-aos="fade-up"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder={t("email")}
                            className="feedback-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            data-aos="fade-up" data-aos-delay="300"
                        />

                        <div className="mood-container" data-aos="zoom-in">
                            {moods.map((mood) => (
                                <div
                                    key={mood.id}
                                    className={`mood-icon ${selectedMood === mood.id ? "active" : ""
                                        }`}
                                    onClick={(e) => handleMoodClick(mood.id, e)}
                                >
                                    <span>{mood.emoji}</span>
                                    {/* <p >{mood.label}</p> */}
                                </div>
                            ))}
                        </div>

                        <textarea
                            name="comment"
                            placeholder={t("comment")}
                            className="feedback-comment"
                            value={formData.comment}
                            onChange={handleChange}
                            data-aos="zoom-in"
                        />

                        <button type="submit" className="feedback-submit">
                            {t("submit")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
