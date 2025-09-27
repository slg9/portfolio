"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const NAV = [
  { label: "Accueil", target: "hero" },
  { label: "À propos", target: "aboutme" },
  { label: "Projets", target: "projects" },
  { label: "Technos", target: "techno" },
  { label: "Parcours", target: "cursus" },
  { label: "Contact", target: "contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  const scrollerRef = useRef<Window | HTMLElement>(
    typeof window !== "undefined" ? window : ({} as any)
  );
  useEffect(() => {
    const maybeMain = document.querySelector("main") as HTMLElement | null;
    if (maybeMain && maybeMain.scrollHeight > maybeMain.clientHeight) scrollerRef.current = maybeMain;
    else scrollerRef.current = window;
  }, []);

  const getSections = useCallback(() => {
    return NAV.map(n => {
      const el = document.getElementById(n.target) || document.getElementById(n.target.toLowerCase());
      return el as HTMLElement | null;
    }).filter(Boolean) as HTMLElement[];
  }, []);

  const lockUntilRef = useRef(0);
  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      if (Date.now() < lockUntilRef.current) return;
      const sections = getSections();
      if (!sections.length) return;

      const viewportH = window.innerHeight;
      const centerY = viewportH / 2;
      let bestId = active;
      let bestDist = Number.POSITIVE_INFINITY;

      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.bottom <= 0 || r.top >= viewportH) continue;
        const elCenter = r.top + r.height / 2;
        const dist = Math.abs(elCenter - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = el.id.toLowerCase();
        }
      }
      if (bestId && bestId !== active) setActive(bestId);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };
    const onResize = onScroll;

    const scroller = scrollerRef.current as any;
    (scroller === window ? window : scroller).addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    compute();
    return () => {
      (scroller === window ? window : scroller).removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onResize as any);
    };
  }, [active, getSections]);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scroller = scrollerRef.current as any;
      if (scroller === window) {
        const doc = document.documentElement;
        const top = doc.scrollTop;
        const max = doc.scrollHeight - doc.clientHeight || 1;
        setProgress((top / max) * 100);
      } else {
        const el = scroller as HTMLElement;
        const top = el.scrollTop;
        const max = el.scrollHeight - el.clientHeight || 1;
        setProgress((top / max) * 100);
      }
    };
    update();
    const scroller = scrollerRef.current as any;
    (scroller === window ? window : scroller).addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      (scroller === window ? window : scroller).removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = useCallback((id: string) => {
    const el = document.getElementById(id) || document.getElementById(id.toLowerCase());
    if (!el) return;
    setActive(el.id.toLowerCase());
    lockUntilRef.current = Date.now() + 600;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }, []);

  // ==== styles (UGC-like + dark) ====
  const linkBase =
    "relative cursor-pointer px-2 py-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors dark:text-slate-300 dark:hover:text-slate-100";

  // “verre” pour la barre : clair ↔ sombre
  const glass =
    "bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-slate-200/70 shadow-sm " +
    "dark:bg-slate-900/70 dark:supports-[backdrop-filter]:bg-slate-900/60 dark:border-slate-700/60";

  const underlineId = useMemo(() => "nav-underline", []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Progress bar */}
      <div className="h-0.5 bg-transparent">
        <motion.div
          className="h-0.5 bg-gradient-to-r from-indigo-600 to-sky-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={`mx-auto mt-2 w-[min(100%-1rem,1100px)] rounded-2xl ${glass}`}>
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <button
            onClick={() => go("hero")}
            className="group inline-flex items-center gap-2 text-left"
            aria-label="Aller à l’accueil"
          >
            <span className="inline-grid size-8 place-items-center rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white text-xs font-bold shadow-sm">
              <Image 
                src="/icon.png" 
                alt="SL - Sébastien Legros" 
                width={32} 
                height={32}
                className="rounded-lg"
                priority
              />
            </span>
            <span className="text-base font-extrabold tracking-[-0.01em] text-slate-900 dark:text-slate-100">
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
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId={underlineId}
                          className="absolute inset-x-1 -bottom-1 h-[2px] rounded-full bg-slate-900 dark:bg-slate-100"
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
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
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
            {/* overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* panneau inspiré UGC */}
            <motion.aside
              id="mobile-drawer"
              role="dialog" aria-modal="true"
              className="
                fixed right-0 top-0 z-50 h-[100dvh] w-[85%] max-w-[22rem]
                bg-slate-100 text-slate-900 shadow-2xl
                dark:bg-slate-900 dark:text-slate-100
              "
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* top bar : grand 'MENU' + close à droite */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-300 dark:border-slate-700">
                <span className="text-2xl font-extrabold tracking-wide uppercase">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="rounded-md p-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" className="stroke-current">
                    <path d="M6 6l12 12M18 6l-12 12" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* liste */}
              <nav className="px-2 py-2">
                <ul className="flex flex-col">
                  {NAV.map((item, idx) => {
                    const isActive = active === item.target.toLowerCase();
                    return (
                      <li key={item.target}>
                        <button
                          onClick={() => go(item.target)}
                          className={`w-full text-left px-5 py-4 text-[16px] font-semibold tracking-wide
                                      ${isActive
                              ? "text-slate-900 bg-white dark:bg-slate-800 dark:text-slate-100"
                              : "text-slate-900 hover:bg-white dark:text-slate-100 dark:hover:bg-slate-800"}`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.label.toUpperCase()}
                        </button>

                        {/* Divider après “Projets” pour rappeler la capture */}
                        {idx === 2 && (
                          <hr className="mx-5 my-2 border-t border-slate-300 dark:border-slate-700" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
