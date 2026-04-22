"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { usePerformanceTier } from "@/app/hooks/usePerformanceTier";

// ── SATELLITE TECHNOLOGIES ────────────────────────────────────────────────────
const TECHS = [
  { name: "React",      color: "#61DAFB", abbr: "Re" },
  { name: "Blazor",     color: "#512BD4", abbr: "Bl" },
  { name: "C#",         color: "#9B4ECA", abbr: "C#" },
  { name: "Golang",     color: "#00ADD8", abbr: "Go" },
  { name: "Docker",     color: "#2496ED", abbr: "Do" },
  { name: "PostgreSQL", color: "#336791", abbr: "PG" },
  { name: "SQL Server", color: "#CC2927", abbr: "SQ" },
  { name: "GitHub",     color: "#F0F4FF", abbr: "GH" },
  { name: "Azure",      color: "#0078D4", abbr: "Az" },
  { name: "TypeScript", color: "#3178C6", abbr: "TS" },
] as const;

// [radius, speed rad/s, startAngle, inclination]
const ORBITS: [number, number, number, number][] = [
  [148, 0.55, 0.0, 0],
  [148, 0.55, Math.PI, 0],
  [192, 0.38, 0.5, 15],
  [192, 0.38, 0.5 + Math.PI, 15],
  [232, 0.28, 1.0, -10],
  [232, 0.28, 1.0 + Math.PI, -10],
  [270, 0.20, 0.3, 8],
  [270, 0.20, 0.3 + Math.PI, 8],
  [306, 0.15, 1.6, -5],
  [306, 0.15, 1.6 + Math.PI, -5],
];

const CANVAS_SIZE = 700;

// ── MOBILE BREAKPOINT HOOK ────────────────────────────────────────────────────
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

