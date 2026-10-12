"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const PILLAR_ICONS = [
  /* 01 — Bullseye (static) */
  <svg key="bullseye" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" stroke="rgba(10,132,255,.15)" strokeWidth="1" />
    <circle cx="24" cy="24" r="13" stroke="rgba(10,132,255,.25)" strokeWidth="1" />
    <circle cx="24" cy="24" r="6" stroke="rgba(10,132,255,.4)" strokeWidth="1" />
    <circle cx="24" cy="24" r="2.5" fill="#0A84FF" />
  </svg>,

  /* 02 — Structure (static) */
  <svg key="structure" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="8" width="14" height="14" rx="3" stroke="rgba(10,132,255,.3)" strokeWidth="1" />
    <rect x="26" y="8" width="14" height="14" rx="3" stroke="rgba(10,132,255,.3)" strokeWidth="1" />
    <rect x="17" y="26" width="14" height="14" rx="3" stroke="rgba(10,132,255,.4)" strokeWidth="1" />
    <line x1="15" y1="22" x2="21" y2="26" stroke="rgba(10,132,255,.2)" strokeWidth="1" />
    <line x1="33" y1="22" x2="27" y2="26" stroke="rgba(10,132,255,.2)" strokeWidth="1" />
  </svg>,

  /* 03 — Pipeline (static) */
  <svg key="pipeline" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="20" width="10" height="8" rx="2" stroke="rgba(10,132,255,.3)" strokeWidth="1" />
    <rect x="19" y="20" width="10" height="8" rx="2" stroke="rgba(10,132,255,.3)" strokeWidth="1" />
    <rect x="34" y="20" width="10" height="8" rx="2" stroke="rgba(10,132,255,.4)" strokeWidth="1" />
    <line x1="14" y1="24" x2="19" y2="24" stroke="rgba(10,132,255,.2)" strokeWidth="1" />
    <line x1="29" y1="24" x2="34" y2="24" stroke="rgba(10,132,255,.2)" strokeWidth="1" />
    <path d="M37 24l2 2 3-4" stroke="#0A84FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>,
];

