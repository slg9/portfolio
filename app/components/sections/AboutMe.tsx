"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const PILLAR_ICONS = [
  /* 01 — Bullseye: homing rings */
  <svg key="bullseye" width="72" height="72" viewBox="0 0 72 72">
    <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(10,132,255,.1)" strokeWidth=".8"/>
    <circle cx="36" cy="36" r="20" fill="none" stroke="rgba(10,132,255,.18)" strokeWidth=".8"/>
    <circle cx="36" cy="36" r="10" fill="none" stroke="rgba(10,132,255,.3)" strokeWidth="1"/>
    <line x1="36" y1="4"  x2="36" y2="14" stroke="rgba(0,212,255,.35)" strokeWidth="1" strokeLinecap="round"/>
    <line x1="36" y1="58" x2="36" y2="68" stroke="rgba(0,212,255,.35)" strokeWidth="1" strokeLinecap="round"/>
    <line x1="4"  y1="36" x2="14" y2="36" stroke="rgba(0,212,255,.35)" strokeWidth="1" strokeLinecap="round"/>
    <line x1="58" y1="36" x2="68" y2="36" stroke="rgba(0,212,255,.35)" strokeWidth="1" strokeLinecap="round"/>
    <circle cx="36" cy="36" r="30" fill="none" stroke="#0A84FF" strokeWidth="1.5" className="pillar-home-ring ph1"/>
    <circle cx="36" cy="36" r="30" fill="none" stroke="#00D4FF" strokeWidth="1.5" className="pillar-home-ring ph2"/>
    <circle cx="36" cy="36" r="30" fill="none" stroke="#00FFB3" strokeWidth="1.5" className="pillar-home-ring ph3"/>
    <circle cx="36" cy="36" r="4" fill="#0A84FF"/>
    <circle cx="36" cy="36" r="4" fill="#0A84FF" opacity=".5" className="pillar-center-pulse"/>
  </svg>,

  /* 02 — Gears */
  <svg key="gears" width="72" height="72" viewBox="0 0 72 72" fill="none">
    <defs>
      <radialGradient id="pgBig" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(10,132,255,.35)"/>
        <stop offset="100%" stopColor="rgba(10,132,255,.08)"/>
      </radialGradient>
      <radialGradient id="pgSmall" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(0,255,179,.3)"/>
        <stop offset="100%" stopColor="rgba(0,255,179,.06)"/>
      </radialGradient>
    </defs>
    <g className="pillar-gear-big" style={{ transformOrigin: "30px 36px" }}>
      <path fill="url(#pgBig)" stroke="#0A84FF" strokeWidth="1.2" strokeLinejoin="round"
        d="M27,24.9l1.1-.24-.34-4.5h4.5l-.34,4.5 1.1.24 1.1.36 1.02.44 2.37-3.84 3.64 2.65-2.92 3.44.74.83.68.94.57.96 4.17-1.72 1.39 4.29-4.39 1.06.12 1.11v1.16l-.12 1.11 4.39 1.06-1.39 4.29-4.17-1.72-.57.96-.68.94-.74.83 2.92 3.44-3.64 2.65-2.37-3.84-1.02.44-1.1.36-1.1.24.34 4.5h-4.5l.34-4.5-1.1-.24-1.1-.36-1.02-.44-2.37 3.84-3.64-2.65 2.92-3.44-.74-.83-.68-.94-.57-.96-4.17 1.72-1.39-4.29 4.39-1.06-.12-1.11v-1.16l.12-1.11-4.39-1.06 1.39-4.29 4.17 1.72.57-.96.68-.94.74-.83-2.92-3.44 3.64-2.65 2.37 3.84 1.02-.44Z"/>
      <circle cx="30" cy="36" r="5" fill="#04040F" stroke="#0A84FF" strokeWidth="1.2"/>
      <circle cx="30" cy="36" r="2" fill="#0A84FF" opacity=".6"/>
    </g>
    <g className="pillar-gear-small" style={{ transformOrigin: "50px 28px" }}>
      <path fill="url(#pgSmall)" stroke="#00FFB3" strokeWidth="1" strokeLinejoin="round"
        d="M47.24,21.03l.99-.32-.24-2.51h4.02l-.24 2.51.99.32.97.46.87.58 1.81-1.75 2.5 3.14-2.11 1.38.37.97.24 1.05.09 1.04 2.5.32-.9 3.92-2.39-.8-.53.9-.67.84-.76.72 1.31 2.16-3.62 1.74-.87-2.37-1.03.15h-2.16l-1.03-.15-.87 2.37-3.62-1.74 1.31-2.16-.76-.72-.67-.84-.53-.9-2.39.8-.9-3.92 2.5-.32.09-1.04.24-1.05.37-.97-2.11-1.38 2.5-3.14 1.81 1.75Z"/>
      <circle cx="50" cy="28" r="3.2" fill="#04040F" stroke="#00FFB3" strokeWidth="1"/>
      <circle cx="50" cy="28" r="1.2" fill="#00FFB3" opacity=".6"/>
    </g>
    <line x1="30" y1="36" x2="50" y2="28" stroke="rgba(255,255,255,.06)" strokeWidth=".8" strokeDasharray="2 3"/>
  </svg>,

  /* 03 — CI/CD pipeline */
  <svg key="pipeline" width="72" height="72" viewBox="0 0 72 72" fill="none">
    <rect x="4"  y="30" width="14" height="12" rx="4" fill="rgba(10,132,255,.2)"  stroke="#0A84FF" strokeWidth="1.2"/>
    <rect x="29" y="30" width="14" height="12" rx="4" fill="rgba(0,212,255,.2)"   stroke="#00D4FF" strokeWidth="1.2"/>
    <rect x="54" y="30" width="14" height="12" rx="4" fill="rgba(0,255,179,.2)"   stroke="#00FFB3" strokeWidth="1.2"/>
    <line x1="18" y1="36" x2="29" y2="36" stroke="rgba(255,255,255,.15)" strokeWidth="1.2"/>
    <line x1="43" y1="36" x2="54" y2="36" stroke="rgba(255,255,255,.15)" strokeWidth="1.2"/>
    <circle className="pillar-pipe-dot pd1" cx="23" cy="36" r="2.5" fill="#0A84FF"/>
    <circle className="pillar-pipe-dot pd2" cx="48" cy="36" r="2.5" fill="#00D4FF"/>
    <path d="M58,36 l3,3 5,-5" fill="none" stroke="#00FFB3" strokeWidth="1.5" strokeLinecap="round" className="pillar-check-draw"/>
    <text x="11" y="49" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,.35)" fontFamily="sans-serif">CI</text>
    <text x="36" y="49" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,.35)" fontFamily="sans-serif">CD</text>
    <text x="61" y="49" textAnchor="middle" fontSize="5.5" fill="rgba(0,255,179,.5)"   fontFamily="sans-serif">✓</text>
  </svg>,
];

