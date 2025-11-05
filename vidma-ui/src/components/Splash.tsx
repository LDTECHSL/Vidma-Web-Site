import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import splashAnim from "../assets/Home.json";
import logo from "../assets/vidma-logo.png"; // ✅ your logo file
import "../common/main.css";

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const duration = 7000; // total splash duration (7 seconds)
    const interval = 100;
    const increment = (interval / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + increment : 100));
    }, interval);

    const hideTimer = setTimeout(() => setVisible(false), duration);
    const textTimer = setTimeout(() => setShowText(true), 1000);
    const flipTimer = setTimeout(() => setFlipped(true), 4000); // flip after 4s

    return () => {
      clearInterval(progressTimer);
      clearTimeout(hideTimer);
      clearTimeout(textTimer);
      clearTimeout(flipTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="splash-overlay">
      <div className={`splash-content ${flipped ? "flipped" : ""}`}>
        <div className="splash-inner front">
          <Lottie animationData={splashAnim} loop={false} />
          <div className={`fade-text ${showText ? "show" : ""}`}>
            TOTAL ROOFING SOLUTION
          </div>
        </div>

        <div className="splash-inner back">
          <img src={logo} alt="Logo" className="logo" />
        </div>
      </div>

      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