// ── ORBITAL CANVAS ────────────────────────────────────────────────────────────
function OrbitalCanvas({ fps = 60, compact = false }: { fps?: number; compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mobTipRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const mobTipEl  = mobTipRef.current;
    if (!canvas || !mobTipEl) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const cvs = canvas as HTMLCanvasElement;
    const tip = tooltipRef.current; // null en mode compact
    const mob = mobTipEl as HTMLDivElement;
    const c = ctx2d as CanvasRenderingContext2D;

    // Convert client coords → canvas pixel coords (handles CSS scaling)
    function toCanvas(clientX: number, clientY: number) {
      const r = cvs.getBoundingClientRect();
      const s = CANVAS_SIZE / r.width;
      return { x: (clientX - r.left) * s, y: (clientY - r.top) * s };
    }

    cvs.width = CANVAS_SIZE;
    cvs.height = CANVAS_SIZE;

    const FRAME_MS = 1000 / fps;

    // Compact (mobile): 2 orbits, 5 satellites each, evenly spaced
    // Radii choisies pour être visibles à 320px CSS (scale = 320/700 ≈ 0.46)
    const TAU = Math.PI * 2;
    // Compact (mobile) : 2 orbites, rayon calculé pour sortir de la photo (160px = rayon 80px écran)
    // À 430px CSS : ratio 430/700 = 0.614 → photo radius canvas = 80/0.614 = 130 → inner orbit 248 > 130 ✓
    // À 360px CSS : ratio 360/700 = 0.514 → photo radius canvas = 80/0.514 = 156 → inner orbit 248 > 156 ✓
    const activeOrbits: [number, number, number, number][] = compact
      ? [
          [248, 0.42, 0,               0],
          [248, 0.42, TAU / 5,         0],
          [248, 0.42, (2 * TAU) / 5,   0],
          [248, 0.42, (3 * TAU) / 5,   0],
          [248, 0.42, (4 * TAU) / 5,   0],
          [328, 0.28, TAU / 10,         4],
          [328, 0.28, TAU / 10 + TAU / 5,       4],
          [328, 0.28, TAU / 10 + (2 * TAU) / 5, 4],
          [328, 0.28, TAU / 10 + (3 * TAU) / 5, 4],
          [328, 0.28, TAU / 10 + (4 * TAU) / 5, 4],
        ]
      : ORBITS;

    // Anneaux uniques à dessiner (évite les doublons sur compact)
    const ringRadii: { r: number; inc: number }[] = compact
      ? [{ r: 248, inc: 0 }, { r: 328, inc: 4 }]
      : ORBITS.map(([r, , , inc]) => ({ r, inc }));

    const angles = activeOrbits.map((o) => o[2]);
    const satOrbits = activeOrbits.map((_, i) => i);
    // frozenUntil[i] : timestamp (ms) jusqu'auquel le satellite est figé
    // Après dégel, la vitesse remonte progressivement sur RESUME_MS
    const frozenUntil = new Array(TECHS.length).fill(0);
    const RESUME_MS = 900;
    let hoveredIdx = -1;
    let dragIdx = -1;
    let dragCx = 0;
    let dragCy = 0;
    let lastT = performance.now();
    let animId: number;
    let mobTimer: number | null = null;

    function freezeSat(i: number, ms = 1400) {
      frozenUntil[i] = performance.now() + ms;
    }

    // ── SCALE ANIMATION (balloon inflate on tap, compact only) ────────────────
    type ScalePhase = "idle" | "inflate" | "hold" | "deflate";
    const scalePhase  = new Array(TECHS.length).fill("idle") as ScalePhase[];
    const scaleStart  = new Array(TECHS.length).fill(0);
    const INFLATE_MS  = 180;
    const HOLD_MS     = 500;
    const DEFLATE_MS  = 500;

    function easeOutBack(t: number) {
      const c1 = 1.70158, c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }

    function getBalloonScale(i: number, now: number): number {
      const phase = scalePhase[i];
      if (phase === "idle") return 1;
      const el = now - scaleStart[i];
      if (phase === "inflate") {
        const t = Math.min(el / INFLATE_MS, 1);
        const s = 1 + easeOutBack(t); // 1→2 avec overshoot
        if (t >= 1) { scalePhase[i] = "hold"; scaleStart[i] = now; }
        return s;
      }
      if (phase === "hold") {
        if (el >= HOLD_MS) { scalePhase[i] = "deflate"; scaleStart[i] = now; }
        return 2;
      }
      if (phase === "deflate") {
        const t = Math.min(el / DEFLATE_MS, 1);
        const s = 2 - t; // 2→1 linéaire
        if (t >= 1) { scalePhase[i] = "idle"; }
        return s;
      }
      return 1;
    }

    function triggerBalloon(i: number) {
      scalePhase[i] = "inflate";
      scaleStart[i] = performance.now();
    }

    function getSatPos(satI: number) {
      const cx = CANVAS_SIZE / 2;
      const cy = CANVAS_SIZE / 2;
      const orbitI = satOrbits[satI];
      const [radius, , , inc] = activeOrbits[orbitI];
      const ry2 = radius * Math.cos((inc * Math.PI) / 180);
      return {
        x: cx + radius * Math.cos(angles[satI]),
        y: cy + ry2 * Math.sin(angles[satI]),
      };
    }

    const hitRadius = compact ? 34 : 34;

    function getHit(cx: number, cy: number) {
      let found = -1;
      TECHS.forEach((_, i) => {
        if (dragIdx === i) return;
        const { x, y } = getSatPos(i);
        if (Math.hypot(cx - x, cy - y) < hitRadius) found = i;
      });
      return found;
    }

    function showMobTip(name: string, color = "#0A84FF") {
      mob.textContent = name;
      mob.style.opacity = "1";
      mob.style.borderColor = color;
      mob.style.color = color;
      if (mobTimer) window.clearTimeout(mobTimer);
      mobTimer = window.setTimeout(() => { mob.style.opacity = "0"; }, 2200);
    }

    function snapToOrbit() {
      const cx = CANVAS_SIZE / 2;
      const cy = CANVAS_SIZE / 2;
      const dist = Math.hypot(dragCx - cx, dragCy - cy);
      let best = 0, bestDiff = Infinity;
      for (let i = 0; i < activeOrbits.length; i++) {
        const diff = Math.abs(dist - activeOrbits[i][0]);
        if (diff < bestDiff) { bestDiff = diff; best = i; }
      }
      satOrbits[dragIdx] = best;
      angles[dragIdx] = Math.atan2(dragCy - cy, dragCx - cx);
      frozenUntil[dragIdx] = performance.now(); // dégel progressif après drag
      dragIdx = -1;
    }

    // Tailles badges compact (canvas 700 affiché à 430px = ratio 0.614)
    // Cible écran : ~52×30px normal, ~62×36px hover, font ~16px
    // → canvas : 52/0.614=85, 30/0.614=49, font 16/0.614=26
    const BW  = compact ? 48  : 50;   // badge width normal
    const BH  = compact ? 27  : 26;   // badge height normal
    const BWH = compact ? 56  : 62;   // badge width hovered
    const BHH = compact ? 32  : 32;   // badge height hovered
    const FS  = compact ? 15  : 12;   // font size normal
    const FSH = compact ? 18  : 14;   // font size hovered

    function draw(now: number) {
      if (now - lastT < FRAME_MS) { animId = requestAnimationFrame(draw); return; }
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      const cx = CANVAS_SIZE / 2;
      const cy = CANVAS_SIZE / 2;

      c.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // Dessiner les anneaux (dédupliqués)
      ringRadii.forEach(({ r, inc }) => {
        const ry2 = r * Math.cos((inc * Math.PI) / 180);
        const orbitHovered = !compact && TECHS.some((_, si) => hoveredIdx === si && activeOrbits[satOrbits[si]][0] === r);
        c.save();
        c.beginPath();
        c.ellipse(cx, cy, r, ry2, 0, 0, Math.PI * 2);
        c.strokeStyle = `rgba(10,132,255,${orbitHovered ? 0.4 : 0.2})`;
        c.lineWidth = compact ? (orbitHovered ? 2.5 : 1.8) : (orbitHovered ? 1.5 : 1);
        c.stroke();
        c.restore();
      });

      const nowMs = performance.now();
      angles.forEach((_, i) => {
        if (dragIdx === i) return;
        if (nowMs < frozenUntil[i]) return; // figé
        const elapsed = nowMs - frozenUntil[i];
        const factor = elapsed < RESUME_MS ? elapsed / RESUME_MS : 1; // rampe 0→1
        angles[i] += activeOrbits[satOrbits[i]][1] * dt * factor;
      });

      TECHS.forEach((tech, i) => {
        const isHov = hoveredIdx === i || dragIdx === i;
        const { x, y } = dragIdx === i ? { x: dragCx, y: dragCy } : getSatPos(i);
        const w = isHov ? BWH : BW;
        const h = isHov ? BHH : BH;
        const sc = compact ? getBalloonScale(i, nowMs) : 1;

        c.save();
        if (sc !== 1) { c.translate(x, y); c.scale(sc, sc); c.translate(-x, -y); }
        c.beginPath();
        c.roundRect(x - w / 2, y - h / 2, w, h, h / 2);
        c.fillStyle = tech.color + "33";
        c.fill();
        c.strokeStyle = tech.color;
        c.lineWidth = isHov ? (compact ? 2.5 : 1.5) : (compact ? 2 : 1.2);
        c.stroke();
        c.fillStyle = tech.color;
        c.font = `${isHov ? 700 : 600} ${isHov ? FSH : FS}px Manrope, sans-serif`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(tech.abbr, x, y);
        c.restore();
      });

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    // ── MOUSE ────────────────────────────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      const { x: mx, y: my } = toCanvas(e.clientX, e.clientY);
      if (dragIdx >= 0) {
        dragCx = mx; dragCy = my;
        angles[dragIdx] = Math.atan2(my - CANVAS_SIZE / 2, mx - CANVAS_SIZE / 2);
        return;
      }
      const found = getHit(mx, my);
      if (found !== hoveredIdx) {
        if (hoveredIdx >= 0 && dragIdx !== hoveredIdx) frozenUntil[hoveredIdx] = performance.now(); // dégel progressif
        hoveredIdx = found;
        if (found >= 0) {
          frozenUntil[found] = Infinity; // figé tant que hoveredIdx === found
          if (tip) { tip.textContent = TECHS[found].name; tip.style.opacity = "1"; tip.style.transform = "translateY(0)"; }
        } else {
          if (tip) { tip.style.opacity = "0"; tip.style.transform = "translateY(4px)"; }
        }
      }
      if (found >= 0 && tip) {
        tip.style.left = e.clientX + 16 + "px";
        tip.style.top  = e.clientY - 10 + "px";
      }
      cvs.style.cursor = found >= 0 ? "grab" : "default";
    }

    function onMouseDown(e: MouseEvent) {
      const { x: mx, y: my } = toCanvas(e.clientX, e.clientY);
      const found = getHit(mx, my);
      if (found >= 0) {
        dragIdx = found; dragCx = mx; dragCy = my;
        frozenUntil[found] = Infinity;
        cvs.style.cursor = "grabbing";
        e.preventDefault();
      }
    }

    function onMouseUp() {
      if (dragIdx < 0) return;
      snapToOrbit();
      hoveredIdx = -1;
      cvs.style.cursor = "default";
      if (tip) tip.style.opacity = "0";
    }

    function onMouseLeave() {
      if (hoveredIdx >= 0) frozenUntil[hoveredIdx] = performance.now(); // dégel progressif
      hoveredIdx = -1;
      if (tip) tip.style.opacity = "0";
      if (dragIdx >= 0) { snapToOrbit(); cvs.style.cursor = "default"; }
    }

    // ── TOUCH ────────────────────────────────────────────────────────────────
    // touchedIdx = satellite touché (potentiel tap ou drag, pas encore confirmé)
    // dragIdx    = drag confirmé (mouvement > seuil)
    let touchedIdx = -1;
    let touchStartCx = 0, touchStartCy = 0, touchMoved = false;
    let longPressTimer: number | null = null;

    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      const { x, y } = toCanvas(t.clientX, t.clientY);
      touchStartCx = x; touchStartCy = y; touchMoved = false;
      const found = getHit(x, y);
      if (found >= 0) {
        touchedIdx = found;
        frozenUntil[found] = Infinity; // figer immédiatement, sans blip
        // Long press : afficher le tooltip si le doigt reste immobile
        longPressTimer = window.setTimeout(() => {
          showMobTip(TECHS[found].name, TECHS[found].color);
        }, 380);
      }
    }

    function onTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      const { x, y } = toCanvas(t.clientX, t.clientY);
      if (Math.hypot(x - touchStartCx, y - touchStartCy) > 14) {
        touchMoved = true;
        if (longPressTimer) { window.clearTimeout(longPressTimer); longPressTimer = null; }
        // Confirmer le drag seulement ici — évite le blip au simple tap
        if (touchedIdx >= 0 && dragIdx < 0) {
          dragIdx = touchedIdx;
          dragCx = x; dragCy = y;
        }
      }
      if (dragIdx >= 0) {
        dragCx = x; dragCy = y;
        angles[dragIdx] = Math.atan2(y - CANVAS_SIZE / 2, x - CANVAS_SIZE / 2);
        e.preventDefault();
      }
    }

    function onTouchEnd(_e: TouchEvent) {
      if (longPressTimer) { window.clearTimeout(longPressTimer); longPressTimer = null; }

      if (!touchMoved && touchedIdx >= 0) {
        // Tap simple : afficher tooltip + arrêt prolongé (2.2s) puis reprise progressive
        showMobTip(TECHS[touchedIdx].name, TECHS[touchedIdx].color);
        freezeSat(touchedIdx, 2200);
        triggerBalloon(touchedIdx);
      } else if (touchMoved && dragIdx >= 0) {
        // Drag terminé : snap + tooltip + ballon + arrêt
        const di = dragIdx;
        snapToOrbit();
        showMobTip(TECHS[di].name, TECHS[di].color);
        freezeSat(di, 2200);
        triggerBalloon(di);
      } else if (touchedIdx >= 0) {
        // Mouvement sans drag confirmé : dégel progressif
        frozenUntil[touchedIdx] = performance.now();
      }

      touchedIdx = -1;
      dragIdx = -1;
    }

    cvs.addEventListener("mousemove",  onMouseMove);
    cvs.addEventListener("mousedown",  onMouseDown);
    cvs.addEventListener("mouseup",    onMouseUp);
    cvs.addEventListener("mouseleave", onMouseLeave);
    cvs.addEventListener("touchstart", onTouchStart, { passive: true });
    cvs.addEventListener("touchmove",  onTouchMove,  { passive: false });
    cvs.addEventListener("touchend",   onTouchEnd);

    return () => {
      cancelAnimationFrame(animId);
      if (mobTimer) window.clearTimeout(mobTimer);
      if (longPressTimer) window.clearTimeout(longPressTimer);
      cvs.removeEventListener("mousemove",  onMouseMove);
      cvs.removeEventListener("mousedown",  onMouseDown);
      cvs.removeEventListener("mouseup",    onMouseUp);
      cvs.removeEventListener("mouseleave", onMouseLeave);
      cvs.removeEventListener("touchstart", onTouchStart);
      cvs.removeEventListener("touchmove",  onTouchMove);
      cvs.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="hero-orbital-canvas"
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: CANVAS_SIZE, height: CANVAS_SIZE,
          pointerEvents: "all",
        }}
      />
      {/* Mobile tap label — shows tech name on tap */}
      <div
        ref={mobTipRef}
        style={{
          position: "absolute",
          bottom: 10, left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(4,4,15,0.92)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(10,132,255,0.35)",
          borderRadius: 10,
          padding: "6px 18px",
          fontSize: "0.82rem", fontWeight: 600, color: "#F0F4FF",
          pointerEvents: "none",
          opacity: 0, transition: "opacity 0.2s ease",
          whiteSpace: "nowrap", zIndex: 20,
        }}
      />
      {/* Mouse hover tooltip — desktop only */}
      {!compact && (
        <div
          ref={tooltipRef}
          style={{
            position: "fixed", zIndex: 9990,
            background: "rgba(4,4,15,0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(10,132,255,0.3)",
            borderRadius: 10,
            padding: "6px 12px",
            fontSize: "0.78rem", fontWeight: 500, color: "#F0F4FF",
            pointerEvents: "none",
            opacity: 0, transform: "translateY(4px)",
            transition: "opacity 0.18s ease, transform 0.18s ease",
            whiteSpace: "nowrap",
          }}
        />
      )}
    </>
  );
}

