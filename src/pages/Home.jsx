import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFileDownload, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaPython, FaJava, FaReact, FaNode, FaAws, FaDocker, FaGitAlt, FaDatabase } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiNextdotjs, SiAngular, SiSpring, SiFlask, SiDjango, SiFastapi, SiPhp, SiAndroid, SiTensorflow, SiPytorch, SiOpencv, SiHuggingface, SiMongodb, SiElasticsearch, SiApachekafka, SiRedis, SiTableau, SiJenkins, SiGithubactions, SiC } from "react-icons/si";

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

// Animated Name Component with different font styles (Avant Garde style)
function AnimatedName({ name }) {
    const [currentStyle, setCurrentStyle] = useState(0);
    
    const fontStyles = [
        { fontFamily: 'Montserrat', fontWeight: 900, letterSpacing: '0.1em', style: 'normal' },
        { fontFamily: 'Orbitron', fontWeight: 700, letterSpacing: '0.15em', style: 'normal' },
        { fontFamily: 'Bebas Neue', fontWeight: 400, letterSpacing: '0.05em', style: 'normal' },
        { fontFamily: 'Raleway', fontWeight: 800, letterSpacing: '0.12em', style: 'normal' },
        { fontFamily: 'Montserrat', fontWeight: 800, letterSpacing: '0.08em', style: 'normal' },
        { fontFamily: 'Orbitron', fontWeight: 900, letterSpacing: '0.2em', style: 'normal' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStyle((prev) => (prev + 1) % fontStyles.length);
        }, 1800);
        return () => clearInterval(interval);
    }, []);

    const currentFont = fontStyles[currentStyle];

    return (
        <div className="relative inline-block w-full">
            <h1 
                className="text-4xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-pink-300 via-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent transition-all duration-1000 ease-in-out whitespace-nowrap overflow-hidden"
                style={{ 
                    fontFamily: currentFont.fontFamily,
                    fontWeight: currentFont.fontWeight,
                    letterSpacing: currentFont.letterSpacing,
                    fontStyle: currentFont.style
                }}
            >
                {name}
            </h1>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-rose-400/20 to-pink-400/20 blur-2xl -z-10 animate-pulse"></div>
        </div>
    );
}

