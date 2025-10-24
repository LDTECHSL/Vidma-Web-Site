import { useEffect, useRef, useState } from "react";
import "../common/main.css";
import "../common/stats.css";

interface StatItem {
    number: string;
    title: string;
    desc: string;
}

export default function Stats() {
    const data: StatItem[] = [
        { number: "84%", title: "Partners hire staff", desc: "in the first month." },
        { number: "78%", title: "Applicants we pass on", desc: "excel in interviews." },
        { number: "3000+", title: "Applicants we pass on", desc: "excel in interviews." },
        { number: "04", title: "monthly settings", desc: "for each of our partners" },
    ];

    const [counts, setCounts] = useState<number[]>(data.map(() => 0));
    const statsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"));
                        animateCount(index, data[index].number);
                    }
                });
            },
            { threshold: 0.5 }
        );

        statsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const animateCount = (index: number, target: string) => {
        if (counts[index] > 0) return; // prevent re-animation

        let endValue = Number(target.replace(/\D/g, "")); // remove %, +
        let suffix = target.replace(/\d/g, ""); // get % or +

        let start = 0;
        const duration = 1500; // 1.5s animation
        const increment = endValue / (duration / 30); // update every 30ms

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

        // update the displayed suffix
        statsRef.current[index]!.setAttribute("data-suffix", suffix);
    };

    return (
        <div className="stats-outer">
            <div className="stats-inner">
                {data.map((item, idx) => (
                    <div
                        data-aos="fade-up"
                        className="stats"
                        key={idx}
                        ref={(el) => {
                            if (el) statsRef.current[idx] = el; // assign without returning
                        }}
                        data-index={idx}
                        data-suffix=""
                    >
                        <div className="number">
                            {counts[idx]}
                            {statsRef.current[idx]?.getAttribute("data-suffix")}
                        </div>
                        <div className="title">{item.title}</div>
                        <div className="desc">{item.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
