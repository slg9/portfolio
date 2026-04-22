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
    typeof window !== "undefined" ? window : ({} as Window)
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

    const scroller = scrollerRef.current as Window & typeof globalThis;
    (scroller === window ? window : scroller).addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    compute();
    return () => {
      (scroller === window ? window : scroller).removeEventListener("scroll", onScroll as EventListener);
      window.removeEventListener("resize", onResize as EventListener);
    };
  }, [active, getSections]);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scroller = scrollerRef.current as Window & typeof globalThis;
      if (scroller === window) {
        const doc = document.documentElement;
        const top = doc.scrollTop;
        const max = doc.scrollHeight - doc.clientHeight || 1;
        setProgress((top / max) * 100);
      } else {
        const el = scroller as unknown as HTMLElement;
        const top = el.scrollTop;
        const max = el.scrollHeight - el.clientHeight || 1;
        setProgress((top / max) * 100);
      }
    };
    update();
    const scroller = scrollerRef.current as Window & typeof globalThis;
    (scroller === window ? window : scroller).addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      (scroller === window ? window : scroller).removeEventListener("scroll", update as EventListener);
      window.removeEventListener("resize", update as EventListener);
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

  const underlineId = useMemo(() => "nav-underline", []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ opacity: 0, y: -24, filter: "blur(10px)" }}
      animate={introReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -24, filter: "blur(10px)" }}
      transition={{ duration: 1.35, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Progress bar */}
      <div style={{ height: 2, background: "transparent" }}>
        <motion.div
          style={{ height: 2, background: "#0A84FF", width: `${progress}%` }}
        />
      </div>

      <motion.div
        style={{
          margin: "12px auto 0",
          width: "min(100% - 1rem, 1120px)",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(4,4,15,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
        initial={{ scale: 0.96 }}
        animate={introReady ? { scale: 1 } : { scale: 0.96 }}
        transition={{ duration: 1.2, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-5">
          {/* Logo */}
          <button
            onClick={() => go("hero")}
            className="group inline-flex min-w-0 items-center gap-3 text-left"
            aria-label={t('goToHome')}
          >
            <span style={{ display: "inline-grid", width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0, placeItems: "center" }}>
              <Image
                src="/icon.png"
                alt="SL - Sébastien Legros"
                width={36}
                height={36}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                priority
              />
            </span>
            <span className="min-w-0">
              <span
                className="block truncate text-sm font-extrabold tracking-[-0.02em]"
                style={{ background: "linear-gradient(135deg, #F0F4FF, #6B7A99)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Sébastien Legros
              </span>
              <span className="hidden text-xs sm:block" style={{ color: "#6B7A99" }}>
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
                      className="relative cursor-pointer rounded-full px-3 py-2 text-sm font-medium transition-colors"
                      style={{ color: isActive ? "#F0F4FF" : "#6B7A99" }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {t(item.key)}
                      {isActive && (
                        <motion.span
                          layoutId={underlineId}
                          style={{
                            position: "absolute",
                            left: 12,
                            right: 12,
                            bottom: -2,
                            height: 2,
                            borderRadius: 999,
                            background: "#0A84FF",
                          }}
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
              style={{ display: "inline-flex", width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: "50%", color: "#6B7A99", background: "transparent", border: "none", cursor: "pointer" }}
              onClick={() => setOpen(true)}
              aria-label={t('openMenu')}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              className="md:hidden"
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
              style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              style={{
                position: "fixed",
                right: 0,
                top: 0,
                zIndex: 50,
                height: "100dvh",
                width: "85%",
                maxWidth: "22rem",
                borderLeft: "1px solid rgba(255,255,255,0.07)",
                background: "#04040F",
                color: "#F0F4FF",
                boxShadow: "-16px 0 48px rgba(0,0,0,0.5)",
              }}
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Image src="/icon.png" alt="SL" width={36} height={36} style={{ borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)" }} />
                  <div>
                    <span style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: "#F0F4FF" }}>Sébastien Legros</span>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "#6B7A99" }}>{t('menu')}</span>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t('closeMenu')}
                  style={{ borderRadius: "50%", padding: 8, background: "transparent", border: "none", cursor: "pointer", color: "#6B7A99" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" className="stroke-current">
                    <path d="M6 6l12 12M18 6l-12 12" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav style={{ padding: "16px 12px" }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" }}>
                  {NAV_KEYS.map((item, idx) => {
                    const isActive = active === item.target.toLowerCase();
                    return (
                      <li key={item.target}>
                        <button
                          onClick={() => go(item.target)}
                          style={{
                            width: "100%",
                            borderRadius: 16,
                            padding: "12px 16px",
                            textAlign: "left",
                            fontSize: "1rem",
                            fontWeight: 600,
                            letterSpacing: "0.01em",
                            background: isActive ? "rgba(10,132,255,0.1)" : "transparent",
                            color: isActive ? "#F0F4FF" : "#6B7A99",
                            border: "none",
                            cursor: "pointer",
                            transition: "background 180ms ease, color 180ms ease",
                          }}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {t(item.key)}
                        </button>
                        {idx === 2 && (
                          <hr style={{ margin: "12px 16px", border: "none", borderTop: "1px solid rgba(255,255,255,0.07)" }} />
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
