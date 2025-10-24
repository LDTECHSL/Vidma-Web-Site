import React, { useState } from "react";
import "../common/main.css";
import "../common/feedback.css";

export default function Feedback() {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        comment: "",
    });

    const moods = [
        { id: 1, emoji: "😩", label: "Very Bad" },
        { id: 2, emoji: "😔", label: "Bad" },
        { id: 3, emoji: "😐", label: "Medium" },
        { id: 4, emoji: "🙂", label: "Good" },
        { id: 5, emoji: "😁", label: "Excellent" },
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
                    <h2 className="feedback-title" data-aos="fade-up">How are you feeling?</h2>
                    <p className="feedback-subtitle" data-aos="fade-up" data-aos-delay="100">
                        Your input is valuable in helping us better understand your needs
                        and tailor our service accordingly.
                    </p>

                    <form className="feedback-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="feedback-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            data-aos="fade-up" data-aos-delay="200"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
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
                            placeholder="Add a Comment..."
                            className="feedback-comment"
                            value={formData.comment}
                            onChange={handleChange}
                            data-aos="zoom-in" data-aos-delay="300"
                        />

                        <button type="submit" className="feedback-submit">
                            Submit Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
