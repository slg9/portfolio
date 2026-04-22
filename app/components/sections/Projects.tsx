"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

// ── TYPES ─────────────────────────────────────────────────────────────────────
type FeaturedProject = {
  key: "econnect" | "begaiement" | "qrwin" | "happiz";
  imageSrc: string;
  stack: string[];
};

type ArchiveKey =
  | "actuflux" | "prelys" | "cineactu" | "elearning"
  | "leon" | "raoul" | "psg" | "fidelatoo" | "handimobi" | "ladar";

// ── DATA ──────────────────────────────────────────────────────────────────────
const featuredProjects: FeaturedProject[] = [
  { key: "econnect",   imageSrc: "/projects/econnect.webp", stack: ["React", "Go", "GraphQL", "PostgreSQL", "Docker", "CI/CD"] },
  { key: "begaiement", imageSrc: "/projects/begaiement.png", stack: ["React", "Go", "REST", "PostgreSQL", "Analytics", "Stripe"] },
  { key: "qrwin",      imageSrc: "/projects/qrwin.png",      stack: ["React", "Go", "REST", "Stripe", "Wallet", "Back-office"] },
  { key: "happiz",     imageSrc: "/projects/happiz.svg",     stack: ["React", "Go", "GraphQL", "Mobile backend", "Firebase", "Admin"] },
];

const archiveKeys: ArchiveKey[] = [
  "actuflux", "prelys", "cineactu", "elearning",
  "leon", "raoul", "psg", "fidelatoo", "handimobi", "ladar",
];

// ── ARCHIVE ICONS ─────────────────────────────────────────────────────────────

function IconActuFlux() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      {[0, 1, 2].map(i => (
        <motion.circle key={i} cx="22" cy="22" r="7"
          stroke="#FF6B35" strokeWidth="1.5" fill="none"
          style={{ transformOrigin: "22px 22px" }}
          animate={{ scale: [1, 2.8, 3.2], opacity: [0.8, 0.3, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.72, ease: "easeOut" }}
        />
      ))}
      <motion.polygon points="16,13 32,22 16,31" fill="#FF6B35"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      />
    </svg>
  );
}

function IconPrelys() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="20" width="22" height="16" rx="2.5" fill="rgba(78,205,196,0.12)" stroke="#4ECDC4" strokeWidth="1.5"/>
      <rect x="12" y="16" width="22" height="16" rx="2.5" fill="rgba(78,205,196,0.08)" stroke="#4ECDC4" strokeWidth="1.5" opacity="0.7"/>
      <motion.rect x="16" y="12" width="22" height="16" rx="2.5"
        fill="rgba(78,205,196,0.18)" stroke="#4ECDC4" strokeWidth="1.5"
        animate={{ y: [12, 9, 12] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      />
      <line x1="20" y1="17" x2="30" y2="17" stroke="#4ECDC4" strokeWidth="1" opacity="0.6"/>
      <line x1="20" y1="20" x2="27" y2="20" stroke="#4ECDC4" strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}

function IconCineActu() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="14" width="32" height="22" rx="2" fill="rgba(255,224,102,0.08)" stroke="#FFE066" strokeWidth="1.5"/>
      {[9, 20, 31].map(x => (
        <rect key={`t${x}`} x={x} y="10" width="5" height="5" rx="1" fill="#FFE066" opacity="0.7"/>
      ))}
      {[9, 20, 31].map(x => (
        <rect key={`b${x}`} x={x} y="35" width="5" height="5" rx="1" fill="#FFE066" opacity="0.7"/>
      ))}
      <motion.polygon points="17,21 29,25 17,29" fill="#FFE066"
        style={{ transformOrigin: "23px 25px" }}
        animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      />
    </svg>
  );
}

