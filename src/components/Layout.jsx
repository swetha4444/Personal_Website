import React, { useEffect, useRef } from "react";
import MatrixRain from "../backgrounds/matrixRain";
import NavBar from "./navbar";

export default function Layout({ children }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Set volume to 20%
    }
    const playAudio = () => {
      if (audioRef.current) {
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
      <audio
        ref={audioRef}
        src={process.env.PUBLIC_URL + "/music/matrix-bg.mp3"}
        autoPlay
        loop
        controls={false}
        style={{ display: "none" }}
      />
      {children}
    </div>
  );
}