import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaJava, FaAws } from "react-icons/fa";
import {
  SiPython, SiC, SiTypescript, 
  SiReact, SiNextdotjs, SiAngular, SiNodedotjs, SiSpringboot, SiFlask, SiDjango, SiFastapi, SiPhp, SiAndroid,
  SiTensorflow, SiPytorch, SiOpencv, SiMediapipe, SiHuggingface,
  SiMysql, SiMongodb, SiElasticsearch, SiApachekafka, SiRedis, SiTableau,
  SiDocker, SiGit, SiJenkins, SiGithubactions
} from "react-icons/si";


const skillsData = [
  {
    category: "Languages",
    skills: [
      { name: "Python", icon: <SiPython size={24} /> },
      { name: "Java", icon: <FaJava size={24} /> },
      { name: "C", icon: <SiC size={24} /> },
      { name: "TypeScript", icon: <SiTypescript size={24} /> },
    ],
  },
  {
    category: "Web & Backend",
    skills: [
      { name: "React", icon: <SiReact size={24} /> },
      { name: "Next.js", icon: <SiNextdotjs size={24} /> },
      { name: "Angular", icon: <SiAngular size={24} /> },
      { name: "Node.js", icon: <SiNodedotjs size={24} /> },
      { name: "Spring Boot", icon: <SiSpringboot size={24} /> },
      { name: "Flask", icon: <SiFlask size={24} /> },
      { name: "Django", icon: <SiDjango size={24} /> },
      { name: "FastAPI", icon: <SiFastapi size={24} /> },
      { name: "PHP", icon: <SiPhp size={24} /> },
      { name: "Android", icon: <SiAndroid size={24} /> },
    ],
  },
  {
    category: "Machine Learning",
    skills: [
      { name: "TensorFlow", icon: <SiTensorflow size={24} /> },
      { name: "PyTorch", icon: <SiPytorch size={24} /> },
      { name: "OpenCV", icon: <SiOpencv size={24} /> },
      { name: "MediaPipe", icon: <SiMediapipe size={24} /> },
      { name: "Hugging Face", icon: <SiHuggingface size={24} /> },
    ],
  },
  {
    category: "Data & Databases",
    skills: [
      { name: "SQL", icon: <SiMysql size={24} /> },
      { name: "MongoDB", icon: <SiMongodb size={24} /> },
      { name: "ElasticSearch", icon: <SiElasticsearch size={24} /> },
      { name: "Kafka", icon: <SiApachekafka size={24} /> },
      { name: "Redis", icon: <SiRedis size={24} /> },
      { name: "Tableau", icon: <SiTableau size={24} /> },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: <FaAws size={24} /> },
      { name: "Docker", icon: <SiDocker size={24} /> },
      { name: "Git", icon: <SiGit size={24} /> },
      { name: "Jenkins", icon: <SiJenkins size={24} /> },
      { name: "GitHub Actions", icon: <SiGithubactions size={24} /> },
    ],
  },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 100 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: { opacity: 0, scale: 0.8, y: 100 },
};

export default function SkillsPopup({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={popupVariants}
            className="relative w-full max-w-4xl h-[80vh] bg-gradient-to-br from-[#0a1e0a] via-[#181c1f] to-[#0a1e0a] border-4 border-[#5dff4e] rounded-2xl shadow-[0_0_64px_#5dff4e66] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b-2 border-[#5dff4e]/30">
              <h2 className="text-3xl matrix-font text-[#5dff4e] tracking-widest">Skills Matrix</h2>
              <button
                onClick={onClose}
                className="text-[#5dff4e] hover:text-white text-2xl bg-black/40 rounded-full p-2 border border-[#5dff4e] shadow"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillsData.map((category) => (
                  <motion.div 
                    key={category.category} 
                    className="bg-[#1a2e1e]/30 border border-[#5dff4e]/50 rounded-lg p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-xl matrix-font text-[#9aff8d] mb-4 border-b border-[#5dff4e]/30 pb-2">{category.category}</h3>
                    <div className="flex flex-wrap gap-4">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="flex items-center gap-2 bg-[#101214] border border-transparent hover:border-[#5dff4e] p-2 rounded-md transition-all cursor-pointer">
                          <span className="text-[#5dff4e]">{skill.icon}</span>
                          <span className="text-green-200 font-mono">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
