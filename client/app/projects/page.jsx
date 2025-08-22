"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fetchWithAuth } from "../../utils/api.js";
import ProjectCard from "../../components/ProjectCard";

export default function ProjectsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchWithAuth("/api/projects");
        setProjects(data.projects || []);
      } catch (err) {
        console.error("Projects error:", err.message);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="animate-pulse text-lg">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black text-white p-6">
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold">📁 Your Projects</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition"
        >
          Logout
        </button>
      </motion.header>

      {error && (
        <p className="text-red-400 mb-4 text-center font-medium">{error}</p>
      )}

      {projects.length === 0 ? (
        <p className="text-gray-400 text-center">No projects yet. Create one!</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onClick={() => router.push(`/projects/${project._id}`)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}