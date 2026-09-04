"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import CurtainBackground from "./CurtainBackground";

export default function WelcomeCurtain() {
  const t = useTranslations("hero");
  const [introReady, setIntroReady] = useState(false);
  const hasFiredRef = useRef(false);

  const scrollY = useMotionValue(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  // ── All transforms — étalés sur 480px pour une ouverture lente ─────────
  const textOpacity  = useTransform(scrollY, [0, 180], [1, 0]);
  const textY        = useTransform(scrollY, [0, 220], [0, -70]);
  const textScale    = useTransform(scrollY, [0, 180], [1, 0.82]);
  const textBlurV    = useTransform(scrollY, [0, 180], [0, 18]);
  const textFilter   = useTransform(textBlurV, (v) => `blur(${v}px)`);
  const arrowOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // Panels : démarrent à 80px, finissent à 480px
  const topPanelY    = useTransform(scrollY, [80, 480], ["0%", "-103%"]);
  const bottomPanelY = useTransform(scrollY, [80, 480], ["0%", "103%"]);

  const glowOpacity = useTransform(scrollY, [80, 160, 400, 480], [0, 1, 1, 0]);
  const glowScaleX  = useTransform(scrollY, [80, 320], [0.2, 1]);
  const glowSpread  = useTransform(scrollY, [80, 240, 440], [18, 72, 18]);
  const glowShadow  = useTransform(
    glowSpread,
    (v) =>
      `0 0 ${v}px #0A84FF, 0 0 ${v * 2}px rgba(10,132,255,0.45), 0 0 ${Math.round(v / 2)}px #00D4FF`
  );

  useEffect(() => {
    scrollY.set(window.scrollY);

    if (window.scrollY > 480 && !hasFiredRef.current) {
      hasFiredRef.current = true;
      document.body.dataset.curtainGone = "true";
      window.dispatchEvent(new CustomEvent("portfolio:curtain-gone"));
    }

    const onScroll = () => {
      const y = window.scrollY;
      scrollY.set(y);
      if (y > 480 && !hasFiredRef.current) {
        hasFiredRef.current = true;
        document.body.dataset.curtainGone = "true";
        window.dispatchEvent(new CustomEvent("portfolio:curtain-gone"));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    if (document.body.dataset.introReady === "true") {
      setIntroReady(true);
    } else {
      const onReady = () => setIntroReady(true);
      window.addEventListener("portfolio:intro-ready", onReady);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("portfolio:intro-ready", onReady);
      };
    }

    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ── Interactive background ──────────────────────────────────────── */}
      <CurtainBackground />

      {/* ── Top curtain panel ───────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: "51vh",
          zIndex: 90,
          y: topPanelY,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 110%, rgba(10,132,255,0.07) 0%, transparent 60%), #04040F",
        }}
      />

      {/* ── Bottom curtain panel ────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          height: "51vh",
          zIndex: 90,
          y: bottomPanelY,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% -10%, rgba(10,132,255,0.07) 0%, transparent 60%), #04040F",
        }}
      />

      {/* ── Accent laser at the seam ────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "50vh",
          left: 0, right: 0,
          height: 3,
          zIndex: 93,
          translateY: -1,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, transparent 0%, #0A84FF 25%, #00D4FF 50%, #0A84FF 75%, transparent 100%)",
          boxShadow: glowShadow,
          opacity: glowOpacity,
          scaleX: glowScaleX,
          transformOrigin: "center",
        }}
      />

      {/* ── Text + arrow ────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 95,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          opacity: textOpacity,
          y: textY,
          scale: textScale,
          filter: textFilter,
        }}
      >
        <motion.span
          className="font-script"
          initial={{ opacity: 0, y: 28, filter: "blur(20px)" }}
          animate={
            introReady
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 28, filter: "blur(20px)" }
          }
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(2.6rem, 7.5vw, 6.5rem)",
            color: "#F0F4FF",
            textAlign: "center",
            textShadow:
              "0 0 120px rgba(10,132,255,0.4), 0 0 48px rgba(10,132,255,0.18)",
            lineHeight: 1.15,
            maxWidth: "82vw",
            display: "block",
          }}
        >
          {t("welcome")}
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={introReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          style={{
            display: "block",
            marginTop: 20,
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.18)",
          }}
        >
          Scroll
        </motion.span>

        <motion.div
          style={{ opacity: arrowOpacity, marginTop: 28 }}
          initial={{ opacity: 0 }}
          animate={introReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, 13, 0] }}
            transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0A84FF"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
