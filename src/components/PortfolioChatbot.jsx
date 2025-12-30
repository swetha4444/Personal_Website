import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';

// Knowledge base extracted from portfolio
const portfolioKnowledge = `
SWETHA SASEENDRAN - Portfolio Information

ABOUT ME:
I thrive at the intersection of artificial intelligence and software engineering, architecting intelligent systems from the ground up. My journey spans the full development lifecycle, from crafting intuitive web and Android applications to deploying scalable solutions on AWS. My passion lies in creating a powerful synergy between these domains, focusing on code automation and building reusable components that work seamlessly across platforms. From high-level system design to hands-on implementation and cloud deployment, I am dedicated to developing end-to-end solutions that are not only intelligent but also robust, efficient, and user-friendly.

I am a Software Developer & AI Enthusiast.

PROJECTS:

1. PyTrackX: Open Source Python Package
- An open-source Python library to track 80+ objects and body movements with a single function call.
- Built with Sriram Kannan, PyTrackX is my first open-source Python library. It's an automated tool that tracks up to 80 different objects and body movements from a simple video input, returning real-time coordinates with minimal setup. We were inspired to simplify the complex process of posture and object tracking into a single, easy-to-use function call. The package is published on PyPI and available for anyone to use in their projects.
- Technologies: Python, Open Source, Computer Vision, YOLO, Mediapipe, PyPI
- GitHub: https://github.com/swetha4444/PyTrackX
- Link: https://pypi.org/project/PytrackX/

2. Poker AI Agent
- AI agents for Texas Hold'em, including Expectiminimax, Q-learning, and a hybrid MCTS-Minimax agent.
- Engineered and benchmarked a suite of advanced AI agents for No-Limit Texas Hold'em. Features an Expectiminimax agent enhanced with statistical opponent modeling, a Q-learning agent using strategic state abstraction, and a novel hybrid MCTS-Minimax agent.
- Technologies: AI, Game Theory, Python, Reinforcement Learning
- GitHub: https://github.com/swetha4444/Poker-AI-Agent

3. TeamX: Fantasy Sports Platform
- A full-stack fantasy sports platform with real-time scoring, built with Flutter, Spring Boot, and Kafka.
- TeamX is a full-stack fantasy sports platform where users create virtual teams and compete based on real-time player performance. Built on a microservices architecture with Flutter app frontend and Spring Boot/Java backend.
- Technologies: Full-Stack, System Design, Microservices, Flutter, Spring Boot, Java, Kafka, Python, MongoDB
- GitHub Backend: https://github.com/swetha4444/TeamX-Backend

4. Resume Analyser Software
- A Python-based tool to parse, analyze, and categorize resumes using NLP and machine learning.
- Comprehensive tool designed to streamline recruitment by converting unstructured resume data into structured format. Uses regular expressions and NLP techniques to parse resumes, summarize work experience, and extract keywords using TF-IDF and Distilbert.
- Technologies: Python, NLP, Machine Learning, TF-IDF, Distilbert, CNN, Knowledge Graph, Data Analysis
- GitHub: https://github.com/swetha4444/Resume-Analyser-Software

5. Analysing Factors Affecting House Prices in the US
- A data analytics project exploring the economic and social factors that influence the US housing market.
- In-depth analysis integrating diverse datasets including Zillow home prices, national GDP, mortgage rates, employment statistics, income ratios, and commodity prices to uncover key correlations and trends.
- Technologies: Python, Data Analysis, Machine Learning, Pandas, NumPy, Matplotlib, Seaborn, Jupyter
- GitHub: https://github.com/swetha4444/Analysing-Factors-affecting-House-Prices-in-the-US

6. Product Review Analysis
- An NLP project to classify and analyze product reviews from social media using Transformers.
- Helps users determine product quality by analyzing social media reviews. Uses a robust pipeline of web scraping, data cleaning, and transformation. Built around Transformer models, specifically fine-tuned BERT variants.
- Technologies: Python, NLP, Transformers, BERT, Data Analysis, Web Scraping
- GitHub: https://github.com/swetha4444/Product-Review-Analysis

7. OpenCV Project - Posture Tracking
- A fun Tkinter animation that mimics your actions using Mediapipe for real-time posture tracking.
- Fun animation built using Tkinter that imitates your actions. Posture is tracked using Mediapipe library. Coordinates of landmarks such as knees, elbows, etc., are passed to the animation, and it changes according to your actions following basic rules of geometry.
- Technologies: Python, OpenCV, Mediapipe, Tkinter, Animation
- GitHub: https://github.com/swetha4444/OpenCV-Project

WORK EXPERIENCE:

1. UMass Amherst - Software Engineering Intern (Mar 2025 – Present)
- Designed and developed a full-stack Android solution for Bluetooth-based sensor data acquisition for stroke rehabilitation, featuring a custom SPP file transfer protocol and dual-mode file persistence (local & AWS S3).
- Deployed an R-based API on AWS EC2 using Docker and a CI/CD pipeline for data analytics and avian flu prediction.
- Skills: Android, AWS S3, FastAPI, Docker, CI/CD, R, Data Analytics

2. Citi - Technology Analyst (Aug 2022 – Dec 2024)
- Achieved a 60% reduction in API response time by creating an API connector service with Asynchronous Data Streams.
- Enhanced configuration management by developing a tool with the DFS algorithm to compare YML config files, integrated into the DevOps Pipeline.
- Played a key role in a UI/UX migration, reducing user churn by 22% and mitigating rage clicks by 18%.
- Designed a tool to create real-time mock APIs from spec files, significantly reducing development time.
- Skills: API Optimization, Java, DevOps, Figma, UI/UX, Data Analysis, Tableau

3. Citi JAC - Committee Member, Junior Analyst Council (Mar 2023 – Dec 2024)
- Selected as one of 20 analysts nationwide to represent all analysts.
- Led initiatives to enhance peer learning, coordinated townhalls with senior leadership, and conducted tech sessions with SMEs.
- Skills: Leadership, Event Coordination, Public Speaking, Mentorship

4. ACM SSN - Alumni Relations Head (Jun 2021 – Apr 2022)
- Cultivated strong alumni relationships by fostering communication and coordinating engaging events.
- Created competitive coding questions for contests.
- Skills: Community Management, Event Planning, Problem Setting, Networking

5. First Insight - Data Science Intern (Jul 2021 – Dec 2021)
- Developed an Aspect-Based Sentiment Analysis System using LDA and BERT Transformers, improving Topic Coherence by 20%.
- Customized the system for user-defined aspects and deployed it as a REST API within a machine-learning pipeline.
- Skills: Sentiment Analysis, NLP, BERT, LDA, Python, REST API

6. SRIC-IIT Madras - Computer Vision Research Intern (May 2021 – Nov 2021)
- Developed a motion analysis system for athlete biomechanics using OpenCV, Mediapipe, and YOLO, achieving 82% accuracy.
- Led and mentored a team of 5+ research assistants through teaching sessions and academic guidance.
- Skills: Computer Vision, OpenCV, YOLO, Flask, Mentorship, Research

7. GUVI Geek Network - Full Stack Developer Intern (Feb 2021 – Mar 2021)
- Collaborated with a team of developers to implement an online learning and teaching marketplace using HTML, CSS, jQuery-AJAX, Bootstrap, PHP, and MySQL.
- Skills: Full Stack, PHP, MySQL, HTML/CSS, jQuery, Bootstrap

SKILLS:

Languages: Python, Java, C, TypeScript, JavaScript
Frontend: React, Next.js, Angular
Backend: Node.js, Spring Boot, Flask, Django, FastAPI, PHP
Mobile: Android
AI/ML: TensorFlow, PyTorch, OpenCV, MediaPipe, Hugging Face, BERT, NLP
Databases: SQL, MongoDB, ElasticSearch, Kafka, Redis
Cloud & DevOps: AWS, Docker, Git, Jenkins, GitHub Actions, CI/CD
Tools: Tableau

CONTACT:
- GitHub: https://github.com/swetha4444
- LinkedIn: Available on portfolio
- Resume: Available for download on portfolio
`;

function PortfolioChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hi! I'm Swetha's AI assistant. I can answer questions about her portfolio, projects, experience, and skills. What would you like to know?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'gemini', 'openai', 'keyword'
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            setApiStatus('checking');
            // Use OpenAI API or a simple RAG approach
            const { response, apiUsed } = await fetchChatbotResponse(userMessage.content);
            setApiStatus(apiUsed);
            
            const assistantMessage = {
                role: 'assistant',
                content: response,
                timestamp: new Date(),
                apiUsed: apiUsed
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chatbot error:', error);
            const errorMessage = {
                role: 'assistant',
                content: "I'm sorry, I encountered an error. Please try again or check if the API key is configured.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchChatbotResponse = async (userQuery) => {
        // Try free APIs first, then fallback to keyword-based
        
        // 1. Try Google Gemini (FREE tier available) - Priority
        const geminiKey = process.env.REACT_APP_GEMINI_API_KEY;
        if (geminiKey) {
            try {
                console.log('🤖 Attempting Gemini API...');
                const geminiResponse = await fetchGeminiResponse(userQuery, geminiKey);
                if (geminiResponse) {
                    console.log('✅ Gemini API response received!');
                    return { response: geminiResponse, apiUsed: 'gemini' };
                }
            } catch (error) {
                console.log('❌ Gemini API error:', error);
            }
        }
        
        // 2. Try OpenAI (if API key is set)
        const openaiKey = process.env.REACT_APP_OPENAI_API_KEY;
        if (openaiKey) {
            try {
                console.log('🤖 Attempting OpenAI API...');
                const openaiResponse = await fetchOpenAIResponse(userQuery, openaiKey);
                if (openaiResponse) {
                    console.log('✅ OpenAI API response received!');
                    return { response: openaiResponse, apiUsed: 'openai' };
                }
            } catch (error) {
                console.log('❌ OpenAI API error:', error);
            }
        }
        
        // 3. Fallback to keyword-based responses
        console.log('📝 Using keyword-based responses (no API key configured)');
        return { response: getSimpleResponse(userQuery), apiUsed: 'keyword' };
    };


    // Google Gemini API - FREE tier (Get key from: https://makersuite.google.com/app/apikey)
    const fetchGeminiResponse = async (userQuery, apiKey) => {
        // First, try to list available models to see what's accessible
        try {
            const listModelsUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
            const listResponse = await fetch(listModelsUrl);
            if (listResponse.ok) {
                const modelsData = await listResponse.json();
                console.log('📋 Available Gemini models:', modelsData.models?.map(m => m.name) || 'Unable to list');
            }
        } catch (error) {
            console.log('Could not list models:', error);
        }

        // Use available models from the list - try the latest/best ones first
        const modelsToTry = [
            'gemini-2.5-flash',        // Latest fast model
            'gemini-flash-latest',     // Latest flash
            'gemini-2.0-flash',        // Stable 2.0 version
            'gemini-2.5-pro',          // Pro version for better quality
            'gemini-pro-latest',       // Latest pro
        ];

        const endpointsToTry = modelsToTry.flatMap(model => [
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
        ]);

        for (const endpoint of endpointsToTry) {
            try {
                console.log(`🔗 Trying Gemini API endpoint...`);
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `You are Swetha Saseendran's AI assistant. Answer questions about her portfolio based on:\n\n${portfolioKnowledge}\n\nQuestion: ${userQuery}\n\nBe concise and friendly.`
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 300,
                        }
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.candidates && data.candidates[0]?.content?.parts) {
                        console.log(`✅ Gemini API success!`);
                        return data.candidates[0].content.parts[0].text;
                    }
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    const errorMsg = errorData.error?.message || 'Unknown error';
                    console.log(`❌ Endpoint failed:`, errorMsg);
                    
                    // If the error suggests enabling the API, show helpful message
                    if (errorMsg.includes('API has not been used') || errorMsg.includes('enable')) {
                        console.error('💡 You may need to enable the Generative AI API in Google Cloud Console');
                    }
                }
            } catch (error) {
                console.log(`❌ Endpoint error:`, error.message);
            }
        }
        
        console.error('❌ All Gemini API attempts failed. The API key might need the Generative AI API enabled in Google Cloud Console.');
        return null;
    };

    // OpenAI API (Paid, but has free credits for new users)
    const fetchOpenAIResponse = async (userQuery, apiKey) => {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: `You are Swetha Saseendran's AI assistant. Answer questions about her portfolio, projects, experience, and skills based on the following information:\n\n${portfolioKnowledge}\n\nBe concise, friendly, and accurate. If asked about something not in the portfolio, politely say you don't have that information.`
                        },
                        ...messages.slice(-4).map(msg => ({
                            role: msg.role,
                            content: msg.content
                        })),
                        {
                            role: 'user',
                            content: userQuery
                        }
                    ],
                    max_tokens: 300,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            return data.choices[0]?.message?.content || null;
        } catch (error) {
            console.error('OpenAI API error:', error);
        }
        return null;
    };

    const getSimpleResponse = (query) => {
        const lowerQuery = query.toLowerCase();
        
        // Simple keyword matching for common questions
        if (lowerQuery.includes('who') || lowerQuery.includes('about')) {
            return "Swetha Saseendran is a Software Developer & AI Enthusiast who thrives at the intersection of artificial intelligence and software engineering. She architects intelligent systems from the ground up, working on web and Android applications and deploying scalable solutions on AWS.";
        }
        
        if (lowerQuery.includes('project') || lowerQuery.includes('work on')) {
            return "Swetha has worked on several projects including PyTrackX (an open-source Python library for object tracking), Poker AI Agent, Expense Tracker, House Price Prediction, AI-Powered Resume Builder, TeamX collaboration platform, and various computer vision projects. You can find more details about these projects on her portfolio.";
        }
        
        if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job')) {
            return "Swetha has worked at UMass Amherst (Software Engineering Intern, Mar 2025 - Present), Citi (Technology Analyst, Aug 2022 - Dec 2024), Citi JAC, ACM SSN, First Insight, SRIC-IIT Madras, and GUVI Geek Network. She has experience in full-stack development, AI/ML, computer vision, and cloud deployment.";
        }
        
        if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech')) {
            return "Swetha's skills include: Languages (Python, Java, C, TypeScript, JavaScript), Frontend (React, Next.js, Angular), Backend (Node.js, Spring Boot, Flask, Django, FastAPI), AI/ML (TensorFlow, PyTorch, OpenCV, MediaPipe, BERT), Cloud & DevOps (AWS, Docker, Git, CI/CD), and more. Check the Skills section on her portfolio for the complete list.";
        }
        
        if (lowerQuery.includes('contact') || lowerQuery.includes('github') || lowerQuery.includes('linkedin')) {
            return "You can find Swetha on GitHub at https://github.com/swetha4444. Her LinkedIn and resume are also available on her portfolio. Feel free to reach out!";
        }
        
        if (lowerQuery.includes('pytrackx')) {
            return "PyTrackX is Swetha's open-source Python library that tracks 80+ objects and body movements with a single function call. It's published on PyPI and available at https://pypi.org/project/PytrackX/. The GitHub repository is at https://github.com/swetha4444/PyTrackX";
        }
        
        return "I can help you learn about Swetha's portfolio, projects, work experience, and skills. Try asking about her projects, experience, skills, or specific technologies she works with!";
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[100] w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 border-2 border-pink-400/50 shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
                aria-label="Open Chatbot"
            >
                {isOpen ? (
                    <FaTimes className="text-white text-xl" />
                ) : (
                    <FaRobot className="text-white text-2xl group-hover:scale-110 transition-transform" />
                )}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-400 rounded-full animate-ping"></span>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-[100] w-96 h-[600px] bg-gradient-to-br from-slate-900/95 via-pink-950/95 to-rose-950/95 backdrop-blur-xl border-2 border-pink-500/40 rounded-2xl shadow-2xl shadow-pink-500/20 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-pink-600/80 to-rose-600/80 p-4 flex items-center justify-between border-b border-pink-400/30">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <FaRobot className="text-white text-xl" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg">Swetha's AI Assistant</h3>
                                <div className="flex items-center gap-2">
                                    <p className="text-pink-100 text-xs">Ask me anything!</p>
                                    {apiStatus === 'gemini' && (
                                        <span className="text-xs bg-green-500/30 text-green-200 px-2 py-0.5 rounded-full border border-green-400/50">
                                            🤖 Gemini AI
                                        </span>
                                    )}
                                    {apiStatus === 'openai' && (
                                        <span className="text-xs bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full border border-blue-400/50">
                                            🤖 OpenAI
                                        </span>
                                    )}
                                    {apiStatus === 'keyword' && (
                                        <span className="text-xs bg-yellow-500/30 text-yellow-200 px-2 py-0.5 rounded-full border border-yellow-400/50">
                                            📝 Keyword
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-pink-500/30 scrollbar-track-transparent">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                        message.role === 'user'
                                            ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white'
                                            : 'bg-white/10 backdrop-blur-sm text-gray-200 border border-pink-500/30'
                                    }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 backdrop-blur-sm text-gray-200 border border-pink-500/30 rounded-2xl px-4 py-2">
                                    <FaSpinner className="animate-spin text-pink-400" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-pink-500/30 bg-slate-900/50">
                        <div className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about projects, experience, skills..."
                                className="flex-1 bg-white/10 backdrop-blur-sm border border-pink-500/30 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-rose-400/50 focus:ring-2 focus:ring-pink-500/30 transition-all"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                            >
                                {isLoading ? (
                                    <FaSpinner className="animate-spin" />
                                ) : (
                                    <FaPaperPlane />
                                )}
                            </button>
                        </div>
                        <div className="mt-2 space-y-1">
                            {process.env.REACT_APP_GEMINI_API_KEY ? (
                                <p className="text-xs text-green-300/80">
                                    ✅ Gemini API configured - AI responses enabled
                                </p>
                            ) : process.env.REACT_APP_OPENAI_API_KEY ? (
                                <p className="text-xs text-blue-300/80">
                                    ✅ OpenAI API configured - AI responses enabled
                                </p>
                            ) : (
                                <p className="text-xs text-yellow-300/70">
                                    💡 Using keyword-based responses. Add REACT_APP_GEMINI_API_KEY for AI responses
                                </p>
                            )}
                            {process.env.REACT_APP_GEMINI_API_KEY && (
                                <p className="text-xs text-gray-400">
                                    
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PortfolioChatbot;