// ── PHOTO CARD WITH 3D TILT ───────────────────────────────────────────────────
function PhotoCard() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const card = cardRef.current;
    if (!scene || !card) return;

    function onMove(e: MouseEvent) {
      const r = scene!.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card!.style.transform = `scale(1.04) rotateY(${x * 18}deg) rotateX(${-y * 12}deg)`;
      card!.style.boxShadow = `${-x * 20}px ${y * 20}px 60px rgba(10,132,255,0.25), 0 30px 80px rgba(0,0,0,0.7)`;
    }

    function onLeave() {
      card!.style.transform = "";
      card!.style.boxShadow = "";
    }

    scene.addEventListener("mousemove", onMove);
    scene.addEventListener("mouseleave", onLeave);
    return () => {
      scene.removeEventListener("mousemove", onMove);
      scene.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      style={{ perspective: 900, width: "clamp(160px,28vw,240px)", height: "clamp(190px,33vw,280px)", flexShrink: 0 }}
    >
      <div
        ref={cardRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease",
          borderRadius: 24,
        }}
      >
        {/* Photo */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(10,132,255,0.25), 0 0 60px rgba(10,132,255,0.15), 0 24px 80px rgba(0,0,0,0.7)",
        }}>
          <Image
            src="/sebastien.png"
            alt="Sébastien Legros"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: 24,
            background: "linear-gradient(180deg, transparent 50%, rgba(4,4,15,0.85) 100%)",
            pointerEvents: "none",
          }} />
        </div>
        {/* Animated border glow */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: 24,
          border: "1.5px solid transparent",
          background: "linear-gradient(135deg, rgba(10,132,255,0.7), rgba(0,212,255,0.3), rgba(255,45,107,0.5)) border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
          animation: "heroFrameGlow 3s ease-in-out infinite alternate",
          pointerEvents: "none",
          zIndex: 11,
        }} />
      </div>
    </div>
  );
}

