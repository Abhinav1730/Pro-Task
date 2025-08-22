"use client";
import Navbar from "../components/Navbar";

export default function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black p-6">
        {children}
      </main>
    </>
  );
}