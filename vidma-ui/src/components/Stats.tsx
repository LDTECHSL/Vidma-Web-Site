import { useEffect, useRef, useState } from "react";
import "../common/main.css";
import "../common/stats.css";
import { useTranslation } from "react-i18next";
import { getStats } from "../services/home-api";

interface StatsResponse {
    experience: number;
    projects: number;
    dealers: number;
    points: number;
}

export default function Stats() {
    const [data, setData] = useState<StatsResponse | null>(null);
    const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
    const statsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        // ✅ Simulate or fetch data from API
        async function fetchStats() {
            try {
                const response = await getStats();
                setData(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        }

        fetchStats();
    }, []);

    useEffect(() => {
        if (!data) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"));
                        const targetValue = getTargetNumber(index);
                        animateCount(index, targetValue);
                    }
                });
            },
            { threshold: 0.5 }
        );

        statsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [data]);

    const getTargetNumber = (index: number): string => {
        if (!data) return "0";
        switch (index) {
            case 0:
                return data.experience + "+";
            case 1:
                return data.projects + "+";
            case 2:
                return data.dealers + "+";
            case 3:
                return data.points + "+";
            default:
                return "0";
        }
    };

    const {t} = useTranslation();

    const animateCount = (index: number, target: string) => {
        if (counts[index] > 0) return;

        let endValue = Number(target.replace(/\D/g, ""));
        let suffix = target.replace(/\d/g, "");

        let start = 0;
        const duration = 1500;
        const increment = endValue / (duration / 30);

        const interval = setInterval(() => {
            start += increment;
            if (start >= endValue) {
                start = endValue;
                clearInterval(interval);
            }
            setCounts((prev) => {
                const newCounts = [...prev];
                newCounts[index] = Math.floor(start);
                return newCounts;
            });
        }, 30);

        statsRef.current[index]!.setAttribute("data-suffix", suffix);
    };

    return (
        <div className="stats-outer">
            <div className="stats-inner">
                {/* 1️⃣ Years Experience */}
                <div
                    data-aos="fade-up"
                    className="stats"
                    ref={(el) => {
                        if (el) statsRef.current[0] = el;
                    }}
                    data-index="0"
                    data-suffix=""
                >
                    <div className="number">
                        {counts[0]}
                        {statsRef.current[0]?.getAttribute("data-suffix")}
                    </div>
                    <div className="title">{t("experience")}</div>
                    <div className="desc">{t("experienceSub")}</div>
                </div>

                {/* 2️⃣ Completed Projects */}
                <div
                    data-aos="fade-up"
                    className="stats"
                    ref={(el) => {
                        if (el) statsRef.current[1] = el;
                    }}
                    data-index="1"
                    data-suffix=""
                >
                    <div className="number">
                        {counts[1]}
                        {statsRef.current[1]?.getAttribute("data-suffix")}
                    </div>
                    <div className="title">{t("projects")}</div>
                    <div className="desc">{t("projectsSub")}</div>
                </div>

                {/* 3️⃣ Dealer Network */}
                <div
                    data-aos="fade-up"
                    className="stats"
                    ref={(el) => {
                        if (el) statsRef.current[2] = el;
                    }}
                    data-index="2"
                    data-suffix=""
                >
                    <div className="number">
                        {counts[2]}
                        {statsRef.current[2]?.getAttribute("data-suffix")}
                    </div>
                    <div className="title">{t("dealers")}</div>
                    <div className="desc">{t("dealersSub")}</div>
                </div>

                {/* 4️⃣ Distribution Points */}
                <div
                    data-aos="fade-up"
                    className="stats"
                    ref={(el) => {
                        if (el) statsRef.current[3] = el;
                    }}
                    data-index="3"
                    data-suffix=""
                >
                    <div className="number">
                        {counts[3]}
                        {statsRef.current[3]?.getAttribute("data-suffix")}
                    </div>
                    <div className="title">{t("points")}</div>
                    <div className="desc">{t("pointsSub")}</div>
                </div>
            </div>
        </div>
    );
}