function IconElearning() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M8 33 L22 10 L36 33 Z" fill="rgba(127,216,160,0.1)" stroke="#7FD8A0" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="13" y1="29" x2="31" y2="29" stroke="#7FD8A0" strokeWidth="1.5" strokeLinecap="round"/>
      <motion.circle cx="22" cy="10" r="3.5" fill="#7FD8A0"
        style={{ transformOrigin: "22px 10px" }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.35, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
      {[-30, 0, 30].map((deg, i) => (
        <motion.line key={deg}
          x1="22" y1="10"
          x2={22 + 9 * Math.sin(deg * Math.PI / 180)}
          y2={10 - 9 * Math.cos(deg * Math.PI / 180)}
          stroke="#7FD8A0" strokeWidth="1.2" strokeLinecap="round"
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.18 }}
        />
      ))}
    </svg>
  );
}

function IconLeon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="17" y="8" width="10" height="18" rx="5" fill="rgba(192,132,252,0.12)" stroke="#C084FC" strokeWidth="1.5"/>
      <path d="M11 23 Q11 34 22 34 Q33 34 33 23" stroke="#C084FC" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <line x1="22" y1="34" x2="22" y2="38" stroke="#C084FC" strokeWidth="1.5"/>
      <line x1="16" y1="38" x2="28" y2="38" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round"/>
      {[0, 1].map(i => (
        <motion.path key={i}
          d={i === 0 ? "M35 19 Q38 23 35 27" : "M38 15 Q43 23 38 31"}
          stroke="#C084FC" strokeWidth="1.5" fill="none" strokeLinecap="round"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.35 }}
        />
      ))}
    </svg>
  );
}

function IconRaoul() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="5" y="13" width="34" height="20" rx="4" fill="rgba(96,165,250,0.08)" stroke="#60A5FA" strokeWidth="1.5"/>
      <rect x="5" y="19" width="34" height="5" fill="rgba(96,165,250,0.2)"/>
      <rect x="10" y="26" width="8" height="4" rx="1" fill="rgba(96,165,250,0.4)" stroke="#60A5FA" strokeWidth="1"/>
      <motion.rect x="5" y="13" width="10" height="20" rx="4"
        fill="rgba(96,165,250,0.3)"
        animate={{ x: [5, 29, 5], opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      />
    </svg>
  );
}

function IconPsg() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M9 30 L9 18 L17 25 L22 11 L27 25 L35 18 L35 30 Z"
        fill="rgba(251,191,36,0.12)" stroke="#FBBF24" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="9" y="30" width="26" height="3" rx="1.5" fill="#FBBF24" opacity="0.5"/>
      {[{ x: 6, y: 10 }, { x: 38, y: 8 }, { x: 22, y: 6 }].map((pos, i) => (
        <motion.circle key={i} cx={pos.x} cy={pos.y} r="2" fill="#FBBF24"
          style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
          animate={{ opacity: [0, 1, 0], scale: [0.3, 1.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.55 }}
        />
      ))}
    </svg>
  );
}

function IconFidelatoo() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M15 9 L29 9 L29 24 Q29 33 22 33 Q15 33 15 24 Z"
        fill="rgba(251,146,60,0.1)" stroke="#FB923C" strokeWidth="1.5"/>
      <path d="M15 14 Q6 14 6 21 Q6 26 15 23" stroke="#FB923C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M29 14 Q38 14 38 21 Q38 26 29 23" stroke="#FB923C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <rect x="17" y="33" width="10" height="3" rx="1.5" fill="#FB923C" opacity="0.6"/>
      <rect x="14" y="36" width="16" height="3" rx="1.5" fill="#FB923C" opacity="0.4"/>
      <motion.path d="M22 15 L23.2 18.6 L27 18.6 L24.1 20.7 L25.2 24.3 L22 22 L18.8 24.3 L19.9 20.7 L17 18.6 L20.8 18.6 Z"
        fill="#FB923C" opacity="0.9"
        style={{ transformOrigin: "22px 20px" }}
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
    </svg>
  );
}

