"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: "2.1rem", fontWeight: 800, color: "#F0F4FF", letterSpacing: "-.055em", fontFamily: "var(--font-display),sans-serif", lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: ".58rem", color: "rgba(255,255,255,.2)", letterSpacing: ".16em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

function useShowAnd(show: boolean, mv: MotionValue<number>): MotionValue<number> {
  return useTransform(mv, (v) => show ? v : 0);
}

export default function Hero() {
  const t = useTranslations("hero");
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);
  const [portraitReady, setPortraitReady] = useState(false);

  const cvHref = pathname.startsWith("/en")
    ? "/docs/Sebastien_Legros_CV_EN.pdf"
    : "/docs/Sebastien_Legros_CV_FR.pdf";

  useEffect(() => {
    if (document.body.dataset.introReady === "true") { setShow(true); }
    else {
      const h = () => setShow(true);
      window.addEventListener("portfolio:intro-ready", h);
      return () => window.removeEventListener("portfolio:intro-ready", h);
    }
  }, []);

  useEffect(() => {
    if (document.body.dataset.curtainGone === "true") { setPortraitReady(true); return; }
    const h = () => setPortraitReady(true);
    window.addEventListener("portfolio:curtain-gone", h);
    return () => window.removeEventListener("portfolio:curtain-gone", h);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── PORTRAIT — appears immediately after intro (not scroll-gated) ──────
  const _portY     = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  // ── EYEBROW ────────────────────────────────────────────────────────────
  const _eyeOp  = useTransform(scrollYProgress, [0.06, 0.16], [0, 1]);
  const _eyeY   = useTransform(scrollYProgress, [0.06, 0.16], [18, 0]);

  // ── TITLE LINES — 3D flip-in stagger ──────────────────────────────────
  const _l1Op   = useTransform(scrollYProgress, [0.12, 0.24], [0, 1]);
  const _l1Y    = useTransform(scrollYProgress, [0.12, 0.24], [56, 0]);
  const _l1RotX = useTransform(scrollYProgress, [0.12, 0.24], [-28, 0]);

  const _l2Op   = useTransform(scrollYProgress, [0.18, 0.30], [0, 1]);
  const _l2Y    = useTransform(scrollYProgress, [0.18, 0.30], [56, 0]);
  const _l2RotX = useTransform(scrollYProgress, [0.18, 0.30], [-28, 0]);

  const _l3Op   = useTransform(scrollYProgress, [0.24, 0.36], [0, 1]);
  const _l3Y    = useTransform(scrollYProgress, [0.24, 0.36], [56, 0]);
  const _l3RotX = useTransform(scrollYProgress, [0.24, 0.36], [-28, 0]);

  // ── IDENTITY BAR ───────────────────────────────────────────────────────
  const _idOp   = useTransform(scrollYProgress, [0.32, 0.42], [0, 1]);
  const _idY    = useTransform(scrollYProgress, [0.32, 0.42], [18, 0]);


  // ── CTAs ───────────────────────────────────────────────────────────────
  const _ctaOp   = useTransform(scrollYProgress, [0.42, 0.53], [0, 1]);
  const _ctaY    = useTransform(scrollYProgress, [0.42, 0.53], [20, 0]);

  // ── SOCIALS ────────────────────────────────────────────────────────────
  const _socialOp = useTransform(scrollYProgress, [0.48, 0.57], [0, 1]);
  const _socialY  = useTransform(scrollYProgress, [0.48, 0.57], [12, 0]);

  // ── STATS ──────────────────────────────────────────────────────────────
  const _statsOp  = useTransform(scrollYProgress, [0.54, 0.64], [0, 1]);
  const _statsY   = useTransform(scrollYProgress, [0.54, 0.64], [14, 0]);


  // ── SCROLL CUE — visible at start, fades as content builds ───────────
  const _scOp     = useTransform(scrollYProgress, [0, 0.06, 0.22], [1, 1, 0]);

  // ── GATE ON SHOW ───────────────────────────────────────────────────────
  // Portrait is NOT gated via scroll — it enters via animate prop directly
  const eyeOp    = useShowAnd(show, _eyeOp);
  const eyeY     = useShowAnd(show, _eyeY);
  const l1Op     = useShowAnd(show, _l1Op);
  const l1Y      = useShowAnd(show, _l1Y);
  const l1RotX   = useShowAnd(show, _l1RotX);
  const l2Op     = useShowAnd(show, _l2Op);
  const l2Y      = useShowAnd(show, _l2Y);
  const l2RotX   = useShowAnd(show, _l2RotX);
  const l3Op     = useShowAnd(show, _l3Op);
  const l3Y      = useShowAnd(show, _l3Y);
  const l3RotX   = useShowAnd(show, _l3RotX);
  const idOp     = useShowAnd(show, _idOp);
  const idY      = useShowAnd(show, _idY);
  const ctaOp    = useShowAnd(show, _ctaOp);
  const ctaY     = useShowAnd(show, _ctaY);
  const socialOp = useShowAnd(show, _socialOp);
  const socialY  = useShowAnd(show, _socialY);
  const statsOp  = useShowAnd(show, _statsOp);
  const statsY   = useShowAnd(show, _statsY);
  const scOp     = useTransform(_scOp, (v) => show ? v : 0);


  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{ minHeight: "260vh", position: "relative", background: "#04040F" }}
    >
      <style>{`
        @keyframes hPulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(1.55)} }
        @keyframes hScroll { 0%{top:-14px;opacity:1} 80%{top:46px;opacity:.15} 100%{top:46px;opacity:0} }
        @keyframes hGs     { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes hG1     { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(55px,38px) scale(1.07)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes hG2     { 0%{transform:translate(0,0)} 50%{transform:translate(-48px,-30px)} 100%{transform:translate(0,0)} }
        @keyframes hG3     { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(22px,-22px) scale(.94)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes hFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes hScan   { 0%{top:-4%;opacity:0} 10%{opacity:.18} 90%{opacity:.18} 100%{top:104%;opacity:0} }
        @keyframes hPortGlow { 0%,100%{box-shadow:0 0 70px rgba(10,132,255,.2),0 36px 90px rgba(0,0,0,.55)} 50%{box-shadow:0 0 120px rgba(10,132,255,.38),0 36px 90px rgba(0,0,0,.55)} }
        @keyframes hBracket { 0%,100%{opacity:.25} 50%{opacity:.55} }

        .hero-line {
          display: block;
          font-size: clamp(2.4rem, 4.8vw, 5.2rem);
          font-weight: 800;
          line-height: 1.03;
          letter-spacing: -0.05em;
          font-family: var(--font-display), sans-serif;
          will-change: transform, opacity;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .hero-line-gradient {
          background: linear-gradient(100deg, #0A84FF, #00D4FF 45%, #00FFB3 90%);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: hGs 5s linear infinite;
        }
        .hero-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 100dvh;
          align-items: center;
          padding: 0 6vw;
          max-width: 1400px;
          margin: 0 auto;
          gap: 4vw;
        }
        .hero-left  {
          display: flex; flex-direction: column; gap: 22px;
          position: relative; z-index: 2; padding: 84px 0 64px;
        }
        .hero-right {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          height: 100dvh; position: relative; z-index: 2; gap: 18px;
        }
        .hero-portrait-wrap {
          position: relative;
          width: min(340px, 40vw);
          animation: hFloat 7s ease-in-out infinite;
        }

        @media (max-width: 900px) {
          .hero-wrap          { grid-template-columns: 1fr; height: auto; padding: 0 5vw; }
          .hero-right         { height: auto; padding-bottom: 48px; }
          .hero-left          { gap: 18px; padding: 104px 0 28px; align-items: center; text-align: center; }
          .hero-line          { font-size: clamp(2rem, 6.8vw, 3.5rem); }
          .hero-portrait-wrap { width: min(72vw, 270px) !important; animation: none; }
          .hero-stats-row     { justify-content: center !important; }
          .hero-cta-row       { justify-content: center !important; flex-wrap: wrap; }
          .hero-social-row    { justify-content: center !important; }
          .hero-identity      { justify-content: center !important; }
          .hero-badge-row     { justify-content: center !important; }
          .hero-title-wrap    { perspective: none !important; }
        }
        @media (max-width: 600px) {
          .hero-left          { padding-top: 90px; }
          .hero-line          { font-size: clamp(1.75rem, 7.8vw, 2.9rem); }
          .hero-portrait-wrap { width: min(68vw, 230px) !important; }
        }
      `}</style>

      {/* ── STICKY VIEWPORT ─────────────────────────────────────────── */}
      <div style={{ position: "sticky", top: 0, height: "100dvh", overflow: "hidden" }}>

        {/* ── BACKGROUND ─────────────────────────────────────────────── */}
        <div style={{ position:"absolute", width:1200, height:1200, borderRadius:"50%", background:"radial-gradient(circle,rgba(10,132,255,.15) 0%,transparent 60%)", top:-480, left:-380, filter:"blur(130px)", animation:"hG1 24s ease-in-out infinite", pointerEvents:"none", zIndex:0 }}/>
        <div style={{ position:"absolute", width:750, height:750, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,255,179,.09) 0%,transparent 65%)", bottom:-220, right:"-6%", filter:"blur(110px)", animation:"hG2 28s ease-in-out infinite", pointerEvents:"none", zIndex:0 }}/>
        <div style={{ position:"absolute", width:650, height:650, borderRadius:"50%", background:"radial-gradient(circle,rgba(10,132,255,.11) 0%,transparent 65%)", top:"22%", right:"7%", filter:"blur(100px)", animation:"hG3 20s ease-in-out infinite", pointerEvents:"none", zIndex:0 }}/>

        {/* Fine grid */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0, backgroundImage:"linear-gradient(rgba(10,132,255,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(10,132,255,.028) 1px,transparent 1px)", backgroundSize:"76px 76px", maskImage:"radial-gradient(ellipse 92% 92% at 50% 50%,black,transparent)" }}/>

        {/* ── CONTENT GRID ───────────────────────────────────────────── */}
        <div className="hero-wrap" style={{ position:"relative", zIndex:1 }}>

          {/* ══ LEFT ══════════════════════════════════════════════════ */}
          <div className="hero-left">

            {/* Eyebrow */}
            <motion.div
              style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", opacity: eyeOp, y: eyeY }}
              className="hero-badge-row"
            >
              <span style={{ fontSize:".68rem", fontWeight:500, color:"rgba(255,255,255,.22)", letterSpacing:".08em" }}>
                {t("eyebrow")}
              </span>
            </motion.div>

            {/* H1 — 3D flip-in per line */}
            <h1 style={{ margin:0, padding:0, display:"flex", flexDirection:"column", gap:1 }}
                className="hero-title-wrap"
            >
              <div style={{ perspective: 900, perspectiveOrigin:"50% 100%" }}>
                <motion.span className="hero-line"
                  style={{ color:"#E8EEFF", opacity: l1Op, y: l1Y, rotateX: l1RotX, transformOrigin:"50% 100%", display:"block" }}
                >
                  {t("titleLine1")}
                </motion.span>
              </div>
              <div style={{ perspective: 900, perspectiveOrigin:"50% 100%" }}>
                <motion.span className="hero-line"
                  style={{ color:"#E8EEFF", opacity: l2Op, y: l2Y, rotateX: l2RotX, transformOrigin:"50% 100%", display:"block" }}
                >
                  {t("titleLine2")}
                </motion.span>
              </div>
              <div style={{ perspective: 900, perspectiveOrigin:"50% 100%" }}>
                <motion.span className="hero-line hero-line-gradient"
                  style={{ opacity: l3Op, y: l3Y, rotateX: l3RotX, transformOrigin:"50% 100%", display:"block" }}
                >
                  {t("titleLine3")}
                </motion.span>
              </div>
            </h1>

            {/* Identity bar */}
            <motion.div className="hero-identity"
              style={{ display:"flex", alignItems:"center", gap:12, opacity: idOp, y: idY }}
            >
              <div style={{ width:22, height:1.5, background:"linear-gradient(90deg,rgba(10,132,255,.5),transparent)", flexShrink:0 }}/>
              <span style={{ fontSize:".77rem", fontWeight:600, color:"rgba(240,244,255,.38)", letterSpacing:".02em" }}>Sébastien Legros</span>
              <span style={{ color:"rgba(255,255,255,.12)", fontSize:".75rem" }}>·</span>
              <span style={{ fontSize:".77rem", fontWeight:500, color:"rgba(240,244,255,.2)", letterSpacing:".02em" }}>Ingénieur Logiciel Full Stack</span>
            </motion.div>

            {/* CTAs */}
            <motion.div className="hero-cta-row"
              style={{ display:"flex", gap:12, flexWrap:"wrap", opacity: ctaOp, y: ctaY }}
            >
              <a href="#projects"
                style={{ background:"linear-gradient(135deg,#0A84FF,#00D4FF)", color:"#fff", fontFamily:"var(--font-display),sans-serif", fontSize:".84rem", fontWeight:700, padding:"14px 28px", borderRadius:100, textDecoration:"none", letterSpacing:".03em", boxShadow:"0 0 36px rgba(10,132,255,.35)", transition:"transform .2s,box-shadow .2s", display:"inline-flex", alignItems:"center", gap:8 }}
                onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.transform="translateY(-2px)"; el.style.boxShadow="0 8px 44px rgba(10,132,255,.58)"; }}
                onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.transform=""; el.style.boxShadow="0 0 36px rgba(10,132,255,.35)"; }}
              >
                {t("primaryCta")}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#contact"
                style={{ background:"transparent", color:"rgba(240,244,255,.8)", fontFamily:"var(--font-display),sans-serif", fontSize:".84rem", fontWeight:600, padding:"13px 24px", borderRadius:100, border:"1.5px solid rgba(255,255,255,.1)", textDecoration:"none", transition:"all .2s", display:"inline-block" }}
                onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(0,212,255,.4)"; el.style.color="#00D4FF"; }}
                onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(255,255,255,.1)"; el.style.color="rgba(240,244,255,.8)"; }}
              >
                {t("secondaryCta")}
              </a>
              <a href={cvHref} download
                style={{ background:"transparent", color:"rgba(255,255,255,.26)", fontFamily:"var(--font-display),sans-serif", fontSize:".84rem", fontWeight:600, padding:"13px 20px", borderRadius:100, border:"1.5px solid rgba(255,255,255,.06)", textDecoration:"none", transition:"all .2s", display:"inline-block" }}
                onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(255,255,255,.14)"; el.style.color="rgba(255,255,255,.58)"; }}
                onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(255,255,255,.06)"; el.style.color="rgba(255,255,255,.26)"; }}
              >
                {t("tertiaryCta")}
              </a>
            </motion.div>

            {/* Social + location */}
            <motion.div className="hero-social-row"
              style={{ display:"flex", gap:8, alignItems:"center", opacity: socialOp, y: socialY }}
            >
              {[
                { href:"https://github.com/slg9", title:"GitHub", d:"M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.71C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12C22 6.48 17.52 2 12 2z" },
                { href:"https://www.linkedin.com/in/s%C3%A9bastien-legros-23a85085", title:"LinkedIn", d:"M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 17H6.5v-7H9v7zm-1.25-8.27A1.37 1.37 0 1 1 9.12 7.36a1.37 1.37 0 0 1-1.37 1.37zM18 17h-2.5v-3.5c0-1-.38-1.5-1.13-1.5s-1.37.6-1.37 1.6V17H10.5v-7H13v1.07C13.53 10.36 14.32 10 15.25 10 16.89 10 18 11 18 13.3V17z" },
              ].map(({ href, title, d }) => (
                <a key={title} href={href} title={title} target="_blank" rel="noopener noreferrer"
                  style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.28)", textDecoration:"none", transition:"all .2s", cursor:"pointer" }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(10,132,255,.12)"; el.style.borderColor="#0A84FF"; el.style.color="#00D4FF"; el.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(255,255,255,.04)"; el.style.borderColor="rgba(255,255,255,.07)"; el.style.color="rgba(255,255,255,.28)"; el.style.transform=""; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={d}/></svg>
                </a>
              ))}
              <div style={{ width:1, height:18, background:"rgba(255,255,255,.08)", margin:"0 2px" }}/>
              <span style={{ fontSize:".62rem", color:"rgba(255,255,255,.18)", letterSpacing:".04em" }}>La Réunion · Remote</span>
            </motion.div>

            {/* Stats */}
            <motion.div className="hero-stats-row"
              style={{ display:"flex", gap:26, opacity: statsOp, y: statsY }}
            >
              <Stat value="12+" label="Projets" />
              <div style={{ width:1, background:"rgba(255,255,255,.07)", alignSelf:"stretch" }}/>
              <Stat value="5+" label="Ans d'XP" />
              <div style={{ width:1, background:"rgba(255,255,255,.07)", alignSelf:"stretch" }}/>
              <Stat value="8+" label="Technos" />
            </motion.div>
          </div>

          {/* ══ RIGHT — Portrait ONLY, no overlapping elements ════════ */}
          <div className="hero-right">
            <motion.div
              className="hero-portrait-wrap"
              initial={{ opacity: 0, y: -24, scale: 0.94, filter: "blur(14px)" }}
              animate={portraitReady
                ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, y: -24, scale: 0.94, filter: "blur(14px)" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: _portY }}
            >
              {/* Outer glow halo */}
              <div style={{
                position:"absolute", inset:-32, borderRadius:40,
                background:"radial-gradient(ellipse at 50% 55%, rgba(10,132,255,.32) 0%, transparent 62%)",
                filter:"blur(36px)", pointerEvents:"none", zIndex:0,
              }}/>
              {/* Secondary accent glow */}
              <div style={{
                position:"absolute", inset:-20, borderRadius:36,
                background:"radial-gradient(ellipse at 30% 70%, rgba(0,255,179,.1) 0%, transparent 55%)",
                filter:"blur(24px)", pointerEvents:"none", zIndex:0,
              }}/>

              {/* Corner brackets — sci-fi decoration */}
              {[
                { top:0, left:0, borderTop:"1.5px solid rgba(10,132,255,.5)", borderLeft:"1.5px solid rgba(10,132,255,.5)", borderTopLeftRadius:6 },
                { top:0, right:0, borderTop:"1.5px solid rgba(10,132,255,.5)", borderRight:"1.5px solid rgba(10,132,255,.5)", borderTopRightRadius:6 },
                { bottom:0, left:0, borderBottom:"1.5px solid rgba(10,132,255,.5)", borderLeft:"1.5px solid rgba(10,132,255,.5)", borderBottomLeftRadius:6 },
                { bottom:0, right:0, borderBottom:"1.5px solid rgba(10,132,255,.5)", borderRight:"1.5px solid rgba(10,132,255,.5)", borderBottomRightRadius:6 },
              ].map((s, i) => (
                <div key={i} style={{
                  position:"absolute", width:18, height:18, zIndex:3,
                  animation:"hBracket 3s ease-in-out infinite",
                  animationDelay: `${i * 0.4}s`,
                  ...s,
                }}/>
              ))}

              {/* Portrait card */}
              <div style={{
                position:"relative", borderRadius:24, overflow:"hidden",
                border:"1px solid rgba(255,255,255,0.1)", background:"#090B1E",
                aspectRatio:"3/4",
                animation:"hPortGlow 4.5s ease-in-out infinite",
                zIndex:1,
              }}>
                <Image
                  src="/sebastien.png"
                  alt="Sébastien Legros — Ingénieur Logiciel Full Stack"
                  fill
                  sizes="(max-width: 900px) 74vw, 390px"
                  style={{ objectFit:"cover", objectPosition:"center top" }}
                  priority
                />

                {/* Bottom gradient — name tag area only */}
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(4,4,15,.92) 0%, rgba(4,4,15,.04) 28%, transparent 40%)", pointerEvents:"none" }}/>

                {/* Top glow tint */}
                <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% -8%, rgba(10,132,255,.14) 0%, transparent 44%)", pointerEvents:"none" }}/>

                {/* Inner frame */}
                <div style={{ position:"absolute", inset:0, boxShadow:"inset 0 0 0 1px rgba(10,132,255,.12)", borderRadius:24, pointerEvents:"none" }}/>

                {/* Scan line — subtle sweep effect */}
                <div style={{
                  position:"absolute", left:0, right:0, height:2,
                  background:"linear-gradient(90deg, transparent, rgba(10,132,255,.18), transparent)",
                  animation:"hScan 5s ease-in-out infinite",
                  pointerEvents:"none", zIndex:2,
                }}/>

                {/* Name tag — strictly at bottom, face is center-top */}
                <div style={{ position:"absolute", bottom:18, left:18, right:18, zIndex:3 }}>
                  <p style={{ margin:0, fontSize:".86rem", fontWeight:800, color:"#F0F4FF", letterSpacing:"-.02em", fontFamily:"var(--font-display),sans-serif", lineHeight:1.2 }}>Sébastien Legros</p>
                  <p style={{ margin:"4px 0 0", fontSize:".6rem", color:"rgba(255,255,255,.32)", letterSpacing:".07em" }}>Ingénieur Logiciel Full Stack</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll cue */}
        <motion.a href="#aboutme" aria-label="Scroll to next section"
          style={{ position:"absolute", bottom:26, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, zIndex:4, textDecoration:"none", opacity: scOp }}
        >
          <div style={{ width:1, height:44, background:"linear-gradient(to bottom,#00D4FF,transparent)", position:"relative", overflow:"hidden" }}>
            <div style={{ width:3, height:13, borderRadius:2, background:"#00D4FF", position:"absolute", top:-13, left:-1, boxShadow:"0 0 6px #00D4FF", animation:"hScroll 2s ease-in-out infinite" }}/>
          </div>
          <span style={{ fontSize:".55rem", letterSpacing:".24em", textTransform:"uppercase", color:"rgba(255,255,255,.16)" }}>Scroll</span>
        </motion.a>
      </div>
    </section>
  );
}
