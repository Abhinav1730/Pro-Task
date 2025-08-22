"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/tasks", label: "Tasks" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // check token once it mounts
    const t = localStorage.getItem("token");
    setIsAuthed(!!t);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthed(false);
    router.push("/login");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-gray-900/90 via-black/70 to-gray-900/90 backdrop-blur"
    >
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight text-white"
          >
            Pro-Task
          </Link>

          <div className="hidden gap-6 md:flex">
            {navItems.map((item) => {
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition ${
                    active
                      ? "text-white"
                      : "text-gray-300 hover:text-white/90"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Auth actions */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthed ? (
              <button
                onClick={handleLogout}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl border border-white/20 px-4 py-2 text-sm text-gray-200 hover:bg-white/10 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="md:hidden rounded-lg border border-white/15 p-2 text-gray-200 hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            {/* Simple hamburger / close */}
            <span className="block h-0.5 w-5 bg-current mb-1"></span>
            <span className="block h-0.5 w-5 bg-current mb-1"></span>
            <span className="block h-0.5 w-5 bg-current"></span>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3 md:hidden">
            {navItems.map((item) => {
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-2 flex gap-2">
              {isAuthed ? (
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full rounded-xl border border-white/20 px-4 py-2 text-center text-sm text-gray-200 hover:bg-white/10 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 text-center text-sm font-semibold text-white hover:opacity-90 transition"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}