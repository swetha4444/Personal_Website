import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import MatrixRain from '../backgrounds/matrixRain';
import MatrixSection from '../components/MatrixSection';
import GridTunnel from '../backgrounds/GridTunnel'; // Import the new component

// 1. Define your work experience data
const experienceData = [
    {
        id: 'job7',
        company: 'UMass Amherst',
        role: 'Software Engineering Intern',
        period: 'Mar 2025 – Present',
        description: [
            'Designed and developed a full-stack Android solution for Bluetooth-based sensor data acquisition for stroke rehabilitation, featuring a custom SPP file transfer protocol and dual-mode file persistence (local & AWS S3).',
            'Deployed an R-based API on AWS EC2 using Docker and a CI/CD pipeline for data analytics and avian flu prediction.',
        ],
        skills: ['Android', 'AWS S3', 'FastAPI', 'Docker', 'CI/CD', 'R', 'Data Analytics'],
        coords: { x: 950, y: 150 },
    },
    {
        id: 'job6',
        company: 'Citi JAC',
        role: 'Committee Member, Junior Analyst Council',
        period: 'Mar 2023 – Dec 2024',
        description: [
            'Selected as one of 20 analysts nationwide to represent all analysts.',
            'Led initiatives to enhance peer learning, coordinated townhalls with senior leadership, and conducted tech sessions with SMEs.',
        ],
        skills: ['Leadership', 'Event Coordination', 'Public Speaking', 'Mentorship'],
        coords: { x: 800, y: 350 },
    },
    {
        id: 'job5',
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
        coords: { x: 650, y: 150 },
    },
    {
        id: 'job4',
        company: 'ACM SSN',
        role: 'Alumni Relations Head',
        period: 'Jun 2021 – Apr 2022',
        description: [
            'Cultivated strong alumni relationships by fostering communication and coordinating engaging events.',
            'Created competitive coding questions for contests.',
        ],
        skills: ['Community Management', 'Event Planning', 'Problem Setting', 'Networking'],
        coords: { x: 500, y: 350 },
    },
    {
        id: 'job3',
        company: 'First Insight',
        role: 'Data Science Intern',
        period: 'Jul 2021 – Dec 2021',
        description: [
            'Developed an Aspect-Based Sentiment Analysis System using LDA and BERT Transformers, improving Topic Coherence by 20%.',
            'Customized the system for user-defined aspects and deployed it as a REST API within a machine-learning pipeline.',
        ],
        skills: ['Sentiment Analysis', 'NLP', 'BERT', 'LDA', 'Python', 'REST API'],
        coords: { x: 350, y: 150 },
    },
    {
        id: 'job2',
        company: 'SRIC-IIT Madras',
        role: 'Computer Vision Research Intern',
        period: 'May 2021 – Nov 2021',
        description: [
            'Developed a motion analysis system for athlete biomechanics using OpenCV, Mediapipe, and YOLO, achieving 82% accuracy.',
            'Led and mentored a team of 5+ research assistants through teaching sessions and academic guidance.',
        ],
        skills: ['Computer Vision', 'OpenCV', 'YOLO', 'Flask', 'Mentorship', 'Research'],
        coords: { x: 200, y: 350 },
    },
    {
        id: 'job1',
        company: 'GUVI Geek Network',
        role: 'Full Stack Developer Intern',
        period: 'Feb 2021 – Mar 2021',
        description: [
            'Collaborated with a team of developers to implement an online learning and teaching marketplace using HTML, CSS, jQuery-AJAX, Bootstrap, PHP, and MySQL.',
        ],
        skills: ['Full Stack', 'PHP', 'MySQL', 'HTML/CSS', 'jQuery', 'Bootstrap'],
        coords: { x: 50, y: 150 },
    },
];