// ── BIENVENUE HANDWRITING ANIMATION ──────────────────────────────────────────
function WelcomeHandwriting({ text, simple = false }: { text: string; simple?: boolean }) {
  const revealRef = useRef<SVGRectElement>(null);
  const nibRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (simple) return; // version simplifiée : pas de RAF
    if (!revealRef.current || !nibRef.current) return;
    const reveal = revealRef.current as SVGRectElement;
    const nib = nibRef.current as SVGCircleElement;

    const totalWidth = 578;
    const duration = 2800;
    const delay = 600;
    let startTime: number | null = null;
    let animId: number;

    function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
    function wobbleY(p: number) { return 46 + Math.sin(p * Math.PI * 8) * 1.2; }

    function animate(now: number) {
      if (!startTime) { startTime = now; animId = requestAnimationFrame(animate); return; }
      const elapsed = now - startTime - delay;
      if (elapsed < 0) { animId = requestAnimationFrame(animate); return; }

      const raw = Math.min(elapsed / duration, 1);
      const progress = ease(raw);
      const w = progress * totalWidth;

      reveal.setAttribute("width", String(w));
      nib.setAttribute("cx", String(2 + w));
      nib.setAttribute("cy", String(wobbleY(raw)));
      nib.setAttribute("opacity", raw < 1 ? "1" : "0");
      nib.setAttribute("r", String(3 + (1 - raw) * 1.5));

      if (raw < 1) animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [simple]);

  // Version simple : texte visible immédiatement, fondu CSS via le parent
  if (simple) {
    return (
      <svg viewBox="0 0 580 68" className="hero-welcome-svg" aria-hidden="true">
        <defs>
          <linearGradient id="heroWgf" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0A84FF" />
            <stop offset="50%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#00FFB3" />
          </linearGradient>
        </defs>
        <text
          x="290" y="54"
          textAnchor="middle"
          fontFamily="var(--font-script), cursive"
          fontSize="46"
          fontWeight="700"
          fill="url(#heroWgf)"
          style={{ letterSpacing: "0.02em" }}
        >
          {text}
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 580 68" className="hero-welcome-svg" aria-hidden="true">
      <defs>
        <linearGradient id="heroWgf" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0A84FF" />
          <stop offset="50%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#00FFB3" />
        </linearGradient>
      </defs>
      <clipPath id="heroPenClip">
        <rect ref={revealRef} x="0" y="0" width="0" height="80" />
      </clipPath>
      <text
        x="290" y="54"
        textAnchor="middle"
        fontFamily="var(--font-script), cursive"
        fontSize="46"
        fontWeight="700"
        fill="url(#heroWgf)"
        clipPath="url(#heroPenClip)"
        style={{ letterSpacing: "0.02em" }}
      >
        {text}
      </text>
      <circle
        ref={nibRef}
        cx="2" cy="46" r="3.5"
        fill="#00D4FF"
        opacity="0"
      />
    </svg>
  );
}

// ── SOCIAL LINK ───────────────────────────────────────────────────────────────
function SocialLink({ href, title, children }: { href: string; title: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width: 36, height: 36, borderRadius: 10,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#6B7A99", textDecoration: "none",
        transition: "all 0.2s ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = "rgba(10,132,255,0.15)";
        el.style.borderColor = "#0A84FF";
        el.style.color = "#00D4FF";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "rgba(255,255,255,0.04)";
        el.style.borderColor = "rgba(255,255,255,0.08)";
        el.style.color = "#6B7A99";
        el.style.transform = "";
      }}
    >
      {children}
    </a>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const t = useTranslations("hero");
  const pathname = usePathname();
  const [introReady, setIntroReady] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const isMobile = useIsMobile(900);
  const caps = usePerformanceTier();

  // Derived from real device capabilities
  const isLowEnd = caps ? (caps.isMobile || (caps.cores !== null && caps.cores < 6)) : false;
  const canvasFps = caps ? (caps.tier === "high" ? 60 : caps.tier === "medium" ? 45 : 24) : 60;
  const showGlows = !isLowEnd;
  const orbitalDelay = isLowEnd ? 0.4 : 2.5;
  const simpleWelcome = isLowEnd;

  const cvHref = pathname.startsWith("/en")
    ? "/docs/Sebastien_Legros_CV_EN.pdf"
    : "/docs/Sebastien_Legros_CV_FR.pdf";

  useEffect(() => {
    if (document.body.dataset.introReady === "true") {
      setIntroReady(true);
      return;
    }
    const onReady = () => setIntroReady(true);
    window.addEventListener("portfolio:intro-ready", onReady);
    return () => window.removeEventListener("portfolio:intro-ready", onReady);
  }, []);

  useEffect(() => {
    if (!introReady) { setHeroVisible(false); return; }
    const timer = window.setTimeout(() => setHeroVisible(true), 520);
    return () => window.clearTimeout(timer);
  }, [introReady]);

  return (
    <section
      id="hero"
      className="hero-grid"
      style={{
        position: "relative",
        background: "#04040F",
        overflow: "hidden",
      }}
    >
      {/* Keyframe styles */}
      <style>{`
        @keyframes heroGlow1 { 0%{transform:translate(0,0);} 100%{transform:translate(60px,40px);} }
        @keyframes heroGlow2 { 0%{transform:translate(0,0);} 100%{transform:translate(-60px,-40px);} }
        @keyframes heroPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.4;transform:scale(1.5);} }
        @keyframes heroScrollDot { 0%{top:-16px;opacity:1;} 80%{top:50px;opacity:0.2;} 100%{top:50px;opacity:0;} }
        @keyframes heroFrameGlow { 0%{opacity:0.5;} 100%{opacity:1;} }
        @keyframes heroGs { 0%{background-position:0%;} 100%{background-position:200%;} }

        /* Hero responsive */
        .hero-grid { display:grid; grid-template-columns:1fr 1fr; align-items:center; padding:0 7vw; min-height:100vh; }
        .hero-left { display:flex; flex-direction:column; gap:28px; max-width:520px; position:relative; z-index:2; }
        .hero-welcome-svg { display:block; width:100%; height:auto; overflow:visible; }
        .hero-right { position:relative; display:flex; align-items:center; justify-content:center; height:100%; overflow:visible; z-index:2; }
        /* Mobile orbital: hidden on desktop, shown inline after name on mobile */
        .hero-orbital-mobile { display:none; }
        .hero-scroll-indicator { display:flex; }
        @media (max-width:900px) {
          .hero-grid { grid-template-columns:1fr; padding:112px 6vw 56px; min-height:auto; height:auto; gap:0; overflow:hidden; }
          .hero-left { max-width:100%; gap:20px; }
          .hero-right { display:none; }
          .hero-orbital-mobile { display:block; position:relative; height:430px; overflow:hidden; margin:8px 0; }
          .hero-orbital-canvas { width:430px !important; height:430px !important; touch-action:pan-y; }
          .hero-scroll-indicator { display:none; }
          .hero-welcome-svg { width:100%; }
          .hero-welcome-wrapper { display:flex; justify-content:center; }
          .hero-name { text-align:center; }
        }
        @media (max-width:600px) {
          .hero-grid { padding:100px 5vw 40px; }
          .hero-orbital-mobile { height:360px; }
          .hero-orbital-canvas { width:360px !important; height:360px !important; }
        }
      `}</style>

      {/* Glows — supprimés sur les appareils low-end */}
      {showGlows && <>
        <div className="hero-glow" style={{
          position: "absolute", borderRadius: "50%", pointerEvents: "none",
          filter: "blur(100px)", opacity: 0.18,
          width: 700, height: 700,
          background: "radial-gradient(#0A84FF, transparent 70%)",
          top: -200, left: -150,
          animation: "heroGlow1 14s ease-in-out infinite alternate",
        }} />
        <div className="hero-glow" style={{
          position: "absolute", borderRadius: "50%", pointerEvents: "none",
          filter: "blur(100px)", opacity: 0.12,
          width: 500, height: 500,
          background: "radial-gradient(#FF2D6B, transparent 70%)",
          bottom: -100, right: 100,
          animation: "heroGlow2 18s ease-in-out infinite alternate-reverse",
        }} />
      </>}

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage:
          "linear-gradient(rgba(10,132,255,0.03) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(10,132,255,0.03) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
      }} />

      {/* Floating bg shapes */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", opacity: 0.1, top: "10%", left: "5%", animation: "heroGlow1 9s ease-in-out infinite alternate" }}>
          <svg width="48" height="48" viewBox="0 0 48 48"><polygon points="24,3 46,43 2,43" fill="none" stroke="#0A84FF" strokeWidth="1.2" /></svg>
        </div>
        <div style={{ position: "absolute", opacity: 0.1, top: "70%", left: "10%", animation: "heroGlow1 13s ease-in-out infinite alternate-reverse" }}>
          <svg width="36" height="36" viewBox="0 0 36 36"><rect x="3" y="3" width="30" height="30" fill="none" stroke="#00FFB3" strokeWidth="1" transform="rotate(15,18,18)" strokeDasharray="4 3" /></svg>
        </div>
        <div style={{ position: "absolute", opacity: 0.1, top: "20%", right: "5%", animation: "heroGlow1 11s ease-in-out infinite alternate" }}>
          <svg width="28" height="28" viewBox="0 0 28 28"><polygon points="14,1 27,14 14,27 1,14" fill="rgba(255,45,107,0.5)" /></svg>
        </div>
        <div style={{ position: "absolute", opacity: 0.1, bottom: "12%", right: "8%", animation: "heroGlow1 15s ease-in-out infinite alternate-reverse" }}>
          <svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="none" stroke="#0A84FF" strokeWidth="1" strokeDasharray="3 5" /></svg>
        </div>
      </div>

      {/* ── LEFT COLUMN ── */}
      <div className="hero-left">

        {/* Bienvenue handwriting */}
        <motion.div
          className="hero-welcome-wrapper"
          initial={{ opacity: 0 }}
          animate={heroVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <WelcomeHandwriting text={t("welcome")} simple={simpleWelcome} />
        </motion.div>

        {/* Orbital system — mobile only, between welcome and name */}
        {isMobile && heroVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: orbitalDelay }}
            className="hero-orbital-mobile"
          >
            <OrbitalCanvas fps={canvasFps} compact />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 10 }}>
              <PhotoCard />
            </div>
          </motion.div>
        )}

        {/* Name */}
        <motion.div
          className="hero-name"
          initial={{ opacity: 0, y: 20 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2.6rem, 4.2vw, 4.2rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            paddingBottom: "0.15em",
          }}
        >
          <span style={{ display: "block", color: "#F0F4FF" }}>Sébastien</span>
          <span style={{
            display: "block",
            background: "linear-gradient(100deg, #0A84FF, #00D4FF 50%, #00FFB3)",
            backgroundSize: "200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "heroGs 5s linear infinite",
          }}>
            Legros
          </span>
        </motion.div>

        {/* Title pill + role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <span style={{
            background: "rgba(10,132,255,0.12)",
            border: "1px solid rgba(10,132,255,0.35)",
            color: "#00D4FF",
            fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.16em",
            padding: "5px 14px", borderRadius: 100, textTransform: "uppercase",
          }}>
            Full Stack
          </span>
          <span style={{ color: "#6B7A99", fontSize: "0.92rem", letterSpacing: "0.01em" }}>
            {t("role")}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.3 }}
          style={{
            fontSize: "1rem", color: "#6B7A99", lineHeight: 1.75,
            borderLeft: "2px solid #0A84FF", paddingLeft: 18, maxWidth: 440, margin: 0,
          }}
        >
          {t("summary")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.7 }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
        >
          <a
            href="#projects"
            style={{
              background: "linear-gradient(135deg, #0A84FF, #00D4FF)",
              color: "#fff", fontFamily: "var(--font-display), sans-serif",
              fontSize: "0.85rem", fontWeight: 700,
              padding: "13px 28px", borderRadius: 100,
              textDecoration: "none", letterSpacing: "0.04em",
              boxShadow: "0 0 28px rgba(10,132,255,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 36px rgba(10,132,255,0.55)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 28px rgba(10,132,255,0.35)";
            }}
          >
            {t("primaryCta")}
          </a>
          <a
            href="#contact"
            style={{
              background: "transparent", color: "#F0F4FF",
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "0.85rem", fontWeight: 600,
              padding: "12px 24px", borderRadius: 100,
              border: "1.5px solid rgba(255,255,255,0.15)",
              textDecoration: "none", transition: "all 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "#00D4FF";
              el.style.color = "#00D4FF";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.15)";
              el.style.color = "#F0F4FF";
            }}
          >
            {t("secondaryCta")}
          </a>
          <a
            href={cvHref}
            download
            style={{
              background: "transparent", color: "#6B7A99",
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "0.85rem", fontWeight: 600,
              padding: "12px 20px", borderRadius: 100,
              border: "1.5px solid rgba(255,255,255,0.08)",
              textDecoration: "none", transition: "all 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.2)";
              el.style.color = "#F0F4FF";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.08)";
              el.style.color = "#6B7A99";
            }}
          >
            {t("tertiaryCta")}
          </a>
        </motion.div>

        {/* Social links + open to work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.9 }}
          style={{ display: "flex", gap: 10, alignItems: "center" }}
        >
          <SocialLink href="https://github.com/slg9" title="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.71C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12C22 6.48 17.52 2 12 2z" />
            </svg>
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/s%C3%A9bastien-legros-23a85085" title="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 17H6.5v-7H9v7zm-1.25-8.27A1.37 1.37 0 1 1 9.12 7.36a1.37 1.37 0 0 1-1.37 1.37zM18 17h-2.5v-3.5c0-1-.38-1.5-1.13-1.5s-1.37.6-1.37 1.6V17H10.5v-7H13v1.07C13.53 10.36 14.32 10 15.25 10 16.89 10 18 11 18 13.3V17z" />
            </svg>
          </SocialLink>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            marginLeft: 6, fontSize: "0.72rem", color: "#6B7A99", letterSpacing: "0.05em",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#00FFB3", boxShadow: "0 0 8px #00FFB3",
              animation: "heroPulse 2s ease-in-out infinite",
            }} />
            <span>Open to work</span>
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT COLUMN — desktop only ── */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="hero-right"
        >
          {heroVisible && <OrbitalCanvas fps={canvasFps} />}
          <div style={{ position: "relative", zIndex: 10 }}>
            <PhotoCard />
          </div>
        </motion.div>
      )}

      {/* Scroll indicator — desktop only */}
      <motion.a
        href="#aboutme"
        initial={{ opacity: 0 }}
        animate={heroVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 2.8 }}
        className="hero-scroll-indicator"
        style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          flexDirection: "column", alignItems: "center", gap: 6,
          zIndex: 4, textDecoration: "none",
        }}
      >
        <div style={{
          width: 1, height: 50,
          background: "linear-gradient(to bottom, #00D4FF, transparent)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            width: 3, height: 16, borderRadius: 2, background: "#00D4FF",
            position: "absolute", top: -16, left: -1,
            boxShadow: "0 0 6px #00D4FF",
            animation: "heroScrollDot 2s ease-in-out infinite",
          }} />
        </div>
        <span style={{
          fontSize: "0.6rem", letterSpacing: "0.2em",
          textTransform: "uppercase", color: "#6B7A99",
        }}>
          Scroll
        </span>
      </motion.a>
    </section>
  );
}