function Pillar({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <motion.article
      initial={{ opacity: 0, y: 26, scale: 0.97, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      whileHover={{ y: -4, scale: 1.01, borderColor: "rgba(10,132,255,0.3)", boxShadow: "0 0 32px rgba(10,132,255,0.12)" }}
      transition={{ duration: 0.75, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(8,10,30,0.7)",
        padding: "24px",
        boxShadow: "0 18px 48px rgba(0,0,0,0.18)",
      }}
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.12 * index, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        style={{
          position: "absolute",
          top: 0,
          left: 24,
          right: 24,
          height: 1,
          transformOrigin: "left",
          background: "linear-gradient(90deg, #0A84FF, rgba(10,132,255,0.4), transparent)",
        }}
      />
      {/* Animated icon */}
      <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: 4 }}>
        <span style={{ position: "absolute", top: 0, right: 0, fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.15em", color: "rgba(10,132,255,0.25)" }}>
          {num}
        </span>
        {PILLAR_ICONS[index]}
      </div>
      <h3 style={{ marginTop: 8, fontSize: "1rem", fontWeight: 700, color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif" }}>
        {title}
      </h3>
      <p style={{ marginTop: 10, fontSize: "0.82rem", lineHeight: 1.7, color: "#6B7A99" }}>
        {description}
      </p>
    </motion.article>
  );
}

const PILLAR_STYLE = `
  @keyframes pillarHomeRing {
    0%   { r: 30; opacity: 0.9; stroke-width: 1.5; }
    60%  { r: 6;  opacity: 0.4; stroke-width: 1; }
    100% { r: 30; opacity: 0;   stroke-width: 0.5; }
  }
  .pillar-home-ring { animation: pillarHomeRing 2.4s ease-in-out infinite; }
  .ph1 { animation-delay: 0s; }
  .ph2 { animation-delay: 0.8s; }
  .ph3 { animation-delay: 1.6s; }

  @keyframes pillarCenterPulse {
    0%, 100% { r: 4; opacity: 0.5; }
    50%       { r: 7; opacity: 0; }
  }
  .pillar-center-pulse { animation: pillarCenterPulse 1.8s ease-out infinite; }

  @keyframes pillarGearBig {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .pillar-gear-big { animation: pillarGearBig 6s linear infinite; }

  @keyframes pillarGearSmall {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  .pillar-gear-small { animation: pillarGearSmall 4s linear infinite; }

  @keyframes pillarPipeDot {
    0%   { cx: 18; opacity: 1; }
    45%  { cx: 28; opacity: 1; }
    55%  { cx: 28; opacity: 0; }
    56%  { cx: 18; opacity: 0; }
    65%  { cx: 18; opacity: 1; }
    100% { cx: 18; opacity: 1; }
  }
  @keyframes pillarPipeDot2 {
    0%   { cx: 43; opacity: 1; }
    45%  { cx: 53; opacity: 1; }
    55%  { cx: 53; opacity: 0; }
    56%  { cx: 43; opacity: 0; }
    65%  { cx: 43; opacity: 1; }
    100% { cx: 43; opacity: 1; }
  }
  .pd1 { animation: pillarPipeDot  2s ease-in-out infinite; }
  .pd2 { animation: pillarPipeDot2 2s ease-in-out infinite 0.4s; }

  @keyframes pillarCheckDraw {
    0%   { stroke-dashoffset: 14; opacity: 0; }
    30%  { opacity: 1; }
    70%  { stroke-dashoffset: 0; opacity: 1; }
    90%  { opacity: 1; }
    100% { stroke-dashoffset: 0; opacity: 0; }
  }
  .pillar-check-draw {
    stroke-dasharray: 14;
    stroke-dashoffset: 14;
    animation: pillarCheckDraw 2s ease-in-out infinite 1s;
  }
`;

export default function AboutMe() {
  const t = useTranslations("about");
  const pathname = usePathname();
  const cvHref = pathname.startsWith("/en")
    ? "/docs/Sebastien_Legros_CV_EN.pdf"
    : "/docs/Sebastien_Legros_CV_FR.pdf";

  return (
    <>
    <style>{PILLAR_STYLE}</style>
    <section
      id="aboutme"
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
        {/* Grid: left header, right body+CTA */}
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {/* Tag */}
            <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF", display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span style={{ width: 24, height: 1, background: "#00D4FF", display: "inline-block", flexShrink: 0 }} />
              {t("title")}
            </div>
            <h2 style={{ maxWidth: 420, fontSize: "clamp(1.85rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", marginTop: 0 }}>
              {t("subtitle")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 22,
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(8,10,30,0.7)",
              padding: "32px",
              boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
            }}
          >
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{
                position: "absolute",
                top: 0,
                left: 32,
                right: 32,
                height: 1,
                transformOrigin: "left",
                background: "linear-gradient(90deg, #0A84FF, rgba(10,132,255,0.4), transparent)",
              }}
            />
            <p style={{ maxWidth: "56ch", fontSize: "0.9375rem", lineHeight: 1.75, color: "#6B7A99", fontFamily: "var(--font-body), sans-serif" }}>
              {t("body")}
            </p>
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -2, scale: 1.02 }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #0A84FF, #00D4FF)",
                  padding: "12px 24px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#fff",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                {t("contactMe")}
              </motion.a>
              <motion.a
                href={cvHref}
                download
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "12px 24px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#F0F4FF",
                  textDecoration: "none",
                  display: "inline-block",
                  background: "transparent",
                }}
              >
                {t("downloadCV")}
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Pillar cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["build", "scale", "ship"].map((item, index) => (
            <Pillar
              key={item}
              index={index}
              title={t(`pillars.${item}.title`)}
              description={t(`pillars.${item}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
