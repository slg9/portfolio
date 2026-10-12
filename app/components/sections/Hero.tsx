"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("hero");
  const pathname = usePathname();

  const cvHref = pathname.startsWith("/en")
    ? "/docs/Sebastien_Legros_CV_EN.pdf"
    : "/docs/Sebastien_Legros_CV_FR.pdf";

  return (
    <section
      id="hero"
      style={{ minHeight: "100dvh", position: "relative", background: "#04040F" }}
    >
      <style>{`
        .hero-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100dvh;
          align-items: center;
          padding: 0 6vw;
          max-width: 1400px;
          margin: 0 auto;
          gap: 4vw;
        }
        .hero-left {
          display: flex; flex-direction: column; gap: 22px;
          position: relative; z-index: 2; padding: 84px 0 64px;
        }
        .hero-right {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          position: relative; z-index: 2;
        }
        .hero-portrait-wrap {
          position: relative;
          width: min(340px, 40vw);
        }
        .hero-line {
          display: block;
          font-size: clamp(2.4rem, 4.8vw, 5.2rem);
          font-weight: 800;
          line-height: 1.03;
          letter-spacing: -0.05em;
          font-family: var(--font-display), sans-serif;
          color: #E8EEFF;
        }

        @media (max-width: 900px) {
          .hero-wrap { grid-template-columns: 1fr; min-height: auto; padding: 0 5vw; }
          .hero-right { padding-bottom: 48px; }
          .hero-left { gap: 18px; padding: 104px 0 28px; align-items: center; text-align: center; }
          .hero-line { font-size: clamp(2rem, 6.8vw, 3.5rem); }
          .hero-portrait-wrap { width: min(72vw, 270px) !important; }
          .hero-cta-row { justify-content: center !important; flex-wrap: wrap; }
          .hero-social-row { justify-content: center !important; }
          .hero-identity { justify-content: center !important; }
        }
        @media (max-width: 600px) {
          .hero-left { padding-top: 90px; }
          .hero-line { font-size: clamp(1.75rem, 7.8vw, 2.9rem); }
          .hero-portrait-wrap { width: min(68vw, 230px) !important; }
        }
      `}</style>

      <div className="hero-wrap">
        {/* Left */}
        <div className="hero-left">
          <h1 style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 1 }}>
            <span className="hero-line">{t("titleLine1")}</span>
            <span className="hero-line">{t("titleLine2")}</span>
            <span className="hero-line">{t("titleLine3")}</span>
          </h1>

          <div className="hero-identity" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 22, height: 1.5, background: "rgba(10,132,255,.5)", flexShrink: 0 }} />
            <span style={{ fontSize: ".77rem", fontWeight: 600, color: "rgba(240,244,255,.38)", letterSpacing: ".02em" }}>Sébastien Legros</span>
            <span style={{ color: "rgba(255,255,255,.12)", fontSize: ".75rem" }}>·</span>
            <span style={{ fontSize: ".77rem", fontWeight: 500, color: "rgba(240,244,255,.2)", letterSpacing: ".02em" }}>{t("jobTitle")}</span>
          </div>

          <div className="hero-cta-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="#projects"
              style={{
                background: "#0A84FF", color: "#fff",
                fontFamily: "var(--font-display),sans-serif", fontSize: ".84rem", fontWeight: 700,
                padding: "14px 28px", borderRadius: 100, textDecoration: "none", letterSpacing: ".03em",
                boxShadow: "0 0 36px rgba(10,132,255,.35)", transition: "transform .2s,box-shadow .2s",
                display: "inline-flex", alignItems: "center", gap: 8,
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 44px rgba(10,132,255,.58)"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = ""; el.style.boxShadow = "0 0 36px rgba(10,132,255,.35)"; }}
            >
              {t("primaryCta")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a
              href="#contact"
              style={{
                background: "transparent", color: "rgba(240,244,255,.8)",
                fontFamily: "var(--font-display),sans-serif", fontSize: ".84rem", fontWeight: 600,
                padding: "13px 24px", borderRadius: 100, border: "1.5px solid rgba(255,255,255,.1)",
                textDecoration: "none", transition: "all .2s", display: "inline-block",
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "rgba(10,132,255,.4)"; el.style.color = "#0A84FF"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,.1)"; el.style.color = "rgba(240,244,255,.8)"; }}
            >
              {t("secondaryCta")}
            </a>
            <a
              href={cvHref}
              download
              style={{
                background: "transparent", color: "rgba(255,255,255,.26)",
                fontFamily: "var(--font-display),sans-serif", fontSize: ".84rem", fontWeight: 600,
                padding: "13px 20px", borderRadius: 100, border: "1.5px solid rgba(255,255,255,.06)",
                textDecoration: "none", transition: "all .2s", display: "inline-block",
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,.14)"; el.style.color = "rgba(255,255,255,.58)"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,.06)"; el.style.color = "rgba(255,255,255,.26)"; }}
            >
              {t("tertiaryCta")}
            </a>
          </div>

          <div className="hero-social-row" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {[
              { href: "https://github.com/slg9", title: "GitHub", d: "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.71C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12C22 6.48 17.52 2 12 2z" },
              { href: "https://www.linkedin.com/in/s%C3%A9bastien-legros-23a85085", title: "LinkedIn", d: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 17H6.5v-7H9v7zm-1.25-8.27A1.37 1.37 0 1 1 9.12 7.36a1.37 1.37 0 0 1-1.37 1.37zM18 17h-2.5v-3.5c0-1-.38-1.5-1.13-1.5s-1.37.6-1.37 1.6V17H10.5v-7H13v1.07C13.53 10.36 14.32 10 15.25 10 16.89 10 18 11 18 13.3V17z" },
            ].map(({ href, title, d }) => (
              <a key={title} href={href} title={title} target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.28)", textDecoration: "none", transition: "all .2s", cursor: "pointer" }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(10,132,255,.12)"; el.style.borderColor = "#0A84FF"; el.style.color = "#0A84FF"; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,.04)"; el.style.borderColor = "rgba(255,255,255,.07)"; el.style.color = "rgba(255,255,255,.28)"; el.style.transform = ""; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={d} /></svg>
              </a>
            ))}
            <div style={{ width: 1, height: 18, background: "rgba(255,255,255,.08)", margin: "0 2px" }} />
            <span style={{ fontSize: ".62rem", color: "rgba(255,255,255,.18)", letterSpacing: ".04em" }}>La Réunion · Remote</span>
          </div>
        </div>

        {/* Right — Portrait */}
        <div className="hero-right">
          <div className="hero-portrait-wrap">
            <div style={{
              position: "relative", borderRadius: 24, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)", background: "#090B1E",
              aspectRatio: "3/4",
              boxShadow: "0 0 70px rgba(10,132,255,.2), 0 36px 90px rgba(0,0,0,.55)",
            }}>
              <Image
                src="/sebastien.png"
                alt={`Sébastien Legros — ${t("jobTitle")}`}
                fill
                sizes="(max-width: 900px) 74vw, 390px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,4,15,.92) 0%, rgba(4,4,15,.04) 28%, transparent 40%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 18, left: 18, right: 18, zIndex: 3 }}>
                <p style={{ margin: 0, fontSize: ".86rem", fontWeight: 800, color: "#F0F4FF", letterSpacing: "-.02em", fontFamily: "var(--font-display),sans-serif", lineHeight: 1.2 }}>Sébastien Legros</p>
                <p style={{ margin: "4px 0 0", fontSize: ".6rem", color: "rgba(255,255,255,.32)", letterSpacing: ".07em" }}>{t("jobTitle")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
