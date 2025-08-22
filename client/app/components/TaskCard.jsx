"use client";
import { motion } from "framer-motion";

export default function TaskCard({ task, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-4 rounded-xl bg-gray-800 border border-gray-700 shadow-md hover:border-pink-500 transition cursor-pointer"
      onClick={onClick}
    >
      <h3 className="font-semibold text-white">{task.title}</h3>
      <p className="text-gray-400 text-sm">{task.status}</p>

      {task.dueDate && (
        <p className="mt-1 text-xs text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </motion.div>
  );
}