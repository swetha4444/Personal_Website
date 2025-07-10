import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FaTerminal, FaUser, FaFlask, FaBriefcase, FaProjectDiagram, FaHome } from "react-icons/fa";

// Import your audio files (place them in /public or /assets and use the correct path)
const swingSound = process.env.PUBLIC_URL + "/music/swing.mp3";
const clickSound = process.env.PUBLIC_URL + "/music/click.mp3";

const navItems = [
    {
        label: "Projects",
        path: "/projects",
        icon: <FaProjectDiagram size={22} />,
    },
    {
        label: "About",
        path: "/about",
        icon: <FaUser size={22} />,
    },
    {
        label: "Research",
        path: "/research",
        icon: <FaFlask size={22} />,
    },
    {
        label: "Work Experience",
        path: "/work",
        icon: <FaBriefcase size={22} />,
    },
];

// Arrange balls in a perfect circle (including Home as first)
const getCirclePos = (i, total, radius = 100) => {
    const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
    return {
        left: `calc(50% + ${Math.cos(angle) * radius}px)`,
        top: `calc(50% + ${Math.sin(angle) * radius}px)`,
        transform: "translate(-50%, -50%)",
    };
};

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const location =
        typeof window !== "undefined"
            ? { pathname: window.location.pathname }
            : { pathname: "" };

    // Home is always on the left, and also included in the circle menu
    const circleNavItems = [
        {
            label: "Home",
            path: "/menu",
            icon: <FaHome size={22} />,
        },
        ...navItems,
    ];

    // Audio refs
    const swingRef = useRef(null);
    const clickRef = useRef(null);

    // Play sound helpers
    const playSwing = () => {
        if (swingRef.current) {
            swingRef.current.currentTime = 0;
            swingRef.current.play();
        }
    };
    const playClick = () => {
        if (clickRef.current) {
            clickRef.current.pause();
            clickRef.current.currentTime = 0;
            clickRef.current.play().catch(() => {});
        }
    };

    return (
        <>
            {/* Audio elements */}
            <audio ref={swingRef} src={swingSound} preload="auto" />
            <audio ref={clickRef} src={clickSound} preload="auto" />

            <nav className="w-full max-w-screen-lg mx-auto flex items-center justify-between bg-black/70 border border-[#5dff4e]/40 rounded-lg py-1 px-3 my-2 relative z-20 shadow-[0_0_12px_#5dff4e33] h-12 overflow-visible">
                {/* Home button on the left */}
                <a
                    href="/menu"
                    className="flex items-center gap-1 text-[#5dff4e] text-lg font-extrabold font-mono tracking-widest drop-shadow-[0_0_6px_#5dff4e] hover:scale-105 transition-all matrix-flicker"
                    style={{
                        textShadow: "0 0 6px black, 0 0 2px black",
                    }}
                    aria-label="Home"
                >
                    <FaHome className="animate-glitch-icon" size={24} />
                </a>
                {/* Hamburger/Menu button on the right */}
                <button
                    className="flex items-center gap-1 text-[green] text-lg font-extrabold font-mono tracking-widest drop-shadow-[0_0_6px_#5dff4e] hover:scale-105 transition-all matrix-flicker"
                    onClick={() => setOpen((v) => !v)}
                    style={{
                        textShadow: "0 0 6px black, 0 0 2px black",
                    }}
                    aria-label="Open navigation"
                >
                    <FaTerminal className="animate-glitch-icon" size={18} />
                    Menu
                </button>
                {/* Static scanline overlay */}
                <div className="absolute left-0 bottom-0 w-full h-0.5 pointer-events-none z-30">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-[#5dff4e99] to-transparent animate-scanline" />
                </div>
                {/* Animated Circle Menu */}
                {open && (
                    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
                        {/* Overlay with blur */}
                        <div
                            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"
                            onClick={() => setOpen(false)}
                            style={{ zIndex: 1 }}
                        />
                        {/* Balls in a perfect circle */}
                        <div className="relative w-80 h-80 z-10">
                            {circleNavItems.map((item, i) => {
                                const isCurrent = location.pathname === item.path;
                                return (
                                    <a
                                        key={item.label}
                                        href={item.path}
                                        className="absolute"
                                        style={getCirclePos(i, circleNavItems.length)}
                                        onClick={e => {
                                            playClick();
                                            setOpen(false);
                                        }}
                                        onMouseEnter={playSwing}
                                    >
                                        <div
                                            className={`group w-16 h-16 rounded-full flex items-center justify-center border-2 cursor-pointer transition-all duration-200
                        ${isCurrent
                                                    ? "bg-[#5dff4e33] border-[#5dff4e] shadow-[0_0_32px_8px_#5dff4e99] blur-[1.5px] hover:blur-0"
                                                    : "bg-black/80 border-[#5dff4e] shadow-[0_0_16px_#5dff4e88] hover:scale-125 hover:bg-[#5dff4e22] hover:shadow-[0_0_32px_#5dff4e]"
                                                }`}
                                        >
                                            <span className="text-[#5dff4e]">
                                                {item.icon}
                                            </span>
                                            {/* Tooltip */}
                                            <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#111]/90 text-[#5dff4e] text-xs font-mono px-3 py-1 rounded shadow-lg transition pointer-events-none z-50 whitespace-nowrap">
                                                {item.label}
                                            </span>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>
            {/* Animations */}
            <style>{`
        .matrix-flicker {
          animation: matrix-flicker 2.5s infinite steps(1, end);
        }
        @keyframes matrix-flicker {
          0%, 100% { opacity: 1; }
          97% { opacity: 0.7; }
          98% { opacity: 0.4; }
          99% { opacity: 0.9; }
        }
        .animate-glitch-icon {
          animation: glitch-icon 1.2s infinite linear alternate;
        }
        @keyframes glitch-icon {
          0% { filter: drop-shadow(0 0 2px #5dff4e); }
          50% { filter: drop-shadow(0 0 8px #5dff4e) brightness(1.5); }
          100% { filter: drop-shadow(0 0 2px #5dff4e); }
        }
        .animate-scanline {
          animation: scanline-move 2s linear infinite;
        }
        @keyframes scanline-move {
          0% { background-position-x: 0%; }
          100% { background-position-x: 100%; }
        }
      `}</style>
        </>
    );
};

export default NavBar;