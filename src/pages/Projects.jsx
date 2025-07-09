import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MatrixSection from "../components/MatrixSection";
import MatrixRain from "../backgrounds/matrixRain";
import StaticPixelOverlay from "../components/StaticPixelOverlay";

const projects = [
	{
		title: "Sentinelle 3D",
		description:
			"A 3D interactive Matrix Sentinelle model using Blender and Three.js.",
		link: "#",
		tags: ["3D", "Blender", "Three.js"],
	},
	{
		title: "Matrix Rain Background",
		description:
			"Animated Matrix code rain effect with React and Canvas.",
		link: "#",
		tags: ["React", "Canvas", "Animation"],
	},
	{
		title: "AI Chatbot",
		description: "Conversational AI assistant with a Matrix-inspired UI.",
		link: "#",
		tags: ["AI", "Chatbot", "UI"],
	},
	{
		title: "Portfolio Hallway",
		description:
			"A 3D hallway portfolio experience built with Blender and react-three-fiber.",
		link: "#",
		tags: ["3D", "Portfolio", "react-three-fiber"],
	},
];

const tvVariants = {
	enter: {
		scale: 0.2,
		opacity: 0,
		x: 0,
		filter: "blur(8px)",
		transition: { duration: 0.22, ease: [0.4, 0.8, 0.6, 1] }
	},
	center: {
		scale: 1,
		opacity: 1,
		x: 0,
		filter: "blur(0px)",
		transition: { duration: 0.32, type: "spring", bounce: 0.18, stiffness: 700, damping: 40 }
	},
	exit: {
		scale: 0.2,
		opacity: 0,
		x: 0,
		filter: "blur(8px)",
		transition: { duration: 0.22, ease: [0.4, 0.8, 0.6, 1] }
	},
};

const playKnobTurn = () => {
  const audio = new Audio(process.env.PUBLIC_URL + "/music/click.mp3");
  audio.currentTime = 0;
  audio.play();
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 2000); // Stop after 2 seconds
};

