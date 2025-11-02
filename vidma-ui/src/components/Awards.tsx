import { useTranslation } from "react-i18next";
import "../common/awards.css";
import "../common/main.css";
import { getAchievements } from "../services/home-api";
import { useEffect, useState } from "react";

export default function Awards() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const awards = [
    {
      id: 1,
      title: "Best Innovation Award",
      year: "2023",
      image: "https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg",
    },
    {
      id: 2,
      title: "Excellence in Design",
      year: "2022",
      image: "https://img.youtube.com/vi/3fumBcKC6RE/hqdefault.jpg",
    },
    {
      id: 3,
      title: "Top Performer of the Year",
      year: "2021",
      image: "https://img.youtube.com/vi/XC8zLirR6aE/hqdefault.jpg",
    },
    {
      id: 4,
      title: "Leadership Excellence",
      year: "2020",
      image: "https://img.youtube.com/vi/YbJOTdZBX1g/hqdefault.jpg",
    },
    {
      id: 5,
      title: "Outstanding Service Award",
      year: "2019",
      image: "https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg",
    },
  ];

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
          {achievements.concat(achievements).map((award, index) => (
            <div className="award-card" key={index} data-aos="zoom-in">
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
