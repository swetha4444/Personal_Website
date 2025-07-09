import React from "react";
import MatrixSection from "../components/MatrixSection";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // Play sound and navigate
  const handleStart = () => {
    const audio = new Audio(process.env.PUBLIC_URL + "/music/click.mp3");
    audio.play();
    setTimeout(() => navigate("projects"), 150); // Use relative path if using basename
  };

  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-screen">
      <MatrixSection className="max-w-xl mx-auto p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#5dff4e] mb-4 text-center matrix-font">
          SWETHA SASEENDRAN
        </h1>
        <h2 className="text-xl md:text-2xl text-[#5dff4e]/80 mb-6 text-center font-mono">
          Software Developer & AI Enthusiast
        </h2>
        <p className="text-green-200 text-lg text-center font-mono leading-relaxed mb-8">
          Welcome to my Matrix-inspired portfolio.<br />
          I build modern web apps, explore artificial intelligence, and love creating immersive digital experiences.<br />
          <span className="text-[#5dff4e]">Let’s connect and build the future together.</span>
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleStart}
            className="matrix-btn px-10 py-3 font-bold text-[#5dff4e] text-xl rounded-lg matrix-font relative overflow-hidden"
          >
            <span className="relative z-10 tracking-widest">START</span>
            <span className="matrix-btn-glow"></span>
          </button>
        </div>
      </MatrixSection>
    </main>
  );
}