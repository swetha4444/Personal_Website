import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ModelViewer from '../components/ModelViewer';
import MatrixRain from '../backgrounds/matrixRain';
import MatrixSection from '../components/MatrixSection';

const menuItems = [
  { title: 'Projects', path: '/Personal_Website/projects', model: `${process.env.PUBLIC_URL}/models/computer.glb` },
  { title: 'About Me', path: '/Personal_Website/about', model: `${process.env.PUBLIC_URL}/models/computer.glb` },
  { title: 'Work Experience', path: '/Personal_Website/work', model: `${process.env.PUBLIC_URL}/models/computer.glb` },
  { title: 'Research', path: '/Personal_Website/research', model: `${process.env.PUBLIC_URL}/models/computer.glb` },
];

export default function Menu() {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const playClickSound = useCallback(() => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/music/click.mp3`);
    audio.play();
  }, []);

  const paginate = useCallback((newDirection) => {
    playClickSound();
    setPage((prevPage) => (prevPage + newDirection + menuItems.length) % menuItems.length);
  }, [playClickSound]);

  const handleEnter = useCallback((path) => {
    playClickSound();
    setTimeout(() => navigate(path), 150);
  }, [playClickSound, navigate]);

  // useEffect for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [paginate]);

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      <MatrixRain />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-screen h-screen p-4">
        <MatrixSection className="w-full max-w-4xl flex flex-col items-center justify-center bg-transparent border-[#5dff4e]/50 shadow-2xl p-8 rounded-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#5dff4e] mb-8 text-center matrix-font tracking-widest drop-shadow-lg">
            SELECT A WEAPON
          </h1>

          <div
            className="relative w-full h-[26rem] flex items-center justify-center"
            style={{ perspective: '1200px' }}
          >
            {menuItems.map((item, index) => {
              const offset = index - page;
              const isVisible = Math.abs(offset) <= 1; // Only show center and adjacent cards

              const animate = {
                x: `${offset * 35}%`, // Adjust spacing between cards
                rotateY: offset * -45, // Angle of side cards
                scale: offset === 0 ? 1 : 0.7, // Center card is larger
                zIndex: menuItems.length - Math.abs(offset),
                opacity: isVisible ? 1 - Math.abs(offset) * 0.5 : 0, // Fade out side cards
              };

              return (
                <motion.div
                  key={index}
                  animate={animate}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="absolute w-full h-full p-4 bg-black/60 backdrop-blur-sm border-2 border-[#5dff4e]/40 rounded-xl flex flex-col items-center text-center shadow-lg shadow-[#5dff4e]/20"
                >
                  <h2 className="text-3xl font-bold text-[#5dff4e] mb-4 matrix-font tracking-wider">
                    {item.title}
                  </h2>
                  <div className="w-full h-48 mb-4 flex-grow">
                    <ModelViewer modelPath={item.model} />
                  </div>
                  <button
                    onClick={() => offset === 0 && handleEnter(item.path)}
                    className={`matrix-btn w-full px-6 py-2 font-bold text-[#5dff4e] text-lg rounded-lg matrix-font relative overflow-hidden ${
                      offset !== 0 ? 'pointer-events-none' : ''
                    }`}
                  >
                    <span className="relative z-10 tracking-widest">ENTER</span>
                    <span className="matrix-btn-glow"></span>
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center justify-between w-full max-w-xs mt-8">
            <button
              onClick={() => paginate(-1)}
              className="p-3 rounded-full text-[#5dff4e] border-2 border-[#5dff4e]/50 hover:bg-[#5dff4e]/20 transition"
            >
              <FaChevronLeft size={20} />
            </button>
            <span className="text-lg font-mono text-[#5dff4e]">
              {page + 1} / {menuItems.length}
            </span>
            <button
              onClick={() => paginate(1)}
              className="p-3 rounded-full text-[#5dff4e] border-2 border-[#5dff4e]/50 hover:bg-[#5dff4e]/20 transition"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </MatrixSection>
      </main>
    </div>
  );
}