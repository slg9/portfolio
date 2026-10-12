"use client";

import { useState } from "react";
import React from "react";
import { useTranslations } from "next-intl";

type FeaturedProject = {
  key: "econnect" | "begaiement" | "qrwin" | "happiz";
  accent: string;
  Visual: () => React.ReactElement;
  stack: string[];
};

type ArchiveKey =
  | "actuflux" | "prelys" | "cineactu" | "mentora" | "preznt"
  | "leon" | "raoul" | "psg" | "fidelatoo" | "handimobi" | "ladar";

/* ── STATIC CONCEPT VISUALS ─────────────────────────────────────────────── */

function VisualCRM() {
  const nodes = [
    { cx: 80, cy: 80, r: 22, main: true },
    { cx: 175, cy: 44, r: 12, main: false },
    { cx: 200, cy: 112, r: 10, main: false },
    { cx: 148, cy: 158, r: 12, main: false },
    { cx: 30, cy: 140, r: 10, main: false },
    { cx: 20, cy: 50, r: 9, main: false },
  ];
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[1,2],[3,4]];
  return (
    <svg width="220" height="200" viewBox="0 0 220 200" fill="none" aria-hidden>
      {edges.map(([a,b],i) => (
        <line key={i} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(106,156,214,.28)" strokeWidth="1.2" strokeDasharray="4 4" />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r + 6} fill={`rgba(106,156,214,${n.main ? ".12" : ".06"})`} />
          <circle cx={n.cx} cy={n.cy} r={n.r} fill={`rgba(106,156,214,${n.main ? ".22" : ".12"})`} stroke="#6A9CD6" strokeWidth={n.main ? 1.8 : 1.2} />
          {n.main && (
            <>
              <circle cx={n.cx} cy={n.cy - 5} r="5.5" fill="#6A9CD6" opacity=".7" />
              <path d={`M${n.cx-9} ${n.cy+12} Q${n.cx} ${n.cy+5} ${n.cx+9} ${n.cy+12}`} stroke="#6A9CD6" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".7" />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

function VisualTherapy() {
  const bars = [6, 12, 20, 28, 18, 10, 24, 32, 22, 14, 8, 16, 6];
  return (
    <svg width="220" height="200" viewBox="0 0 220 200" fill="none" aria-hidden>
      <path
        d="M80 44 H140 Q154 44 154 58 V86 Q154 100 140 100 H102 L88 112 L90 100 H80 Q66 100 66 86 V58 Q66 44 80 44 Z"
        fill="rgba(106,156,214,.12)" stroke="#6A9CD6" strokeWidth="1.5" strokeLinejoin="round"
      />
      <line x1="82" y1="62" x2="138" y2="62" stroke="#6A9CD6" strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
      <line x1="82" y1="72" x2="128" y2="72" stroke="#6A9CD6" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
      <line x1="82" y1="82" x2="114" y2="82" stroke="#6A9CD6" strokeWidth="1.5" strokeLinecap="round" opacity=".35" />
      {bars.map((h, i) => (
        <rect key={i} x={60 + i * 8} y={146 - h / 2} width="4" height={h} rx="2" fill="#6A9CD6" opacity="0.7" />
      ))}
    </svg>
  );
}

function VisualGamification() {
  return (
    <svg width="220" height="200" viewBox="0 0 220 200" fill="none" aria-hidden>
      <circle cx="110" cy="100" r="70" stroke="rgba(106,156,214,.14)" strokeWidth="1" strokeDasharray="3 5" />
      {[0,1,2,3,4,5,6,7].map(i => {
        const angle = (i / 8) * Math.PI * 2;
        const x = 110 + 70 * Math.cos(angle);
        const y = 100 + 70 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="4" fill="#6A9CD6" opacity=".45" />;
      })}
      <path d="M88 64 H132 V92 Q132 114 110 114 Q88 114 88 92 Z" fill="rgba(106,156,214,.12)" stroke="#6A9CD6" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M88 72 Q74 72 74 84 Q74 96 88 96" stroke="#6A9CD6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M132 72 Q146 72 146 84 Q146 96 132 96" stroke="#6A9CD6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <rect x="106" y="114" width="8" height="12" fill="#6A9CD6" opacity=".5" />
      <rect x="94" y="126" width="32" height="6" rx="3" fill="#6A9CD6" opacity=".7" />
      <path d="M110 77 L112.35 82.76 L118.56 83.22 L113.8 87.24 L115.29 93.28 L110 90 L104.71 93.28 L106.2 87.24 L101.44 83.22 L107.65 82.76 Z" fill="#6A9CD6" />
    </svg>
  );
}

function VisualAudio() {
  const wave = [8, 18, 30, 22, 34, 16, 10];
  return (
    <svg width="220" height="200" viewBox="0 0 220 200" fill="none" aria-hidden>
      <rect x="82" y="36" width="56" height="128" rx="12" fill="rgba(106,156,214,.08)" stroke="#6A9CD6" strokeWidth="1.5" />
      <rect x="88" y="48" width="44" height="98" rx="6" fill="rgba(106,156,214,.06)" />
      {wave.map((h, i) => (
        <rect key={i} x={91 + i * 6} y={96 - h / 2} width="3" height={h} rx="1.5" fill="#6A9CD6" opacity="0.7" />
      ))}
      <line x1="94" y1="132" x2="126" y2="132" stroke="rgba(106,156,214,.3)" strokeWidth="2" strokeLinecap="round" />
      <line x1="94" y1="132" x2="108" y2="132" stroke="#6A9CD6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="108" cy="132" r="3" fill="#6A9CD6" />
      <line x1="102" y1="155" x2="118" y2="155" stroke="#6A9CD6" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
      <path d="M150 86 Q158 100 150 114" stroke="#6A9CD6" strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
      <path d="M160 78 Q172 100 160 122" stroke="#6A9CD6" strokeWidth="1.5" strokeLinecap="round" opacity=".35" />
    </svg>
  );
}

/* ── DATA ────────────────────────────────────────────────────────────────── */

const featuredProjects: FeaturedProject[] = [
  { key: "econnect",   accent: "#6A9CD6", Visual: VisualCRM,          stack: ["React", "Go", "GraphQL", "PostgreSQL", "Docker", "CI/CD"] },
  { key: "begaiement", accent: "#6A9CD6", Visual: VisualTherapy,      stack: ["React", "Go", "REST", "PostgreSQL", "Analytics", "Stripe"] },
  { key: "qrwin",      accent: "#6A9CD6", Visual: VisualGamification, stack: ["React", "Go", "REST", "Stripe", "Wallet", "Back-office"] },
  { key: "happiz",     accent: "#6A9CD6", Visual: VisualAudio,      stack: ["React", "Go", "GraphQL", "Mobile backend", "Firebase", "Admin"] },
];

const archiveKeys: ArchiveKey[] = [
  "actuflux", "prelys", "cineactu", "mentora", "preznt",
  "leon", "raoul", "psg", "fidelatoo", "handimobi", "ladar",
];

/* ── STATIC ARCHIVE ICONS ───────────────────────────────────────────────── */

const ARCHIVE_ICONS: Record<ArchiveKey, React.ReactElement> = {
  actuflux: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="14" stroke="#6A9CD6" strokeWidth="1" opacity="0.2" />
      <polygon points="16,13 32,22 16,31" fill="#6A9CD6" opacity="0.85" />
    </svg>
  ),
  prelys: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="20" width="22" height="16" rx="2.5" fill="rgba(106,156,214,0.12)" stroke="#6A9CD6" strokeWidth="1.5" />
      <rect x="12" y="16" width="22" height="16" rx="2.5" fill="rgba(106,156,214,0.08)" stroke="#6A9CD6" strokeWidth="1.5" opacity="0.7" />
      <rect x="16" y="12" width="22" height="16" rx="2.5" fill="rgba(106,156,214,0.18)" stroke="#6A9CD6" strokeWidth="1.5" />
      <line x1="20" y1="17" x2="30" y2="17" stroke="#6A9CD6" strokeWidth="1" opacity="0.6" />
      <line x1="20" y1="20" x2="27" y2="20" stroke="#6A9CD6" strokeWidth="1" opacity="0.4" />
    </svg>
  ),
  cineactu: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="14" width="32" height="22" rx="2" fill="rgba(106,156,214,0.08)" stroke="#6A9CD6" strokeWidth="1.5" />
      {[9, 20, 31].map(x => <rect key={`t${x}`} x={x} y="10" width="5" height="5" rx="1" fill="#6A9CD6" opacity="0.7" />)}
      {[9, 20, 31].map(x => <rect key={`b${x}`} x={x} y="35" width="5" height="5" rx="1" fill="#6A9CD6" opacity="0.7" />)}
      <polygon points="17,21 29,25 17,29" fill="#6A9CD6" opacity="0.85" />
    </svg>
  ),
  mentora: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M8 33 L22 10 L36 33 Z" fill="rgba(106,156,214,0.1)" stroke="#6A9CD6" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="13" y1="29" x2="31" y2="29" stroke="#6A9CD6" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="22" cy="10" r="3.5" fill="#6A9CD6" opacity="0.8" />
    </svg>
  ),
  preznt: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="9" y="20" width="26" height="16" rx="2" fill="rgba(106,156,214,0.1)" stroke="#6A9CD6" strokeWidth="1.5" />
      <line x1="22" y1="20" x2="22" y2="36" stroke="#6A9CD6" strokeWidth="1.5" />
      <rect x="7" y="15" width="30" height="5" rx="1.5" fill="rgba(106,156,214,0.18)" stroke="#6A9CD6" strokeWidth="1.5" />
      <path d="M22 15 C18 9, 13 11, 16 15 M22 15 C26 9, 31 11, 28 15" stroke="#6A9CD6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  ),
  leon: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="17" y="8" width="10" height="18" rx="5" fill="rgba(106,156,214,0.12)" stroke="#6A9CD6" strokeWidth="1.5" />
      <path d="M11 23 Q11 34 22 34 Q33 34 33 23" stroke="#6A9CD6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="22" y1="34" x2="22" y2="38" stroke="#6A9CD6" strokeWidth="1.5" />
      <line x1="16" y1="38" x2="28" y2="38" stroke="#6A9CD6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M35 19 Q38 23 35 27" stroke="#6A9CD6" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M38 15 Q43 23 38 31" stroke="#6A9CD6" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35" />
    </svg>
  ),
  raoul: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="5" y="13" width="34" height="20" rx="4" fill="rgba(106,156,214,0.08)" stroke="#6A9CD6" strokeWidth="1.5" />
      <rect x="5" y="19" width="34" height="5" fill="rgba(106,156,214,0.2)" />
      <rect x="10" y="26" width="8" height="4" rx="1" fill="rgba(106,156,214,0.4)" stroke="#6A9CD6" strokeWidth="1" />
    </svg>
  ),
  psg: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M9 30 L9 18 L17 25 L22 11 L27 25 L35 18 L35 30 Z" fill="rgba(106,156,214,0.12)" stroke="#6A9CD6" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="9" y="30" width="26" height="3" rx="1.5" fill="#6A9CD6" opacity="0.5" />
    </svg>
  ),
  fidelatoo: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M15 9 L29 9 L29 24 Q29 33 22 33 Q15 33 15 24 Z" fill="rgba(106,156,214,0.1)" stroke="#6A9CD6" strokeWidth="1.5" />
      <path d="M15 14 Q6 14 6 21 Q6 26 15 23" stroke="#6A9CD6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M29 14 Q38 14 38 21 Q38 26 29 23" stroke="#6A9CD6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="17" y="33" width="10" height="3" rx="1.5" fill="#6A9CD6" opacity="0.6" />
      <rect x="14" y="36" width="16" height="3" rx="1.5" fill="#6A9CD6" opacity="0.4" />
      <path d="M22 15 L23.2 18.6 L27 18.6 L24.1 20.7 L25.2 24.3 L22 22 L18.8 24.3 L19.9 20.7 L17 18.6 L20.8 18.6 Z" fill="#6A9CD6" opacity="0.8" />
    </svg>
  ),
  handimobi: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M22 7 C14 7 9 13 9 19 C9 28 22 39 22 39 C22 39 35 28 35 19 C35 13 30 7 22 7 Z" fill="rgba(106,156,214,0.08)" stroke="#6A9CD6" strokeWidth="1.5" />
      <circle cx="22" cy="19" r="4" fill="#6A9CD6" opacity="0.85" />
    </svg>
  ),
  ladar: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="5" fill="rgba(106,156,214,0.3)" stroke="#6A9CD6" strokeWidth="1.5" />
      <circle cx="22" cy="22" r="11" fill="none" stroke="#6A9CD6" strokeWidth="1" opacity="0.5" />
      <circle cx="22" cy="22" r="17" fill="none" stroke="#6A9CD6" strokeWidth="1" opacity="0.25" />
      <line x1="22" y1="22" x2="22" y2="5" stroke="#6A9CD6" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="13" r="2.5" fill="#6A9CD6" opacity="0.7" />
    </svg>
  ),
};

