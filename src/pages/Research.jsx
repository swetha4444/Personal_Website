import React, { useState } from "react";
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
    const [flipping, setFlipping] = useState(null); // "left" or "right" or null

    const totalSpreads = Math.ceil((publications.length + 2) / 2);

    const getPageContent = (idx) => {
        if (idx === 0) {
            return (
                <>
                    <h2 className="page__content-book-title">📖 My Research Publications</h2>
                    <div className="page__content-author">Swetha S.</div>
                </>
            );
        }
        if (idx === publications.length + 1) {
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

    return (
        <div className="relative min-h-screen w-screen overflow-hidden">
            <MatrixRain />
            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-screen h-screen">
                <MatrixSection className="w-full h-full flex flex-col items-center justify-center bg-transparent border-[#5dff4e]/50 shadow-2xl">
                    <NavBar />
                    <h1 className="text-4xl font-extrabold text-[#5dff4e] mb-8 text-center matrix-font tracking-widest drop-shadow-lg p-2">
                        Research Book
                    </h1>
                    <div className="cover" style={{ margin: "0 auto" }}>
                        <div className="book">
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
                        </div>
                    </div>
                </MatrixSection>
            </main>
            <style>{`
        .cover {
          width: 720px;
          height: 512px;
          box-shadow: 0 32px 80px 0 rgba(0,0,0,0.45), 0 0 100px rgba(0,0,0,.3);
          background: transparent;
          position: relative;
          perspective: 1800px;
          perspective-origin: 60% 40%;
        }
        .book {
          width: 100%;
          height: 100%;
          display: flex;
          perspective: 1800px;
          perspective-origin: 60% 40%;
          /* Tilt the book in 3D */
          transform: rotateX(28deg) rotateY(-18deg) scale(1.04);
          box-shadow: none;
          position: relative;
          z-index: 2;
        }
        .book__spine {
          width: 16px;
          height: 92%;
          align-self: center;
          background: linear-gradient(180deg, #232323 60%, #444 100%);
          box-shadow:
            0 0 24px 4px #111a,
            0 0 0 2px #5dff4e44 inset;
          border-left: 2px solid #5dff4e22;
          border-right: 2px solid #5dff4e22;
          border-radius: 8px;
          z-index: 3;
          position: relative;
        }

        /* Give each page a slight tilt for realism */
        .book__page--left {
          border-right: none;
          border-radius: 16px 0 0 16px;
          transform-origin: left;
          box-shadow:
            -12px 8px 32px 0 rgba(0,0,0,0.18),
            inset 24px 0 32px -16px rgba(0,0,0,0.25);
          /* Add a slight tilt when not flipping */
          transform: rotateY(4deg);
          transition: transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.5s;
        }
        .book__page--right {
          border-left: none;
          border-radius: 0 16px 16px 0;
          transform-origin: right;
          box-shadow:
            12px 8px 32px 0 rgba(0,0,0,0.18),
            inset -24px 0 32px -16px rgba(0,0,0,0.25);
          /* Add a slight tilt when not flipping */
          transform: rotateY(-4deg);
          transition: transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.5s;
        }
        /* Remove tilt when flipping for smooth animation */
        .book__page--left.flipping {
          transform: none;
        }
        .book__page--right.flipping {
          transform: none;
        }

        /* Keep your flipping animation for .book__page-inner as before */
        .book__page-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1);
          transform-style: preserve-3d;
        }
        .book__page--left .book__page-inner {
          transform-origin: right;
        }
        .book__page--right .book__page-inner {
          transform-origin: left;
        }
        .book__page--right.flipping .book__page-inner {
          transform: rotateY(-180deg);
        }
        .book__page--left.flipping .book__page-inner {
          transform: rotateY(180deg);
        }

        /* Optional: Enhance page edge highlight and shadow for more realism */
        .book__page--left::before,
        .book__page--right::before {
          content: "";
          position: absolute;
          top: 0; bottom: 0;
          width: 32px;
          pointer-events: none;
          z-index: 2;
        }
        .book__page--left::before {
          left: 0;
          background: linear-gradient(to right, #0006 0%, transparent 100%);
        }
        .book__page--right::before {
          right: 0;
          background: linear-gradient(to left, #0006 0%, transparent 100%);
        }
        .book__page--left::after,
        .book__page--right::after {
          content: "";
          position: absolute;
          top: 0; bottom: 0;
          width: 12px;
          pointer-events: none;
          z-index: 2;
          opacity: 0.18;
        }
        .book__page--left::after {
          right: 0;
          background: linear-gradient(to left, #fff, transparent 80%);
        }
        .book__page--right::after {
          left: 0;
          background: linear-gradient(to right, #fff, transparent 80%);
        }
        .page__content {
          padding: 2.5rem 2rem 2rem 2.5rem;
          height: 100%;
          position: relative;
          text-align: center;
        }
        .page__content-book-title {
          font-family: 'PixelText', monospace;
          font-size: 2.2rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #5dff4e;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .page__content-title {
          font-family: 'PixelText', monospace;
          font-size: 1.3rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        .page__content-author {
          font-family: 'PixelText', monospace;
          font-size: 1rem;
          color: #baffc9;
          margin-bottom: 1rem;
        }
        .page__content-credits {
          font-family: 'PixelText', monospace;
          font-size: 1rem;
          color: #5dff4e;
          margin-bottom: 1rem;
        }
        .page__content-text {
          font-family: 'PixelText', monospace;
          font-size: 1rem;
          color: #e0ffe0;
          margin-bottom: 1rem;
        }
        .page__number {
          position: absolute;
          bottom: 1rem;
          width: 100%;
          font-family: 'PixelText', monospace;
          font-size: 0.9rem;
          color: #baffc9;
          text-align: center;
        }
        .book__page {
          position: relative;
          width: 50%;
          height: 100%;
          display: grid;
          background: #181d1f; /* solid, dark background for page */
          color: #5dff4e;
          border: 1px solid #5dff4e;
          box-shadow:
            0 8px 32px 0 rgba(0,0,0,0.25),
            inset 0 0 32px 0 rgba(0,0,0,0.18);
          transition: transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.5s;
          overflow: hidden;
          background-clip: padding-box;
          opacity: 1; /* ensure fully opaque */
        }
        .book__page:hover {
          filter: brightness(1.1);
        }
      `}</style>
        </div>
    );
}
