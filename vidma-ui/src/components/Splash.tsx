import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import splashAnim from "../assets/vidma-splash.json"; // ✅ Your Lottie file
import "../common/main.css";

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 7000; // total splash duration (7 seconds)
    const interval = 100; // update every 100ms
    const increment = (interval / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + increment : 100));
    }, interval);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="splash-overlay">
      {/* Loading bar */}
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* Lottie animation */}
      <div className="splash-content">
        <Lottie animationData={splashAnim} loop={false} />
      </div>
    </div>
  );
}
