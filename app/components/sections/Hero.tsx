"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { usePerformanceTier } from "@/app/hooks/usePerformanceTier";

function useIsMobile(bp = 900) {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp}px)`);
    setIs(mq.matches);
    const h = (e: MediaQueryListEvent) => setIs(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [bp]);
  return is;
}

// ── 3D MATH ──────────────────────────────────────────────────────────────────
type V3 = { x: number; y: number; z: number };
const rx3d = (p: V3, a: number): V3 => { const c = Math.cos(a), s = Math.sin(a); return { x: p.x, y: p.y*c - p.z*s, z: p.y*s + p.z*c }; };
const ry3d = (p: V3, a: number): V3 => { const c = Math.cos(a), s = Math.sin(a); return { x: p.x*c + p.z*s, y: p.y, z: -p.x*s + p.z*c }; };
const rz3d = (p: V3, a: number): V3 => { const c = Math.cos(a), s = Math.sin(a); return { x: p.x*c - p.y*s, y: p.x*s + p.y*c, z: p.z }; };
const proj3d = (x: number, y: number, z: number, cx: number, cy: number) => { const sc = 500 / (500 + z); return { x: cx + x*sc, y: cy + y*sc, sc }; };

const ORBITS = [
  { r: 198, tx: 0.30, ty: 0.10, tz: 0.15, col: "#0A84FF", spd: 0.28, lw: 1.0 },
  { r: 262, tx: 0.80, ty: 0.50, tz: 0.30, col: "#00D4FF", spd: 0.18, lw: 0.9 },
  { r: 322, tx: 0.20, ty: 0.90, tz: 0.60, col: "#00FFB3", spd: 0.13, lw: 0.8 },
  { r: 378, tx: 0.60, ty: 0.20, tz: 0.80, col: "#FF2D6B", spd: 0.09, lw: 0.7 },
];

const TECHS = [
  { n: "React",      c: "#61DAFB", o: 0 },
  { n: "Blazor",     c: "#512BD4", o: 1 },
  { n: "C#",         c: "#9B4ECA", o: 2 },
  { n: "Golang",     c: "#00ADD8", o: 3 },
  { n: "Docker",     c: "#2496ED", o: 0 },
  { n: "PostgreSQL", c: "#336791", o: 1 },
  { n: "SQL Server", c: "#CC2927", o: 2 },
  { n: "GitHub",     c: "#F0F4FF", o: 3 },
  { n: "Azure",      c: "#0078D4", o: 0 },
  { n: "TypeScript", c: "#3178C6", o: 1 },
];

// ── GLOBE SPHERE ─────────────────────────────────────────────────────────────
function GlobeSphere({ size, SR }: { size: number; SR: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const tip    = tipRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    canvas.width  = size;
    canvas.height = size;

    const img = new Image();
    img.src = "/sebastien.png";

    const stars = Array.from({ length: 500 }, () => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 1400,
      z: (Math.random() - 0.5) * 1400,
      r: Math.random() * 0.8 + 0.2,
      a: Math.random() * 0.45 + 0.1,
    }));

    const angles = TECHS.map((_, i) => (i / TECHS.length) * Math.PI * 2);
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    let autoAngle = 0, animId: number, hoverIdx = -1;

    function onMouseMove(e: MouseEvent) {
      const rect  = canvas.getBoundingClientRect();
      const scale = size / rect.width;
      const lx = (e.clientX - rect.left) / rect.width;
      const ly = (e.clientY - rect.top)  / rect.height;
      tmx = (lx - 0.5) * 1.1;
      tmy = (ly - 0.5) * 0.85;

      const ry = autoAngle + mx * 0.8, rxA = -my * 0.5, camZ = -80;
      const cx = size / 2, cy = size / 2;
      const mcx = (e.clientX - rect.left) * scale;
      const mcy = (e.clientY - rect.top)  * scale;

      let best = 30, hit = -1;
      TECHS.forEach((t, i) => {
        const od = ORBITS[t.o]; const a = angles[i];
        let p: V3 = { x: od.r*Math.cos(a), y: od.r*Math.sin(a)*0.35, z: 0 };
        p = rx3d(p, od.tx); p = ry3d(p, od.ty); p = rz3d(p, od.tz);
        p = ry3d(p, ry);    p = rx3d(p, rxA);
        const pr = proj3d(p.x, p.y, p.z - camZ, cx, cy);
        const d = Math.hypot(mcx - pr.x, mcy - pr.y);
        if (d < best) { best = d; hit = i; }
      });
      hoverIdx = hit;
      if (tip) {
        tip.textContent    = hit >= 0 ? TECHS[hit].n : "";
        tip.style.left     = (e.clientX + 14) + "px";
        tip.style.top      = (e.clientY - 8)  + "px";
        tip.style.opacity  = hit >= 0 ? "1" : "0";
      }
    }

    function onLeave() {
      hoverIdx = -1; tmx = 0; tmy = 0;
      if (tip) tip.style.opacity = "0";
    }

    function drawOrbit(od: typeof ORBITS[0], ry: number, rxA: number, cx: number, cy: number, camZ: number) {
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const a = (i / 120) * Math.PI * 2;
        let p: V3 = { x: od.r*Math.cos(a), y: od.r*Math.sin(a)*0.35, z: 0 };
        p = rx3d(p, od.tx); p = ry3d(p, od.ty); p = rz3d(p, od.tz);
        p = ry3d(p, ry);    p = rx3d(p, rxA);
        const pr = proj3d(p.x, p.y, p.z - camZ, cx, cy);
        i === 0 ? ctx.moveTo(pr.x, pr.y) : ctx.lineTo(pr.x, pr.y);
      }
      ctx.closePath();
      ctx.strokeStyle = od.col + "88";
      ctx.lineWidth   = od.lw * 1.6;
      ctx.setLineDash([6, 6]); ctx.stroke(); ctx.setLineDash([]);
    }

    function drawSat(t: typeof TECHS[0], i: number, ry: number, rxA: number, cx: number, cy: number, camZ: number) {
      const od = ORBITS[t.o]; const a = angles[i];
      let p: V3 = { x: od.r*Math.cos(a), y: od.r*Math.sin(a)*0.35, z: 0 };
      p = rx3d(p, od.tx); p = ry3d(p, od.ty); p = rz3d(p, od.tz);
      p = ry3d(p, ry);    p = rx3d(p, rxA);
      const pr = proj3d(p.x, p.y, p.z - camZ, cx, cy);
      if (pr.sc <= 0) return;
      const isH = hoverIdx === i;
      const r   = Math.max(2.5, 5.5 * pr.sc) * (isH ? 1.7 : 1);
      const g   = ctx.createRadialGradient(pr.x, pr.y, 0, pr.x, pr.y, r * 3.5);
      g.addColorStop(0, t.c + "99"); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath(); ctx.arc(pr.x, pr.y, r * 3.5, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(pr.x, pr.y, r,       0, Math.PI * 2); ctx.fillStyle = t.c; ctx.fill();
      if (isH) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 1; ctx.stroke(); }
    }

    function frame(now: number) {
      animId = requestAnimationFrame(frame);
      mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
      autoAngle += 0.005;

      const ry = autoAngle + mx * 0.8, rxA = -my * 0.5, camZ = -80;
      const cx = size / 2, cy = size / 2;
      ctx.clearRect(0, 0, size, size);

      // Stars
      stars.forEach((s) => {
        let p: V3 = ry3d({ x: s.x, y: s.y, z: s.z }, ry * 0.09);
        p = rx3d(p, rxA * 0.06);
        const pr = proj3d(p.x, p.y, p.z - 400, cx, cy);
        if (pr.sc <= 0) return;
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, s.r * pr.sc * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.min(0.45, pr.sc * s.a)})`;
        ctx.fill();
      });

      // Nebula
      const ng = ctx.createRadialGradient(cx, cy, 0, cx, cy, SR * 3.2);
      ng.addColorStop(0, "rgba(10,132,255,.10)"); ng.addColorStop(0.5, "rgba(0,212,255,.04)"); ng.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath(); ctx.arc(cx, cy, SR * 3.2, 0, Math.PI * 2); ctx.fillStyle = ng; ctx.fill();

      ORBITS.forEach((od) => drawOrbit(od, ry, rxA, cx, cy, camZ));
      TECHS.forEach((_, i) => { angles[i] += ORBITS[TECHS[i].o].spd * 0.008; });

      const sorted = TECHS.map((t, i) => {
        const od = ORBITS[t.o]; const a = angles[i];
        let p: V3 = { x: od.r*Math.cos(a), y: od.r*Math.sin(a)*0.35, z: 0 };
        p = rx3d(p, od.tx); p = ry3d(p, od.ty); p = rz3d(p, od.tz);
        p = ry3d(p, ry);    p = rx3d(p, rxA);
        return { t, i, z: p.z };
      }).sort((a, b) => a.z - b.z);

      sorted.forEach((s) => { if (s.z < 0) drawSat(s.t, s.i, ry, rxA, cx, cy, camZ); });

      // Sphere
      const r = SR + Math.sin(now * 0.0004) * 2;
      [[1.5, 0.04], [1.25, 0.055], [1.08, 0.045]].forEach(([ratio, alpha]) => {
        const gr = ctx.createRadialGradient(cx, cy, r * 0.55, cx, cy, r * (ratio as number));
        gr.addColorStop(0, `rgba(10,132,255,${alpha})`); gr.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath(); ctx.arc(cx, cy, r * (ratio as number), 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill();
      });

      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
      if (img.complete && img.naturalWidth) {
        const d = r * 2.2;
        ctx.drawImage(img, cx - d/2 + mx * 12, cy - d/2 + my * 8, d, d);
      } else {
        ctx.fillStyle = "#0A0A22"; ctx.fillRect(cx - r, cy - r, r*2, r*2);
      }
      ctx.restore();

      const rim = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.28, 0, cx, cy, r);
      rim.addColorStop(0, "rgba(255,255,255,0)"); rim.addColorStop(0.78, "rgba(10,132,255,.10)"); rim.addColorStop(1, "rgba(0,212,255,.45)");
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = rim; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(10,132,255,.6)"; ctx.lineWidth = 1.5; ctx.stroke();

      sorted.forEach((s) => { if (s.z >= 0) drawSat(s.t, s.i, ry, rxA, cx, cy, camZ); });
    }

    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mouseleave", onLeave);
    animId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [size, SR]);

  return (
    <>
      <canvas ref={canvasRef} style={{ width: size, height: size, display: "block" }} />
      <div ref={tipRef} style={{ position:"fixed", zIndex:9990, pointerEvents:"none", background:"rgba(4,4,15,.92)", backdropFilter:"blur(10px)", border:"1px solid rgba(10,132,255,.3)", borderRadius:8, padding:"5px 12px", fontSize:".76rem", fontWeight:500, color:"#F0F4FF", opacity:0, transition:"opacity .15s", whiteSpace:"nowrap" }} />
    </>
  );
}

