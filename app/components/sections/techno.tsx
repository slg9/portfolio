"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const TECHNO_STYLE = `
  @keyframes reactOrbit {
    from { transform: rotateX(72deg) rotateZ(0deg); }
    to   { transform: rotateX(72deg) rotateZ(360deg); }
  }
  @keyframes reactOrbit2 {
    from { transform: rotateX(72deg) rotateZ(120deg); }
    to   { transform: rotateX(72deg) rotateZ(480deg); }
  }
  @keyframes reactOrbit3 {
    from { transform: rotateX(72deg) rotateZ(240deg); }
    to   { transform: rotateX(72deg) rotateZ(600deg); }
  }
  @keyframes reactNucleus {
    0%, 100% { r: 6; opacity: 0.9; }
    50%       { r: 8; opacity: 1; }
  }
  .react-orbit1 { animation: reactOrbit  4s linear infinite; transform-origin: 36px 36px; }
  .react-orbit2 { animation: reactOrbit2 4s linear infinite; transform-origin: 36px 36px; }
  .react-orbit3 { animation: reactOrbit3 4s linear infinite; transform-origin: 36px 36px; }
  .react-nucleus { animation: reactNucleus 2s ease-in-out infinite; }

  @keyframes apiPulse {
    0%, 100% { opacity: 0.2; }
    50%       { opacity: 0.9; }
  }
  @keyframes apiSpoke {
    0%   { stroke-dashoffset: 28; opacity: 0; }
    40%  { opacity: 1; }
    100% { stroke-dashoffset: 0; opacity: 0.4; }
  }
  .api-node1 { animation: apiPulse 2s ease-in-out infinite 0s; }
  .api-node2 { animation: apiPulse 2s ease-in-out infinite 0.5s; }
  .api-node3 { animation: apiPulse 2s ease-in-out infinite 1s; }
  .api-node4 { animation: apiPulse 2s ease-in-out infinite 1.5s; }
  .api-spoke  { stroke-dasharray: 28; animation: apiSpoke 2s ease-in-out infinite; }

  @keyframes codeLine {
    0%   { width: 0%; opacity: 0; }
    30%  { opacity: 1; }
    70%  { width: 100%; opacity: 1; }
    100% { width: 100%; opacity: 0; }
  }
  .code-line1 { animation: codeLine 2s ease-in-out infinite 0s; }
  .code-line2 { animation: codeLine 2s ease-in-out infinite 0.4s; }
  .code-line3 { animation: codeLine 2s ease-in-out infinite 0.8s; }
  .code-line4 { animation: codeLine 2s ease-in-out infinite 1.2s; }

  @keyframes winCursor {
    0%, 100% { transform: translate(0,0); }
    25% { transform: translate(6px, 2px); }
    50% { transform: translate(3px, 8px); }
    75% { transform: translate(9px, 5px); }
  }
  .win-cursor { animation: winCursor 3s ease-in-out infinite; }
