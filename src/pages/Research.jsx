import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import MatrixRain from "../backgrounds/matrixRain";
import MatrixSection from "../components/MatrixSection";

const publications = [
    {
        title: "Quantum Algorithms for Matrix Worlds",
        authors: "Swetha S., et al.",
        journal: "Matrix Journal of Computing",
        year: 2024,
        link: "https://example.com/quantum-matrix",
        abstract: "A deep dive into quantum algorithms inspired by the Matrix universe.",
    },
    {
        title: "Neural Networks in Simulated Realities",
        authors: "Swetha S., John D.",
        journal: "Virtual Intelligence Review",
        year: 2023,
        link: "https://example.com/neural-sim",
        abstract: "Exploring neural architectures for simulated environments.",
    },
    {
        title: "AI in the Matrix: A New Dawn",
        authors: "Swetha S., Neo T.",
        journal: "Matrix AI Letters",
        year: 2022,
        link: "https://example.com/ai-matrix",
        abstract: "How artificial intelligence shapes simulated realities.",
    },
    {
        title: "Simulated Physics and Digital Worlds",
        authors: "Swetha S., Morpheus L.",
        journal: "Virtual Physics Today",
        year: 2021,
        link: "https://example.com/sim-physics",
        abstract: "Physics engines and their role in immersive digital universes.",
    },
];

function BookPage({ children, pageNum, side, onClick, flipping }) {
    return (
        <div
            className={`book__page book__page--${side} ${flipping ? "flipping" : ""}`}
            onClick={onClick}
            style={{ cursor: onClick ? "pointer" : "default" }}
        >
            <div className={`book__page-${side === "left" ? "front" : "back"}`}>
                <div className="page__content">
                    {children}
                    <div className="page__number">{pageNum}</div>
                </div>
            </div>
        </div>
    );
}

