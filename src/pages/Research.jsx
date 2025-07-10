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
          --matrix-green-glow: rgba(93, 255, 78, 0.25);
          --matrix-text: #baffc9;
        }

        .cover {
          width: 100vw;
          max-width: 1000px;
          height: calc(100vh - var(--header-height) - 1rem);
          max-height: calc(100vh - var(--header-height) - 1rem);
          margin: 4rem auto;
        //   box-shadow: 0 32px 80px 0 rgba(0,0,0,0.55), 0 0 120px var(--matrix-green-glow);
          background: transparent;
          position: relative;
          perspective: 1800px;
          perspective-origin: 60% 40%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .book {
          width: 100%;
          height: 100%;
          display: flex;
          position: relative;
          z-index: 2;
          transition: transform 0.9s cubic-bezier(0.77,0,0.18,1);
        }
        .book.cover {
          justify-content: center;
        }
        .book.opening .book__page--cover {
          transform: translateX(-180px) rotateY(-80deg) scale(1.04);
          transition: transform 0.9s cubic-bezier(0.77,0,0.18,1);
          z-index: 10;
        }
        .book.open {
          transform: rotateX(28deg) rotateY(-18deg) scale(1.04);
        }

        .book__page {
          position: relative;
          width: 50%;
          height: 100%;
          display: grid;
          background: var(--matrix-green-dark);
          color: var(--matrix-green);
          border: 1px solid var(--matrix-green);
          box-shadow: inset 0 0 32px 0 var(--matrix-green-glow), 0 8px 32px 0 rgba(0,0,0,0.35);
          transition: transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.5s, border-color 0.5s;
          overflow: hidden;
        }

        /* Highlight page on hover when it's clickable */
        .book__page[style*="cursor: pointer"]:hover {
            transform: scale(1.02);
            border-color: #caffd4;
            box-shadow: inset 0 0 40px 0 var(--matrix-green-glow), 0 12px 40px 0 rgba(0,0,0,0.5), 0 0 20px var(--matrix-green-glow);
            z-index: 20;
        }

        /* CRT Scanline Effect */
        .book__page::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 3px);
          z-index: 1;
          pointer-events: none;
        }

        .book__page--cover {
          width: 360px;
          height: 100%;
          background: #181d1f;
          border-radius: 16px 8px 8px 16px;
          border: 1.5px solid var(--matrix-green);
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.25), 0 0 0 2px #5dff4e22;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.9s cubic-bezier(0.77,0,0.18,1);
          position: relative;
        }

        /* Stacked Pages Effect */
        .book__page--left::after,
        .book__page--right::after {
          content: "";
          position: absolute;
          top: 10px;
          bottom: 10px;
          width: 5px;
          pointer-events: none;
          z-index: 3;
          opacity: 0.4;
          background: repeating-linear-gradient(to bottom, var(--matrix-green-dark) 0px, var(--matrix-green-dark) 2px, var(--matrix-green) 2px, var(--matrix-green) 3px);
        }
        .book__page--left::after { right: 0; }
        .book__page--right::after { left: 0; }

        .page__content {
          padding: 2.5rem 2rem 2rem 2.5rem;
          height: 100%;
          position: relative;
          text-align: center;
          z-index: 2; /* Place content above scanlines */
          text-shadow: 0 0 5px var(--matrix-green-glow), 0 0 8px var(--matrix-green-glow);
        }

        .page__content-book-title, .page__content-title {
          font-family: 'PixelText', monospace;
          font-weight: bold;
          text-transform: uppercase;
          color: var(--matrix-green);
        }
        .page__content-book-title { font-size: 2.2rem; letter-spacing: 3px; margin-top: 2rem; margin-bottom: 1rem; }
        .page__content-title { font-size: 1.3rem; letter-spacing: 1px; margin-top: 1.5rem; margin-bottom: 1rem; }

        .page__content-author, .page__content-credits, .page__content-text {
          font-family: 'PixelText', monospace;
          font-size: 1rem;
          color: var(--matrix-text);
          margin-bottom: 1rem;
        }
        .page__content-credits { color: var(--matrix-green); }

        .page__number {
          position: absolute;
          bottom: 1rem;
          width: 100%;
          font-family: 'PixelText', monospace;
          font-size: 0.9rem;
          color: var(--matrix-text);
          text-align: center;
          opacity: 0.6;
        }

        .book__spine {
          width: 20px;
          height: 100%;
          background: linear-gradient(to right, #000, #111, #000);
          transform: translateX(-10px);
          z-index: 5;
        }

        @media (max-width: 700px) {
          .cover {
            height: calc(100vh - var(--header-height));
            margin: 0 auto;
            box-shadow: 0 8px 32px 0 rgba(0,0,0,0.25);
          }
          .book__spine, .book__page--left { display: none !important; }
          .book__page--right, .book__page--cover { width: 100% !important; border-radius: 12px !important; }
          .page__content { padding: 1.2rem 0.7rem 1.2rem 1.2rem !important; }
          .page__content-book-title {
            font-size: 1.2rem !important;
            margin-top: 1rem !important;
            margin-bottom: 0.5rem !important;
          }
          .page__content-title {
            font-size: 1rem !important;
            margin-top: 0.7rem !important;
            margin-bottom: 0.5rem !important;
          }
          .page__content-author,
          .page__content-credits,
          .page__content-text {
            font-size: 0.95rem !important;
            margin-bottom: 0.5rem !important;
          }
          .page__number {
            font-size: 0.8rem !important;
            bottom: 0.5rem !important;
          }
          .mobile-nav-btn {
            font-size: 0.85rem !important;
            padding: 0.5rem 1.2rem !important;
          }
        }
        .mobile-nav-btn {
          min-width: 100px;
          padding: 0.7rem 2.2rem;
          font-family: 'PixelText', monospace;
          font-size: 1.1rem;
          margin: 0 1.5rem;
          margin-bottom: 0.5rem;
          border-radius: 999px;
          border: 2px solid #222;
          color: #5dff4e;
          position: relative;
          box-shadow: 0 8px 32px 0 #111a, 0 2px 0 0 #5dff4e33 inset, 0 1.5px 8px 0 rgba(0,0,0,0.25);
          transition:
            background 0.2s,
            color 0.2s,
            transform 0.4s cubic-bezier(.45,1.8,.5,1),
            box-shadow 0.3s;
          cursor: pointer;
          perspective: 400px;
          outline: none;
          will-change: transform;
          overflow: hidden;
        }
        .mobile-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          box-shadow: none;
        }
        .mobile-nav-btn:not(:disabled):hover {
          color: #fff;
          background: linear-gradient(120deg, #111 0%, #333 100%);
          transform: scale(1.08) rotateY(18deg);
          box-shadow: 0 12px 36px #000c, 0 4px 0 #222 inset, 0 0 0 2px #5dff4e55;
          z-index: 2;
          filter: brightness(1.1);
        }
        .mobile-nav-btn.next:not(:disabled):hover {
          transform: scale(1.08) rotateY(-18deg);
        }
        .mobile-nav-btn .matrix-pill-shine {
          position: absolute;
          left: 18%;
          top: 18%;
          width: 64%;
          height: 18%;
          border-radius: 999px;
          background: linear-gradient(90deg,rgba(255,255,255,0.38) 0%,rgba(255,255,255,0.08) 100%);
          opacity: 0.5;
          pointer-events: none;
          z-index: 1;
          animation: pill-shine-move 2.2s linear infinite;
        }
        @keyframes pill-shine-move {
          0% { left: 10%; opacity: 0.4; }
          50% { left: 60%; opacity: 0.7; }
          100% { left: 10%; opacity: 0.4; }
        }
      `}</style>
        </div>
    );
}