const ARCHIVE_COLORS: Record<ArchiveKey, string> = {
  actuflux: "#6A9CD6", prelys: "#6A9CD6", cineactu: "#6A9CD6", mentora: "#6A9CD6",
  preznt: "#6A9CD6", leon: "#6A9CD6", raoul: "#6A9CD6", psg: "#6A9CD6",
  fidelatoo: "#6A9CD6", handimobi: "#6A9CD6", ladar: "#6A9CD6",
};

/* ── ARCHIVE CARD (no 3D, description always visible) ───────────────────── */

function ArchiveCard({ archiveKey }: { archiveKey: ArchiveKey }) {
  const t = useTranslations("projects");
  const color = ARCHIVE_COLORS[archiveKey];

  return (
    <article
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 18,
        background: "rgba(8,10,30,0.88)",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: 22,
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        transition: "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = `${color}40`;
        e.currentTarget.style.boxShadow = `0 12px 36px ${color}15`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.2)";
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, width: 80, height: 80,
        background: `radial-gradient(circle at top left, ${color}22, transparent 70%)`,
        borderRadius: "18px 0 0 0", pointerEvents: "none",
      }} />

      <div style={{ width: 44, height: 44, position: "relative", zIndex: 1 }}>
        {ARCHIVE_ICONS[archiveKey]}
      </div>

      <h4 style={{
        marginTop: 14, fontSize: "0.9375rem", fontWeight: 700, color: "#F0F4FF",
        letterSpacing: "-0.02em", fontFamily: "var(--font-display), sans-serif",
      }}>
        {t(`items.${archiveKey}.title`)}
      </h4>

      <p style={{
        marginTop: 10, fontSize: "0.8125rem", lineHeight: 1.75, color: "#8B9AB8",
      }}>
        {t(`items.${archiveKey}.description`)}
      </p>
    </article>
  );
}

