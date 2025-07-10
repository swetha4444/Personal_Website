import React, { useState } from "react";
import NavBar from "../components/Navbar";
import MatrixRain from "../backgrounds/matrixRain";
import MatrixSection from "../components/MatrixSection"; // adjust path if needed

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

function BookPage({ children, pageNum, side }) {
	return (
		<div className={`book__page book__page--${side}`}>
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
	// Each "spread" shows two pages: left and right
	// 0: cover, 1: first pub, 2: second pub, ..., n: last pub, n+1: end
	const [spread, setSpread] = useState(0);

	// Total spreads: cover + ceil(publications.length/2) + end
	const totalSpreads = Math.ceil((publications.length + 2) / 2);

	// Get content for a given page index
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

	// For each spread, calculate left and right page indices
	const leftIdx = spread * 2;
	const rightIdx = leftIdx + 1;

	return (
		<div className="relative min-h-screen w-screen overflow-hidden">
			<MatrixRain />
			<main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-screen h-screen">
				<MatrixSection className="w-full h-full flex flex-col items-center justify-center bg-transparent border-[#5dff4e]/50 shadow-2xl">
					<NavBar />
					<h1 className="text-4xl font-extrabold text-[#5dff4e] mb-8 text-center matrix-font tracking-widest drop-shadow-lg p-2">
						Research Book
					</h1>
					<div className="flex justify-center gap-6 mb-8">
						<button
							onClick={() => setSpread((s) => Math.max(0, s - 1))}
							disabled={spread === 0}
							className="matrix-btn font-[PixelText] text-[#5dff4e] px-8 py-3 rounded text-lg relative"
						>
							<span className="matrix-btn-glow" />
							&larr; Prev
						</button>
						<button
							onClick={() => setSpread((s) => Math.min(totalSpreads - 1, s + 1))}
							disabled={spread === totalSpreads - 1}
							className="matrix-btn font-[PixelText] text-[#5dff4e] px-8 py-3 rounded text-lg relative"
						>
							<span className="matrix-btn-glow" />
							Next &rarr;
						</button>
					</div>
					<div className="cover" style={{ margin: "0 auto" }}>
						<div className="book">
							<BookPage pageNum={leftIdx} side="left">
								{getPageContent(leftIdx)}
							</BookPage>
							<BookPage pageNum={rightIdx} side="right">
								{getPageContent(rightIdx)}
							</BookPage>
						</div>
					</div>
				</MatrixSection>
			</main>
			{/* Book flip animation CSS */}
			<style>{`
        .cover {
          width: 720px;
          height: 512px;
          box-shadow: 0 0 100px rgba(0,0,0,.3);
          background: transparent;
        }
        .book {
          width: 100%;
          height: 100%;
          display: flex;
          perspective: 1200px;
        }
        .book__page {
          position: relative;
          width: 50%;
          height: 100%;
          display: grid;
          background: #1b1f22;
          color: #5dff4e;
          border: 1px solid #5dff4e;
          box-shadow: 0 0 24px #5dff4e22;
          transition: transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1);
          overflow: hidden;
        }
        .book__page--left {
          border-right: none;
          border-radius: 16px 0 0 16px;
        }
        .book__page--right {
          border-left: none;
          border-radius: 0 16px 16px 0;
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
      `}</style>
		</div>
	);
}