function Pillar({ title, description, index }: { title: string; description: string; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <article
      style={{
        position: "relative", overflow: "hidden", borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(8,10,30,0.7)",
        padding: "24px",
        boxShadow: "0 18px 48px rgba(0,0,0,0.18)",
        transition: "border-color 180ms ease, box-shadow 180ms ease",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 1, background: "linear-gradient(90deg, #0A84FF, rgba(10,132,255,0.4), transparent)" }} />
      <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: 4 }}>
        <span style={{ position: "absolute", top: 0, right: 0, fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.15em", color: "rgba(10,132,255,0.25)" }}>{num}</span>
        {PILLAR_ICONS[index]}
      </div>
      <h3 style={{ marginTop: 8, fontSize: "1rem", fontWeight: 700, color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif" }}>{title}</h3>
      <p style={{ marginTop: 10, fontSize: "0.82rem", lineHeight: 1.7, color: "#6B7A99" }}>{description}</p>
    </article>
  );
}

const PILLAR_STYLE = `
  @keyframes aboutPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: .4; transform: scale(1.5); }
  }

  .about-bento {
    display: grid;
    gap: 16px;
  }
  @media (min-width: 768px) {
    .about-bento {
      grid-template-columns: 1.45fr 1fr;
    }
  }
`;

// ── STATS DATA ────────────────────────────────────────────────────────────────
const STATS = [
  { value: "10",  key: "years" },
] as const;

export default function AboutMe() {
  const t = useTranslations("about");
  const pathname = usePathname();
  const cvHref = pathname.startsWith("/en")
    ? "/docs/Sebastien_Legros_CV_EN.pdf"
    : "/docs/Sebastien_Legros_CV_FR.pdf";

  return (
    <>
      <style>{PILLAR_STYLE}</style>
      <section id="aboutme" style={{ position: "relative", background: "#04040F", padding: "80px 8vw" }}>

        {/* Top divider */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(10,132,255,0.3), transparent)" }}/>

        <div style={{ maxWidth: 1152, margin: "0 auto" }}>

          {/* ── Bento grid row 1 ── */}
          <div className="about-bento">

            {/* Main bio card */}
            <div
              style={{
                position: "relative", overflow: "hidden", borderRadius: 22,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(8,10,30,0.7)",
                padding: "36px",
                boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
              }}
            >
              <div
                style={{ position: "absolute", top: 0, left: 36, right: 36, height: 1, background: "linear-gradient(90deg, #0A84FF, rgba(10,132,255,0.4), transparent)" }}
              />

              {/* Tag */}
              <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF", display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ width: 24, height: 1, background: "#00D4FF", display: "inline-block", flexShrink: 0 }}/>
                {t("title")}
              </div>

              <h2 style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.15rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", marginTop: 0, marginBottom: 20, maxWidth: 500 }}>
                {t("subtitle")}
              </h2>

              <p style={{ fontSize: "0.9375rem", lineHeight: 1.78, color: "#6B7A99", maxWidth: "58ch" }}>
                {t("body")}
              </p>

              <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
                <a
                  href="#contact"
                  style={{ borderRadius: 999, background: "linear-gradient(135deg,#0A84FF,#00D4FF)", padding: "11px 24px", fontSize: "0.875rem", fontWeight: 700, color: "#fff", textDecoration: "none", display: "inline-block", transition: "transform .2s,box-shadow .2s", boxShadow: "0 0 20px rgba(10,132,255,.25)", letterSpacing: ".03em" }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.transform="translateY(-2px)"; el.style.boxShadow="0 8px 28px rgba(10,132,255,.45)"; }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.transform=""; el.style.boxShadow="0 0 20px rgba(10,132,255,.25)"; }}
                >
                  {t("contactMe")}
                </a>
                <a
                  href={cvHref}
                  download
                  style={{ borderRadius: 999, border: "1.5px solid rgba(255,255,255,.1)", padding: "11px 24px", fontSize: "0.875rem", fontWeight: 600, color: "rgba(240,244,255,.8)", textDecoration: "none", display: "inline-block", transition: "border-color .2s,transform .2s,color .2s" }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(255,255,255,.22)"; el.style.transform="translateY(-2px)"; el.style.color="#F0F4FF"; }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(255,255,255,.1)"; el.style.transform=""; el.style.color="rgba(240,244,255,.8)"; }}
                >
                  {t("downloadCV")}
                </a>
              </div>
            </div>

            {/* Stats card */}
            <div
              style={{
                position: "relative", overflow: "hidden", borderRadius: 22,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(8,10,30,0.7)",
                padding: "32px",
                boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                minHeight: 260,
              }}
            >
              <div
                style={{ position: "absolute", top: 0, left: 32, right: 32, height: 1, background: "linear-gradient(90deg, #0A84FF, rgba(10,132,255,.3), transparent)" }}
              />

              {/* Stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {STATS.map(({ value, key }) => (
                  <div key={key} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontSize: "2.6rem", fontWeight: 800, color: "#F0F4FF", letterSpacing: "-.045em", lineHeight: 1, fontFamily: "var(--font-display),sans-serif" }}>
                      {value}
                    </span>
                    <span style={{ fontSize: ".68rem", color: "rgba(255,255,255,.3)", letterSpacing: ".12em", textTransform: "uppercase" }}>
                      {t(`stats.${key}`)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Availability badge */}
              <div style={{ marginTop: 28, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,163,115,.08)", border: "1px solid rgba(212,163,115,.22)", borderRadius: 100, padding: "6px 14px", alignSelf: "flex-start" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#D4A373", boxShadow: "0 0 8px rgba(212,163,115,.5)", animation: "aboutPulse 2s ease-in-out infinite" }}/>
                <span style={{ fontSize: ".65rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "#D4A373" }}>
                  {t("availability")}
                </span>
              </div>
            </div>
          </div>

          {/* ── Pillar cards ── */}
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
    </>
  );
}
