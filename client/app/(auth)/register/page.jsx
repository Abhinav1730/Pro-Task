"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fetchWithAuth } from "../../utils/api.js"; // ✅ use centralized api.js

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // ✅ Using fetchWithAuth
      const data = await fetchWithAuth("/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      // ✅ Save token in localStorage
      localStorage.setItem("token", data.token);

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 px-4 relative overflow-hidden">
      {/* glowing background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 md:p-10"
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-300 text-center mb-6">
          Join Pro-Task and boost your productivity 🚀
        </p>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mb-4 text-center"
          >
            {error}
          </motion.p>
        )}

        {/* Success Message */}
        {success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 text-sm mb-4 text-center"
          >
            {success}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/5 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              placeholder="Abhinav Saxena"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/5 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              placeholder="abhinav@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength="8"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/5 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-pink-400 font-semibold cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </motion.div>
    </div>
  );
}