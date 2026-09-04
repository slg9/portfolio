"use client";

import { useEffect, useRef } from "react";

const PALETTE: [number, number, number][] = [
  [10, 132, 255],
  [0,  212, 255],
  [0,  255, 179],
  [123,108, 255],
  [10, 132, 255],
  [0,  212, 255],
];

const N   = 120;
const CON = 115;
const MR  = 180;

interface Particle { x:number; y:number; vx:number; vy:number; r:number; c:[number,number,number]; speed:number }
interface Meteor   { x:number; y:number; vx:number; vy:number; life:number; max:number; c:[number,number,number] }
interface Sparkle  { x:number; y:number; life:number; max:number; c:[number,number,number] }

export default function CurtainBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = window.innerWidth < 900;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const mouse = { x: -9999, y: -9999 };

    // ── Particles ────────────────────────────────────────────────────────
    const pts: Particle[] = mobile ? [] : Array.from({ length: N }, () => {
      const fast = Math.random() < 0.18; // 18 % fast particles
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * (fast ? 1.4 : 0.5),
        vy: (Math.random() - 0.5) * (fast ? 1.4 : 0.5),
        r: fast ? 1 : 1 + Math.random() * 1.8,
        c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        speed: fast ? 2 : 1,
      };
    });

    // ── Meteors & sparkles ───────────────────────────────────────────────
    const meteors:  Meteor[]  = [];
    const sparkles: Sparkle[] = [];

    const spawnMeteor = () => {
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const spd = 9 + Math.random() * 8;
      const ang = (Math.random() * Math.PI) / 3 - Math.PI / 6 + Math.PI / 4; // NE-ish
      meteors.push({
        x: Math.random() * W * 0.6, y: -10,
        vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
        life: 0, max: 55 + Math.random() * 45, c,
      });
    };

    const spawnSparkle = () => {
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      sparkles.push({
        x: Math.random() * W, y: Math.random() * H,
        life: 0, max: 28 + Math.random() * 20, c,
      });
    };

    // ── Event listeners ──────────────────────────────────────────────────
    const onMove   = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onResize = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; };
    const onScroll = () => {
      const y = window.scrollY;
      canvas.style.opacity = String(1 - Math.max(0, Math.min(1, (y - 80) / 400)));
    };
    window.addEventListener("mousemove", onMove,   { passive: true });
    window.addEventListener("resize",    onResize, { passive: true });
    window.addEventListener("scroll",    onScroll, { passive: true });

    let raf: number;
    let t = 0;
    let meteorTimer = 0;
    let sparkleTimer = 0;

    function tick() {
      t += 0.008;
      meteorTimer++;
      sparkleTimer++;

      // Spawn timers
      if (meteorTimer > 220 + Math.random() * 140) { spawnMeteor(); meteorTimer = 0; }
      if (sparkleTimer > 35  + Math.random() * 25)  { spawnSparkle(); sparkleTimer = 0; }

      // Motion-blur trail
      ctx.fillStyle = "rgba(4,4,15,0.14)";
      ctx.fillRect(0, 0, W, H);

      // ── Aurora blobs (breathing via sin) ─────────────────────────────
      const blobs = [
        { cx: W*.12 + Math.sin(t*.65)*100,  cy: H*.22 + Math.cos(t*.48)*80,  r: W*.32, rgb:[10,132,255]  as [number,number,number], a: 0.10 + Math.sin(t*1.1)*.04  },
        { cx: W*.80 + Math.cos(t*.52)*120,  cy: H*.68 + Math.sin(t*.72)*90,  r: W*.36, rgb:[0,212,255]   as [number,number,number], a: 0.08 + Math.sin(t*.9+1)*.03 },
        { cx: W*.48 + Math.sin(t*.38)*140,  cy: H*.90 + Math.cos(t*.28)*60,  r: W*.28, rgb:[0,255,179]   as [number,number,number], a: 0.06 + Math.sin(t*.7+2)*.025},
        { cx: W*.88 + Math.cos(t*.82)*80,   cy: H*.15 + Math.sin(t*.58)*90,  r: W*.26, rgb:[123,108,255] as [number,number,number], a: 0.09 + Math.sin(t*1.3+3)*.04},
        { cx: W*.32 + Math.sin(t*.44)*90,   cy: H*.52 + Math.cos(t*.36)*70,  r: W*.22, rgb:[0,212,255]   as [number,number,number], a: 0.05 + Math.sin(t*.6+4)*.02 },
        { cx: W*.65 + Math.cos(t*.31)*110,  cy: H*.35 + Math.sin(t*.42)*80,  r: W*.20, rgb:[10,132,255]  as [number,number,number], a: 0.07 + Math.sin(t*1.0+5)*.03},
      ];
      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.cx, b.cy, 0, b.cx, b.cy, b.r);
        g.addColorStop(0, `rgba(${b.rgb[0]},${b.rgb[1]},${b.rgb[2]},${b.a.toFixed(3)})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(b.cx, b.cy, b.r, 0, Math.PI*2); ctx.fill();
      }

      // ── Cursor aura ───────────────────────────────────────────────────
      if (mouse.x > 0) {
        const cg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 170);
        cg.addColorStop(0,   "rgba(10,132,255,0.20)");
        cg.addColorStop(0.4, "rgba(0,212,255,0.07)");
        cg.addColorStop(1,   "transparent");
        ctx.fillStyle = cg;
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 170, 0, Math.PI*2); ctx.fill();
      }

      // ── Particles ─────────────────────────────────────────────────────
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < MR && d > 0.1) {
          const f = Math.pow((MR-d)/MR, 1.8) * 0.30 * p.speed;
          p.vx += (dx/d)*f; p.vy += (dy/d)*f;
        }
        p.vx += (Math.random()-0.5) * 0.024 * p.speed;
        p.vy += (Math.random()-0.5) * 0.024 * p.speed;
        const spd = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
        const cap = 3.5 * p.speed;
        if (spd > cap) { p.vx = p.vx/spd*cap; p.vy = p.vy/spd*cap; }
        p.vx *= 0.972; p.vy *= 0.972;
        p.x += p.vx; p.y += p.vy;
        if (p.x < -12) p.x = W+12; else if (p.x > W+12) p.x = -12;
        if (p.y < -12) p.y = H+12; else if (p.y > H+12) p.y = -12;

        // Connections
        for (let j = i+1; j < pts.length; j++) {
          const q = pts[j];
          const cx = p.x-q.x, cy = p.y-q.y;
          const cd = Math.sqrt(cx*cx + cy*cy);
          if (cd < CON) {
            ctx.strokeStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${((1-cd/CON)*0.24).toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
          }
        }

        // Dot
        ctx.shadowBlur = 12; ctx.shadowColor = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},0.9)`;
        ctx.fillStyle   = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},0.88)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ── Meteors ───────────────────────────────────────────────────────
      for (let i = meteors.length-1; i >= 0; i--) {
        const m = meteors[i];
        const prog  = m.life / m.max;
        const alpha = Math.sin(prog * Math.PI) * 0.95;
        const trailLen = 30 + prog * 20;

        ctx.save();
        const grad = ctx.createLinearGradient(
          m.x - m.vx/Math.abs(m.vx||1)*trailLen, m.y - m.vy/Math.abs(m.vy||1)*trailLen,
          m.x, m.y
        );
        grad.addColorStop(0, `rgba(${m.c[0]},${m.c[1]},${m.c[2]},0)`);
        grad.addColorStop(1, `rgba(${m.c[0]},${m.c[1]},${m.c[2]},${alpha.toFixed(3)})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.8;
        ctx.shadowBlur  = 20;
        ctx.shadowColor = `rgba(${m.c[0]},${m.c[1]},${m.c[2]},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(m.x - m.vx*trailLen/m.vx, m.y - m.vy*trailLen/(m.vy||1));
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
        ctx.restore();

        m.x += m.vx; m.y += m.vy; m.life++;
        if (m.life >= m.max || m.x > W+50 || m.y > H+50) meteors.splice(i, 1);
      }

      // ── Sparkles ──────────────────────────────────────────────────────
      for (let i = sparkles.length-1; i >= 0; i--) {
        const s = sparkles[i];
        const alpha = Math.sin((s.life / s.max) * Math.PI) * 0.9;
        const r = 1.5 + Math.sin((s.life/s.max)*Math.PI) * 2.5;
        ctx.shadowBlur  = 18;
        ctx.shadowColor = `rgba(${s.c[0]},${s.c[1]},${s.c[2]},${alpha.toFixed(3)})`;
        ctx.fillStyle   = `rgba(${s.c[0]},${s.c[1]},${s.c[2]},${alpha.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, r, 0, Math.PI*2); ctx.fill();
        ctx.shadowBlur = 0;
        s.life++;
        if (s.life >= s.max) sparkles.splice(i, 1);
      }

      raf = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize",    onResize);
      window.removeEventListener("scroll",    onScroll);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position:"fixed", inset:0, zIndex:92, pointerEvents:"none" }}
    />
  );
}
