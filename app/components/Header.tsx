"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { label: "Accueil", target: "hero" },
  { label: "À propos", target: "aboutme" },
  { label: "Projets", target: "projects" },
  { label: "Parcours", target: "cursus" },
  { label: "Contact", target: "contact" }, // idéal : id en minuscules
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((id: string) => {
    const el =
      document.getElementById(id) ||
      document.getElementById(id.toLowerCase()); // fallback si "Contact" vs "contact"
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    } else {
      console.warn("Section introuvable:", id);
    }
  }, []);

  // Verrouille le scroll de la page quand le menu est ouvert
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Ferme au "Escape"
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Nom */}
        <button
          onClick={() => handleScroll("hero")}
          className="cursor-pointer text-left text-xl font-extrabold text-gray-900 transition-colors hover:text-red-500"
          aria-label="Aller à l’accueil"
        >
          Sébastien Legros
        </button>

        {/* Navigation desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 text-sm font-medium text-gray-700">
            {navItems.map((item) => (
              <li key={item.target}>
                <button
                  className="cursor-pointer transition-colors hover:text-red-500"
                  onClick={() => handleScroll(item.target)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Burger mobile */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          aria-controls="mobile-drawer"
        >
          {/* Icône burger */}
          <svg width="24" height="24" viewBox="0 0 24 24" className="stroke-current">
            <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Drawer mobile */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Panneau */}
            <motion.aside
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              className="fixed right-0 top-0 z-50 h-[100dvh] w-72 bg-white shadow-2xl outline-none"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              ref={panelRef}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <span className="text-base font-semibold text-gray-900">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="rounded-md p-2 hover:bg-gray-100"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" className="stroke-current">
                    <path d="M6 6l12 12M18 6l-12 12" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="px-2 py-4">
                <ul className="flex flex-col">
                  {navItems.map((item) => (
                    <li key={item.target}>
                      <button
                        onClick={() => handleScroll(item.target)}
                        className="w-full rounded-lg px-4 py-3 text-left text-[15px] font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* CTA en bas (optionnel) */}
              <div className="absolute inset-x-0 bottom-0 p-4 border-t bg-white">
                <button
                  onClick={() => handleScroll("contact")}
                  className="w-full rounded-lg bg-red-500 px-4 py-3 text-white font-semibold hover:bg-red-600 active:bg-red-700"
                >
                  Me contacter
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
