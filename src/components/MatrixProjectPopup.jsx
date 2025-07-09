import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import MatrixRain from "../backgrounds/matrixRain";

export default function MatrixProjectPopup({ open, onClose, project }) {
  if (!open || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
        transition={{ duration: 0.22, ease: [0.4, 0.8, 0.6, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className="relative bg-gradient-to-br from-[#0a1e0a] via-[#181c1f] to-[#0a1e0a] border-4 border-[#5dff4e] rounded-3xl shadow-[0_0_64px_#5dff4e66] p-8 max-w-lg w-full mx-4 flex flex-col items-center"
        >
          {/* X Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#5dff4e] hover:text-[#00ff00] text-xl bg-black/40 rounded-full p-2 border border-[#5dff4e] shadow z-20"
            aria-label="Close"
          >
            <FaTimes />
          </button>
          {/* Matrix rain effect */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* <MatrixRain /> */}
          </div>
          {/* Project Title */}
          <h2 className="text-2xl font-bold text-[#5dff4e] mb-2 matrix-font z-10 text-center drop-shadow">
            {project.title}
          </h2>
          {/* Project Description */}
          <p className="text-green-200 mb-4 text-center z-10">{project.description}</p>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 z-10 justify-center">
            {project.tags &&
              project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#181c1f] border border-[#5dff4e] text-[#5dff4e] text-xs font-mono shadow"
                >
                  {tag}
                </span>
              ))}
          </div>
          {/* External Link */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#181c1f] border-2 border-[#5dff4e] text-[#5dff4e] font-mono text-base shadow-[0_2px_12px_#5dff4e99] hover:bg-[#222] hover:text-[#00ff00] active:scale-95 transition-all duration-150 z-10"
          >
            <FaExternalLinkAlt />
            Open in GitHub
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}