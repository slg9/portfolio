"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

// ── BUILDING DATA (bottom → top) ──────────────────────────────────────────────
const FLOORS = [
  { name: "Next.js 15",    label: "Framework",   emoji: "△", accent: "#C8D6EF", bg: "rgba(200,214,239,0.06)" },
  { name: "React 19",      label: "UI",          emoji: "⚛", accent: "#61DAFB", bg: "rgba(97,218,251,0.06)"  },
  { name: "TypeScript",    label: "Types",       emoji: "T", accent: "#4A90D9", bg: "rgba(74,144,217,0.07)"  },
  { name: "Tailwind CSS",  label: "Styles",      emoji: "◈", accent: "#38BDF8", bg: "rgba(56,189,248,0.06)"  },
  { name: "Framer Motion", label: "Animations",  emoji: "◐", accent: "#BB86FC", bg: "rgba(187,134,252,0.07)" },
  { name: "Lottie",        label: "Micro-anims", emoji: "◎", accent: "#FF8C69", bg: "rgba(255,140,105,0.06)" },
  { name: "Vercel",        label: "Deploy",      emoji: "▲", accent: "#F0F4FF", bg: "rgba(240,244,255,0.06)" },
] as const;

// ── FLOOR BLOCK ───────────────────────────────────────────────────────────────
function BuildingFloor({
  name, label, emoji, accent, bg, index, total, burstCount,
}: {
  name: string; label: string; emoji: string; accent: string; bg: string;
  index: number; total: number; burstCount: number;
}) {
  const isTop = index === total - 1;
  const delay = 0.08 + index * 0.11;
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!burstCount || !innerRef.current) return;
    const el = innerRef.current;
    const xOff = (Math.random() - 0.5) * 60;
    const yOff = -(Math.random() * 55 + 15);
    const rot = (Math.random() - 0.5) * 18;
    const stagger = index * 45;

    const anim = el.animate([
      { transform: "translate(0px,0px) rotate(0deg)", opacity: 1 },
      { transform: `translate(${xOff}px,${yOff}px) rotate(${rot}deg)`, opacity: 0.7, offset: 0.38 },
      { transform: "translate(0px,0px) rotate(0deg)", opacity: 1 },
    ], { duration: 900, delay: stagger, easing: "cubic-bezier(0.34,1.56,0.64,1)", fill: "none" });

    return () => anim.cancel();
  }, [burstCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -44, scaleY: 0.7 }}
      whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
      viewport={{ once: true, margin: "-15% 0px -5% 0px" }}
      transition={{ delay, duration: 0.48, ease: [0.34, 1.4, 0.64, 1] }}
    >
      <div
        ref={innerRef}
        style={{
          position: "relative",
          height: isTop ? 54 : 42,
          background: bg,
          borderLeft: `3px solid ${accent}40`,
          borderRight: `1px solid ${accent}18`,
          borderTop: `1px solid ${accent}35`,
          borderBottom: "none",
          borderRadius: isTop ? "8px 8px 0 0" : 0,
          display: "flex", alignItems: "center",
          padding: "0 18px", gap: 12,
          boxShadow: `inset 0 1px 0 ${accent}22, 8px 2px 16px rgba(0,0,0,0.28)`,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Scan shimmer on enter */}
        <motion.div
          style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(90deg, transparent 0%, ${accent}12 50%, transparent 100%)`,
            pointerEvents: "none",
          }}
          initial={{ x: "-100%" }}
          whileInView={{ x: "200%" }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.25, duration: 0.65, ease: "easeOut" }}
        />

        <span style={{
          fontSize: isTop ? "1rem" : "0.85rem",
          lineHeight: 1, color: accent, opacity: 0.9,
          width: 20, textAlign: "center", flexShrink: 0,
        }}>
          {emoji}
        </span>

        <span style={{
          fontSize: "0.8125rem", fontWeight: 600,
          color: "#CDD6F0", flex: 1,
          fontFamily: "var(--font-display), sans-serif",
          letterSpacing: "-0.01em",
        }}>
          {name}
        </span>

        <span style={{
          fontSize: "0.6rem", fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: accent, opacity: 0.6,
        }}>
          {label}
        </span>

        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 3,
          background: `linear-gradient(to bottom, ${accent}28, ${accent}0a)`,
        }}/>
      </div>
    </motion.div>
  );
}

// ── GITHUB ICON ───────────────────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.09-.645.35-1.085.636-1.335-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  );
}

// ── MAIN FOOTER ───────────────────────────────────────────────────────────────
export default function Footer() {
  const t = useTranslations("footer");
  const [burstCount, setBurstCount] = React.useState(0);

  return (
    <footer
      id="footer"
      aria-labelledby="footer-heading"
      style={{ position: "relative", background: "#04040F" }}
    >
      {/* Top separator */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(10,132,255,0.25), transparent)",
      }}/>

      {/* Background ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(10,132,255,0.05), transparent)",
      }}/>

      {/* ── Construction zone ─────────────────────────────────────────────── */}
      <div style={{ padding: "48px 8vw 40px", maxWidth: 1152, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}
          >
            <span style={{ width: 24, height: 1, background: "#0A84FF", display: "inline-block" }}/>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF" }}>
              {t("stack")}
            </span>
            <span style={{ width: 24, height: 1, background: "#0A84FF", display: "inline-block" }}/>
          </motion.div>

          {/* 3D building — click to burst */}
          <div
            style={{ perspective: "900px", perspectiveOrigin: "50% 50%", cursor: "pointer" }}
            onClick={() => setBurstCount(c => c + 1)}
            title="Click me"
          >
            <div style={{
              transform: "rotateX(4deg) rotateY(-8deg)",
              transformStyle: "preserve-3d",
              display: "flex",
              flexDirection: "column-reverse",
              width: "min(360px, 80vw)",
            }}>
              {/* Ground platform */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  height: 10, borderRadius: "0 0 6px 6px",
                  background: "linear-gradient(90deg, rgba(10,132,255,0.5), rgba(10,132,255,0.15))",
                  transformOrigin: "left center",
                  boxShadow: "0 6px 32px rgba(10,132,255,0.25), 0 2px 0 rgba(10,132,255,0.5)",
                }}
              />

              {FLOORS.map((floor, i) => (
                <BuildingFloor key={floor.name} {...floor} index={i} total={FLOORS.length} burstCount={burstCount} />
              ))}
            </div>
          </div>

          {/* Production ready indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 + FLOORS.length * 0.11 + 0.4, duration: 0.5 }}
            style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}
          >
            {[0, 1, 2].map(i => (
              <motion.div key={i}
                style={{ width: 5, height: 5, borderRadius: "50%", background: "#0A84FF" }}
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.3 }}
              />
            ))}
            <span style={{ fontSize: "0.68rem", color: "#3D5080", letterSpacing: "0.12em" }}>
              {t("productionReady")}
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "20px 8vw" }}>
        <div style={{
          maxWidth: 1152, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.18)", margin: 0 }}>
            {t("copyright", { year: new Date().getFullYear() })}
          </p>

          <motion.div whileHover={{ color: "rgba(10,132,255,0.9)" }}>
            <Link
              href="https://github.com/slg9/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: "0.72rem", color: "rgba(255,255,255,0.22)",
                textDecoration: "none", transition: "color 180ms ease",
              }}
            >
              <GithubIcon />
              {t("viewSource")}
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
