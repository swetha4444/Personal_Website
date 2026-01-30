import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFileDownload, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaPython, FaJava, FaReact, FaNode, FaAws, FaDocker, FaGitAlt, FaDatabase, FaVolumeUp, FaVolumeMute, FaMusic, FaGraduationCap } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiNextdotjs, SiAngular, SiSpring, SiFlask, SiDjango, SiFastapi, SiPhp, SiAndroid, SiTensorflow, SiPytorch, SiOpencv, SiHuggingface, SiMongodb, SiElasticsearch, SiApachekafka, SiRedis, SiTableau, SiJenkins, SiGithubactions, SiC } from "react-icons/si";
import PortfolioChatbot from "../components/PortfolioChatbot";

// Typing Animation Component with Loop
function TypingAnimation({ text, speed = 100, deleteSpeed = 50, pauseTime = 2000 }) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!isDeleting && currentIndex < text.length) {
            // Typing
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else if (!isDeleting && currentIndex === text.length) {
            // Finished typing, wait then start deleting
            const timeout = setTimeout(() => {
                setIsDeleting(true);
            }, pauseTime);
            return () => clearTimeout(timeout);
        } else if (isDeleting && displayedText.length > 0) {
            // Deleting
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev.slice(0, -1));
            }, deleteSpeed);
            return () => clearTimeout(timeout);
        } else if (isDeleting && displayedText.length === 0) {
            // Finished deleting, reset
            setIsDeleting(false);
            setCurrentIndex(0);
        }
    }, [currentIndex, text, speed, deleteSpeed, pauseTime, isDeleting, displayedText]);

    return (
        <span>
            {displayedText}
            <span className="animate-pulse">|</span>
        </span>
    );
}

// Animated Name Component with letter-by-letter animation and effects
function AnimatedName({ name }) {
    const [currentStyle, setCurrentStyle] = useState(0);
    const [isGlitching, setIsGlitching] = useState(false);
    const [flashColor, setFlashColor] = useState(null); // 'green' or 'pink' or null
    const [visibleLetters, setVisibleLetters] = useState([]);
    const [allRevealed, setAllRevealed] = useState(false);
    
    const fontStyles = [
        { fontFamily: 'Montserrat', fontWeight: 900, letterSpacing: '0.1em', style: 'normal' },
        { fontFamily: 'Orbitron', fontWeight: 700, letterSpacing: '0.15em', style: 'normal' },
        { fontFamily: 'Bebas Neue', fontWeight: 400, letterSpacing: '0.05em', style: 'normal' },
        { fontFamily: 'Raleway', fontWeight: 800, letterSpacing: '0.12em', style: 'normal' },
        { fontFamily: 'Montserrat', fontWeight: 800, letterSpacing: '0.08em', style: 'normal' },
        { fontFamily: 'Orbitron', fontWeight: 900, letterSpacing: '0.2em', style: 'normal' },
    ];

    // Letter-by-letter reveal animation - fast and snappy
    useEffect(() => {
        const letters = name.split('');
        // Show all letters immediately, then animate them in
        const allIndices = letters.map((_, i) => i);
        setVisibleLetters(allIndices);
        
        // Start style cycling after a brief delay
        setTimeout(() => {
            setAllRevealed(true);
            const styleInterval = setInterval(() => {
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 100);
                setCurrentStyle((prev) => (prev + 1) % fontStyles.length);
            }, 1500);
            return () => clearInterval(styleInterval);
        }, 1000);
    }, [name]);

    // Occasional glitch effect (less frequent)
    useEffect(() => {
        if (!allRevealed) return;
        const glitchInterval = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 100);
        }, 5000);
        return () => clearInterval(glitchInterval);
    }, [allRevealed]);

    // Green-Pink interleaved static flash
    useEffect(() => {
        if (!allRevealed) return;
        let flashCount = 0;
        const flashInterval = setInterval(() => {
            // Alternate between green and pink
            if (flashCount % 2 === 0) {
                setFlashColor('green');
            } else {
                setFlashColor('pink');
            }
            flashCount++;
            setTimeout(() => setFlashColor(null), 150);
        }, 1800);
        return () => clearInterval(flashInterval);
    }, [allRevealed]);

    const currentFont = fontStyles[currentStyle];
    const letters = name.split('');

    return (
        <div className="relative inline-block w-full">
            <h1 
                className={`text-4xl md:text-5xl lg:text-7xl mb-4 transition-all duration-100 ease-in-out whitespace-nowrap ${
                    isGlitching ? 'animate-glitch' : ''
                }`}
                style={{ 
                    fontFamily: currentFont.fontFamily,
                    fontWeight: currentFont.fontWeight,
                    letterSpacing: currentFont.letterSpacing,
                    fontStyle: currentFont.style,
                    color: flashColor === 'green'
                        ? '#5dff4e'
                        : flashColor === 'pink'
                        ? '#ec4899'
                        : '#ec4899',
                    textShadow: isGlitching 
                        ? '2px 0 0 #ec4899, -2px 0 0 #f43f5e'
                        : flashColor === 'green'
                        ? '0 0 10px #5dff4e, 0 0 20px #5dff4e'
                        : flashColor === 'pink'
                        ? '0 0 10px #ec4899, 0 0 20px #ec4899'
                        : '0 0 15px rgba(236, 72, 153, 0.5)',
                    transform: isGlitching ? 'translate(1px, -1px)' : 'translate(0, 0)',
                    filter: 'none',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                }}
            >
                {letters.map((letter, index) => {
                    const isVisible = visibleLetters.includes(index);
                    return (
                        <span
                            key={index}
                            className={`inline-block animate-letter-reveal-crisp`}
                            style={{
                                opacity: 1,
                                animationDelay: `${index * 0.02}s`,
                                filter: 'none',
                                WebkitFontSmoothing: 'antialiased',
                                MozOsxFontSmoothing: 'grayscale',
                                visibility: 'visible',
                            }}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </span>
                    );
                })}
            </h1>
            {/* Glow effects - positioned far behind to not affect text clarity */}
            <div className="absolute -inset-20 bg-gradient-to-r from-pink-400/15 via-rose-400/15 to-pink-400/15 blur-3xl -z-20 animate-pulse pointer-events-none"></div>
        </div>
    );
}

