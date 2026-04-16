"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_KEYS = [
  { key: "home", target: "hero" },
  { key: "about", target: "aboutme" },
  { key: "projects", target: "projects" },
  { key: "technologies", target: "techno" },
  { key: "experience", target: "cursus" },
  { key: "contact", target: "contact" },
];

export default function Header() {
  const t = useTranslations('navigation');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    if (document.body.dataset.introReady === "true") {
      setIntroReady(true);
      return;
    }

    const onReady = () => setIntroReady(true);
    window.addEventListener("portfolio:intro-ready", onReady);
    return () => window.removeEventListener("portfolio:intro-ready", onReady);
  }, []);

  const scrollerRef = useRef<Window | HTMLElement>(
    typeof window !== "undefined" ? window : ({} as any)
  );
  useEffect(() => {
    const maybeMain = document.querySelector("main") as HTMLElement | null;
    if (maybeMain && maybeMain.scrollHeight > maybeMain.clientHeight) scrollerRef.current = maybeMain;
    else scrollerRef.current = window;
  }, []);

  const getSections = useCallback(() => {
    return NAV_KEYS.map(n => {
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

  const linkBase =
    "relative cursor-pointer rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-black/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white";

  const glass =
    "border border-[var(--line)] bg-[color:var(--surface)]/92 backdrop-blur shadow-[0_12px_32px_rgba(0,0,0,0.05)]";

  const underlineId = useMemo(() => "nav-underline", []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ opacity: 0, y: -24, filter: "blur(10px)" }}
      animate={introReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -24, filter: "blur(10px)" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Progress bar */}
      <div className="h-0.5 bg-transparent">
        <motion.div
          className="h-0.5 bg-[var(--accent)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <motion.div
        className={`mx-auto mt-3 w-[min(100%-1rem,1120px)] rounded-full ${glass}`}
        initial={{ scale: 0.96 }}
        animate={introReady ? { scale: 1 } : { scale: 0.96 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-5">
          {/* Logo */}
          <button
            onClick={() => go("hero")}
            className="group inline-flex min-w-0 items-center gap-3 text-left"
            aria-label={t('goToHome')}
          >
            <span className="inline-grid size-9 shrink-0 place-items-center overflow-hidden rounded-full border border-[var(--line)] bg-white/80">
              <Image 
                src="/icon.png" 
                alt="SL - Sébastien Legros" 
                width={36}
                height={36}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                Sébastien Legros
              </span>
              <span className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
                Full-stack engineer
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_KEYS.map((item) => {
                const isActive = active === item.target.toLowerCase();
                return (
                  <li key={item.target} className="relative">
                    <button
                      onClick={() => go(item.target)}
                      className={linkBase}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {t(item.key)}
                      {isActive && (
                        <motion.span
                          layoutId={underlineId}
                          className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[var(--accent)]"
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
            <LanguageSwitcher />

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-black/5 md:hidden dark:text-slate-300 dark:hover:bg-white/5"
              onClick={() => setOpen(true)}
              aria-label={t('openMenu')}
              aria-expanded={open}
              aria-controls="mobile-drawer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className="stroke-current">
                <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

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
            <motion.aside
              id="mobile-drawer"
              role="dialog" aria-modal="true"
              className="
                fixed right-0 top-0 z-50 h-[100dvh] w-[85%] max-w-[22rem]
                border-l border-[var(--line)] bg-[var(--background)] text-slate-900 shadow-2xl
                dark:text-slate-100
              "
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-5">
                <div className="flex items-center gap-3">
                  <Image src="/icon.png" alt="SL" width={36} height={36} className="rounded-full border border-[var(--line)]" />
                  <div>
                    <span className="block text-sm font-bold text-slate-950 dark:text-white">Sébastien Legros</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">{t('menu')}</span>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t('closeMenu')}
                  className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" className="stroke-current">
                    <path d="M6 6l12 12M18 6l-12 12" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="px-3 py-4">
                <ul className="flex flex-col">
                  {NAV_KEYS.map((item, idx) => {
                    const isActive = active === item.target.toLowerCase();
                    return (
                      <li key={item.target}>
                        <button
                          onClick={() => go(item.target)}
                          className={`w-full rounded-2xl px-4 py-3 text-left text-base font-semibold tracking-wide
                                      ${isActive
                              ? "bg-black/5 text-slate-900 dark:bg-white/5 dark:text-slate-100"
                              : "text-slate-900 hover:bg-black/5 dark:text-slate-100 dark:hover:bg-white/5"}`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {t(item.key)}
                        </button>
                        {idx === 2 && (
                          <hr className="mx-4 my-3 border-t border-[var(--line)]" />
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
    </motion.header>
  );
}
