import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import MatrixRain from '../backgrounds/matrixRain';
import MatrixSection from '../components/MatrixSection';
import GridTunnel from '../backgrounds/GridTunnel'; // Import the new component

// 1. Define your work experience data
const experienceData = [
    {
        id: 'job3',
        company: 'Stark Industries',
        role: 'Lead AI Architect',
        period: '2022 - Present',
        description: 'Led the development of next-generation AI systems, focusing on neural network design and real-time data processing for global security platforms.',
        skills: ['AI/ML', 'System Architecture', 'React', 'Python'],
        coords: { x: 600, y: 200 },
    },
    {
        id: 'job2',
        company: 'Wayne Enterprises',
        role: 'Senior Developer',
        period: '2020 - 2022',
        description: 'Developed and maintained high-security applications for enterprise clients. Specialized in front-end interfaces and secure data visualization.',
        skills: ['JavaScript', 'Cybersecurity', 'Vue.js'],
        coords: { x: 350, y: 350 },
    },
    {
        id: 'job1',
        company: 'Cyberdyne Systems',
        role: 'Software Engineer',
        period: '2018 - 2020',
        description: 'Contributed to the core framework of a global defense network. Worked on performance optimization and database management.',
        skills: ['C++', 'SQL', 'Optimization'],
        coords: { x: 100, y: 200 },
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
                <p className="terminal-description">{job.description}</p>
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
    const [selectedJobId, setSelectedJobId] = useState(experienceData[0].id);
    const [isTraveling, setIsTraveling] = useState(false);
    const [isTerminalVisible, setIsTerminalVisible] = useState(true);
    const selectedJob = experienceData.find(j => j.id === selectedJobId);

    const handleNodeClick = (jobId) => {
        if (jobId === selectedJobId || isTraveling) return;

        setIsTerminalVisible(false);
        setIsTraveling(true);

        // Duration of the animation
        setTimeout(() => {
            setSelectedJobId(jobId);
            setIsTraveling(false);
            // Stagger the terminal appearing after travel
            setTimeout(() => setIsTerminalVisible(true), 500); // Allow content to fade in
        }, 1200); // This should match the travel duration
    };

    return (
        <div className="relative min-h-screen w-screen overflow-hidden">
            <MatrixRain />
            {isTraveling && <GridTunnel job={selectedJob} />}
            <main className={`main-content ${isTraveling ? 'collapsing' : ''}`}>
                <MatrixSection className="w-full h-full flex flex-col items-center justify-center bg-transparent border-[#5dff4e]/50 shadow-2xl">
                    <NavBar />
                    <h1 className="text-4xl font-extrabold text-[#5dff4e] mb-4 text-center matrix-font tracking-widest drop-shadow-lg p-2">
                        Career Train
                    </h1>
                    <div className="experience-layout">
                        <div className="map-container">
                            <svg viewBox="0 0 700 500" className="experience-map">
                                {/* Connecting Lines */}
                                <path
                                    d="M 100 200 C 225 275, 225 425, 350 350 C 475 275, 475 125, 600 200"
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
                    position: relative;
                    width: 90%;
                    max-width: 1000px;
                    padding-top: 220px; /* Make space for the map */
                }

                .map-container {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 300px;
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
                    font-size: 14px;
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
                    padding: 1rem;
                    width: 100%;
                    height: 280px;
                    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
                    opacity: 1;
                    transform: translateY(0);
                }
                .info-terminal:not(.visible) {
                    opacity: 0;
                    transform: translateY(20px);
                    pointer-events: none;
                }
                .terminal-header {
                    background: #333;
                    color: #eee;
                    padding: 0.25rem 0.5rem;
                    font-size: 0.8rem;
                    margin: -1rem -1rem 1rem -1rem;
                }
                .terminal-prompt { margin-bottom: 1rem; }
                .terminal-user { color: #87d7ff; }
                .terminal-path { color: #ff87d7; }
                .terminal-title { font-size: 1.5rem; color: var(--matrix-green); margin-bottom: 0.5rem; }
                .terminal-period { font-size: 0.9rem; opacity: 0.8; margin-bottom: 1rem; }
                .terminal-description { font-size: 1rem; line-height: 1.4; }
                .terminal-skills { margin-top: 1rem; }
                .terminal-skills ul { list-style: disc inside; padding-left: 0.5rem; }
            `}</style>
        </div>
    );
}