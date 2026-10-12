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
        .hero-text {
          display: flex; flex-direction: column; gap: 20px;
          position: relative; z-index: 2; padding: 84px 0 64px;
        }
        .hero-photo-col {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          position: relative; z-index: 2;
        }
        .hero-photo-wrap {
          position: relative;
          width: min(300px, 36vw);
        }

        @media (max-width: 900px) {
          .hero-wrap {
            grid-template-columns: 1fr;
            min-height: auto;
            padding: 0 5vw;
          }
          .hero-photo-col {
            order: -1;
            padding-top: 88px;
            padding-bottom: 0;
            align-items: flex-start;
          }
          .hero-text {
            gap: 16px;
            padding: 16px 0 48px;
            align-items: flex-start;
            text-align: left;
          }
          .hero-photo-wrap { width: 96px !important; }
          .hero-cta-row { flex-direction: column; width: 100%; }
          .hero-cta-primary { width: 100%; text-align: center; justify-content: center; }
          .hero-cta-secondary-row { display: flex; gap: 12px; width: 100%; }
        }
        @media (max-width: 600px) {
          .hero-photo-wrap { width: 80px !important; }
        }
      `}</style>

      <div className="hero-wrap">
        {/* Text column */}
        <div className="hero-text">
          <h1 style={{
            margin: 0, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800,
            lineHeight: 1.08, letterSpacing: "-0.04em",
            fontFamily: "var(--font-display), sans-serif", color: "#F0F4FF",
          }}>
            {t("name")}
          </h1>

          <p style={{
            margin: 0, fontSize: "clamp(1rem, 1.6vw, 1.2rem)", fontWeight: 600,
            color: "var(--accent)", letterSpacing: "-0.01em",
          }}>
            {t("jobTitle")}
          </p>

          <p style={{
            margin: 0, fontSize: "0.95rem", lineHeight: 1.7, color: "#8A96AD",
            maxWidth: "52ch",
          }}>
            {t("tagline")}
          </p>

          {/* Availability + location */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{
              fontSize: "0.72rem", fontWeight: 600, color: "var(--accent)",
              letterSpacing: "0.04em",
              border: "1px solid rgba(91,143,201,0.22)", borderRadius: 999,
              padding: "4px 12px", background: "rgba(91,143,201,0.06)",
            }}>
              {t("availability")}
            </span>
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,.42)", letterSpacing: ".02em" }}>
              La Réunion · Remote
            </span>
          </div>

          {/* CTAs */}
          <div className="hero-cta-row" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
            <a
              href="#projects"
              className="hero-cta-primary"
              style={{
                background: "var(--accent)", color: "#fff",
                fontFamily: "var(--font-display),sans-serif", fontSize: ".84rem", fontWeight: 700,
                padding: "13px 28px", borderRadius: 100, textDecoration: "none", letterSpacing: ".02em",
                transition: "transform .2s, opacity .2s",
                display: "inline-flex", alignItems: "center", gap: 8,
              }}
            >
              {t("primaryCta")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <div className="hero-cta-secondary-row" style={{ display: "flex", gap: 12 }}>
              <a
                href="#contact"
                style={{
                  background: "transparent", color: "rgba(240,244,255,.75)",
                  fontFamily: "var(--font-display),sans-serif", fontSize: ".84rem", fontWeight: 600,
                  padding: "12px 22px", borderRadius: 100, border: "1.5px solid rgba(255,255,255,.1)",
                  textDecoration: "none", transition: "all .2s", display: "inline-block",
                }}
              >
                {t("secondaryCta")}
              </a>
              <a
                href={cvHref}
                download
                style={{
                  background: "transparent", color: "rgba(255,255,255,.48)",
                  fontFamily: "var(--font-display),sans-serif", fontSize: ".84rem", fontWeight: 600,
                  padding: "12px 22px", borderRadius: 100, border: "1.5px solid rgba(255,255,255,.1)",
                  textDecoration: "none", transition: "all .2s", display: "inline-block",
                }}
              >
                {t("tertiaryCta")}
              </a>
            </div>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {[
              { href: "https://github.com/slg9", title: "GitHub", d: "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.71C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12C22 6.48 17.52 2 12 2z" },
              { href: "https://www.linkedin.com/in/s%C3%A9bastien-legros-23a85085", title: "LinkedIn", d: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 17H6.5v-7H9v7zm-1.25-8.27A1.37 1.37 0 1 1 9.12 7.36a1.37 1.37 0 0 1-1.37 1.37zM18 17h-2.5v-3.5c0-1-.38-1.5-1.13-1.5s-1.37.6-1.37 1.6V17H10.5v-7H13v1.07C13.53 10.36 14.32 10 15.25 10 16.89 10 18 11 18 13.3V17z" },
            ].map(({ href, title, d }) => (
              <a key={title} href={href} title={title} target="_blank" rel="noopener noreferrer"
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,.42)", textDecoration: "none", transition: "all .2s",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={d} /></svg>
              </a>
            ))}
          </div>
        </div>

        {/* Photo column */}
        <div className="hero-photo-col">
          <div className="hero-photo-wrap">
            <div style={{
              position: "relative", borderRadius: 16, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)", background: "#0A0C1A",
              aspectRatio: "1/1",
              boxShadow: "0 24px 60px rgba(0,0,0,.4)",
            }}>
              <Image
                src="/sebastien.jpeg"
                alt={`Sébastien Legros — ${t("jobTitle")}`}
                fill
                sizes="(max-width: 900px) 96px, 300px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
