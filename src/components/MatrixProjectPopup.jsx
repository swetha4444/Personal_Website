import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import MatrixRain from "../backgrounds/matrixRain";
import StaticPixelOverlay from "./StaticPixelOverlay";

export default function MatrixProjectPopup({ open, onClose, project }) {
  if (!open || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
        transition={{ duration: 0.28, ease: [0.4, 0.8, 0.6, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className="relative w-full max-w-3xl h-[80vh] p-8 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1e0a] via-[#181c1f] to-[#0a1e0a] border-4 border-[#5dff4e] rounded-[2rem] shadow-[0_0_64px_#5dff4e66] overflow-hidden"
        >
          {/* Static overlay */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <StaticPixelOverlay />
          </div>
          {/* X Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#5dff4e] hover:text-[#00ff00] text-xl bg-black/40 rounded-full p-2 border border-[#5dff4e] shadow z-20"
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <h2 className="text-2xl font-bold text-[#5dff4e] mb-2 matrix-font z-10 text-center drop-shadow">
            {project.title}
          </h2>
          <p className="text-green-200 mb-4 text-center z-10">{project.description}</p>
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