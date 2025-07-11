import React, { useEffect, useRef } from "react";
import MatrixRain from "../backgrounds/matrixRain";

export default function Layout({ children }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3; // Set volume lower (0.0 - 1.0)
        audioRef.current.play().catch(() => {});
      }
      window.removeEventListener("click", playAudio);
    };
    window.addEventListener("click", playAudio);
    return () => window.removeEventListener("click", playAudio);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden z-0">
      <MatrixRain />
      {children}
    </div>
  );
}