// Import data from other pages
const projects = [
    {
        title: "PyTrackX: Open Source Python Package",
        description: "An open-source Python library to track 80+ objects and body movements with a single function call.",
        para: "Built with Sriram Kannan, PyTrackX is my first open-source Python library. It's an automated tool that tracks up to 80 different objects and body movements from a simple video input, returning real-time coordinates with minimal setup. We were inspired to simplify the complex process of posture and object tracking into a single, easy-to-use function call. The package is published on PyPI and available for anyone to use in their projects.",
        github_link: "https://github.com/swetha4444/PyTrackX",
        link: "https://pypi.org/project/PytrackX/",
        video: process.env.PUBLIC_URL + "/images/projects/pytrackx.mp4",
        tags: ["Python", "Open Source", "Computer Vision", "YOLO", "Mediapipe", "PyPI"],
    },
    {
        title: "Poker AI Agent",
        description: "AI agents for Texas Hold'em, including Expectiminimax, Q-learning, and a hybrid MCTS-Minimax agent.",
        para: "Engineered and benchmarked a suite of advanced AI agents for No-Limit Texas Hold'em. This project features an Expectiminimax agent enhanced with statistical opponent modeling to exploit player tendencies, a Q-learning agent using strategic state abstraction to navigate the vast decision space, and a novel hybrid MCTS-Minimax agent.",
        github_link: "https://github.com/swetha4444/Poker-AI-Agent",
        link: "https://drive.google.com/file/d/1hCysYV0ltOEmch1f2bd1Zy1_hpisVHWJ/view?usp=sharing",
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
        link: "https://docs.google.com/document/d/1kH71CbY-JrtyedcGC9QoNfQPBbfgOBDhLb7ANw45fxY/edit?tab=t.0",
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
        role: 'Software Engineering Intern',
        period: 'Mar 2025 – Present',
        description: [
            'Designed and developed a full-stack Android solution for Bluetooth-based sensor data acquisition for stroke rehabilitation, featuring a custom SPP file transfer protocol and dual-mode file persistence (local & AWS S3).',
            'Deployed an R-based API on AWS EC2 using Docker and a CI/CD pipeline for data analytics and avian flu prediction.',
        ],
        skills: ['Android', 'AWS S3', 'FastAPI', 'Docker', 'CI/CD', 'R', 'Data Analytics'],
    },
    {
        company: 'Citi',
        role: 'Technology Analyst',
        period: 'Aug 2022 – Dec 2024',
        description: [
            'Achieved a 60% reduction in API response time by creating an API connector service with Asynchronous Data Streams.',
            'Enhanced configuration management by developing a tool with the DFS algorithm to compare YML config files, integrated into the DevOps Pipeline.',
            'Played a key role in a UI/UX migration, reducing user churn by 22% and mitigating rage clicks by 18%.',
            'Designed a tool to create real-time mock APIs from spec files, significantly reducing development time.',
        ],
        skills: ['API Optimization', 'Java', 'DevOps', 'Figma', 'UI/UX', 'Data Analysis', 'Tableau'],
    },
    {
        company: 'Citi JAC',
        role: 'Committee Member, Junior Analyst Council',
        period: 'Mar 2023 – Dec 2024',
        description: [
            'Selected as one of 20 analysts nationwide to represent all analysts.',
            'Led initiatives to enhance peer learning, coordinated townhalls with senior leadership, and conducted tech sessions with SMEs.',
        ],
        skills: ['Leadership', 'Event Coordination', 'Public Speaking', 'Mentorship'],
    },
    {
        company: 'ACM SSN',
        role: 'Alumni Relations Head',
        period: 'Jun 2021 – Apr 2022',
        description: [
            'Cultivated strong alumni relationships by fostering communication and coordinating engaging events.',
            'Created competitive coding questions for contests.',
        ],
        skills: ['Community Management', 'Event Planning', 'Problem Setting', 'Networking'],
    },
    {
        company: 'First Insight',
        role: 'Data Science Intern',
        period: 'Jul 2021 – Dec 2021',
        description: [
            'Developed an Aspect-Based Sentiment Analysis System using LDA and BERT Transformers, improving Topic Coherence by 20%.',
            'Customized the system for user-defined aspects and deployed it as a REST API within a machine-learning pipeline.',
        ],
        skills: ['Sentiment Analysis', 'NLP', 'BERT', 'LDA', 'Python', 'REST API'],
    },
    {
        company: 'SRIC-IIT Madras',
        role: 'Computer Vision Research Intern',
        period: 'May 2021 – Nov 2021',
        description: [
            'Developed a motion analysis system for athlete biomechanics using OpenCV, Mediapipe, and YOLO, achieving 82% accuracy.',
            'Led and mentored a team of 5+ research assistants through teaching sessions and academic guidance.',
        ],
        skills: ['Computer Vision', 'OpenCV', 'YOLO', 'Flask', 'Mentorship', 'Research'],
    },
    {
        company: 'GUVI Geek Network',
        role: 'Full Stack Developer Intern',
        period: 'Feb 2021 – Mar 2021',
        description: [
            'Collaborated with a team of developers to implement an online learning and teaching marketplace using HTML, CSS, jQuery-AJAX, Bootstrap, PHP, and MySQL.',
        ],
        skills: ['Full Stack', 'PHP', 'MySQL', 'HTML/CSS', 'jQuery', 'Bootstrap'],
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

// Scroll Animation Hook with better effects
function useScrollAnimation(options = {}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = React.useRef(null);
    const { threshold = 0.15, rootMargin = '0px 0px -100px 0px' } = options;

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
            className={`${className} ${isVisible ? animationClasses[animationType] : 'opacity-0'} transition-all duration-1000`}
            style={{ 
                animationDelay: `${delay}ms`,
                animationFillMode: 'forwards'
            }}
        >
            {children}
        </div>
    );
}

// Timeline Item Component with Animation
function TimelineItem({ exp, index }) {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
    
    return (
        <div
            ref={ref}
            className={`relative flex flex-col md:flex-row items-start gap-6 transition-all duration-1000 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } ${
                isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full border-2 border-slate-900 transform md:-translate-x-1/2 z-10 shadow-lg shadow-pink-500/50"></div>
            
            {/* Content Card */}
            <div className={`w-full md:w-[48%] ml-12 md:ml-0 ${
                index % 2 === 0 ? 'md:mr-auto md:pr-6' : 'md:ml-auto md:pl-6'
            }`}>
                <div className="backdrop-blur-xl bg-white/5 border border-pink-500/30 rounded-2xl p-6 hover:border-rose-500/40 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
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

// Experience Timeline Component
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
                        <TimelineItem key={index} exp={exp} index={index} />
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
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-500 items-stretch">
                    {getVisibleProjects().map((project, index) => (
                        <div
                            key={currentIndex * projectsPerPage + index}
                            className="group/card relative backdrop-blur-xl bg-gradient-to-br from-white/8 via-white/5 to-white/8 border border-pink-500/30 rounded-3xl p-8 hover:border-rose-500/60 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 flex flex-col min-h-[550px] overflow-hidden"
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
                                        />
                                    </div>
                                )}
                                {project.images && project.images.length > 0 && (
                                    <div className="mb-6 rounded-xl overflow-hidden border border-pink-500/30 group-hover/card:border-rose-500/50 transition-all duration-300 shadow-lg group-hover/card:shadow-xl">
                                        <img
                                            src={project.images[0]}
                                            alt={project.title}
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
                                            <span>GitHub</span>
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
                                            <span>Live Demo</span>
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
                        alt={`Swetha Saseendran ${index + 1}`}
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

    const handleAnimatedExperience = () => {
    const audio = new Audio(process.env.PUBLIC_URL + "/music/click.mp3");
    audio.play();
        setTimeout(() => navigate("/menu"), 150);
  };

  return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-950/30 to-rose-950/20 text-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Large Blur Circles */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-400/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-pink-300/8 rounded-full blur-3xl animate-pulse delay-700"></div>
                <div className="absolute top-3/4 right-1/3 w-56 h-56 bg-rose-300/8 rounded-full blur-3xl animate-pulse delay-300"></div>
                
                {/* Floating Geometric Shapes */}
                <div className="absolute top-40 right-20 w-32 h-32 border-2 border-pink-400/20 rounded-lg rotate-45 animate-spin-slow"></div>
                <div className="absolute bottom-40 left-20 w-24 h-24 border-2 border-rose-400/20 rounded-full animate-bounce-slow"></div>
                <div className="absolute top-1/3 left-1/4 w-20 h-20 border-2 border-pink-300/20 rotate-12 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-28 h-28 border-2 border-rose-300/20 rounded-full animate-ping-slow"></div>
                
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
            
            <div className="relative z-10">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
                    <div className="space-y-6 animate-fade-in">
                        <AnimatedName name="SWETHA SASEENDRAN" />
                        {/* Profile Image Carousel */}
                        <div className="flex justify-center mb-8 animate-scale-in">
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
                        <h2 className="text-2xl md:text-4xl text-gray-300 mb-8 font-semibold tracking-wide min-h-[3rem] md:min-h-[4rem]">
          <TypingAnimation text="Software Developer & AI Enthusiast" speed={80} />
        </h2>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-medium max-w-7xl mx-auto mb-12 px-4">
                            I thrive at the intersection of artificial intelligence and software engineering, architecting intelligent systems from the ground up. My journey spans the full development lifecycle, from crafting intuitive web and Android applications to deploying scalable solutions on AWS. My passion lies in creating a powerful synergy between these domains, focusing on code automation and building reusable components that work seamlessly across platforms. From high-level system design to hands-on implementation and cloud deployment, I am dedicated to developing end-to-end solutions that are not only intelligent but also robust, efficient, and user-friendly.
                        </p>
                        <div className="flex justify-center gap-8 mb-12">
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
                        </div>
                        
                        {/* Scroll Indicator */}
                        <div className="flex flex-col items-center gap-2 mt-16 animate-bounce-subtle">
                            <span className="text-gray-400 text-sm font-medium">Scroll to explore</span>
                            <svg 
                                className="w-6 h-6 text-pink-400 animate-bounce"
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

            {/* Skills Section */}
            <AnimatedSection animationType="fade-up" className="max-w-6xl mx-auto px-6 py-24">
                <section id="skills" className="relative">
                    {/* Decorative background elements */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl"></div>
                    
                    <AnimatedSection animationType="scale" delay={100}>
                        <div className="text-center mb-16 relative">
                            <h2 className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-pink-300 via-pink-400 via-rose-400 to-pink-300 bg-clip-text text-transparent animate-gradient">
                                Skills
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-4"></div>
                            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">Technologies and tools I work with</p>
                        </div>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skillsData.map((category, index) => (
                            <AnimatedSection 
                                key={category.category}
                                animationType={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                                delay={200 + index * 100}
                                className="group backdrop-blur-xl bg-gradient-to-br from-white/5 via-white/3 to-white/5 border border-pink-500/30 rounded-3xl p-8 hover:border-rose-500/60 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 hover-lift hover-glow relative overflow-hidden"
                            >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-rose-500/0 to-pink-500/0 group-hover:from-pink-500/10 group-hover:via-rose-500/5 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl"></div>
                                
                                {/* Category Header */}
                                <div className="relative z-10 mb-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-1 h-8 bg-gradient-to-b from-pink-400 to-rose-400 rounded-full"></div>
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 bg-clip-text text-transparent group-hover:from-pink-300 group-hover:via-rose-300 group-hover:to-pink-300 transition-all duration-300">
                                            {category.category}
                                        </h3>
                                    </div>
                                    <div className="h-px bg-gradient-to-r from-pink-500/30 via-rose-500/50 to-transparent group-hover:from-pink-500/50 group-hover:via-rose-500/70 transition-all duration-300"></div>
                                </div>
                                
                                {/* Skills Grid */}
                                <div className="relative z-10 flex flex-wrap gap-3">
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
                                            <span
                                                key={skill}
                                                className="group/skill px-4 py-2.5 bg-gradient-to-br from-white/8 to-white/4 border border-pink-500/25 rounded-xl text-sm text-gray-200 hover:border-rose-500/60 hover:text-white hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-rose-500/20 transition-all duration-300 font-medium flex items-center gap-2.5 shadow-sm hover:shadow-md hover:shadow-pink-500/20 hover:scale-105 cursor-default"
                                            >
                                                {getSkillIcon(skill) && (
                                                    <span className="text-lg group-hover/skill:scale-110 transition-transform duration-300 text-pink-400 group-hover/skill:text-rose-300">
                                                        {getSkillIcon(skill)}
                                                    </span>
                                                )}
                                                <span className="relative">
                                                    {skill}
                                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 group-hover/skill:w-full transition-all duration-300"></span>
                                                </span>
            </span>
                                        );
                                    })}
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </section>
            </AnimatedSection>

            {/* Experience Section */}
            <AnimatedSection animationType="fade-up" className="max-w-7xl mx-auto px-6 py-20">
                <section id="experience">
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
                <section id="projects" className="relative">
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
                <section id="research" className="relative">
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
        </div>
  );
}
