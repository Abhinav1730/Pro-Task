"use client";
import { motion } from "framer-motion";

export default function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="p-6 rounded-2xl bg-gray-800 border border-gray-700 shadow-lg cursor-pointer hover:border-purple-500 transition"
      onClick={onClick}
    >
      <h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
      <p className="text-gray-400 text-sm">{project.description}</p>

      {project.status && (
        <span className="mt-2 inline-block text-xs font-semibold px-2 py-1 rounded-full bg-purple-600 text-white">
          {project.status}
        </span>
      )}
    </motion.div>
  );
}