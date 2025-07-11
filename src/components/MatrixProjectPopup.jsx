import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaGithub, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import MatrixRain from "../backgrounds/matrixRain";
import StaticPixelOverlay from "./StaticPixelOverlay";

export default function MatrixProjectPopup({ open, onClose, project }) {
  const [imgIdx, setImgIdx] = useState(0);

  if (!open || !project) return null;

  const nextImg = () => setImgIdx((imgIdx + 1) % project.images.length);
  const prevImg = () => setImgIdx((imgIdx - 1 + project.images.length) % project.images.length);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
        transition={{ duration: 0.28, ease: [0.4, 0.8, 0.6, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className="relative w-full max-w-3xl h-[90vh] max-h-[900px] bg-gradient-to-br from-[#0a1e0a] via-[#181c1f] to-[#0a1e0a] border-4 border-[#5dff4e] rounded-[2rem] shadow-[0_0_64px_#5dff4e66] overflow-y-auto"
          onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        >
          {/* Static overlay */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <StaticPixelOverlay />
          </div>
          {/* X Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 right-4 float-right text-[#5dff4e] hover:text-[#00ff00] text-xl bg-black/40 rounded-full p-2 border border-[#5dff4e] shadow z-20"
            aria-label="Close"
          >
            <FaTimes />
          </button>
          
          <div className="p-8 pt-16">
            {/* Image slider or Video Player */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div
                className="relative rounded-xl overflow-hidden bg-black border-2 border-[#5dff4e] shadow-lg"
                style={{
                  width: "100%",
                  maxWidth: "560px",
                  aspectRatio: "16 / 9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {project.video ? (
                  <video
                    src={project.video}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                ) : (
                  <>
                    <AnimatePresence initial={false} mode="wait">
                      <motion.img
                        key={project.images?.[imgIdx] || 'no-image'}
                        src={project.images?.[imgIdx] || process.env.PUBLIC_URL + "/images/placeholder.png"}
                        alt={project.title}
                        className="w-full h-full"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>
                    {project.images && project.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImg}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#181c1f] border-2 border-[#5dff4e] rounded-full p-2 text-[#5dff4e] hover:bg-[#222] z-10"
                          aria-label="Previous image"
                        >
                          <FaChevronLeft />
                        </button>
                        <button
                          onClick={nextImg}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#181c1f] border-2 border-[#5dff4e] rounded-full p-2 text-[#5dff4e] hover:bg-[#222] z-10"
                          aria-label="Next image"
                        >
                          <FaChevronRight />
                        </button>
                      </>
                    )}
                    {project.images && project.images.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {project.images.map((_, i) => (
                          <span
                            key={i}
                            className={`w-2 h-2 rounded-full ${i === imgIdx ? "bg-[#5dff4e]" : "bg-[#234c2e]"}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* Details */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-[#5dff4e] mb-2">{project.title}</h2>
              <p className="text-green-200 mb-4">{project.para}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-[#1a2e1e] border border-[#5dff4e] text-[#5dff4e] text-xs font-mono">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#181c1f] border-2 border-[#5dff4e] text-[#5dff4e] rounded-lg font-bold hover:bg-[#222] transition w-max"
                  >
                    <FaGithub /> View on GitHub
                  </a>
                )}
                {project.link && project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#181c1f] border-2 border-[#5dff4e] text-[#5dff4e] rounded-lg font-bold hover:bg-[#222] transition w-max"
                  >
                    <FaExternalLinkAlt /> More Details
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}