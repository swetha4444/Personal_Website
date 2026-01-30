import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaGithub } from "react-icons/fa";
import MatrixSection from "../components/MatrixSection";
import MatrixRain from "../backgrounds/matrixRain";
import StaticPixelOverlay from "../components/StaticPixelOverlay";
import MatrixProjectPopup from "../components/MatrixProjectPopup";
import MatrixBoxTV from "../components/MatrixBoxTV";
import NavBar from "../components/navbar"

const projects = [
    {
        title: "AirgapAgentLite - Privacy-Preserving LLM Framework",
        description: "RL-based two-LLM AirGapAgent pipeline for PII sharing decisions; 11–14× faster inference, +48% utility and +10% privacy.",
        para: "Built a RL-based two-LLM AirGapAgent pipeline using Mistral-7B on GPU and enforced contextual privacy via a hybrid, lightweight data minimizer (rule-based + small LLM/transformer) optimized with GRPO, Grouped PPO, RL, targeting privacy retention under adversarial prompt attacks while preserving utility. Achieved 11–14× faster inference than the LLM baseline, +48% utility and +10% privacy, and near-perfect utility and privacy with deterministic outputs versus high-variance LLM decisions. Evaluated baseline LLM minimizers (Qwen2.5, Mistral, Llama) on 2K+ samples.",
        github_link: "https://github.com/swetha4444/AirGapLite-RL-Pipeline-for-PII-Sharing-Decisions",
        link: "https://drive.google.com/file/d/1f-h5DRFUigan5_noC8H2RUyELZYG1fjw/view?usp=sharing",
        linkLabel: "More Info",
        tags: ["RL", "Privacy", "Mistral-7B", "GRPO", "PPO", "Python", "GPU"],
    },
    {
        title: "PyTrackX: Open Source Python Package",
        description: "An open-source Python library to track 80+ objects and body movements with a single function call.",
        para: "Built with Sriram Kannan, PyTrackX is my first open-source Python library. It's an automated tool that tracks up to 80 different objects and body movements from a simple video input, returning real-time coordinates with minimal setup. We were inspired to simplify the complex process of posture and object tracking into a single, easy-to-use function call. The package is published on PyPI and available for anyone to use in their projects.",
        github_link: "https://github.com/swetha4444/PyTrackX",
        link: "https://pypi.org/project/PytrackX/",
        linkLabel: "More Info",
        video: process.env.PUBLIC_URL + "/images/projects/pytrackx.mp4",
        tags: ["Python", "Open Source", "Computer Vision", "YOLO", "Mediapipe", "PyPI"],
    },
    {
        title: "Poker AI Agent",
        description: "AI agents for Texas Hold’em, including Expectiminimax, Q-learning, and a hybrid MCTS-Minimax agent.",
        para: "Engineered and benchmarked a suite of advanced AI agents for No-Limit Texas Hold’em. This project features an Expectiminimax agent enhanced with statistical opponent modeling to exploit player tendencies, a Q-learning agent using strategic state abstraction to navigate the vast decision space, and a novel hybrid MCTS-Minimax agent. This hybrid model integrates Monte Carlo Tree Search for robust long-term planning with a dynamic Bayesian network for real-time opponent profiling, allowing it to adapt its strategy against a wide range of playing styles.",
        github_link: "https://github.com/swetha4444/Poker-AI-Agent",
        link: "https://drive.google.com/file/d/1hCysYV0ltOEmch1f2bd1Zy1_hpisVHWJ/view?usp=sharing",
        linkLabel: "More Info",
        images: [
            process.env.PUBLIC_URL + "/images/projects/poker1.png",
            process.env.PUBLIC_URL + "/images/projects/poker2.png",
        ],
        tags: ["AI", "Game Theory", "Python", "Reinforcement Learning"],
    },
    {
        title: "OpenCV Project - Posture Tracking",
        description: "A fun Tkinter animation that mimics your actions using Mediapipe for real-time posture tracking.",
        para: "A fun animation built using Tkinter that imitates your actions. The posture is tracked using the Mediapipe library, an open-source framework by Google. The coordinates of certain landmarks such as knees, elbows, etc., are passed to the animation, and it changes according to your actions following some basic rules of geometry.",
        github_link: "https://github.com/swetha4444/OpenCV-Project",
        video: process.env.PUBLIC_URL + "/images/projects/mediapipe.mp4",
        tags: ["Python", "OpenCV", "Mediapipe", "Tkinter", "Animation"],
    },
    {
        title: "Resume Analyser Software",
        description: "A Python-based tool to parse, analyze, and categorize resumes using NLP and machine learning.",
        para: "A comprehensive tool designed to streamline recruitment by converting unstructured resume data into a structured format. It leverages regular expressions and NLP techniques to parse resumes, summarize work experience, and extract keywords using TF-IDF and Distilbert. The software can batch process multiple resumes, categorizing applicants and generating a CSV for easy filtering. It also provides data analysis features, including graphical insights, a knowledge graph of skills, and a CNN-based model for job classification.",
        github_link: "https://github.com/swetha4444/Resume-Analyser-Software",
        video: process.env.PUBLIC_URL + "/images/projects/resume.mp4",
        tags: ["Python", "NLP", "Machine Learning", "TF-IDF", "Distilbert", "CNN", "Knowledge Graph", "Data Analysis", "HTML5", "CSS3"],
    },
    {
        title: "Analysing Factors Affecting House Prices in the US",
        description: "A data analytics project exploring the economic and social factors that influence the US housing market.",
        para: "This project conducts an in-depth analysis of the factors affecting house prices in the United States. By integrating diverse datasets—including Zillow home prices, national GDP, mortgage rates, employment statistics, income ratios, and commodity prices—it uncovers key correlations and trends. The analysis uses time-series techniques and statistical modeling to explain the dynamics of the housing market, providing insights into how macroeconomic indicators and social trends impact property values. The findings are compiled in a detailed report with visualizations and statistical evidence.",
        github_link: "https://github.com/swetha4444/Analysing-Factors-affecting-House-Prices-in-the-US/tree/main/notebooks",
        link: "https://github.com/swetha4444/Analysing-Factors-affecting-House-Prices-in-the-US/blob/main/US%20House%20Price%20Factors%20Report.pdf",
        linkLabel: "More Info",
        images: [
            process.env.PUBLIC_URL + "/images/projects/house1.png",
            process.env.PUBLIC_URL + "/images/projects/house2.png",
            process.env.PUBLIC_URL + "/images/projects/house3.png",
            process.env.PUBLIC_URL + "/images/projects/house4.png",
        ],
        tags: ["Python", "Data Analysis", "Machine Learning", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter"],
    },
    {
        title: "Product Review Analysis",
        description: "An NLP project to classify and analyze product reviews from social media using Transformers.",
        para: "This project helps users determine product quality by analyzing social media reviews. It uses a robust pipeline of web scraping, data cleaning, and transformation to prepare the data for analysis. The core of the project is built around Transformer models, specifically fine-tuned BERT variants, to classify reviews into positive, negative, or neutral sentiments. Additionally, it extracts key topics and trends from the reviews using advanced NLP techniques, providing valuable insights into customer opinions and product performance.",
        github_link: "https://github.com/swetha4444/Product-Review-Analysis",
        video: process.env.PUBLIC_URL + "/images/projects/review.mp4",
        tags: ["Python", "NLP", "Transformers", "BERT", "Data Analysis", "Web Scraping"],
    },
    {
        title: "Path Finding Visualizer",
        description: "A visualization tool for various pathfinding algorithms like A*, BFS, and DFS.",
        para: "This is a visualization tool to visualize various pathfinding algorithms. There are various options to choose, like creating a randomized maze, choosing an algorithm to visualize, and selecting a heuristic to calculate. The visualization starts when the SPACE key is pressed. Supported algorithms include A* Search, Breadth First Search, Depth First Search, Greedy Search, and Uniform Cost Search.",
        github_link: "",
        images: [
            process.env.PUBLIC_URL + "/images/projects/ai1.gif",
        ],
        tags: ["Python", "Pygame", "TKinter", "Pathfinding", "A* Search", "BFS", "DFS", "Visualization"],
    },
    {
        title: "MERN Stack Project - Expense-Tracker",
        description: "A MERN stack application to track expenses and visualize spending habits.",
        para: "Keeping track of your expenses is an important part of managing your overall finances. This MERN stack application allows users to keep a detailed account of their expenses and gain graphical insights into their spending habits using Chart.js. The system is built with a React frontend, styled with Bootstrap, and powered by a Node.js/Express backend and a MongoDB database.",
        github_link: "",
        images: [
            process.env.PUBLIC_URL +"/images/projects/expense1.png",
            process.env.PUBLIC_URL +"/images/projects/expense2.gif",
            process.env.PUBLIC_URL +"/images/projects/expense3.gif",
            process.env.PUBLIC_URL +"/images/projects/expense4.gif",
        ],
        tags: ["MERN", "MongoDB", "Express", "React", "Node.js", "Chart.js", "Bootstrap", "HTML", "CSS"],
    },
    {
        title: "TeamX: Fantasy Sports Platform",
        description: "A full-stack fantasy sports platform with real-time scoring, built with Flutter, Spring Boot, and Kafka.",
        para: "TeamX is a full-stack fantasy sports platform where users create virtual teams and compete based on real-time player performance. The system is built on a microservices architecture, featuring a Flutter app for the frontend and a robust backend powered by Spring Boot and Java. Real-time data processing is handled by a Kafka cluster, which streams live match updates and point calculations. Data is stored across multiple MongoDB databases for scalability and integrity. A key innovation was developing a mock data generator to simulate live sports data, overcoming API rate limits during development and ensuring continuous testing of the real-time scoring and leaderboard features.",
        github_link: "https://github.com/swetha4444/TeamX-Backend",
        github_link_frontend: "https://github.com/hrudayaditya/TeamX",
        link: "https://drive.google.com/drive/folders/1fk1Zr_XQ_SoOmo6TTpFnDIjrtAWQG4ht?usp=share_link",
        linkLabel: "Live Demo",
        images: [
            process.env.PUBLIC_URL + "/images/projects/teamx1.png",
            process.env.PUBLIC_URL + "/images/projects/teamx2.png",
            process.env.PUBLIC_URL + "/images/projects/teamx3.png",
            process.env.PUBLIC_URL + "/images/projects/teamx4.png",
            process.env.PUBLIC_URL + "/images/projects/teamx5.png",
            process.env.PUBLIC_URL + "/images/projects/teamx6.png",
            process.env.PUBLIC_URL + "/images/projects/teamx7.png",
        ],
        tags: ["Full-Stack", "System Design", "Microservices", "Flutter", "Spring Boot", "Java", "Kafka", "Python", "MongoDB"],
    }
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

const playKnobTurn2 = () => {
  const audio = new Audio(process.env.PUBLIC_URL + "/music/knob.mp3");
  audio.currentTime = 0;
  audio.play();
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 800); // Stop after 2 seconds
};

export default function Projects() {
    const [[page, direction], setPage] = useState([0, 0]);
    const [popupOpen, setPopupOpen] = useState(false);

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
                    <NavBar />
                    <h1 className="text-4xl font-extrabold text-[#5dff4e] mb-8 text-center matrix-font tracking-widest drop-shadow-lg p-2">
                        Projects
                    </h1>
                    <div className="flex-1 flex flex-col items-center justify-center w-full h-full relative">
                        {/* TV Frame */}
                        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center relative">
                          {/* TVs row */}
                          <div className="flex flex-row items-center justify-center gap-8 w-full">
                            {/* Left TV (hidden on small screens) */}
                            <div
                              className="hidden md:flex items-center justify-end flex-shrink-0"
                              style={{ width: 340, height: 520 }}
                            >
                               <MatrixBoxTV
                              style={{
                                // Remove hardcoded rotateY here, let parent decide:
                                width: "100%",
                                height: "100%",
                                minWidth: "440px",
                                minHeight: "350px",
                                maxWidth: "440px",
                                maxHeight: "350px",
                              }}
                              rotateY={14} // Pass the desired rotateY as a prop
                            >
                                <div className="w-full h-full flex flex-col items-center justify-center p-4 matrix-font">
                                  <h3 className="text-xl text-[#5dff4e] font-bold mb-4 tracking-wider drop-shadow text-center z-10">
                                      Additional Details
                                  </h3>
                                  <div className="flex flex-col items-center gap-4">
                                    {projects[page].github_link && (
                                      <a
                                        href={projects[page].github_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#181c1f] border-2 border-[#5dff4e] text-[#5dff4e] rounded-lg font-bold hover:bg-[#222] transition w-max"
                                      >
                                        <FaGithub /> Backend
                                      </a>
                                    )}
                                    {projects[page].github_link_frontend && (
                                      <a
                                        href={projects[page].github_link_frontend}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#181c1f] border-2 border-[#5dff4e] text-[#5dff4e] rounded-lg font-bold hover:bg-[#222] transition w-max"
                                      >
                                        <FaGithub /> Frontend
                                      </a>
                                    )}
                                    {projects[page].link && projects[page].link !== "#" && (
                                      <a
                                        href={projects[page].link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#181c1f] border-2 border-[#5dff4e] text-[#5dff4e] rounded-lg font-bold hover:bg-[#222] transition w-max"
                                      >
                                        <FaExternalLinkAlt /> {projects[page].linkLabel || "More Info"}
                                      </a>
                                    )}
                                    {!projects[page].github_link && (!projects[page].link || projects[page].link === "#") && (
                                      <p className="text-green-300 opacity-70 text-center">No additional links for this project.</p>
                                    )}
                                  </div>
                                </div>
                              </MatrixBoxTV>
                            </div>
                            {/* Right TV (always visible) */}
                            <div className="flex flex-col items-center justify-center flex-1">
                              <MatrixBoxTV>
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
                                     rotateY={14}
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
                                    <div className="hidden md:flex flex-wrap justify-center gap-2 mb-6 z-10">
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
                                    <div className="absolute bottom-6 right-6 z-30 group">
                                      <button
                                        onClick={() => {
                                          playKnobTurn2();
                                          setPopupOpen(true);
                                        }}
                                        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#181c1f] border-2 border-[#5dff4e] text-[#5dff4e] shadow-[0_2px_12px_#5dff4e99] hover:bg-[#222] hover:text-[#00ff00] active:scale-95 transition-all duration-150"
                                        style={{
                                          boxShadow: "0 2px 12px #5dff4e99, 0 1.5px 0 0 #fff4 inset",
                                        }}
                                        aria-label="View more details"
                                      >
                                        {/* Fullscreen/expand icon */}
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5dff4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                                          <path d="M4 8V4h4" />
                                          <path d="M20 8V4h-4" />
                                          <path d="M4 16v4h4" />
                                          <path d="M20 16v4h-4" />
                                          <path d="M16 4l4 4" />
                                          <path d="M8 4L4 8" />
                                          <path d="M16 20l4-4" />
                                          <path d="M8 20l-4-4" />
                                        </svg>
                                      </button>
                                      {/* Tooltip */}
                                      <div className="absolute right-14 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition bg-[#181c1f] border border-[#5dff4e] text-[#5dff4e] text-xs font-mono rounded px-3 py-1 shadow-lg whitespace-nowrap z-40">
                                        View more details
                                      </div>
                                    </div>
                                  </motion.div>
                                </AnimatePresence>
                              </MatrixBoxTV>
                            </div>
                          </div>
                          {/* Knob centered below both TVs */}
                          <div className="flex flex-col items-center justify-center w-full absolute left-0 right-0 mx-auto" style={{ bottom: -90 }}>
                            <motion.div
                              className="w-16 h-16 bg-[#181c1f] border-4 border-[#5dff4e] rounded-full shadow-[0_0_24px_#5dff4e66] flex items-center justify-center z-20 relative mx-auto"
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
                            {/* Channel dots */}
                            <div className="flex justify-center mt-4 gap-2">
                              {projects.map((_, idx) => (
                                <span
                                  key={idx}
                                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    idx === page ? "bg-[#5dff4e] shadow" : "bg-[#15641e]"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        

               
                    </div>
                    <div className="text-green-400 text-md mt-4 opacity-70 text-center">
                        Tip: Use <span className="font-bold">←</span> / <span className="font-bold">→</span> or use the knob below the TV to go to next project
                    </div>
                </MatrixSection>
            </main>
            <MatrixProjectPopup
              open={popupOpen}
              onClose={() => setPopupOpen(false)}
              project={projects[page]}
            />
        </div>
    );
}