function IconHandimobi() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M22 7 C14 7 9 13 9 19 C9 28 22 39 22 39 C22 39 35 28 35 19 C35 13 30 7 22 7 Z"
        fill="rgba(56,189,248,0.08)" stroke="#38BDF8" strokeWidth="1.5"/>
      <circle cx="22" cy="19" r="4" fill="#38BDF8" opacity="0.85"/>
      {[0, 1].map(i => (
        <motion.circle key={i} cx="22" cy="19" r="4"
          stroke="#38BDF8" strokeWidth="1.5" fill="none"
          style={{ transformOrigin: "22px 19px" }}
          animate={{ scale: [1, 3.2], opacity: [0.7, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.9, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

function IconLadar() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="5" fill="rgba(52,211,153,0.3)" stroke="#34D399" strokeWidth="1.5"/>
      <circle cx="22" cy="22" r="11" fill="none" stroke="#34D399" strokeWidth="1" opacity="0.5"/>
      <circle cx="22" cy="22" r="17" fill="none" stroke="#34D399" strokeWidth="1" opacity="0.25"/>
      <motion.g style={{ transformOrigin: "22px 22px" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      >
        <line x1="22" y1="22" x2="22" y2="5" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round"/>
      </motion.g>
      <motion.circle cx="32" cy="13" r="2.5" fill="#34D399"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: 0.55 }}
      />
    </svg>
  );
}

// ── ARCHIVE METADATA ──────────────────────────────────────────────────────────
type ArchiveMeta = { color: string; Icon: () => React.ReactElement };

const ARCHIVE_META: Record<ArchiveKey, ArchiveMeta> = {
  actuflux:  { color: "#FF6B35", Icon: IconActuFlux  },
  prelys:    { color: "#4ECDC4", Icon: IconPrelys    },
  cineactu:  { color: "#FFE066", Icon: IconCineActu  },
  elearning: { color: "#7FD8A0", Icon: IconElearning },
  leon:      { color: "#C084FC", Icon: IconLeon      },
  raoul:     { color: "#60A5FA", Icon: IconRaoul     },
  psg:       { color: "#FBBF24", Icon: IconPsg       },
  fidelatoo: { color: "#FB923C", Icon: IconFidelatoo },
  handimobi: { color: "#38BDF8", Icon: IconHandimobi },
  ladar:     { color: "#34D399", Icon: IconLadar     },
};

// ── 3D ARCHIVE CARD ───────────────────────────────────────────────────────────
function ArchiveCard3D({
  archiveKey,
  index,
  expanded,
  onToggle,
}: {
  archiveKey: ArchiveKey;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations("projects");
  const { color, Icon } = ARCHIVE_META[archiveKey];
  const cardRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [9, -9]), { stiffness: 260, damping: 26 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 260, damping: 26 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-5% 0px -5% 0px" }}
      transition={{ duration: 0.65, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "900px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.article
        onClick={onToggle}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          position: "relative",
          borderRadius: 18,
          background: "rgba(8,10,30,0.88)",
          padding: "22px",
          cursor: "pointer",
        }}
        animate={{
          borderColor: expanded ? `${color}55` : "rgba(255,255,255,0.07)",
          boxShadow: expanded
            ? `0 0 0 1px ${color}40, 0 24px 64px ${color}18`
            : "0 4px 24px rgba(0,0,0,0.2)",
        }}
        whileHover={{
          boxShadow: `0 0 0 1px ${color}35, 0 28px 70px ${color}20, 0 8px 28px rgba(0,0,0,0.3)`,
        }}
        role="button"
        aria-expanded={expanded}
      >
        {/* Border — separate element to allow animated color */}
        <motion.div
          animate={{ opacity: 1 }}
          style={{
            position: "absolute", inset: 0, borderRadius: 18,
            border: `1px solid ${expanded ? color + "55" : "rgba(255,255,255,0.07)"}`,
            pointerEvents: "none",
            transition: "border-color 0.3s ease",
          }}
        />

        {/* Corner glow */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: 80, height: 80,
          background: `radial-gradient(circle at top left, ${color}22, transparent 70%)`,
          borderRadius: "18px 0 0 0",
          pointerEvents: "none",
        }}/>

        {/* Icon */}
        <div style={{ width: 44, height: 44, position: "relative", zIndex: 1 }}>
          <Icon />
        </div>

        {/* Title + expand indicator */}
        <div style={{
          marginTop: 14,
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8,
          position: "relative", zIndex: 1,
        }}>
          <h4 style={{
            fontSize: "0.9375rem", fontWeight: 700, color: "#F0F4FF",
            margin: 0, letterSpacing: "-0.02em",
            fontFamily: "var(--font-display), sans-serif",
          }}>
            {t(`items.${archiveKey}.title`)}
          </h4>
          <motion.span
            animate={{ rotate: expanded ? 45 : 0, color: expanded ? color : "#6B7A99" }}
            transition={{ duration: 0.22 }}
            style={{ fontSize: "1.3rem", fontWeight: 400, lineHeight: 1, flexShrink: 0, marginTop: 1 }}
          >
            +
          </motion.span>
        </div>

        {/* Expanded description */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ overflow: "hidden", position: "relative", zIndex: 1 }}
        >
          <p style={{
            marginTop: 14, fontSize: "0.8125rem", lineHeight: 1.75, color: "#8B9AB8",
            borderTop: `1px solid ${color}22`, paddingTop: 14,
          }}>
            {t(`items.${archiveKey}.description`)}
          </p>
        </motion.div>
      </motion.article>
    </motion.div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Projects() {
  const t = useTranslations("projects");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [expandedArchive, setExpandedArchive] = useState<ArchiveKey | null>(null);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      style={{ position: "relative", background: "#04040F", padding: "72px 8vw" }}
    >
      {/* Top divider */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(10,132,255,0.3), transparent)",
      }}/>

      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ maxWidth: 720, position: "relative" }}
        >
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF", display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ width: 24, height: 1, background: "#00D4FF", display: "inline-block", flexShrink: 0 }}/>
            {t("portfolio")}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <h2
              id="projects-title"
              style={{ fontSize: "clamp(1.9rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", margin: 0 }}
            >
              {t("title")}
            </h2>
            <span style={{ fontSize: "4rem", fontWeight: 800, color: "rgba(255,255,255,0.04)", letterSpacing: "-0.05em", lineHeight: 1, userSelect: "none" }}>
              {featuredProjects.length}
            </span>
          </div>
          <p style={{ marginTop: 16, maxWidth: "56ch", fontSize: "0.9375rem", lineHeight: 1.75, color: "#6B7A99" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Featured project cards */}
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 24 }}>
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.key}
              initial={{ opacity: 0, y: 26, scale: 0.975, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              whileHover={{ y: -4, borderColor: "rgba(10,132,255,0.3)", boxShadow: "0 28px 70px rgba(10,132,255,0.08)" }}
              transition={{ duration: 0.85, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              style={{
                position: "relative", overflow: "hidden", display: "grid", gap: 20,
                borderRadius: 22, border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(8,10,30,0.7)", padding: "16px",
                boxShadow: "0 20px 55px rgba(0,0,0,0.22)",
              }}
              className="md:grid-cols-[0.92fr_1.08fr] md:p-6"
            >
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                style={{
                  position: "absolute", top: 0, left: 20, right: 20, height: 1,
                  transformOrigin: "left",
                  background: "linear-gradient(90deg, #0A84FF, rgba(10,132,255,0.35), transparent)",
                }}
              />
              <div style={{ position: "relative", overflow: "hidden", borderRadius: 18, background: "rgba(10,12,40,0.8)" }} className="group">
                <div style={{ position: "absolute", inset: 0, zIndex: 10, background: "linear-gradient(to top, rgba(0,0,0,0.18), transparent)", opacity: 0, transition: "opacity 300ms" }} className="group-hover:opacity-100 pointer-events-none"/>
                <Image
                  src={project.imageSrc}
                  alt={t(`items.${project.key}.title`)}
                  width={900} height={640}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 500ms" }}
                  className="group-hover:scale-[1.04]"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", margin: 0 }}>
                    {t(`items.${project.key}.title`)}
                  </h3>
                  <p style={{ marginTop: 12, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B7A99", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {t(`items.${project.key}.summary`)}
                  </p>
                  <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {project.stack.slice(0, 4).map((item) => (
                      <span key={item} style={{
                        borderRadius: 999, border: "1px solid rgba(10,132,255,0.25)",
                        background: "rgba(10,132,255,0.08)", padding: "6px 12px",
                        fontSize: "0.6875rem", fontWeight: 500, color: "#00D4FF",
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => setExpandedProject(cur => cur === project.key ? null : project.key)}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.18 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                    whileHover={{ x: 2 }}
                    style={{
                      marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8,
                      fontSize: "0.875rem", fontWeight: 600, color: "#F0F4FF",
                      background: "none", border: "none", cursor: "pointer", padding: 0,
                    }}
                    aria-expanded={expandedProject === project.key}
                  >
                    {expandedProject === project.key ? t("hideDetails") : t("showDetails")}
                    <motion.span animate={{ rotate: expandedProject === project.key ? 45 : 0 }} style={{ color: "#0A84FF", fontSize: "1.1rem" }}>
                      +
                    </motion.span>
                  </motion.button>
                  <motion.dl
                    initial={false}
                    animate={{ height: expandedProject === project.key ? "auto" : 0, opacity: expandedProject === project.key ? 1 : 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                      <div>
                        <dt style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF" }}>
                          {t("roleLabel")}
                        </dt>
                        <dd style={{ marginTop: 8, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B7A99" }}>
                          {t(`items.${project.key}.role`)}
                        </dd>
                      </div>
                      <div>
                        <dt style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF" }}>
                          {t("impactLabel")}
                        </dt>
                        <dd style={{ marginTop: 8, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B7A99" }}>
                          {t(`items.${project.key}.impact`)}
                        </dd>
                      </div>
                    </div>
                  </motion.dl>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Archive 3D section ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: 72 }}
        >
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <span style={{ width: 24, height: 1, background: "#0A84FF", display: "inline-block" }}/>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF" }}>
              {t("archiveTitle")}
            </span>
          </div>

          {/* 3D perspective container */}
          <div style={{ position: "relative" }}>
            {/* Perspective grid background */}
            <div style={{
              position: "absolute",
              top: 0, left: "-10%", right: "-10%", bottom: 0,
              backgroundImage: [
                "linear-gradient(rgba(10,132,255,0.045) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(10,132,255,0.045) 1px, transparent 1px)",
              ].join(", "),
              backgroundSize: "56px 56px",
              transform: "perspective(700px) rotateX(20deg) scaleY(1.25)",
              transformOrigin: "50% 0%",
              pointerEvents: "none",
              opacity: 0.75,
            }}/>
            {/* Fade bottom edge */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
              background: "linear-gradient(to bottom, transparent, #04040F)",
              pointerEvents: "none", zIndex: 1,
            }}/>
            {/* Fade left/right edges */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, #04040F 0%, transparent 8%, transparent 92%, #04040F 100%)",
              pointerEvents: "none", zIndex: 1,
            }}/>

            {/* Cards grid */}
            <div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              style={{ position: "relative", zIndex: 2 }}
            >
              {archiveKeys.map((key, i) => (
                <ArchiveCard3D
                  key={key}
                  archiveKey={key}
                  index={i}
                  expanded={expandedArchive === key}
                  onToggle={() => setExpandedArchive(prev => prev === key ? null : key)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