/* ── MAIN COMPONENT ─────────────────────────────────────────────────────── */

export default function Projects() {
  const t = useTranslations("projects");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      style={{ position: "relative", background: "#04040F", padding: "72px 8vw" }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(106,156,214,0.3), transparent)",
      }} />

      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ maxWidth: 720, position: "relative" }}>
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
        </div>

        {/* Featured project cards */}
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 24 }}>
          {featuredProjects.map((project) => {
            const isExpanded = expandedProject === project.key;
            return (
              <article
                key={project.key}
                style={{
                  position: "relative", overflow: "hidden", display: "grid", gap: 20,
                  borderRadius: 22, border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(8,10,30,0.7)", padding: 16,
                  boxShadow: "0 20px 55px rgba(0,0,0,0.22)",
                  transition: "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
                }}
                className="md:grid-cols-[0.92fr_1.08fr] md:p-6"
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = "rgba(106,156,214,0.2)";
                  e.currentTarget.style.boxShadow = "0 28px 70px rgba(106,156,214,0.06)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.boxShadow = "0 20px 55px rgba(0,0,0,0.22)";
                }}
              >
                <div
                  style={{
                    position: "absolute", top: 0, left: 20, right: 20, height: 1,
                    background: `linear-gradient(90deg, ${project.accent}, ${project.accent}55, transparent)`,
                  }}
                />

                {/* Concept visual */}
                <div style={{
                  position: "relative", overflow: "hidden", borderRadius: 18,
                  background: "rgba(8,10,28,0.9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  minHeight: 230,
                }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)", backgroundSize: "22px 22px", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${project.accent}1a 0%, transparent 65%)`, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${project.accent}88, transparent)`, pointerEvents: "none" }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <project.Visual />
                  </div>
                </div>

                {/* Content */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", margin: 0 }}>
                      {t(`items.${project.key}.title`)}
                    </h3>
                    <p style={{ marginTop: 12, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B7A99" }}>
                      {t(`items.${project.key}.summary`)}
                    </p>
                    <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {project.stack.slice(0, 4).map((item) => (
                        <span key={item} style={{
                          borderRadius: 999, border: "1px solid rgba(106,156,214,0.25)",
                          background: "rgba(106,156,214,0.08)", padding: "6px 12px",
                          fontSize: "0.6875rem", fontWeight: 500, color: "#6A9CD6",
                        }}>
                          {item}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpandedProject(cur => cur === project.key ? null : project.key)}
                      style={{
                        marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8,
                        fontSize: "0.875rem", fontWeight: 600, color: "#F0F4FF",
                        background: "none", border: "none", cursor: "pointer", padding: 0,
                        transition: "color 180ms ease",
                      }}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? t("hideDetails") : t("showDetails")}
                      <span style={{
                        color: "#6A9CD6", fontSize: "1.1rem",
                        display: "inline-block",
                        transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 200ms ease",
                      }}>
                        +
                      </span>
                    </button>

                    {isExpanded && (
                      <dl style={{ overflow: "hidden" }}>
                        <div style={{ marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                          <div>
                            <dt style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6A9CD6" }}>
                              {t("roleLabel")}
                            </dt>
                            <dd style={{ marginTop: 8, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B7A99" }}>
                              {t(`items.${project.key}.role`)}
                            </dd>
                          </div>
                          <div>
                            <dt style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6A9CD6" }}>
                              {t("impactLabel")}
                            </dt>
                            <dd style={{ marginTop: 8, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B7A99" }}>
                              {t(`items.${project.key}.impact`)}
                            </dd>
                          </div>
                        </div>
                      </dl>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Archive section ─────────────────────────────────────────────── */}
        <div style={{ marginTop: 72 }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.03em", marginBottom: 24 }}>
            {t("archiveTitle")}
          </h3>

          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {archiveKeys.map((key) => (
              <ArchiveCard key={key} archiveKey={key} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