export default function Projects() {
    const [[page, direction], setPage] = useState([0, 0]);

    const playClick = useCallback(() => {
        const audio = new Audio(process.env.PUBLIC_URL + "/music/click.mp3");
        audio.play();
    }, []);

    const paginate = useCallback(
        (newDirection) => {
            playKnobTurn();
            setPage(([prevPage]) => [
                (prevPage + newDirection + projects.length) % projects.length,
                newDirection,
            ]);
        },
        []
    );

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowLeft") paginate(-1);
            if (e.key === "ArrowRight") paginate(1);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [paginate]);

    return (
        <div className="relative min-h-screen w-screen overflow-hidden">
            <MatrixRain />
            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-screen h-screen">
                <MatrixSection className="w-full h-full flex flex-col items-center justify-center bg-transparent border-[#5dff4e]/50 shadow-2xl ">
                    <h1 className="text-4xl font-extrabold text-[#5dff4e] mb-8 text-center matrix-font tracking-widest drop-shadow-lg p-2">
                        Projects
                    </h1>
                    <div className="flex-1 flex flex-col items-center justify-center w-full h-full relative">
                        {/* TV Frame */}
                        <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
                            <div className="relative w-full h-[400px] flex items-center justify-center">
                                {/* TV Outer Frame */}
                                <div className="absolute inset-0 rounded-[2.5rem] border-8 border-[#222] bg-gradient-to-b from-[#222] to-[#111] shadow-[0_0_60px_#5dff4e44] z-0" />
                                {/* TV Inner Bezel */}
                                <div className="absolute inset-4 rounded-[2rem] border-4 border-[#5dff4e] bg-black z-0" />
                                {/* TV Stand */}
                                <div className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-32 h-6 bg-[#19a535] rounded-b-2xl shadow-lg z-0" />
                           
                                {/* Animated Project Card as TV Screen */}
                                <div className="absolute inset-8 rounded-[1.5rem] overflow-hidden flex items-center justify-center z-10 bg-black">
                                    <AnimatePresence initial={false} custom={direction}>
                                        <motion.div
                                            key={page}
                                            custom={direction}
                                            variants={tvVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{
                                                type: "spring",
                                                stiffness: 900,
                                                damping: 50,
                                                duration: 0.18,
                                            }}
                                            className="matrix-font w-full h-full flex flex-col items-center justify-center relative"
                                        >
                                            {/* Channel number inside TV */}
                                            <div className="absolute top-4 right-6 bg-[#111] bg-opacity-70 px-4 py-1 rounded-full border border-[#5dff4e] text-[#5dff4e] text-sm font-mono z-20 shadow">
                                                CH {page + 1}/{projects.length}
                                            </div>
                                            {/* Static pixel animation overlay */}
                                            <StaticPixelOverlay />
                                            {/* TV static effect */}
                                            <motion.div
                                                className="absolute inset-0 pointer-events-none"
                                                style={{
                                                    background:
                                                        "repeating-linear-gradient(0deg, #5dff4e11 0px, #5dff4e22 2px, transparent 4px, transparent 8px)",
                                                    opacity: 0.15,
                                                    zIndex: 1,
                                                }}
                                                animate={{
                                                    backgroundPositionY: ["0%", "100%"],
                                                }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 1.2,
                                                    ease: "linear",
                                                }}
                                            />
                                            <h2 className="text-3xl text-[#5dff4e] font-bold mb-4 tracking-wider drop-shadow text-center z-10">
                                                {projects[page].title}
                                            </h2>
                                            <p className="text-green-200 text-center mb-6 z-10">
                                                {projects[page].description}
                                            </p>
                                            <div className="flex flex-wrap justify-center gap-2 mb-6 z-10">
                                              {projects[page].tags.map((tag, idx) => (
                                                <span
                                                  key={tag}
                                                  className={`px-4 py-1 rounded-full text-xs font-mono font-bold border transition relative
                                                    ${idx % 2 === 0
                                                      ? "bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600 border-blue-300 text-blue-900"
                                                      : "bg-gradient-to-b from-red-200 via-red-400 to-red-600 border-red-300 text-red-900"
                                                    }
                                                    ring-2 ring-black/20
                                                    hover:scale-110
                                                    opacity-80
                                                  `}
                                                  style={{
                                                    boxShadow:
                                                      (idx % 2 === 0
                                                        ? "0 8px 32px 0 #60a5faCC, 0 2px 0 0 #fff3 inset"
                                                        : "0 8px 32px 0 #fca5a5CC, 0 2px 0 0 #fff3 inset")
                                                        + ", 0 1.5px 8px 0 rgba(0,0,0,0.25)",
                                                    transform: `perspective(400px) rotateY(${idx % 2 === 0 ? "-28deg" : "28deg"})`,
                                                    opacity: 0.8,
                                                  }}
                                                >
                                                  {/* White highlight for 3D shine */}
                                                  <span
                                                    className="absolute left-2 top-1 w-2/3 h-1 rounded-full opacity-30 pointer-events-none"
                                                    style={{
                                                      background: "linear-gradient(90deg, #fff, transparent)"
                                                    }}
                                                  />
                                                  {tag}
                                                </span>
                                              ))}
                                            </div>
                                            <div className="flex justify-center mb-4 z-20">
                                              <a
                                                href={projects[page].link}
                                                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181c1f] border-2 border-[#5dff4e] text-[#5dff4e] font-mono text-base shadow-[0_2px_12px_#5dff4e99] hover:bg-[#222] hover:text-[#00ff00] active:scale-95 transition-all duration-150"
                                                style={{
                                                  boxShadow: "0 2px 12px #5dff4e99, 0 1.5px 0 0 #fff4 inset",
                                                  letterSpacing: "0.14em",
                                                  textShadow: "0 0 6px #5dff4e, 0 1px 0 #000",
                                                  borderBottomWidth: "3px",
                                                  borderTopWidth: "1.5px",
                                                  borderLeftWidth: "1.5px",
                                                  borderRightWidth: "1.5px",
                                                  fontFamily: "monospace",
                                                }}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5dff4e] mr-1 shadow-[0_0_6px_#5dff4e]" />
                                                VIEW PROJECT
                                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5dff4e] ml-1 shadow-[0_0_6px_#5dff4e]" />
                                              </a>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                            
                  

                            {/* TV Knob Controller */}
                            <div className="flex flex-col items-center m-10">
                              <motion.div
                                className="w-16 h-16 bg-[#181c1f] border-4 border-[#5dff4e] rounded-full shadow-[0_0_24px_#5dff4e66] flex items-center justify-center z-20 relative"
                                animate={{ rotate: page * 36 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              >
                                {/* Knob inner circle */}
                                <div className="w-10 h-10 bg-[#222] rounded-full border-2 border-[#5dff4e] flex items-center justify-center relative">
                                  {/* Notch indicator */}
                                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#5dff4e] rounded-full shadow-[0_0_8px_#5dff4e]" />
                                </div>
                                {/* Channel change buttons around the knob */}
                                <button
                                  onClick={() => paginate(-1)}
                                  aria-label="Previous Channel"
                                  className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-[#111] border-2 border-[#5dff4e] text-[#5dff4e] hover:bg-[#5dff4e]/20 active:scale-90 transition"
                                  style={{ boxShadow: "0 0 8px #5dff4e88" }}
                                >
                                  <FaChevronLeft size={14} />
                                </button>
                                <button
                                  onClick={() => paginate(1)}
                                  aria-label="Next Channel"
                                  className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-[#111] border-2 border-[#5dff4e] text-[#5dff4e] hover:bg-[#5dff4e]/20 active:scale-90 transition"
                                  style={{ boxShadow: "0 0 8px #5dff4e88" }}
                                >
                                  <FaChevronRight size={14} />
                                </button>
                              </motion.div>
                            </div>
                        </div>
                    </div>
                    {/* Channel dots */}
                    <div className="flex justify-center mt-8 gap-2">
                        {projects.map((_, idx) => (
                            <span
                                key={idx}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    idx === page ? "bg-[#5dff4e] shadow" : "bg-[#15641e]"
                                }`}
                            />
                        ))}
                    </div>
                    <div className="text-green-400 text-xs mt-4 opacity-70 text-center">
                        Tip: Use <span className="font-bold">←</span> / <span className="font-bold">→</span> or use the mouse below to change channel
                    </div>
                </MatrixSection>
            </main>
        </div>
    );
}