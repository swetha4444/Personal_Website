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
	},
	{
		title: "Matrix Rain Background",
		description:
			"Animated Matrix code rain effect with React and Canvas.",
		link: "#",
	},
	{
		title: "AI Chatbot",
		description: "Conversational AI assistant with a Matrix-inspired UI.",
		link: "#",
	},
	{
		title: "Portfolio Hallway",
		description:
			"A 3D hallway portfolio experience built with Blender and react-three-fiber.",
		link: "#",
	},
];

const tvVariants = {
	enter: (direction) => ({
		x: direction > 0 ? 300 : -300,
		opacity: 0,
		scale: 0.9,
		filter: "blur(8px)",
		transition: { duration: 0.25 }, // faster
	}),
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
		scale: 1,
		filter: "blur(0px)",
		transition: { duration: 0.3, type: "spring", bounce: 0.2, stiffness: 700, damping: 40 },
	},
	exit: (direction) => ({
		zIndex: 0,
		x: direction < 0 ? 300 : -300,
		opacity: 0,
		scale: 0.9,
		filter: "blur(8px)",
		transition: { duration: 0.2 }, // faster
	}),
};

export default function Projects() {
    const [[page, direction], setPage] = useState([0, 0]);

    const playClick = useCallback(() => {
        const audio = new Audio(process.env.PUBLIC_URL + "/music/click.mp3");
        audio.play();
    }, []);

    const paginate = useCallback(
        (newDirection) => {
            playClick();
            setPage(([prevPage]) => [
                (prevPage + newDirection + projects.length) % projects.length,
                newDirection,
            ]);
        },
        [playClick]
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
                <MatrixSection className="w-full h-full flex flex-col items-center justify-center bg-transparent border-[#5dff4e]/50 shadow-2xl p-0">
                    <h1 className="text-4xl font-extrabold text-[#5dff4e] mb-8 text-center matrix-font tracking-widest drop-shadow-lg">
                        Projects{" "}
                        <span className="text-green-300 text-lg ml-2">
                            (Channel {page + 1}/{projects.length})
                        </span>
                    </h1>
                    <div className="flex-1 flex items-center justify-center w-full h-full relative">
                        {/* Left Arrow */}
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 rounded-full p-4 text-[#5dff4e] hover:bg-[#5dff4e]/20 transition"
                            onClick={() => paginate(-1)}
                            aria-label="Previous Project"
                        >
                            <FaChevronLeft size={32} />
                        </button>
                        {/* TV Frame */}
                        <div className="w-full max-w-xl mx-auto flex items-center justify-center h-[400px]">
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* TV Outer Frame */}
                                <div className="absolute inset-0 rounded-[2.5rem] border-8 border-[#222] bg-gradient-to-b from-[#222] to-[#111] shadow-[0_0_60px_#5dff4e44] z-0" />
                                {/* TV Inner Bezel */}
                                <div className="absolute inset-4 rounded-[2rem] border-4 border-[#5dff4e] bg-black z-0" />
                                {/* TV Stand */}
                                <div className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-32 h-6 bg-[#19a535] rounded-b-2xl shadow-lg z-0" />
                                {/* TV Buttons */}
                                <div className="absolute right-8 bottom-8 flex flex-col gap-2 z-10">
                                    <div className="w-4 h-4 rounded-full bg-[#5dff4e] opacity-60" />
                                    <div className="w-4 h-4 rounded-full bg-[#5dff4e] opacity-30" />
                                </div>
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
                                            {/* Static pixel animation overlay */}
                                            <StaticPixelOverlay />
                                            {/* TV static effect (optional, can keep both for extra effect) */}
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
                                            <a
                                                href={projects[page].link}
                                                className="mt-2 px-8 py-3 rounded bg-[#5dff4e] text-black font-bold shadow flex items-center gap-2 hover:bg-[#00ff00] transition-colors duration-200 z-10"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Project <FaExternalLinkAlt />
                                            </a>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                        {/* Right Arrow */}
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 rounded-full p-4 text-[#5dff4e] hover:bg-[#5dff4e]/20 transition"
                            onClick={() => paginate(1)}
                            aria-label="Next Project"
                        >
                            <FaChevronRight size={32} />
                        </button>
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
                        Tip: Use <span className="font-bold">←</span> / <span className="font-bold">→</span> or click arrows to change channel
                    </div>
                </MatrixSection>
            </main>
        </div>
    );
}