// Import data from other pages
const projects = [
    {
        title: "AirgapAgentLite - Privacy-Preserving LLM Framework",
        description: "RL-based two-LLM AirGapAgent pipeline for PII sharing decisions; 11–14× faster inference, +48% utility and +10% privacy.",
        para: "Built a RL-based two-LLM AirGapAgent pipeline using Mistral-7B on GPU; GRPO, Grouped PPO, RL; 11–14× faster inference, +48% utility and +10% privacy. Evaluated baseline LLM minimizers (Qwen2.5, Mistral, Llama) on 2K+ samples.",
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
        description: "AI agents for Texas Hold'em, including Expectiminimax, Q-learning, and a hybrid MCTS-Minimax agent.",
        para: "Engineered and benchmarked a suite of advanced AI agents for No-Limit Texas Hold'em. This project features an Expectiminimax agent enhanced with statistical opponent modeling to exploit player tendencies, a Q-learning agent using strategic state abstraction to navigate the vast decision space, and a novel hybrid MCTS-Minimax agent.",
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
        title: "TeamX: Fantasy Sports Platform",
        description: "A full-stack fantasy sports platform with real-time scoring, built with Flutter, Spring Boot, and Kafka.",
        para: "TeamX is a full-stack fantasy sports platform where users create virtual teams and compete based on real-time player performance. The system is built on a microservices architecture, featuring a Flutter app for the frontend and a robust backend powered by Spring Boot and Java.",
        github_link: "https://github.com/swetha4444/TeamX-Backend",
        github_link_frontend: "https://github.com/hrudayaditya/TeamX",
        link: "https://drive.google.com/drive/folders/1fk1Zr_XQ_SoOmo6TTpFnDIjrtAWQG4ht?usp=share_link",
        linkLabel: "Live Demo",
        images: [
            process.env.PUBLIC_URL + "/images/projects/teamx1.png",
            process.env.PUBLIC_URL + "/images/projects/teamx2.png",
            process.env.PUBLIC_URL + "/images/projects/teamx3.png",
            process.env.PUBLIC_URL + "/images/projects/teamx4.png",
        ],
        tags: ["Full-Stack", "System Design", "Microservices", "Flutter", "Spring Boot", "Java", "Kafka", "Python", "MongoDB"],
    },
    {
        title: "Resume Analyser Software",
        description: "A Python-based tool to parse, analyze, and categorize resumes using NLP and machine learning.",
        para: "A comprehensive tool designed to streamline recruitment by converting unstructured resume data into a structured format. It leverages regular expressions and NLP techniques to parse resumes, summarize work experience, and extract keywords using TF-IDF and Distilbert.",
        github_link: "https://github.com/swetha4444/Resume-Analyser-Software",
        video: process.env.PUBLIC_URL + "/images/projects/resume.mp4",
        tags: ["Python", "NLP", "Machine Learning", "TF-IDF", "Distilbert", "CNN", "Knowledge Graph", "Data Analysis"],
    },
    {
        title: "Analysing Factors Affecting House Prices in the US",
        description: "A data analytics project exploring the economic and social factors that influence the US housing market.",
        para: "This project conducts an in-depth analysis of the factors affecting house prices in the United States. By integrating diverse datasets—including Zillow home prices, national GDP, mortgage rates, employment statistics, income ratios, and commodity prices—it uncovers key correlations and trends.",
        github_link: "https://github.com/swetha4444/Analysing-Factors-affecting-House-Prices-in-the-US/tree/main/notebooks",
        link: "https://github.com/swetha4444/Analysing-Factors-affecting-House-Prices-in-the-US/blob/main/US%20House%20Price%20Factors%20Report.pdf",
        linkLabel: "More Info",
        images: [
            process.env.PUBLIC_URL + "/images/projects/house1.png",
            process.env.PUBLIC_URL + "/images/projects/house2.png",
            process.env.PUBLIC_URL + "/images/projects/house3.png",
        ],
        tags: ["Python", "Data Analysis", "Machine Learning", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter"],
    },
    {
        title: "Product Review Analysis",
        description: "An NLP project to classify and analyze product reviews from social media using Transformers.",
        para: "This project helps users determine product quality by analyzing social media reviews. It uses a robust pipeline of web scraping, data cleaning, and transformation to prepare the data for analysis. The core of the project is built around Transformer models, specifically fine-tuned BERT variants.",
        github_link: "https://github.com/swetha4444/Product-Review-Analysis",
        video: process.env.PUBLIC_URL + "/images/projects/review.mp4",
        tags: ["Python", "NLP", "Transformers", "BERT", "Data Analysis", "Web Scraping"],
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
        title: "Path Finding Visualizer",
        description: "A visualization tool for various pathfinding algorithms like A*, BFS, and DFS.",
        para: "A visualization tool for pathfinding algorithms with options for randomized maze, algorithm selection, and heuristic choice. Supported algorithms include A* Search, Breadth First Search, Depth First Search, Greedy Search, and Uniform Cost Search.",
        github_link: "",
        images: [process.env.PUBLIC_URL + "/images/projects/ai1.gif"],
        tags: ["Python", "Pygame", "TKinter", "Pathfinding", "A* Search", "BFS", "DFS", "Visualization"],
    },
    {
        title: "MERN Stack Project - Expense-Tracker",
        description: "A MERN stack application to track expenses and visualize spending habits.",
        para: "MERN stack application for expense tracking with graphical insights using Chart.js. React frontend, Node.js/Express backend, MongoDB database.",
        github_link: "",
        images: [
            process.env.PUBLIC_URL + "/images/projects/expense1.png",
            process.env.PUBLIC_URL + "/images/projects/expense2.gif",
            process.env.PUBLIC_URL + "/images/projects/expense3.gif",
            process.env.PUBLIC_URL + "/images/projects/expense4.gif",
        ],
        tags: ["MERN", "MongoDB", "Express", "React", "Node.js", "Chart.js", "Bootstrap"],
    },
];

const publications = [
    {
        title: "Analysis of Player Tracking Data Extracted from Football Match Feed",
        authors: "S. Saseendran, S. P. V. Thanalakshmi, S. Prabakaran, P. Ravisankar",
        journal: "Romanian Journal of Information Technology and Automatic Control, Vol. 33, No. 2",
        year: 2023,
        link: "https://doi.org/10.33436/v33i2y202307",
        abstract: "This paper presents a system to extract player tracking data from match feeds for little to no cost, a significant saving compared to the typical £60,000 per season. The computer vision pipeline utilizes YOLOv5 for robust player and ball detection and DeepSORT for assigning unique IDs and tracking objects frame-by-frame using a Kalman Filter and deep association metrics.",
    },
    {
        title: "Comparison of Lossy Image Compression Technique",
        authors: "Swetha S., et al.",
        journal: "IIHI Journal, Vol. 2, No. 2",
        year: 2023,
        link: "https://dx.doi.org/10.1504/IJHI.2023.129342",
        abstract: "Image compression is a crucial task in the current era, driven by the need to transmit ubiquitous images efficiently while maintaining quality. This paper provides an insight into the challenges of image compression by comparing different models.",
    },
    {
        title: "Classification of Hate Speech and Offensive Content Using DistilBERT",
        authors: "Swetha S., et al.",
        journal: "FIRE-WN 2021",
        year: 2021,
        link: "https://ceur-ws.org/Vol-3159/T1-14.pdf",
        abstract: "Achieved 77.67% accuracy in Task-A (Binary Classification) and 65.1% in Task-B (Multiclass). Developed Task B using multiple binary classifiers, achieving up to 60% accuracy, closely matching pretrained DistilBERT. Ranked 24th globally.",
    },
];

const experienceData = [
    {
        company: 'UMass Amherst',
        role: 'Research Assistant, Advanced Human and Health Analytics Lab',
        period: 'Sept 2025 – Present',
        description: [
            'Collaborating with Harvard Medical School and Mass General Brigham on post-stroke motor/cognitive impairment research under Prof. Ivan Lee\'s guidance. Building scalable models on GPU to automatically annotate linear movement in egocentric video using V-LLaMA and RLHF.',
        ],
        skills: ['V-LLaMA', 'RLHF', 'Computer Vision', 'GPU', 'Research'],
    },
    {
        company: 'UMass Amherst',
        role: 'Software Engineering Intern, Center for Data Science',
        period: 'Mar 2025 – Present',
        description: [
            'Built and led a production LLM platform (LiteLLM-based) integrating multiple AI providers; deployed on AWS via Terraform (ECS/Fargate, Aurora Serverless), scaled to 2,000+ users.',
            'Engineered Android solution for Bluetooth-based sensor data acquisition from Shimmer devices; cloud sync APIs via FastAPI on AWS Lambda. Medical trials in progress at Northwestern Feinberg School of Medicine.',
            'Deployed R-based API for avian flu analytics on AWS EC2; React dashboard; ECS Fargate and EventBridge for automation. Optimized API by slashing CPU I/O wait time by 70% through in-memory caching.',
        ],
        skills: ['LiteLLM', 'AWS', 'Terraform', 'FastAPI', 'Android', 'React', 'R'],
    },
    {
        company: 'Citi, Chennai',
        role: 'Technology Analyst',
        period: 'Aug 2022 – Dec 2024',
        description: [
            'Achieved 60% reduction in API response time via API connector with asynchronous data streams; designed proxy bridge service for whitelisted APIs.',
            'Developed tool with DFS algorithm to compare multiple YML config files, integrated into DevOps pipeline improving deployment time by 22%.',
            'Designed real-time mock APIs from OpenAPI spec files; created API to monitor services, achieving 90% code quality rating. Statistical APIs for financial markets with Tableau for algorithmic trading and risk modeling.',
        ],
        skills: ['API Optimization', 'Java', 'DevOps', 'OpenAPI', 'Tableau', 'Data Analysis'],
    },
    {
        company: 'First Insight, Chennai',
        role: 'Data Science Intern',
        period: 'Jul 2021 – Dec 2021',
        description: [
            'Developed aspect-based sentiment analysis using LDA and BERT Transformers, improving topic coherence by 20%. Deployed as REST API within ML pipeline.',
        ],
        skills: ['Sentiment Analysis', 'NLP', 'BERT', 'LDA', 'Python', 'REST API'],
    },
    {
        company: 'SRIC, IIT Madras',
        role: 'Computer Vision Research Intern',
        period: 'May 2021 – Nov 2021',
        description: [
            'Developed motion analysis system for athlete biomechanics using OpenCV, Mediapipe, and YOLO, deployed via Flask API, 82% accuracy on custom basketball dataset.',
            'Led and mentored a team of 5+ RAs through technical sessions and guidance.',
        ],
        skills: ['Computer Vision', 'OpenCV', 'MediaPipe', 'YOLO', 'Flask', 'Mentorship', 'Research'],
    },
];

const skillsData = [
    {
        category: "Languages",
        skills: ["Python", "Java", "C", "TypeScript", "JavaScript"],
    },
    {
        category: "Web & Backend",
        skills: ["React", "Next.js", "Angular", "Node.js", "Spring Boot", "Flask", "Django", "FastAPI", "PHP", "Android"],
    },
    {
        category: "Machine Learning",
        skills: ["TensorFlow", "PyTorch", "OpenCV", "MediaPipe", "Hugging Face", "BERT", "NLP"],
    },
    {
        category: "Data & Databases",
        skills: ["SQL", "MongoDB", "ElasticSearch", "Kafka", "Redis", "Tableau"],
    },
    {
        category: "Cloud & DevOps",
        skills: ["AWS", "Docker", "Git", "Jenkins", "GitHub Actions", "CI/CD"],
    },
];

// Scroll Animation Hook with better effects - Faster
function useScrollAnimation(options = {}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = React.useRef(null);
    const { threshold = 0.05, rootMargin = '0px 0px -50px 0px' } = options;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [isVisible, threshold, rootMargin]);

    return [ref, isVisible];
}

