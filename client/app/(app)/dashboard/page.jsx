"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fetchWithAuth } from "../../utils/api.js";
import ProjectCard from "../../components/ProjectCard";
import TaskCard from "../../components/TaskCard";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // fetching projects
        const projectData = await fetchWithAuth("/api/projects");
        setProjects(projectData.projects || []);

        // fetching tasks
        const taskData = await fetchWithAuth("/api/tasks");
        setTasks(taskData.tasks || []);
      } catch (err) {
        console.error("Dashboard error:", err.message);
        setError(" Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="animate-pulse text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black text-white p-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold">👋 Welcome Back</h1>
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

      {/* Projects Section */}
      <motion.section
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-semibold mb-4">📁 Your Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-400">No projects yet. Create one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onClick={() => router.push(`/projects/${project._id}`)}
              />
            ))}
          </div>
        )}
      </motion.section>

      {/* Tasks Section */}
      <motion.section
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-4">✅ Your Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-400">No tasks assigned yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onClick={() => console.log("Clicked task:", task.title)}
              />
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
}