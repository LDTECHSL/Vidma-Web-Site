import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import splashAnim from "../assets/Home.json";
import "../common/main.css";

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  

  useEffect(() => {
    const duration = 7000; // total splash duration (7 seconds)
    const interval = 100;
    const increment = (interval / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + increment : 100));
    }, interval);

    const hideTimer = setTimeout(() => setVisible(false), duration);
    const textTimer = setTimeout(() => setShowText(true), 1000); // fade in after 1s

    return () => {
      clearInterval(progressTimer);
      clearTimeout(hideTimer);
      clearTimeout(textTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="splash-overlay">
      <div className="splash-content">
        <div className="lottie-wrapper">
          <Lottie animationData={splashAnim} loop={false} />
        </div>

        {/* Fade-in text */}
        <div className={`fade-text ${showText ? "show" : ""}`}>
          TOTAL ROOFING SOLUTION
        </div>
      </div>

      {/* Loading bar */}
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