// Animated Section Component
function AnimatedSection({ children, className = '', animationType = 'fade-up', delay = 0 }) {
    const [ref, isVisible] = useScrollAnimation();
    
    const animationClasses = {
        'fade-up': 'animate-fade-in-up',
        'fade-left': 'animate-fade-in-left',
        'fade-right': 'animate-fade-in-right',
        'scale': 'animate-scale-in',
        'rotate': 'animate-rotate-in',
    };

    return (
        <div
            ref={ref}
            className={`${className} ${isVisible ? animationClasses[animationType] : 'opacity-0'} transition-all duration-500`}
            style={{ 
                animationDelay: `${delay}ms`,
                animationFillMode: 'forwards'
            }}
        >
            {children}
        </div>
    );
}

// Timeline Item Component - Normal
function TimelineItem({ exp, index }) {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });
    
    return (
        <div
            ref={ref}
            className={`relative flex flex-col md:flex-row items-start gap-6 transition-all duration-500 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } ${
                isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
        >
            {/* Normal Timeline Dot Marker */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full border-2 border-slate-900 transform md:-translate-x-1/2 z-10 shadow-lg shadow-pink-500/50"></div>
            
            {/* Content Card */}
            <div className={`w-full md:w-[48%] ml-12 md:ml-0 ${
index % 2 === 0 ? 'md:mr-auto md:pr-6' : 'md:ml-auto md:pl-6'
            }`}>
                <div className="backdrop-blur-xl bg-white/5 border border-pink-500/30 rounded-2xl p-6 hover:border-rose-500/60 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300">
                    <div className="mb-4">
                        <p className="text-rose-400 font-semibold text-sm mb-2">{exp.period}</p>
                        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">
                            {exp.role}
                        </h3>
                        <p className="text-xl text-gray-300 font-semibold">{exp.company}</p>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4 text-base">
                        {exp.description.map((point, i) => (
                            <li key={i} className="leading-relaxed">{point}</li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {exp.skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 bg-white/5 border border-pink-500/20 rounded-lg text-xs text-gray-300 hover:border-rose-500/50 hover:text-rose-400 transition-all duration-200 font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Experience Timeline Component - Normal
function ExperienceTimeline({ experiences }) {
    return (
        <div className="relative">
            {/* Timeline Container */}
            <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500/50 via-rose-500/50 to-pink-400/50 transform md:-translate-x-1/2"></div>
                
                {/* Timeline Items */}
                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <TimelineItem 
                            key={index} 
                            exp={exp} 
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Project Carousel Component
function ProjectCarousel({ projects }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const projectsPerPage = 2;
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Get visible projects for current page
    const getVisibleProjects = () => {
        const start = currentIndex * projectsPerPage;
        return projects.slice(start, start + projectsPerPage);
    };

    return (
        <div className="relative">
            {/* Carousel Container - fixed height so slider doesn't jump */}
            <div className="relative overflow-hidden min-h-[640px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-500 items-stretch min-h-[640px]">
                    {getVisibleProjects().map((project, index) => (
                        <div
                            key={currentIndex * projectsPerPage + index}
                            className="group/card relative backdrop-blur-xl bg-gradient-to-br from-white/8 via-white/5 to-white/8 border border-pink-500/30 rounded-3xl p-8 hover:border-rose-500/60 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 flex flex-col min-h-[600px] h-full overflow-hidden"
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-rose-500/0 to-pink-500/0 group-hover/card:from-pink-500/10 group-hover/card:via-rose-500/5 group-hover/card:to-pink-500/10 transition-all duration-500 rounded-3xl"></div>
                            
                            {/* Decorative accent */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-500 via-rose-500 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="relative z-10 flex flex-col h-full">
                                {/* Header with accent */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-1 h-8 bg-gradient-to-b from-pink-400 to-rose-400 rounded-full"></div>
                                        <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 bg-clip-text text-transparent group-hover/card:from-pink-300 group-hover/card:via-rose-300 group-hover/card:to-pink-300 transition-all duration-300">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <div className="h-px bg-gradient-to-r from-pink-500/30 via-rose-500/50 to-transparent group-hover/card:from-pink-500/50 group-hover/card:via-rose-500/70 transition-all duration-300"></div>
                                </div>
                                
                                {/* Project Image/Video */}
                                {project.video && (
                                    <div className="mb-6 rounded-xl overflow-hidden border border-pink-500/30 group-hover/card:border-rose-500/50 transition-all duration-300 shadow-lg group-hover/card:shadow-xl">
                                        <video
                                            src={project.video}
                                            className="w-full h-auto max-h-56 object-cover"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            aria-label={`${project.title} project demonstration video`}
                                            title={`${project.title} - Project Demo`}
                                        />
                                    </div>
                                )}
                                {project.images && project.images.length > 0 && (
                                    <div className="mb-6 rounded-xl overflow-hidden border border-pink-500/30 group-hover/card:border-rose-500/50 transition-all duration-300 shadow-lg group-hover/card:shadow-xl">
                                        <img
                                            src={project.images[0]}
                                            alt={`${project.title} - Project screenshot by Swetha Saseendran`}
                                            title={project.title}
                                            loading="lazy"
                                            className="w-full h-auto max-h-56 object-cover group-hover/card:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                
                                <p className="text-gray-200 mb-6 flex-grow text-lg leading-relaxed font-medium">{project.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1.5 bg-gradient-to-br from-white/8 to-white/4 border border-pink-500/25 rounded-lg text-xs text-gray-200 hover:border-rose-500/60 hover:text-white hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-rose-500/20 transition-all duration-300 font-medium shadow-sm hover:shadow-md hover:shadow-pink-500/20 hover:scale-105"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="flex gap-3 mt-auto flex-wrap">
                                    {project.github_link && (
                                        <a
                                            href={project.github_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 text-white rounded-xl hover:from-pink-500 hover:via-rose-500 hover:to-pink-500 shadow-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 font-semibold hover:scale-105"
                                        >
                                            <FaGithub className="group-hover/btn:scale-110 transition-transform duration-300" />
                                            <span>{project.github_link_frontend ? "Backend" : "GitHub"}</span>
                                        </a>
                                    )}
                                    {project.github_link_frontend && (
                                        <a
                                            href={project.github_link_frontend}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 text-white rounded-xl hover:from-pink-500 hover:via-rose-500 hover:to-pink-500 shadow-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 font-semibold hover:scale-105"
                                        >
                                            <FaGithub className="group-hover/btn:scale-110 transition-transform duration-300" />
                                            <span>Frontend</span>
                                        </a>
                                    )}
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white rounded-xl hover:from-rose-500 hover:via-pink-500 hover:to-rose-500 shadow-lg hover:shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 font-semibold hover:scale-105"
                                        >
                                            <FaExternalLinkAlt className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                                            <span>{project.linkLabel || "More Info"}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Fill empty slot if odd number of projects on last page */}
                    {getVisibleProjects().length === 1 && (
                        <div className="hidden md:block"></div>
                    )}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-12">
                <button
                    onClick={prevSlide}
                    className="group/btn p-4 rounded-full backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/4 border border-pink-500/30 text-pink-400 hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-600 hover:text-white hover:border-transparent transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:text-pink-400 shadow-lg hover:shadow-xl hover:shadow-pink-500/30 hover:scale-110"
                    disabled={currentIndex === 0}
                    aria-label="Previous projects"
                >
                    <FaChevronLeft size={20} className="group-hover/btn:-translate-x-1 transition-transform duration-300" />
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-3 items-center">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-3 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 w-12 shadow-lg shadow-pink-500/50"
                                    : "bg-pink-500/30 hover:bg-pink-500/50 w-3"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="group/btn p-4 rounded-full backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/4 border border-pink-500/30 text-pink-400 hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-600 hover:text-white hover:border-transparent transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:text-pink-400 shadow-lg hover:shadow-xl hover:shadow-pink-500/30 hover:scale-110"
                    disabled={currentIndex === totalPages - 1}
                    aria-label="Next projects"
                >
                    <FaChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
            </div>

            {/* Page Indicator */}
            <div className="text-center mt-8">
                <span className="px-6 py-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-full text-gray-300 text-sm font-semibold backdrop-blur-sm">
                    Page {currentIndex + 1} of {totalPages}
                </span>
            </div>
        </div>
    );
}

// Rotating Image Carousel Component
function RotatingImageCarousel({ images, interval = 3000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-pink-500/50 shadow-2xl shadow-pink-500/30 hover:border-rose-500/70 transition-all duration-300 hover:scale-110 hover:rotate-3">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Swetha Saseendran - Software Developer & AI Enthusiast - Profile Photo ${index + 1}`}
                        title="Swetha Saseendran - Software Developer & AI Enthusiast"
                        loading={index === 0 ? "eager" : "lazy"}
                        className={`absolute inset-0 w-full h-full object-cover rounded-full transition-opacity duration-1000 ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function Home() {
  const navigate = useNavigate();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const musicRef = useRef(null);

  // Initialize retro music
  useEffect(() => {
    const audio = new Audio(process.env.PUBLIC_URL + "/music/matrix-bg.mp3");
    audio.loop = true;
    audio.volume = musicVolume;
    musicRef.current = audio;

    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  // Update volume when it changes
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  const toggleMusic = async () => {
    if (!musicRef.current) return;
    
    try {
      if (isMusicPlaying) {
        musicRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        await musicRef.current.play();
        setIsMusicPlaying(true);
      }
    } catch (error) {
      console.error('Music playback error:', error);
    }
  };

  const handleAnimatedExperience = () => {
    const audio = new Audio(process.env.PUBLIC_URL + "/music/click.mp3");
    audio.play();
        setTimeout(() => navigate("/menu"), 150);
  };

  return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden gaming-bg">
            {/* Gaming Background Grid */}
            <div className="absolute inset-0 gaming-grid opacity-20"></div>
            
            {/* Scan Lines Effect */}
            <div className="absolute inset-0 scanlines pointer-events-none z-30"></div>
            
            {/* Animated Background Elements - Gaming Style */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Neon Glow Orbs - Subtle */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/6 rounded-full blur-3xl"></div>
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                
                {/* Gaming UI Corner Brackets - Subtle */}
                <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-cyan-400/20 gaming-corner"></div>
                <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-green-400/20 gaming-corner"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-purple-400/20 gaming-corner"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-pink-400/20 gaming-corner"></div>
                
                {/* Floating Gaming Elements - Subtle */}
                <div className="absolute top-40 right-20 w-32 h-32 border-2 border-cyan-400/15 rounded-lg rotate-45 animate-spin-slow gaming-panel"></div>
                <div className="absolute bottom-40 left-20 w-24 h-24 border-2 border-green-400/15 rounded-full animate-bounce-slow gaming-panel"></div>
                <div className="absolute top-1/3 left-1/4 w-20 h-20 border-2 border-purple-400/15 rotate-12 animate-pulse gaming-panel"></div>
                <div className="absolute bottom-1/4 right-1/4 w-28 h-28 border-2 border-pink-400/15 rounded-full animate-ping-slow gaming-panel"></div>
                
                {/* Digital Rain Effect */}
                <div className="absolute inset-0 digital-rain opacity-10"></div>
                
                {/* Moving Gradient Orbs */}
                <div className="absolute top-10 left-1/4 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-2xl animate-float"></div>
                <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-gradient-to-br from-rose-400/20 to-pink-400/20 rounded-full blur-2xl animate-float-delay"></div>
                <div className="absolute top-2/3 left-1/2 w-36 h-36 bg-gradient-to-br from-pink-300/15 to-rose-300/15 rounded-full blur-2xl animate-float-slow"></div>
            </div>
            
            {/* Decorative Elements - Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Animated Particles */}
                <div className="absolute top-32 left-20 w-2 h-2 bg-pink-400/60 rounded-full animate-ping"></div>
                <div className="absolute top-40 left-32 w-1.5 h-1.5 bg-rose-400/60 rounded-full animate-ping delay-300"></div>
                <div className="absolute bottom-32 right-20 w-2 h-2 bg-pink-400/60 rounded-full animate-ping delay-700"></div>
                <div className="absolute bottom-40 right-32 w-1.5 h-1.5 bg-rose-400/60 rounded-full animate-ping delay-1000"></div>
                <div className="absolute top-1/2 left-10 w-1.5 h-1.5 bg-pink-300/50 rounded-full animate-ping delay-500"></div>
                <div className="absolute top-1/3 right-10 w-2 h-2 bg-rose-300/50 rounded-full animate-ping delay-200"></div>
                <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-ping delay-800"></div>
                <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-rose-400/40 rounded-full animate-ping delay-400"></div>
                
                {/* Floating Lines */}
                <div className="absolute top-1/4 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-pink-400/30 to-transparent animate-slide-right"></div>
                <div className="absolute bottom-1/4 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-rose-400/30 to-transparent animate-slide-left"></div>
                <div className="absolute top-0 left-1/3 w-32 h-1 bg-gradient-to-r from-transparent via-pink-400/30 to-transparent animate-slide-down"></div>
                <div className="absolute bottom-0 right-1/3 w-32 h-1 bg-gradient-to-r from-transparent via-rose-400/30 to-transparent animate-slide-up"></div>
            </div>
            
            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(pink 1px, transparent 1px),
                        linear-gradient(90deg, pink 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    animation: 'grid-move 20s linear infinite'
                }}></div>
            </div>
            
            {/* Retro Arcade Games Background Elements - Fixed Throughout Page */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 retro-games-bg">
                {/* Arcade Neon Signs - Multiple positions throughout page */}
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 arcade-sign">
                    <div className="arcade-text">ARCADE</div>
                </div>
                <div className="absolute top-[800px] left-1/2 transform -translate-x-1/2 arcade-sign">
                    <div className="arcade-text">RETRO</div>
                </div>
                <div className="absolute top-[1600px] left-1/2 transform -translate-x-1/2 arcade-sign">
                    <div className="arcade-text">GAMES</div>
                </div>
                
                {/* Multiple Pacman Characters - Throughout page */}
                <div className="absolute top-10 left-10 retro-pacman">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full relative shadow-lg shadow-yellow-400/50">
                        <div className="absolute inset-0 pacman-mouth-bg"></div>
                    </div>
                </div>
                <div className="absolute top-32 left-24 retro-pacman" style={{ animationDelay: '1s' }}>
                    <div className="w-10 h-10 bg-yellow-400 rounded-full relative shadow-lg shadow-yellow-400/50">
                        <div className="absolute inset-0 pacman-mouth-bg"></div>
                    </div>
                </div>
                <div className="absolute top-[600px] left-16 retro-pacman" style={{ animationDelay: '2s' }}>
                    <div className="w-14 h-14 bg-yellow-400 rounded-full relative shadow-lg shadow-yellow-400/50">
                        <div className="absolute inset-0 pacman-mouth-bg"></div>
                    </div>
                </div>
                <div className="absolute top-[1200px] right-20 retro-pacman" style={{ animationDelay: '1.5s' }}>
                    <div className="w-11 h-11 bg-yellow-400 rounded-full relative shadow-lg shadow-yellow-400/50">
                        <div className="absolute inset-0 pacman-mouth-bg"></div>
                    </div>
                </div>
                <div className="absolute top-[1800px] left-32 retro-pacman" style={{ animationDelay: '0.5s' }}>
                    <div className="w-9 h-9 bg-yellow-400 rounded-full relative shadow-lg shadow-yellow-400/50">
                        <div className="absolute inset-0 pacman-mouth-bg"></div>
                    </div>
                </div>
                
                {/* Space Invaders - Multiple positions throughout */}
                <div className="absolute top-20 right-20 retro-invader">
                    <div className="space-invader"></div>
                </div>
                <div className="absolute top-40 right-32 retro-invader" style={{ animationDelay: '0.5s' }}>
                    <div className="space-invader" style={{ width: '25px', height: '25px' }}></div>
                </div>
                <div className="absolute top-60 right-16 retro-invader" style={{ animationDelay: '1s' }}>
                    <div className="space-invader" style={{ width: '20px', height: '20px' }}></div>
                </div>
                <div className="absolute top-[700px] left-20 retro-invader" style={{ animationDelay: '1.5s' }}>
                    <div className="space-invader" style={{ width: '28px', height: '28px' }}></div>
                </div>
                <div className="absolute top-[1300px] right-40 retro-invader" style={{ animationDelay: '0.8s' }}>
                    <div className="space-invader" style={{ width: '22px', height: '22px' }}></div>
                </div>
                <div className="absolute top-[1900px] left-1/4 retro-invader" style={{ animationDelay: '1.2s' }}>
                    <div className="space-invader" style={{ width: '24px', height: '24px' }}></div>
                </div>
                
                {/* Tetris Blocks - Many More - Throughout page */}
                <div className="absolute bottom-20 left-20 retro-tetris">
                    <div className="tetris-block tetris-l"></div>
                    <div className="tetris-block tetris-l" style={{ left: '20px', top: '0px', animationDelay: '0.2s' }}></div>
                    <div className="tetris-block tetris-l" style={{ left: '40px', top: '0px', animationDelay: '0.4s' }}></div>
                    <div className="tetris-block tetris-l" style={{ left: '0px', top: '20px', animationDelay: '0.6s' }}></div>
                    <div className="tetris-block tetris-l" style={{ left: '20px', top: '20px', animationDelay: '0.8s' }}></div>
                </div>
                <div className="absolute bottom-40 left-40 retro-tetris" style={{ animationDelay: '1s' }}>
                    <div className="tetris-block tetris-i"></div>
                    <div className="tetris-block tetris-i" style={{ left: '0px', top: '20px', animationDelay: '0.3s' }}></div>
                    <div className="tetris-block tetris-i" style={{ left: '0px', top: '40px', animationDelay: '0.6s' }}></div>
                </div>
                <div className="absolute bottom-60 left-60 retro-tetris" style={{ animationDelay: '1.5s' }}>
                    <div className="tetris-block tetris-t"></div>
                    <div className="tetris-block tetris-t" style={{ left: '20px', top: '0px', animationDelay: '0.4s' }}></div>
                    <div className="tetris-block tetris-t" style={{ left: '40px', top: '0px', animationDelay: '0.8s' }}></div>
                </div>
                <div className="absolute top-[500px] right-20 retro-tetris" style={{ animationDelay: '2s' }}>
                    <div className="tetris-block tetris-l"></div>
                    <div className="tetris-block tetris-l" style={{ left: '20px', top: '0px', animationDelay: '0.5s' }}></div>
                    <div className="tetris-block tetris-l" style={{ left: '40px', top: '0px', animationDelay: '1s' }}></div>
                </div>
                <div className="absolute top-[1100px] left-1/3 retro-tetris" style={{ animationDelay: '1.2s' }}>
                    <div className="tetris-block tetris-i"></div>
                    <div className="tetris-block tetris-i" style={{ left: '0px', top: '20px', animationDelay: '0.4s' }}></div>
                </div>
                <div className="absolute top-[1700px] right-1/4 retro-tetris" style={{ animationDelay: '0.7s' }}>
                    <div className="tetris-block tetris-t"></div>
                    <div className="tetris-block tetris-t" style={{ left: '20px', top: '0px', animationDelay: '0.6s' }}></div>
                    <div className="tetris-block tetris-t" style={{ left: '40px', top: '0px', animationDelay: '1.2s' }}></div>
                </div>
                
                {/* Pong Paddles & Ball */}
                <div className="absolute top-1/2 left-5 retro-pong">
                    <div className="pong-paddle"></div>
                </div>
                <div className="absolute top-1/2 right-5 retro-pong">
                    <div className="pong-paddle"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 retro-pong-ball">
                    <div className="pong-ball"></div>
                </div>
                
                {/* Asteroids - Multiple */}
                <div className="absolute bottom-10 right-1/4 retro-asteroid">
                    <div className="asteroid"></div>
                </div>
                <div className="absolute bottom-30 right-1/3 retro-asteroid" style={{ animationDelay: '0.5s' }}>
                    <div className="asteroid" style={{ width: '20px', height: '20px' }}></div>
                </div>
                <div className="absolute bottom-50 right-1/5 retro-asteroid" style={{ animationDelay: '1s' }}>
                    <div className="asteroid" style={{ width: '18px', height: '18px' }}></div>
                </div>
                
                {/* Snake Game */}
                <div className="absolute top-1/3 left-1/4 retro-snake">
                    <div className="snake-segment"></div>
                    <div className="snake-segment" style={{ left: '15px', animationDelay: '0.1s' }}></div>
                    <div className="snake-segment" style={{ left: '30px', animationDelay: '0.2s' }}></div>
                    <div className="snake-segment" style={{ left: '45px', animationDelay: '0.3s' }}></div>
                </div>
                
                {/* Breakout Bricks */}
                <div className="absolute top-1/4 right-1/4 retro-breakout">
                    <div className="breakout-brick"></div>
                    <div className="breakout-brick" style={{ left: '30px' }}></div>
                    <div className="breakout-brick" style={{ left: '60px' }}></div>
                    <div className="breakout-brick" style={{ left: '90px' }}></div>
                </div>
                
                {/* Galaga Ship */}
                <div className="absolute bottom-1/4 left-1/3 retro-galaga">
                    <div className="galaga-ship"></div>
                </div>
                
                {/* Game Dots (Pacman style) - More Scattered */}
                <div className="pacman-dot" style={{ left: '10%', top: '15%', animationDelay: '0s' }}></div>
                <div className="pacman-dot" style={{ left: '15%', top: '20%', animationDelay: '0.2s' }}></div>
                <div className="pacman-dot" style={{ left: '20%', top: '25%', animationDelay: '0.4s' }}></div>
                <div className="pacman-dot" style={{ left: '25%', top: '30%', animationDelay: '0.6s' }}></div>
                <div className="pacman-dot" style={{ left: '30%', top: '35%', animationDelay: '0.8s' }}></div>
                <div className="pacman-dot" style={{ left: '70%', top: '50%', animationDelay: '1s' }}></div>
                <div className="pacman-dot" style={{ left: '75%', top: '55%', animationDelay: '1.2s' }}></div>
                <div className="pacman-dot" style={{ left: '80%', top: '60%', animationDelay: '1.4s' }}></div>
                <div className="pacman-dot" style={{ left: '85%', top: '65%', animationDelay: '1.6s' }}></div>
                <div className="pacman-dot" style={{ left: '90%', top: '70%', animationDelay: '1.8s' }}></div>
            </div>
            
            {/* Retro Music Player - Top Left */}
            <div className="fixed top-6 left-6 z-[100] flex flex-col gap-2">
                <button
                    onClick={toggleMusic}
                    className="group relative w-14 h-14 rounded-full bg-black/80 backdrop-blur-sm border-2 border-pink-500/50 hover:border-rose-400/70 transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40"
                    aria-label={isMusicPlaying ? "Pause music" : "Play music"}
                >
                    {isMusicPlaying ? (
                        <FaVolumeUp className="text-pink-400 text-xl group-hover:text-rose-400 transition-colors" />
                    ) : (
                        <FaVolumeMute className="text-pink-400 text-xl group-hover:text-rose-400 transition-colors" />
                    )}
                    {isMusicPlaying && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    )}
                </button>
                {isMusicPlaying && (
                    <div className="bg-black/80 backdrop-blur-sm border border-pink-500/30 rounded-lg p-2">
                        <div className="flex items-center gap-2">
                            <FaMusic className="text-pink-400 text-xs" />
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={musicVolume}
                                onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                                className="w-20 h-1 bg-pink-500/30 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <span className="text-xs text-pink-300 w-8">{Math.round(musicVolume * 100)}%</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Animated Feel Button - Top Right - Blended Matrix & Pink Theme */}
          <button
                onClick={handleAnimatedExperience}
                className="fixed top-6 right-6 z-[100] group px-5 py-3 bg-black/80 backdrop-blur-sm border-2 border-pink-500/50 text-pink-300 font-mono font-bold rounded-xl hover:border-rose-400/70 hover:bg-black/90 transition-all duration-300 hover:scale-105 overflow-hidden max-w-sm relative matrix-pink-button"
                style={{ position: 'fixed' }}
            >
                {/* Blended scan line effect - pink/green */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/10 to-transparent animate-matrix-scan"></div>
                
                {/* Matrix corner brackets with pink accent */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-pink-400/60"></div>
                <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-rose-400/60"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-pink-400/60"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-rose-400/60"></div>
                
                {/* Subtle glow effect - pink theme */}
                <div className="absolute -inset-0.5 border border-pink-500/30 opacity-40 animate-pulse"></div>
                
                {/* Text - blended colors */}
                <span className="relative z-10 text-xs md:text-sm leading-tight block text-center font-mono font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 bg-clip-text text-transparent group-hover:from-pink-200 group-hover:via-rose-200 group-hover:to-pink-200 transition-all duration-300">
                    I love the movie Matrix! Click here to see my portfolio in more matrix theme feel
                </span>
                
                {/* Hover effect - pink glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
            
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Swetha Saseendran",
                        "jobTitle": "Software Developer & AI Enthusiast",
                        "url": "https://swetha4444.github.io/Personal_Website/",
                        "image": "https://swetha4444.github.io/Personal_Website/images/me.jpg",
                        "sameAs": [
                            "https://github.com/swetha4444",
                            "https://www.linkedin.com/in/swetha-saseendran-794749194/",
                            "https://scholar.google.com/citations?user=CmC9cIoAAAAJ"
                        ],
                        "description": "Software Developer & AI Enthusiast specializing in full-stack development, AI/ML, computer vision, and cloud solutions.",
                        "knowsAbout": [
                            "Software Development",
                            "Artificial Intelligence",
                            "Machine Learning",
                            "Computer Vision",
                            "Full Stack Development",
                            "Python",
                            "React",
                            "AWS",
                            "OpenCV",
                            "Natural Language Processing"
                        ],
                        "alumniOf": {
                            "@type": "Organization",
                            "name": "IIT Madras"
                        },
                        "worksFor": [
                        {
                            "@type": "Organization",
                            "name": "UMass Amherst",
                            "jobTitle": "Research Assistant"
                        },
                        {
                            "@type": "Organization",
                            "name": "UMass Amherst",
                            "jobTitle": "Software Engineering Intern"
                        }
                    ]
                    })
                }}
            />
            
            <div className="relative z-10">
                {/* Hero Section */}
                <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
                    <div className="flex flex-col items-center space-y-8 animate-fade-in">
                        {/* Name */}
                        <div className="w-full">
                            <AnimatedName name="SWETHA SASEENDRAN" />
                        </div>
                        
                        {/* Profile Image Carousel */}
                        <div className="flex justify-center animate-scale-in -mt-4 mb-2">
                            <RotatingImageCarousel 
                                images={[
                                    process.env.PUBLIC_URL + "/images/me.jpg",
                                    process.env.PUBLIC_URL + "/images/me2.jpg",
                                    process.env.PUBLIC_URL + "/images/me3.jpg",
                                    process.env.PUBLIC_URL + "/images/me4.jpg",
                                    process.env.PUBLIC_URL + "/images/me5.jpg",
                                    process.env.PUBLIC_URL + "/images/me6.jpg"
                                ]}
                                interval={3000}
                            />
                        </div>
                        
                        {/* Title */}
                        <div className="w-full -mt-2 mb-4">
                            <h2 className="text-xl md:text-3xl text-gray-300 font-semibold tracking-wide min-h-[2.5rem] md:min-h-[3.5rem]">
                                <TypingAnimation text="Software Developer & AI Enthusiast" speed={80} />
                            </h2>
                        </div>
                        
                        {/* Description */}
                        <div className="w-full max-w-4xl mx-auto mb-8">
                            <p className="text-base md:text-lg text-gray-300 leading-relaxed font-normal px-4">
                                I thrive at the intersection of artificial intelligence and software engineering, architecting intelligent systems from the ground up. My journey spans the full development lifecycle, from crafting intuitive web and Android applications to deploying scalable solutions on AWS. My passion lies in creating a powerful synergy between these domains, focusing on code automation and building reusable components that work seamlessly across platforms. From high-level system design to hands-on implementation and cloud deployment, I am dedicated to developing end-to-end solutions that are not only intelligent but also robust, efficient, and user-friendly.
                            </p>
        </div>
                        
                        {/* Social Links */}
                        <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://github.com/swetha4444"
              target="_blank"
              rel="noopener noreferrer"
                                className="group relative p-4 rounded-full bg-white/5 backdrop-blur-sm border border-pink-500/30 hover:border-rose-500/50 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-pink-500/30"
              aria-label="GitHub Profile"
            >
                                <FaGithub size={28} className="text-pink-400 group-hover:text-rose-400 transition-colors" />
                                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-semibold">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/swetha-saseendran-794749194/"
              target="_blank"
              rel="noopener noreferrer"
                                className="group relative p-4 rounded-full bg-white/5 backdrop-blur-sm border border-pink-500/30 hover:border-rose-500/50 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-pink-500/30"
              aria-label="LinkedIn Profile"
            >
                                <FaLinkedin size={28} className="text-pink-400 group-hover:text-rose-400 transition-colors" />
                                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-semibold">LinkedIn</span>
            </a>
            <a
              href={process.env.PUBLIC_URL + "/resume/Swetha_Saseendran_Resume.pdf"}
              download
                                className="group relative p-4 rounded-full bg-white/5 backdrop-blur-sm border border-pink-500/30 hover:border-rose-500/50 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-pink-500/30"
              aria-label="Download Resume"
            >
                                <FaFileDownload size={28} className="text-pink-400 group-hover:text-rose-400 transition-colors" />
                                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-semibold">Resume</span>
            </a>
            <a
              href="https://scholar.google.com/citations?user=CmC9cIoAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
                                className="group relative p-4 rounded-full bg-white/5 backdrop-blur-sm border border-pink-500/30 hover:border-rose-500/50 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-pink-500/30"
              aria-label="Google Scholar"
            >
                                <FaGraduationCap size={28} className="text-pink-400 group-hover:text-rose-400 transition-colors" />
                                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-semibold">Google Scholar</span>
            </a>
                        </div>
                        
                        {/* Scroll Indicator */}
                        <div className="flex flex-col items-center gap-2 mt-8 animate-bounce-subtle">
                            <span className="text-gray-400 text-sm font-medium">Scroll to explore</span>
                            <svg 
                                className="w-5 h-5 text-pink-400 animate-bounce"
                                fill="none" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                            </svg>
                        </div>
                    </div>
                </section>

            {/* Skills Section - Arcade Game Board */}
            <AnimatedSection animationType="fade-up" className="max-w-6xl mx-auto px-6 py-24">
                <section id="skills" className="relative arcade-cabinet">
                    {/* Arcade Cabinet Frame */}
                    <div className="arcade-frame">
                        {/* Top Arcade Header */}
                        <div className="arcade-header">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-pink-300 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                                Skills
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-4"></div>
                        </div>
                        
                        {/* Arcade Screen/Board */}
                        <div className="arcade-screen">
                            {/* Screen Border Glow */}
                            <div className="screen-glow"></div>
                            
                            {/* Screen Content */}
                            <div className="screen-content">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 arcade-grid">
                        {skillsData.map((category, index) => (
                            <AnimatedSection 
                                key={category.category}
                                animationType={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                                delay={200 + index * 100}
                                className="arcade-skill-panel group"
                            >
                                {/* Arcade Panel Header */}
                                <div className="arcade-panel-header">
                                    <div className="arcade-panel-title">{category.category}</div>
                                    <div className="arcade-panel-line"></div>
                                </div>
                                
                                {/* Skills Grid - Arcade Button Style */}
                                <div className="arcade-skills-grid">
                                    {category.skills.map((skill) => {
                                        // Icon mapping for skills
                                        const getSkillIcon = (skillName) => {
                                            const iconMap = {
                                                'Python': <FaPython />,
                                                'Java': <FaJava />,
                                                'C': <SiC />,
                                                'TypeScript': <SiTypescript />,
                                                'JavaScript': <SiJavascript />,
                                                'React': <FaReact />,
                                                'Next.js': <SiNextdotjs />,
                                                'Angular': <SiAngular />,
                                                'Node.js': <FaNode />,
                                                'Spring Boot': <SiSpring />,
                                                'Flask': <SiFlask />,
                                                'Django': <SiDjango />,
                                                'FastAPI': <SiFastapi />,
                                                'PHP': <SiPhp />,
                                                'Android': <SiAndroid />,
                                                'TensorFlow': <SiTensorflow />,
                                                'PyTorch': <SiPytorch />,
                                                'OpenCV': <SiOpencv />,
                                                'MediaPipe': <SiOpencv />,
                                                'Hugging Face': <SiHuggingface />,
                                                'BERT': <SiTensorflow />,
                                                'NLP': <SiTensorflow />,
                                                'SQL': <FaDatabase />,
                                                'MongoDB': <SiMongodb />,
                                                'ElasticSearch': <SiElasticsearch />,
                                                'Kafka': <SiApachekafka />,
                                                'Redis': <SiRedis />,
                                                'Tableau': <SiTableau />,
                                                'AWS': <FaAws />,
                                                'Docker': <FaDocker />,
                                                'Git': <FaGitAlt />,
                                                'Jenkins': <SiJenkins />,
                                                'GitHub Actions': <SiGithubactions />,
                                                'CI/CD': <FaGitAlt />,
                                            };
                                            return iconMap[skillName] || null;
                                        };
                                        
                                        return (
                                            <div
                                                key={skill}
                                                className="arcade-button group/skill"
                                            >
                                                {getSkillIcon(skill) && (
                                                    <span className="arcade-button-icon">
                                                        {getSkillIcon(skill)}
            </span>
                                                )}
                                                <span className="arcade-button-text">{skill}</span>
                                                <div className="arcade-button-glow"></div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </AnimatedSection>
                        ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Arcade Control Panel Bottom */}
                        <div className="arcade-controls">
                            <div className="arcade-joystick"></div>
                            <div className="arcade-buttons-row">
                                <div className="arcade-action-button"></div>
                                <div className="arcade-action-button"></div>
                                <div className="arcade-action-button"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Experience Section */}
            <AnimatedSection animationType="fade-up" className="max-w-7xl mx-auto px-6 py-20">
                <section id="experience" className="retro-border-thin rounded-lg p-6">
                    <AnimatedSection animationType="scale" delay={100}>
                        <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-pink-300 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                            Work Experience
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection animationType="fade-up" delay={200}>
                        <ExperienceTimeline experiences={experienceData} />
                    </AnimatedSection>
                </section>
            </AnimatedSection>

            {/* Projects Section */}
            <AnimatedSection animationType="fade-up" className="max-w-6xl mx-auto px-6 py-24">
                <section id="projects" className="relative retro-border-thin rounded-lg p-6">
                    {/* Decorative background elements */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl"></div>
                    
                    <AnimatedSection animationType="scale" delay={100}>
                        <div className="text-center mb-16 relative">
                            <h2 className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-pink-300 via-pink-400 via-rose-400 to-pink-300 bg-clip-text text-transparent animate-gradient">
                                Projects
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-4"></div>
                            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">Showcase of my technical creations</p>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection animationType="fade-up" delay={200}>
                        <ProjectCarousel projects={projects} />
                    </AnimatedSection>
                </section>
            </AnimatedSection>

            {/* Research Section */}
            <AnimatedSection animationType="fade-up" className="max-w-6xl mx-auto px-6 py-24">
                <section id="research" className="relative retro-border-thin rounded-lg p-6">
                    {/* Decorative background elements */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
                    
                    <AnimatedSection animationType="scale" delay={100}>
                        <div className="text-center mb-16 relative">
                            <h2 className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-pink-300 via-pink-400 via-rose-400 to-pink-300 bg-clip-text text-transparent animate-gradient">
                                Research Publications
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto mt-4"></div>
                            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">My published papers and academic work</p>
                        </div>
                    </AnimatedSection>
                    <div className="space-y-6">
                        {publications.map((pub, index) => (
                            <AnimatedSection
                                key={index}
                                animationType={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                                delay={200 + index * 150}
                                className="backdrop-blur-xl bg-white/5 border border-pink-500/30 rounded-2xl p-8 hover:border-rose-500/40 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 hover-lift hover-glow"
                            >
                            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-4">{pub.title}</h3>
                            <p className="text-gray-300 mb-3 text-lg font-medium">{pub.authors}</p>
                            <p className="text-rose-400 font-semibold mb-6 text-lg">
                                {pub.journal} ({pub.year})
                            </p>
                            <p className="text-gray-300 mb-6 leading-relaxed text-lg">{pub.abstract}</p>
                            <a
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 font-semibold"
                            >
                                <FaExternalLinkAlt /> Read Publication
                            </a>
                            </AnimatedSection>
                        ))}
                    </div>
                </section>
            </AnimatedSection>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto px-6 py-12 text-center border-t border-pink-500/20">
                <p className="text-gray-400 text-lg">
                    © {new Date().getFullYear()} Swetha Saseendran. All rights reserved.
                </p>
            </footer>
          </div>
            
            {/* Custom Animations */}
            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
                
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
                
                .delay-1000 {
                    animation-delay: 1s;
                }
                
                @keyframes bounce-subtle {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }
                
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s ease-in-out infinite;
                }
            `}</style>
            
            {/* AI Chatbot */}
            <PortfolioChatbot />
        </div>
  );
}
