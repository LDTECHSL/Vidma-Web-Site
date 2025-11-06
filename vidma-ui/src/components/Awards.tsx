import { useTranslation } from "react-i18next";
import "../common/awards.css";
import "../common/main.css";
import { getAchievements } from "../services/home-api";
import { useEffect, useState } from "react";

export default function Awards() {
  const [achievements, setAchievements] = useState<any[]>([]);

  const handleGetAwards = async () => {
    try {
      const response = await getAchievements();
      setAchievements(response.data);
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  }

  useEffect(() => {
    handleGetAwards();
  }, []);

  const {t} = useTranslation();

  // Create enough duplicates for smooth infinite scroll (8 times to ensure coverage)
  const duplicatedAwards = Array(8).fill(achievements).flat();

  return (
    <div className="awards-outer" data-aos="fade-up">
      <div className="title-outer" data-aos="fade-down">
        {t("ourAchievements")}
      </div>
      <div className="title-sub-outer" data-aos="fade-up">
        {t("ourAchievementsSub")}
      </div>

      <div className="awards-slider">
        <div className="awards-track">
          {duplicatedAwards.map((award, index) => (
            <div className="award-card" key={`award-${index}`} data-aos="zoom-in">
              <img src={award.imageUrl.replace("dl=0", "raw=1")} alt={award.name} />
              <div className="award-info">
                <h3>{award.name}</h3>
                <p>{award.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}