import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Pro-Task",
  description: "Project & Task Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}