"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV = [
  { label: "Accueil",  target: "hero" },
  { label: "À propos", target: "aboutme" },
  { label: "Projets",  target: "projects" },
  { label: "Technos",  target: "techno" },   // ⚠️ assure-toi que la section a bien id="techno"
  { label: "Parcours", target: "cursus" },
  { label: "Contact",  target: "contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  // --- scroller: window ou <main> (si ta page scrolle dans main)
  const scrollerRef = useRef<Window | HTMLElement>(typeof window !== "undefined" ? window : ({} as any));
  useEffect(() => {
    const maybeMain = document.querySelector("main") as HTMLElement | null;
    if (maybeMain && maybeMain.scrollHeight > maybeMain.clientHeight) {
      scrollerRef.current = maybeMain;
    } else {
      scrollerRef.current = window;
    }
  }, []);

  // --- util: sections présentes dans le DOM
  const getSections = useCallback(() => {
    return NAV.map(n => {
      const el = document.getElementById(n.target) || document.getElementById(n.target.toLowerCase());
      return el as HTMLElement | null;
    }).filter(Boolean) as HTMLElement[];
  }, []);

  // --- ScrollSpy: section la plus proche du centre de l'écran
  const lockUntilRef = useRef(0); // pour ne pas écraser l'active juste après un clic
  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;

      // on garde la valeur choisie par le clic pendant 600ms
      if (Date.now() < lockUntilRef.current) return;

      const sections = getSections();
      if (!sections.length) return;

      const viewportH = window.innerHeight; // getBoundingClientRect est relatif au viewport
      const centerY = viewportH / 2;

      let bestId = active;
      let bestDist = Number.POSITIVE_INFINITY;

      for (const el of sections) {
        const r = el.getBoundingClientRect();
        // ignorons ce qui est totalement hors écran (optionnel)
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

    // calcule initial
    compute();

    return () => {
      (scroller === window ? window : scroller).removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onResize as any);
    };
  }, [active, getSections]);

  // --- Scroll progress (fonctionne avec window OU main)
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

  // --- Scroll to section (underline immédiat + lock 600ms)
  const go = useCallback((id: string) => {
    const el = document.getElementById(id) || document.getElementById(id.toLowerCase());
    if (!el) return;
    setActive(el.id.toLowerCase());
    lockUntilRef.current = Date.now() + 600;

    // scroll doux
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }, []);

  // --- styles
  const linkBase =
    "relative cursor-pointer px-2 py-1 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900";
  const glass =
    "bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-slate-200/70";
  const underlineId = useMemo(() => "nav-underline", []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* barre de progression */}
      <div className="h-0.5 bg-transparent">
        <motion.div
          className="h-0.5 bg-gradient-to-r from-indigo-600 to-sky-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={`mx-auto mt-2 w-[min(100%-1rem,1100px)] rounded-2xl ${glass} shadow-sm`}>
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
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
                      aria-current={isActive ? "page" : undefined}
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
                          aria-current={isActive ? "page" : undefined}
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
