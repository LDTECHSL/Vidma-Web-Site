import { useEffect, useRef, useState } from "react";
import "../common/main.css";
import "../common/team.css";
import { useTranslation } from "react-i18next";
import { getTeams } from "../services/home-api";

export default function Team() {
    const [teamsData, setTeamsData] = useState<any[]>([]);
    
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const {t} = useTranslation();

    const handleGetTeam = async () => {
        try {
            const response = await getTeams();
            setTeamsData(response.data);
        } catch (error) {
            console.error("Error fetching team data:", error);
        }
    }

    useEffect(() => {
        handleGetTeam();
    }, []);

    return (
        <div className="team-outer">
            <div className="title-outer" data-aos="fade-down">
                {t("team")}
            </div>
            <div className="title-sub-outer" data-aos="fade-up">
                {t("teamSub")}
            </div>

            <div className="team-container">
                <button className="scroll-btn left" onClick={() => scroll("left")}>❮</button>

                <div className="team-scroll" ref={scrollRef}>
                    {teamsData.map((member, index) => (
                        <div key={index} className="team-card" data-aos="zoom-in">
                            <img src={member.imageUrl.replace("dl=0", "raw=1")} alt={member.name} />
                            <h3>{member.name}</h3>
                            <p className="role">{member.position}</p>
                        </div>
                    ))}
                </div>

                <button className="scroll-btn right" onClick={() => scroll("right")}>❯</button>
            </div>
        </div>
    );
}
