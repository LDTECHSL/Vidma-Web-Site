import React, { useState } from "react";
import "../common/main.css";
import "../common/feedback.css";
import { useTranslation } from "react-i18next";

export default function Feedback() {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        comment: "",
    });

    const {t} = useTranslation();

    const moods = [
        { id: 1, emoji: "😩", label: t("verybad") },
        { id: 2, emoji: "😔", label: t("bad") },
        { id: 3, emoji: "😐", label: t("medium") },
        { id: 4, emoji: "🙂", label: t("good") },
        { id: 5, emoji: "😁", label: t("excellent") },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !selectedMood) {
            alert("Please fill in all required fields.");
            return;
        }
        alert(
            `Name: ${formData.name}\nEmail: ${formData.email}\nMood: ${moods.find((m) => m.id === selectedMood)?.label
            }\nComment: ${formData.comment}`
        );
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
                    <p className="feedback-subtitle" data-aos="fade-up" data-aos-delay="100">
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
                            data-aos="fade-up" data-aos-delay="200"
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

                        <div className="mood-container" data-aos="zoom-in" data-aos-delay="400">
                            {moods.map((mood) => (
                                <div
                                    key={mood.id}
                                    className={`mood-icon ${selectedMood === mood.id ? "active" : ""
                                        }`}
                                    onClick={() => setSelectedMood(mood.id)}
                                >
                                    <span>{mood.emoji}</span>
                                    <p>{mood.label}</p>
                                </div>
                            ))}
                        </div>

                        <textarea
                            name="comment"
                            placeholder={t("comment")}
                            className="feedback-comment"
                            value={formData.comment}
                            onChange={handleChange}
                            data-aos="zoom-in" data-aos-delay="300"
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
