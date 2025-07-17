import React from "react";
import MatrixSection from "../components/MatrixSection";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  // Play sound and navigate
  const handleStart = () => {
    const audio = new Audio(process.env.PUBLIC_URL + "/music/click.mp3");
    audio.play();
    setTimeout(() => navigate("/menu"), 150); // Changed to navigate to /menu
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
        {/* Social and Resume Links */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="group relative flex flex-col items-center">
            <a
              href="https://github.com/swetha4444"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5dff4e] hover:scale-110 transition-transform duration-200 hover:drop-shadow-[0_0_8px_#5dff4e]"
              aria-label="GitHub Profile"
            >
              <FaGithub size={32} />
            </a>
            <span className="mt-2 text-[#5dff4e] text-xs font-mono md:absolute md:top-full md:mt-2 md:whitespace-nowrap md:bg-[#111]/90 md:px-3 md:py-1 md:rounded md:shadow-lg md:opacity-0 group-hover:md:opacity-100 transition-opacity pointer-events-none">
              GitHub
            </span>
          </div>
          <div className="group relative flex flex-col items-center">
            <a
              href="https://www.linkedin.com/in/swetha-saseendran-794749194/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5dff4e] hover:scale-110 transition-transform duration-200 hover:drop-shadow-[0_0_8px_#5dff4e]"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={32} />
            </a>
            <span className="mt-2 text-[#5dff4e] text-xs font-mono md:absolute md:top-full md:mt-2 md:whitespace-nowrap md:bg-[#111]/90 md:px-3 md:py-1 md:rounded md:shadow-lg md:opacity-0 group-hover:md:opacity-100 transition-opacity pointer-events-none">
              LinkedIn
            </span>
          </div>
          <div className="group relative flex flex-col items-center">
            <a
              href={process.env.PUBLIC_URL + "/resume/Swetha_Saseendran_Resume.pdf"}
              download
              className="text-[#5dff4e] hover:scale-110 transition-transform duration-200 hover:drop-shadow-[0_0_8px_#5dff4e]"
              aria-label="Download Resume"
            >
              <FaFileDownload size={32} />
            </a>
            <span className="mt-2 text-[#5dff4e] text-xs font-mono md:absolute md:top-full md:mt-2 md:whitespace-nowrap md:bg-[#111]/90 md:px-3 md:py-1 md:rounded md:shadow-lg md:opacity-0 group-hover:md:opacity-100 transition-opacity pointer-events-none">
              Resume
            </span>
          </div>
        </div>
      </MatrixSection>
    </main>
  );
}