// 2. Create the Info Terminal component
const InfoTerminal = ({ job, isVisible }) => {
    if (!job) return null;

    return (
        <div className={`info-terminal ${isVisible ? 'visible' : ''}`}>
            <div className="terminal-header">/usr/bin/history -n 1</div>
            <div className="terminal-body">
                <p className="terminal-prompt">
                    <span className="terminal-user">swetha@matrix:</span>
                    <span className="terminal-path">~/work/{job.company.toLowerCase()}</span>$ cat role_details.txt
                </p>
                <h3 className="terminal-title">{job.role}</h3>
                <p className="terminal-period">PERIOD: {job.period}</p>
                <div className="terminal-description">
                    <ul>
                        {job.description.map((point, index) => <li key={index}>{point}</li>)}
                    </ul>
                </div>
                <div className="terminal-skills">
                    <strong>SKILLS_ACQUIRED:</strong>
                    <ul>
                        {job.skills.map(skill => <li key={skill}>{skill}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};


// 3. The main Experience component
export default function Experience() {
    const [selectedJobId, setSelectedJobId] = useState(experienceData[0].id); // Default to most recent job
    const [isTraveling, setIsTraveling] = useState(false);
    const [isTerminalVisible, setIsTerminalVisible] = useState(true);
    const [nextJob, setNextJob] = useState(null); // State to hold the destination job
    const selectedJob = experienceData.find(j => j.id === selectedJobId);

    const handleNodeClick = (jobId) => {
        if (jobId === selectedJobId || isTraveling) return;

        // Find the destination job and store it in state
        const destinationJob = experienceData.find(j => j.id === jobId);
        setNextJob(destinationJob);

        setIsTerminalVisible(false);
        setIsTraveling(true);

        // Increased duration to allow more time to read the station board
        setTimeout(() => {
            setSelectedJobId(jobId);
            setIsTraveling(false);
            setNextJob(null); // Clear the next job state
            // Stagger the terminal appearing after travel
            setTimeout(() => setIsTerminalVisible(true), 500); // Allow content to fade in
        }, 3500); 
    };

    return (
        <div className="relative min-h-screen w-screen overflow-hidden">
            <MatrixRain />
            {isTraveling && <GridTunnel job={nextJob} />}
            <main className={`main-content ${isTraveling ? 'collapsing' : ''} flex flex-col items-center justify-center`}>
                <MatrixSection className="w-full h-full flex flex-col items-center justify-center bg-transparent border-[#5dff4e]/50 shadow-2xl p-4">
                    <NavBar />
                    <h1 className="text-4xl font-extrabold text-[#5dff4e] mb-4 text-center matrix-font tracking-widest drop-shadow-lg p-2 shrink-0">
                        Career Train
                    </h1>
                    <div className="experience-layout">
                        <div className="map-container">
                            <svg viewBox="0 0 1000 500" className="experience-map">
                                {/* Connecting Lines */}
                                <path
                                    d="M 50 150 C 50 250, 200 250, 200 350 S 350 250, 350 150 S 500 250, 500 350 S 650 250, 650 150 S 800 250, 800 350 S 950 250, 950 150"
                                    stroke="var(--matrix-green)"
                                    strokeWidth="1.5"
                                    fill="none"
                                    className="data-stream"
                                />

                                {/* Nodes */}
                                {experienceData.map((job) => (
                                    <g
                                        key={job.id}
                                        onClick={() => handleNodeClick(job.id)}
                                        className={`experience-node ${job.id === selectedJobId ? 'selected' : ''}`}
                                    >
                                        <circle cx={job.coords.x} cy={job.coords.y} r="12" />
                                        <text x={job.coords.x} y={job.coords.y + 30} textAnchor="middle">
                                            {job.company}
                                        </text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                        <InfoTerminal job={selectedJob} isVisible={isTerminalVisible} />
                    </div>
                </MatrixSection>
            </main>
            <style>{`
                :root {
                  --matrix-green: #5dff4e;
                  --matrix-green-dark: #111813;
                  --matrix-green-glow: rgba(93, 255, 78, 0.3);
                  --matrix-text: #baffc9;
                }

                .main-content {
                    position: relative;
                    z-index: 60; /* Above the tunnel but below other overlays */
                    width: 100%;
                    height: 100%;
                    transition: transform 0.5s ease-in, opacity 0.4s ease-in;
                }

                .main-content.collapsing {
                    transform: scale(0);
                    opacity: 0;
                    pointer-events: none;
                }

                .experience-layout {
                    display: flex;
                    flex-direction: column; /* Stack map on top of terminal */
                    width: 100%;
                    flex-grow: 1; /* Allow this container to fill available space */
                    gap: 1rem;
                    overflow: hidden; /* Prevent container from overflowing */
                    min-height: 0; /* Important for flex-grow in a column */
                }

                .map-container {
                    flex-shrink: 0; /* Prevent map from shrinking */
                    height: 200px;
                    border: 1px solid var(--matrix-green-glow);
                    background: rgba(17, 24, 19, 0.5);
                    backdrop-filter: blur(2px);
                }

                .experience-map {
                    width: 100%;
                    height: 100%;
                }
                .experience-node {
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .experience-node circle {
                    fill: var(--matrix-green-dark);
                    stroke: var(--matrix-green);
                    stroke-width: 2;
                    transition: all 0.3s ease;
                }
                .experience-node text {
                    fill: var(--matrix-text);
                    font-family: 'PixelText', monospace;
                    font-size: 2rem; /* Increased from 14px */
                }
                .experience-node:hover circle {
                    filter: drop-shadow(0 0 10px var(--matrix-green));
                }
                .experience-node.selected circle {
                    fill: var(--matrix-green);
                    stroke-width: 3;
                    transform-origin: center;
                    animation: pulse-node 1.5s infinite;
                }
                @keyframes pulse-node {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                .data-stream {
                    stroke-dasharray: 10;
                    animation: dash 20s linear infinite;
                }
                @keyframes dash {
                    to {
                        stroke-dashoffset: 1000;
                    }
                }

                /* Info Terminal Styles */
                .info-terminal {
                    background: rgba(17, 24, 19, 0.85);
                    border: 1px solid var(--matrix-green);
                    box-shadow: inset 0 0 15px var(--matrix-green-glow);
                    color: var(--matrix-text);
                    font-family: 'PixelText', monospace;
                    width: 100%;
                    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
                    opacity: 1;
                    transform: translateY(0);
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1; /* Allow terminal to fill remaining space */
                    min-height: 0; /* Necessary for flex-grow in a flex column */
                }
                .info-terminal .terminal-body {
                    padding: 1rem;
                    overflow-y: auto; /* Make the body scrollable */
                    flex-grow: 1;
                }

                /* Custom Scrollbar for Terminal */
                .terminal-body::-webkit-scrollbar {
                    width: 8px;
                }
                .terminal-body::-webkit-scrollbar-track {
                    background: var(--matrix-green-dark);
                }
                .terminal-body::-webkit-scrollbar-thumb {
                    background-color: var(--matrix-green);
                    border-radius: 4px;
                    border: 2px solid var(--matrix-green-dark);
                }

                .info-terminal:not(.visible) {
                    opacity: 0;
                    transform: translateY(20px);
                    pointer-events: none;
                }
                .terminal-header {
                    background: #333;
                    color: #eee;
                    padding: 0.25rem 1rem; /* Adjusted padding */
                    font-size: 0.8rem;
                    flex-shrink: 0;
                }
                .terminal-prompt { margin-bottom: 1rem; }
                .terminal-user { color: #87d7ff; }
                .terminal-path { color: #ff87d7; }
                .terminal-title { font-size: 1.5rem; color: var(--matrix-green); margin-bottom: 0.5rem; }
                .terminal-period { font-size: 0.9rem; opacity: 0.8; margin-bottom: 1rem; }
                .terminal-description { font-size: 1rem; line-height: 1.4; }
                .terminal-description ul { list-style: disc; padding-left: 1.5rem; }
                .terminal-description li { margin-bottom: 0.5rem; }
                .terminal-skills { margin-top: 1rem; }
                .terminal-skills ul { list-style: disc inside; padding-left: 0.5rem; }
            `}</style>
        </div>
    );
}