"use client";
import { useCallback } from "react";

const navItems = [
  { label: "Home", target: "hero" },
  { label: "About me", target: "aboutme" },
  { label: "Projects", target: "projects" },
  { label: "Cursus", target: "cursus" },
  { label: "Contact", target: "Contact" },
];

export default function Header() {
  const handleScroll = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Nom */}
        <div
          onClick={() => handleScroll("hero")}
          className="cursor-pointer text-xl font-extrabold text-gray-900 hover:text-red-500 transition-colors"
        >
          Sébastien Legros
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-8 text-sm font-medium text-gray-700">
            {navItems.map((item) => (
              <li
                key={item.target}
                className="cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => handleScroll(item.target)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
