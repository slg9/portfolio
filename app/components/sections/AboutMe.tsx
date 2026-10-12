"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const PILLAR_ICONS = [
  /* Bullseye */
  <svg key="bullseye" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" stroke="rgba(91,143,201,.15)" strokeWidth="1" />
    <circle cx="24" cy="24" r="13" stroke="rgba(91,143,201,.25)" strokeWidth="1" />
    <circle cx="24" cy="24" r="6" stroke="rgba(91,143,201,.4)" strokeWidth="1" />
    <circle cx="24" cy="24" r="2.5" fill="var(--accent)" />
  </svg>,

  /* Structure */
  <svg key="structure" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="8" width="14" height="14" rx="3" stroke="rgba(91,143,201,.3)" strokeWidth="1" />
    <rect x="26" y="8" width="14" height="14" rx="3" stroke="rgba(91,143,201,.3)" strokeWidth="1" />
    <rect x="17" y="26" width="14" height="14" rx="3" stroke="rgba(91,143,201,.4)" strokeWidth="1" />
    <line x1="15" y1="22" x2="21" y2="26" stroke="rgba(91,143,201,.2)" strokeWidth="1" />
    <line x1="33" y1="22" x2="27" y2="26" stroke="rgba(91,143,201,.2)" strokeWidth="1" />
  </svg>,

  /* Pipeline */
  <svg key="pipeline" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="20" width="10" height="8" rx="2" stroke="rgba(91,143,201,.3)" strokeWidth="1" />
    <rect x="19" y="20" width="10" height="8" rx="2" stroke="rgba(91,143,201,.3)" strokeWidth="1" />
    <rect x="34" y="20" width="10" height="8" rx="2" stroke="rgba(91,143,201,.4)" strokeWidth="1" />
    <line x1="14" y1="24" x2="19" y2="24" stroke="rgba(91,143,201,.2)" strokeWidth="1" />
    <line x1="29" y1="24" x2="34" y2="24" stroke="rgba(91,143,201,.2)" strokeWidth="1" />
    <path d="M37 24l2 2 3-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>,
];

function Pillar({ title, description, index }: { title: string; description: string; index: number }) {
  return (
    <article
      style={{
        position: "relative", overflow: "hidden", borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(8,10,30,0.7)",
        padding: "24px",
        boxShadow: "0 18px 48px rgba(0,0,0,0.18)",
        transition: "border-color 180ms ease",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 1, background: "linear-gradient(90deg, var(--accent), rgba(91,143,201,0.3), transparent)" }} />
      <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
        {PILLAR_ICONS[index]}
      </div>
      <h3 style={{ marginTop: 8, fontSize: "1rem", fontWeight: 700, color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif" }}>{title}</h3>
      <p style={{ marginTop: 10, fontSize: "0.82rem", lineHeight: 1.7, color: "#6B7A99" }}>{description}</p>
    </article>
  );
}

export default function AboutMe() {
  const t = useTranslations("about");
  const pathname = usePathname();
  const cvHref = pathname.startsWith("/en")
    ? "/docs/Sebastien_Legros_CV_EN.pdf"
    : "/docs/Sebastien_Legros_CV_FR.pdf";

  return (
    <section id="aboutme" style={{ position: "relative", background: "#04040F", padding: "80px 8vw" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(91,143,201,0.2), transparent)" }} />

      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        {/* Bio card — full width, no stats sidebar */}
        <div
          style={{
            position: "relative", overflow: "hidden", borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(8,10,30,0.7)",
            padding: "36px",
            boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: 36, right: 36, height: 1, background: "linear-gradient(90deg, var(--accent), rgba(91,143,201,0.3), transparent)" }} />

          <h2 style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.15rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", marginTop: 0, marginBottom: 20, maxWidth: 500 }}>
            {t("subtitle")}
          </h2>

          <p style={{ fontSize: "0.9375rem", lineHeight: 1.78, color: "#6B7A99", maxWidth: "62ch" }}>
            {t("body")}
          </p>

          <p style={{ marginTop: 16, fontSize: "0.875rem", fontWeight: 600, color: "rgba(240,244,255,.65)" }}>
            {t("experience_line")}
          </p>

          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a
              href="#contact"
              style={{
                borderRadius: 999, background: "var(--accent)",
                padding: "11px 24px", fontSize: "0.875rem", fontWeight: 700,
                color: "#fff", textDecoration: "none", display: "inline-block",
                transition: "transform .2s, opacity .2s", letterSpacing: ".02em",
              }}
            >
              {t("contactMe")}
            </a>
            <a
              href={cvHref}
              download
              style={{
                borderRadius: 999, border: "1.5px solid rgba(255,255,255,.1)",
                padding: "11px 24px", fontSize: "0.875rem", fontWeight: 600,
                color: "rgba(240,244,255,.75)", textDecoration: "none", display: "inline-block",
                transition: "border-color .2s, transform .2s, color .2s",
              }}
            >
              {t("downloadCV")}
            </a>
          </div>
        </div>

        {/* Pillar cards */}
        <div className="grid gap-4 md:grid-cols-3" style={{ marginTop: 16 }}>
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
  );
}
