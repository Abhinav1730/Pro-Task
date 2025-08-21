"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[150px] absolute -top-40 -left-40"></div>
        <div className="w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] absolute bottom-0 right-0"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center backdrop-blur-sm bg-white/5 p-10 rounded-2xl shadow-xl border border-white/10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          Pro-Task
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
          A modern, collaborative task & project manager. Stay productive, stay
          in sync, and achieve more together. ✨
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/login")}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 text-purple-400 font-semibold shadow-md hover:shadow-purple-500/30 hover:scale-105 transition border border-gray-600"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold text-white shadow-md hover:shadow-pink-500/40 hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 text-sm text-gray-500"
      >
        © {new Date().getFullYear()} Pro-Task. All rights reserved.
        <span className="text-purple-400"> Built by Abhinav Saxena</span>
      </motion.footer>
    </div>
  );
}