// ── STAT ITEM ─────────────────────────────────────────────────────────────────
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "#F0F4FF", letterSpacing: "-.03em", fontFamily: "var(--font-display),sans-serif", lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: ".68rem", color: "#4A5568", letterSpacing: ".12em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const t        = useTranslations("hero");
  const pathname = usePathname();
  const [introReady, setIntroReady] = useState(false);
  const [show,       setShow]       = useState(false);
  const isMobile = useIsMobile(900);
  const caps     = usePerformanceTier();

  const isLowEnd = caps ? (caps.isMobile || (caps.cores !== null && caps.cores < 6)) : false;
  const cvHref   = pathname.startsWith("/en")
    ? "/docs/Sebastien_Legros_CV_EN.pdf"
    : "/docs/Sebastien_Legros_CV_FR.pdf";

  useEffect(() => {
    if (document.body.dataset.introReady === "true") { setIntroReady(true); return; }
    const h = () => setIntroReady(true);
    window.addEventListener("portfolio:intro-ready", h);
    return () => window.removeEventListener("portfolio:intro-ready", h);
  }, []);

  useEffect(() => {
    if (!introReady) { setShow(false); return; }
    const id = window.setTimeout(() => setShow(true), 520);
    return () => window.clearTimeout(id);
  }, [introReady]);

  const f = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const STACK = ["React", "Golang", "C#", "TypeScript", "Docker", "Azure"];

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", background: "#07101F", overflow: "hidden" }}>
      <style>{`
        @keyframes hGs     { 0%{background-position:0%}   100%{background-position:200%} }
        @keyframes hPulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.5)} }
        @keyframes hScroll { 0%{top:-14px;opacity:1} 80%{top:46px;opacity:.2} 100%{top:46px;opacity:0} }
        @keyframes hG1     { 0%{transform:translate(0,0)} 100%{transform:translate(55px,35px)} }
        @keyframes hG2     { 0%{transform:translate(0,0)} 100%{transform:translate(-50px,-30px)} }
        @keyframes hBadge  { 0%,100%{opacity:.6} 50%{opacity:1} }

        .hero-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          align-items: center;
          padding: 0 6vw;
          max-width: 1400px;
          margin: 0 auto;
          gap: 0;
        }
        .hero-left  { display:flex; flex-direction:column; gap:28px; position:relative; z-index:2; padding: 80px 0; }
        .hero-right { display:flex; align-items:center; justify-content:center; height:100vh; position:relative; z-index:2; }

        @media (max-width:900px) {
          .hero-wrap { grid-template-columns:1fr; padding:0 5vw; }
          .hero-left  { gap:20px; padding: 110px 0 32px; align-items:center; text-align:center; }
          .hero-right { height:auto; padding-bottom:48px; }
          .hero-name-block { text-align:center !important; }
          .hero-stack-row  { justify-content:center !important; }
          .hero-stats-row  { justify-content:center !important; }
          .hero-cta-row    { justify-content:center !important; }
          .hero-social-row { justify-content:center !important; }
          .hero-welcome-wrap{ justify-content:center !important; }
        }
        @media (max-width:600px) {
          .hero-left { padding-top:90px; }
        }
      `}</style>

      {/* Ambient glows */}
      {!isLowEnd && <>
        <div style={{ position:"absolute", width:700, height:700, borderRadius:"50%", background:"radial-gradient(#0A84FF,transparent 70%)", top:-250, left:-200, opacity:.22, filter:"blur(100px)", animation:"hG1 18s ease-in-out infinite alternate", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(#FF2D6B,transparent 70%)", bottom:-150, right:-80, opacity:.15, filter:"blur(85px)", animation:"hG2 22s ease-in-out infinite alternate-reverse", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"radial-gradient(#00FFB3,transparent 70%)", top:"30%", right:"20%", opacity:.09, filter:"blur(80px)", pointerEvents:"none" }}/>
      </>}

      {/* Grid */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"linear-gradient(rgba(10,132,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,132,255,.04) 1px,transparent 1px)", backgroundSize:"72px 72px", maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)" }}/>

      <div className="hero-wrap">

        {/* ── LEFT ── */}
        <div className="hero-left">

          {/* Eyebrow + badge */}
          <motion.div initial={{opacity:0, y:12}} animate={show ? {opacity:1,y:0} : {}} transition={{duration:.5, delay:.05}} style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(0,255,179,.06)", border:"1px solid rgba(0,255,179,.18)", borderRadius:100, padding:"5px 12px" }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#00FFB3", boxShadow:"0 0 7px #00FFB3", animation:"hPulse 2s ease-in-out infinite" }}/>
              <span style={{ fontSize:".65rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"#00FFB3" }}>{t("badge")}</span>
            </div>
            <span style={{ fontSize:".72rem", color:"#2D3A4A", letterSpacing:".06em" }}>· {t("eyebrow")}</span>
          </motion.div>

          {/* Name */}
          <motion.div {...f(.2)} className="hero-name-block">
            <div style={{ fontFamily:"var(--font-display),sans-serif", fontSize:"clamp(3.2rem,5.8vw,6rem)", fontWeight:800, lineHeight:.95, letterSpacing:"-.04em" }}>
              <span style={{ display:"block", color:"#F0F4FF" }}>Sébastien</span>
              <span style={{ display:"block", background:"linear-gradient(100deg,#0A84FF,#00D4FF 45%,#00FFB3 90%)", backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"hGs 5s linear infinite" }}>Legros</span>
            </div>
          </motion.div>

          {/* Role */}
          <motion.div {...f(.35)} style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:28, height:1.5, background:"linear-gradient(90deg,#0A84FF,transparent)" }}/>
            <span style={{ fontSize:".78rem", fontWeight:600, letterSpacing:".18em", textTransform:"uppercase", color:"#3A4A5A" }}>Ingénieur Logiciel</span>
            <span style={{ fontSize:".78rem", color:"#1E2D40" }}>·</span>
            <span style={{ fontSize:".78rem", fontWeight:600, letterSpacing:".18em", textTransform:"uppercase", color:"#3A4A5A" }}>Full Stack</span>
          </motion.div>

          {/* Tagline */}
          <motion.p {...f(.58)} style={{ fontSize:".97rem", color:"#5A6880", lineHeight:1.72, maxWidth:480, margin:0, borderLeft:"2px solid rgba(10,132,255,.4)", paddingLeft:16 }}>
            {t("summary")}
          </motion.p>

          {/* Stack pills */}
          <motion.div {...f(.7)} className="hero-stack-row" style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {STACK.map((tech) => (
              <span key={tech} style={{ fontSize:".7rem", fontWeight:600, color:"#4A6080", background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:6, padding:"4px 12px", letterSpacing:".04em" }}>
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div {...f(.82)} className="hero-stats-row" style={{ display:"flex", gap:36 }}>
            <Stat value="12+" label="Projets" />
            <div style={{ width:1, background:"rgba(255,255,255,.06)", alignSelf:"stretch" }}/>
            <Stat value="5+" label="Ans d'XP" />
            <div style={{ width:1, background:"rgba(255,255,255,.06)", alignSelf:"stretch" }}/>
            <Stat value="8+" label="Technos" />
          </motion.div>

          {/* CTAs */}
          <motion.div {...f(.95)} className="hero-cta-row" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <a href="#projects"
              style={{ background:"linear-gradient(135deg,#0A84FF,#00D4FF)", color:"#fff", fontFamily:"var(--font-display),sans-serif", fontSize:".85rem", fontWeight:700, padding:"13px 28px", borderRadius:100, textDecoration:"none", letterSpacing:".04em", boxShadow:"0 0 24px rgba(10,132,255,.3)", transition:"transform .2s,box-shadow .2s", display:"inline-block" }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.transform="translateY(-2px)"; el.style.boxShadow="0 8px 32px rgba(10,132,255,.5)"; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.transform=""; el.style.boxShadow="0 0 24px rgba(10,132,255,.3)"; }}
            >{t("primaryCta")}</a>
            <a href="#contact"
              style={{ background:"transparent", color:"#F0F4FF", fontFamily:"var(--font-display),sans-serif", fontSize:".85rem", fontWeight:600, padding:"12px 24px", borderRadius:100, border:"1.5px solid rgba(255,255,255,.12)", textDecoration:"none", transition:"all .2s", display:"inline-block" }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="#00D4FF"; el.style.color="#00D4FF"; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(255,255,255,.12)"; el.style.color="#F0F4FF"; }}
            >{t("secondaryCta")}</a>
            <a href={cvHref} download
              style={{ background:"transparent", color:"#4A5568", fontFamily:"var(--font-display),sans-serif", fontSize:".85rem", fontWeight:600, padding:"12px 20px", borderRadius:100, border:"1.5px solid rgba(255,255,255,.06)", textDecoration:"none", transition:"all .2s", display:"inline-block" }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(255,255,255,.16)"; el.style.color="#F0F4FF"; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(255,255,255,.06)"; el.style.color="#4A5568"; }}
            >{t("tertiaryCta")}</a>
          </motion.div>

          {/* Social links */}
          <motion.div {...f(1.1)} className="hero-social-row" style={{ display:"flex", gap:10, alignItems:"center" }}>
            {[
              { href:"https://github.com/slg9", title:"GitHub", d:"M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.71C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12C22 6.48 17.52 2 12 2z" },
              { href:"https://www.linkedin.com/in/s%C3%A9bastien-legros-23a85085", title:"LinkedIn", d:"M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 17H6.5v-7H9v7zm-1.25-8.27A1.37 1.37 0 1 1 9.12 7.36a1.37 1.37 0 0 1-1.37 1.37zM18 17h-2.5v-3.5c0-1-.38-1.5-1.13-1.5s-1.37.6-1.37 1.6V17H10.5v-7H13v1.07C13.53 10.36 14.32 10 15.25 10 16.89 10 18 11 18 13.3V17z" },
            ].map(({ href, title, d }) => (
              <a key={title} href={href} title={title} target="_blank" rel="noopener noreferrer"
                style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", display:"flex", alignItems:"center", justifyContent:"center", color:"#4A5568", textDecoration:"none", transition:"all .2s" }}
                onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(10,132,255,.12)"; el.style.borderColor="#0A84FF"; el.style.color="#00D4FF"; el.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(255,255,255,.04)"; el.style.borderColor="rgba(255,255,255,.07)"; el.style.color="#4A5568"; el.style.transform=""; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={d}/></svg>
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — Sphere ── */}
        <div className="hero-right">
          <motion.div
            initial={{ opacity: 0, scale: .88 }}
            animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: .88 }}
            transition={{ duration: 1.1, delay: .4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {show && <GlobeSphere size={isMobile ? 440 : 720} SR={isMobile ? 98 : 138} />}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a href="#aboutme" initial={{opacity:0}} animate={show ? {opacity:1} : {opacity:0}} transition={{duration:.6, delay:2.2}}
        style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, zIndex:4, textDecoration:"none" }}>
        <div style={{ width:1, height:44, background:"linear-gradient(to bottom,#00D4FF,transparent)", position:"relative", overflow:"hidden" }}>
          <div style={{ width:3, height:13, borderRadius:2, background:"#00D4FF", position:"absolute", top:-13, left:-1, boxShadow:"0 0 6px #00D4FF", animation:"hScroll 2s ease-in-out infinite" }}/>
        </div>
        <span style={{ fontSize:".57rem", letterSpacing:".22em", textTransform:"uppercase", color:"#2D3A4A" }}>Scroll</span>
      </motion.a>
    </section>
  );
}