export default function Research() {
    const [spread, setSpread] = useState(0);
    const [flipping, setFlipping] = useState(null);
    const [bookState, setBookState] = useState("cover"); // 'cover', 'opening', 'open'
    const [pageIdx, setPageIdx] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 700);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const totalSpreads = Math.ceil((publications.length + 1) / 2);

    const getPageContent = (idx) => {
        if (isMobile && idx === 0) {
            return (
                <>
                    <h2 className="page__content-book-title">📖 My Research Publications</h2>
                    <div className="page__content-author">Swetha S.</div>
                </>
            );
        }
        if (idx === 0) {
            // This is the blank inside-cover for the left page on desktop
            return <></>;
        }
        if (idx > publications.length) {
            return (
                <>
                    <h2 className="page__content-title">📚 The End</h2>
                    <div className="page__content-credits">Thanks for flipping through!</div>
                </>
            );
        }
        const pub = publications[idx - 1];
        return (
            <>
                <h2 className="page__content-title">{pub.title}</h2>
                <div className="page__content-author">{pub.authors}</div>
                <div className="page__content-credits">
                    {pub.journal} ({pub.year})
                </div>
                <div className="page__content-text">{pub.abstract}</div>
                <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400"
                >
                    Read Publication →
                </a>
            </>
        );
    };

    const leftIdx = spread * 2;
    const rightIdx = leftIdx + 1;

    const handleLeftClick = () => {
        if (spread === 0 || flipping) return;
        setFlipping("left");
        setTimeout(() => {
            setSpread((s) => Math.max(0, s - 1));
            setFlipping(null);
        }, 700);
    };

    const handleRightClick = () => {
        if (spread === totalSpreads - 1 || flipping) return;
        setFlipping("right");
        setTimeout(() => {
            setSpread((s) => Math.min(totalSpreads - 1, s + 1));
            setFlipping(null);
        }, 700);
    };

    // Handle cover click to open book
    const handleCoverClick = () => {
        if (bookState !== "cover") return;
        setBookState("opening");
        setTimeout(() => setBookState("open"), 900); // match CSS transition
    };

    const handleMobilePrev = () => {
        if (pageIdx > 0 && !flipping) setPageIdx(pageIdx - 1);
    };
    const handleMobileNext = () => {
        if (pageIdx < publications.length + 1 && !flipping) setPageIdx(pageIdx + 1);
    };

    return (
        <div className="relative min-h-screen w-screen overflow-hidden">
            <MatrixRain />
            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-screen h-screen">
                <MatrixSection className="w-full h-full flex flex-col items-center justify-center bg-transparent border-[#5dff4e]/50 shadow-2xl">
                    <NavBar />
                    <h1 className="text-4xl font-extrabold text-[#5dff4e] mb-8 text-center matrix-font tracking-widest drop-shadow-lg p-2">
                        Research Book
                    </h1>
                    <div className={`cover ${bookState}`}>
                        <div className={`book ${bookState}`}>
                            {bookState === "cover" || bookState === "opening" ? (
                                <div
                                    className={`book__page book__page--cover ${bookState}`}
                                    onClick={handleCoverClick}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="page__content">
                                        {/* Front Cover Content */}
                                        <h2 className="page__content-book-title">📖 My Research Publications</h2>
                                        <div className="page__content-author">Swetha S.</div>
                                    </div>
                                </div>
                            ) : isMobile ? (
                                <div className="mobile-book-nav flex flex-col items-center w-full">
                                    <BookPage
                                        pageNum={pageIdx}
                                        side="right"
                                        onClick={undefined}
                                        flipping={false}
                                    >
                                        {getPageContent(pageIdx)}
                                    </BookPage>
                                    <div className="flex flex-wrap justify-center gap-2 mb-6 z-10">
                                        <button
                                            className={`
      px-6 py-2 rounded-full text-base font-mono font-bold border transition relative
      bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600 border-blue-300 text-blue-900
      ring-2 ring-black/20 hover:scale-110 opacity-80
    `}
                                            onClick={handleMobilePrev}
                                            disabled={pageIdx === 0}
                                            style={{
                                                boxShadow:
                                                    "0 8px 32px 0 #60a5faCC, 0 2px 0 0 #fff3 inset, 0 1.5px 8px 0 rgba(0,0,0,0.25)",
                                                transform: "perspective(400px) rotateY(-28deg)",
                                                opacity: 0.8,
                                                cursor: pageIdx === 0 ? "not-allowed" : "pointer",
                                            }}
                                        >
                                            {/* White highlight for 3D shine */}
                                            <span
                                                className="absolute left-2 top-1 w-2/3 h-1 rounded-full opacity-30 pointer-events-none"
                                                style={{
                                                    background: "linear-gradient(90deg, #fff, transparent)"
                                                }}
                                            />
                                            Prev
                                        </button>
                                        <button
                                            className={`
      px-6 py-2 rounded-full text-base font-mono font-bold border transition relative
      bg-gradient-to-b from-red-200 via-red-400 to-red-600 border-red-300 text-red-900
      ring-2 ring-black/20 hover:scale-110 opacity-80
    `}
                                            onClick={handleMobileNext}
                                            disabled={pageIdx === publications.length + 1}
                                            style={{
                                                boxShadow:
                                                    "0 8px 32px 0 #fca5a5CC, 0 2px 0 0 #fff3 inset, 0 1.5px 8px 0 rgba(0,0,0,0.25)",
                                                transform: "perspective(400px) rotateY(28deg)",
                                                opacity: 0.8,
                                                cursor: pageIdx === publications.length + 1 ? "not-allowed" : "pointer",
                                            }}
                                        >
                                            {/* White highlight for 3D shine */}
                                            <span
                                                className="absolute left-2 top-1 w-2/3 h-1 rounded-full opacity-30 pointer-events-none"
                                                style={{
                                                    background: "linear-gradient(90deg, #fff, transparent)"
                                                }}
                                            />
                                            Next
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <BookPage
                                        pageNum={leftIdx}
                                        side="left"
                                        onClick={spread > 0 && !flipping ? handleLeftClick : undefined}
                                        flipping={flipping === "left"}
                                    >
                                        {getPageContent(leftIdx)}
                                    </BookPage>
                                    <div className="book__spine" />
                                    <BookPage
                                        pageNum={rightIdx}
                                        side="right"
                                        onClick={spread < totalSpreads - 1 && !flipping ? handleRightClick : undefined}
                                        flipping={flipping === "right"}
                                    >
                                        {getPageContent(rightIdx)}
                                    </BookPage>
                                </>
                            )}
                        </div>
                    </div>
                </MatrixSection>
            </main>
            <style>{`
        :root {
          --header-height: 4.5rem;
          --matrix-green: #5dff4e;
          --matrix-green-dark: #111813;
          --matrix-green-glow: rgba(93, 255, 78, 0.3);
          --matrix-text: #baffc9;
        }

        /* Animations */
        @keyframes text-decode-flicker {
          0% { opacity: 1; }
          2% { opacity: 0.4; }
          4% { opacity: 1; }
          20% { opacity: 1; }
          22% { opacity: 0.7; }
          24% { opacity: 1; }
          55% { opacity: 1; }
          57% { opacity: 0.5; }
          59% { opacity: 1; }
          100% { opacity: 1; }
        }
        @keyframes grid-pan {
          from { background-position: 0 0; }
          to { background-position: -40px -40px; }
        }

        /* New animations for the cover */
        @keyframes float-book {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 15px 40px #000c) drop-shadow(0 0 20px var(--matrix-green-glow));
          }
          50% {
            filter: drop-shadow(0 20px 50px #000c) drop-shadow(0 0 35px var(--matrix-green));
          }
        }

        .cover {
          width: 100vw;
          max-width: 1000px;
          height: calc(100vh - var(--header-height) - 1rem);
          margin: 4rem auto;
          background: transparent;
          position: relative;
          perspective: 1800px;
          perspective-origin: 60% 40%;
          display: flex;
          align-items: center;
          justify-content: center;
          /* Apply floating animation */
          animation: float-book 5s ease-in-out infinite;
        }
        
        .book {
          width: 100%;
          height: 100%;
          display: flex;
          position: relative;
          z-index: 2;
          transition: transform 0.9s cubic-bezier(0.77,0,0.18,1), filter 0.9s ease;
          filter: drop-shadow(0 15px 40px #000c) drop-shadow(0 0 20px var(--matrix-green-glow));
        }
        .book.cover {
          /* Apply pulsing glow animation only when closed */
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .book.open {
          transform: rotateX(28deg) rotateY(-18deg) scale(1.04);
        }

        .book__page {
          position: relative;
          width: 50%;
          height: 100%;
          background-color: var(--matrix-green-dark);
          background-image: 
            linear-gradient(rgba(93, 255, 78, 0.1) 1px, transparent 1px),
            linear-gradient(to right, rgba(93, 255, 78, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: grid-pan 3s linear infinite;
          color: var(--matrix-green);
          border: 1px solid var(--matrix-green);
          box-shadow: inset 0 0 32px 0 var(--matrix-green-glow), 0 8px 32px 0 rgba(0,0,0,0.35);
          transition: transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.5s, filter 0.5s;
          overflow: hidden;
        }
        .book__page.flipping {
          filter: brightness(1.5) blur(1px);
        }

        .book__page--cover {
          width: 360px;
          height: 100%;
          background: #181d1f;
          border-radius: 16px 8px 8px 16px;
          border: 1.5px solid var(--matrix-green);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.9s cubic-bezier(0.77,0,0.18,1);
          position: relative;
        }
        .book.opening .book__page--cover {
          transform: translateX(-180px) rotateY(-80deg) scale(1.04);
          z-index: 10;
        }

        .page__content {
          padding: 2.5rem 2rem 2rem 2.5rem;
          height: 100%;
          position: relative;
          text-align: center;
          z-index: 2;
          text-shadow: 0 0 5px var(--matrix-green-glow), 0 0 8px var(--matrix-green-glow);
          animation: text-decode-flicker 3s linear infinite;
        }

        .page__content-title {
          font-family: 'PixelText', monospace;
          font-weight: bold;
          text-transform: uppercase;
          color: var(--matrix-green);
          font-size: 1.3rem;
          letter-spacing: 1px;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .page__content-link {
          display: inline-block;
          margin-top: 1.5rem;
          padding: 0.6rem 1.2rem;
          font-family: 'PixelText', monospace;
          border: 1px solid var(--matrix-green);
          border-radius: 2px;
          color: var(--matrix-green);
          text-decoration: none;
          background: rgba(93, 255, 78, 0.1);
          box-shadow: 0 0 10px var(--matrix-green-glow), inset 0 0 5px rgba(93, 255, 78, 0.2);
          transition: all 0.3s ease;
        }
        .page__content-link:hover {
          background: var(--matrix-green);
          color: var(--matrix-green-dark);
          box-shadow: 0 0 25px var(--matrix-green);
          transform: scale(1.05) translateY(-2px);
        }

        .book__spine {
          width: 20px;
          height: 100%;
          background: linear-gradient(to right, #000, #111, #000);
          transform: translateX(-10px);
          z-index: 5;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        @media (max-width: 700px) {
          .book { filter: none; }
          .book__page { animation: none; } /* Disable grid animation on mobile */
          .book__spine, .book__page--left { display: none !important; }
          .book__page--right, .book__page--cover { width: 100% !important; border-radius: 12px !important; }
        }
      `}</style>
        </div>
    );
}
