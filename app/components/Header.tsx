"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV = [
  { label: "Accueil",  target: "hero" },
  { label: "À propos", target: "aboutme" },
  { label: "Projets",  target: "projects" },
  { label: "Parcours", target: "cursus" },
  { label: "Contact",  target: "contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero"); // section courante

  // --- Scroll to section
  const go = useCallback((id: string) => {
    const el = document.getElementById(id) || document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  }, []);

  // --- Lock scroll when drawer open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // --- Observe sections to highlight active item
  useEffect(() => {
    const ids = NAV.map(n => n.target);
    const sections = ids
      .map((id) => document.getElementById(id) || document.getElementById(id.toLowerCase()))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id.toLowerCase());
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.2, 0.4, 0.6] }
    );

    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // --- Classes
  const linkBase =
    "relative cursor-pointer px-2 py-1 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900";
  const glass =
    "bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-slate-200/70";

  // --- Scroll progress (fine touche)
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // LayoutId for underline
  const underlineId = useMemo(() => "nav-underline", []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* fine barre de progression */}
      <div className="h-0.5 bg-transparent">
        <motion.div
          className="h-0.5 bg-gradient-to-r from-indigo-600 to-sky-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={`mx-auto mt-2 w-[min(100%-1rem,1100px)] rounded-2xl ${glass} shadow-sm`}>
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo / nom */}
          <button
            onClick={() => go("hero")}
            className="group inline-flex items-center gap-2 text-left"
            aria-label="Aller à l’accueil"
          >
            <span className="inline-grid size-8 place-items-center rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white text-xs font-bold shadow-sm">
              SL
            </span>
            <span className="text-base font-extrabold tracking-[-0.01em] text-slate-900">
              Sébastien Legros
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-2">
              {NAV.map((item) => {
                const isActive = active === item.target.toLowerCase();
                return (
                  <li key={item.target} className="relative">
                    <button
                      onClick={() => go(item.target)}
                      className={linkBase}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId={underlineId}
                          className="absolute inset-x-1 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-indigo-600 to-sky-500"
                          transition={{ type: "spring", stiffness: 450, damping: 30 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => go("contact")}
              className="hidden md:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Me contacter
            </button>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className="stroke-current">
                <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Drawer mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="mobile-drawer"
              role="dialog" aria-modal="true"
              className={`fixed right-0 top-0 z-50 h-[100dvh] w-72 ${glass} shadow-2xl`}
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/70">
                <span className="text-base font-semibold text-slate-900">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="rounded-md p-2 hover:bg-slate-100"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" className="stroke-current">
                    <path d="M6 6l12 12M18 6l-12 12" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="px-2 py-4">
                <ul className="flex flex-col">
                  {NAV.map((item) => {
                    const isActive = active === item.target.toLowerCase();
                    return (
                      <li key={item.target}>
                        <button
                          onClick={() => go(item.target)}
                          className={`w-full rounded-lg px-4 py-3 text-left text-[15px] font-medium transition
                                      ${isActive ? "text-slate-900 bg-slate-100" : "text-slate-800 hover:bg-slate-100"}`}
                        >
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="absolute inset-x-0 bottom-0 border-t border-slate-200/70 bg-white/70 p-4 backdrop-blur">
                <button
                  onClick={() => go("contact")}
                  className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-3 text-white font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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