`;

const GROUP_ICONS = [
  /* Web — React atom */
  <svg key="web" width="64" height="64" viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="6" fill="#0A84FF" opacity="0.9" className="react-nucleus"/>
    <ellipse cx="36" cy="36" rx="28" ry="10" fill="none" stroke="#0A84FF" strokeWidth="1.2" opacity="0.35" className="react-orbit1"/>
    <ellipse cx="36" cy="36" rx="28" ry="10" fill="none" stroke="#00D4FF" strokeWidth="1.2" opacity="0.35" className="react-orbit2"/>
    <ellipse cx="36" cy="36" rx="28" ry="10" fill="none" stroke="#00FFB3" strokeWidth="1.2" opacity="0.35" className="react-orbit3"/>
  </svg>,

  /* API — Network hub */
  <svg key="api" width="64" height="64" viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="6" fill="#0A84FF" opacity="0.9"/>
    {/* Spokes */}
    <line x1="36" y1="30" x2="36" y2="10" stroke="#0A84FF" strokeWidth="1.2" strokeDasharray="28" className="api-spoke"/>
    <line x1="36" y1="42" x2="36" y2="62" stroke="#0A84FF" strokeWidth="1.2" strokeDasharray="28" className="api-spoke" style={{animationDelay:"0.5s"}}/>
    <line x1="30" y1="36" x2="10" y2="36" stroke="#00D4FF" strokeWidth="1.2" strokeDasharray="28" className="api-spoke" style={{animationDelay:"1s"}}/>
    <line x1="42" y1="36" x2="62" y2="36" stroke="#00D4FF" strokeWidth="1.2" strokeDasharray="28" className="api-spoke" style={{animationDelay:"1.5s"}}/>
    {/* Endpoint nodes */}
    <circle cx="36" cy="10" r="4" fill="rgba(10,132,255,0.3)" stroke="#0A84FF" strokeWidth="1" className="api-node1"/>
    <circle cx="36" cy="62" r="4" fill="rgba(10,132,255,0.3)" stroke="#0A84FF" strokeWidth="1" className="api-node2"/>
    <circle cx="10" cy="36" r="4" fill="rgba(0,212,255,0.3)" stroke="#00D4FF" strokeWidth="1" className="api-node3"/>
    <circle cx="62" cy="36" r="4" fill="rgba(0,212,255,0.3)" stroke="#00D4FF" strokeWidth="1" className="api-node4"/>
  </svg>,

  /* Logiciel — Desktop window with animated code lines */
  <svg key="software" width="64" height="64" viewBox="0 0 72 72" fill="none">
    {/* Window frame */}
    <rect x="6" y="12" width="60" height="48" rx="6" fill="rgba(10,132,255,0.08)" stroke="#0A84FF" strokeWidth="1.2"/>
    {/* Title bar */}
    <rect x="6" y="12" width="60" height="12" rx="6" fill="rgba(10,132,255,0.15)"/>
    <rect x="6" y="18" width="60" height="6" fill="rgba(10,132,255,0.15)"/>
    {/* Traffic lights */}
    <circle cx="16" cy="18" r="2.5" fill="#FF5F57" opacity="0.8"/>
    <circle cx="24" cy="18" r="2.5" fill="#FFBD2E" opacity="0.8"/>
    <circle cx="32" cy="18" r="2.5" fill="#27C93F" opacity="0.8"/>
    {/* Code lines as foreignObject substitute using rects */}
    <rect x="14" y="30" height="3" rx="1.5" fill="#0A84FF" opacity="0.7" className="code-line1" width="30%"/>
    <rect x="20" y="37" height="3" rx="1.5" fill="#00D4FF" opacity="0.7" className="code-line2" width="40%"/>
    <rect x="14" y="44" height="3" rx="1.5" fill="#00FFB3" opacity="0.7" className="code-line3" width="25%"/>
    <rect x="20" y="51" height="3" rx="1.5" fill="#0A84FF" opacity="0.7" className="code-line4" width="35%"/>
    {/* Cursor */}
    <g className="win-cursor">
      <rect x="48" y="44" width="2" height="10" rx="1" fill="#00D4FF" opacity="0.8"/>
    </g>
  </svg>,
];

const groups = [
  {
    key: "web",
    items: ["React", "Next.js", "TypeScript", "Blazor", "C#"],
  },
  {
    key: "api",
    items: ["Go", "Node.js", "ASP.NET Core", "GraphQL", "REST", "PostgreSQL", "SQL Server"],
  },
  {
    key: "software",
    items: ["C#", "XPO/XAF", "DevExpress", "WPF", "WinForms"],
  },
];

export default function Techno() {
  const t = useTranslations("technologies");

  return (
    <>
    <style>{TECHNO_STYLE}</style>
    <section
      id="techno"
      style={{
        position: "relative",
        background: "#04040F",
        padding: "72px 8vw",
      }}
    >
      {/* Top divider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(10,132,255,0.3), transparent)",
        }}
      />

      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: 0.04 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          style={{ maxWidth: 720 }}
        >
          {/* Tag */}
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF", display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ width: 24, height: 1, background: "#00D4FF", display: "inline-block", flexShrink: 0 }} />
            {t("title")}
          </div>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", margin: "0 0 16px" }}>
            {t("subtitle")}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {groups.map((group, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <motion.article
                key={group.key}
                initial={{ opacity: 0, y: 30, scale: 0.96, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                whileHover={{ y: -6, scale: 1.015, borderColor: "rgba(10,132,255,0.3)", boxShadow: "0 0 40px rgba(10,132,255,0.12)" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 22,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(8,10,30,0.7)",
                  padding: 24,
                  boxShadow: "0 18px 50px rgba(0,0,0,0.18)",
                }}
              >
                {/* Top accent line */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.12 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 24,
                    right: 24,
                    height: 1,
                    transformOrigin: "left",
                    background: "linear-gradient(90deg, #0A84FF, rgba(10,132,255,0.35), transparent)",
                  }}
                />

                {/* Mini orbital ring decoration */}
                <div
                  style={{
                    position: "absolute",
                    top: -32,
                    right: -32,
                    width: 96,
                    height: 96,
                    borderRadius: "50%",
                    border: "1px solid rgba(10,132,255,0.12)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: -16,
                    right: -16,
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: "1px solid rgba(0,212,255,0.08)",
                    pointerEvents: "none",
                  }}
                />

                {/* Number badge */}
                <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF" }}>
                  {num}
                </span>

                {/* Animated icon */}
                <div style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
                  {GROUP_ICONS[index]}
                </div>

                <h3 style={{ marginTop: 8, fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif" }}>
                  {t(`groups.${group.key}.title`)}
                </h3>
                <p style={{ marginTop: 12, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B7A99" }}>
                  {t(`groups.${group.key}.description`)}
                </p>

                {/* Tech pills */}
                <ul style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", padding: 0 }}>
                  {group.items.map((item) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.45, delay: 0.16 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                      style={{
                        borderRadius: 999,
                        border: "1px solid rgba(10,132,255,0.25)",
                        background: "rgba(10,132,255,0.08)",
                        padding: "6px 12px",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color: "#00D4FF",
                      }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}
