"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Step = {
  year: string;
  title: string;
  subtitle?: string;
  type?: "work" | "education";
};

// ── SHARED CARD CONTENT ───────────────────────────────────────────────────────
function TimelineCard({
  year, title, subtitle, type = "work", index, fromLeft,
}: Step & { index: number; fromLeft: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -24 : 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      whileHover={{ y: -4, borderColor: "rgba(10,132,255,0.3)", boxShadow: "0 0 32px rgba(10,132,255,0.1)" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(8,10,30,0.7)",
        padding: "20px 24px",
        boxShadow: "0 18px 46px rgba(0,0,0,0.18)",
        width: "100%",
      }}
    >
      {/* Top accent */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.85, delay: index * 0.08 + 0.14, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        style={{
          position: "absolute", top: 0, left: 20, right: 20, height: 1,
          transformOrigin: "left",
          background: "linear-gradient(90deg, #0A84FF, rgba(10,132,255,0.35), transparent)",
        }}
      />
      {/* Badge */}
      <span style={{
        display: "inline-block", borderRadius: 999,
        padding: "2px 10px",
        fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
        marginBottom: 10,
        background: type === "work" ? "rgba(10,132,255,0.12)" : "rgba(0,255,179,0.1)",
        color: type === "work" ? "#0A84FF" : "#00FFB3",
        border: `1px solid ${type === "work" ? "rgba(10,132,255,0.25)" : "rgba(0,255,179,0.2)"}`,
      }}>
        {type === "work" ? "Work" : "Education"}
      </span>
      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF", marginBottom: 8 }}>
        {year}
      </p>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", margin: 0 }}>
        {title}
      </h3>
      {subtitle && (
        <p style={{ marginTop: 10, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B7A99" }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// ── TIMELINE DOT ──────────────────────────────────────────────────────────────
function TimelineDot({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.55, delay: index * 0.08 + 0.12, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      style={{
        width: 14, height: 14, borderRadius: "50%",
        background: "linear-gradient(135deg, #0A84FF, #00D4FF)",
        boxShadow: "0 0 16px rgba(10,132,255,0.5)",
        flexShrink: 0, zIndex: 2,
      }}
    />
  );
}

// ── TIMELINE ITEM ─────────────────────────────────────────────────────────────
function TimelineItem({ year, title, subtitle, type = "work", index }: Step & { index: number }) {
  const isEven = index % 2 === 0;

  return (
    <>
      {/* ── MOBILE layout: left spine + full-width card ── */}
      <div className="flex md:hidden" style={{ position: "relative", gap: 16 }}>
        {/* Dot column */}
        <div style={{ flexShrink: 0, width: 32, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 22 }}>
          <TimelineDot index={index} />
        </div>
        {/* Card */}
        <div style={{ flex: 1, minWidth: 0, paddingTop: 8 }}>
          <TimelineCard year={year} title={title} subtitle={subtitle} type={type} index={index} fromLeft={false} />
        </div>
      </div>

      {/* ── DESKTOP layout: alternating 3-column grid ── */}
      <div
        className="hidden md:grid"
        style={{ gridTemplateColumns: "1fr 32px 1fr", gap: "0 24px", alignItems: "start" }}
      >
        {/* Left */}
        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 8 }}>
          {isEven ? (
            <TimelineCard year={year} title={title} subtitle={subtitle} type={type} index={index} fromLeft={true} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              style={{ textAlign: "right", paddingRight: 8, paddingTop: 4 }}
            >
              <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "rgba(10,132,255,0.22)", letterSpacing: "-0.05em", lineHeight: 1, userSelect: "none", fontFamily: "var(--font-display), sans-serif" }}>
                {year.split(/[–-]/)[0].trim()}
              </span>
            </motion.div>
          )}
        </div>

        {/* Dot */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20 }}>
          <TimelineDot index={index} />
        </div>

        {/* Right */}
        <div style={{ paddingTop: 8 }}>
          {!isEven ? (
            <TimelineCard year={year} title={title} subtitle={subtitle} type={type} index={index} fromLeft={false} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              style={{ paddingLeft: 8, paddingTop: 4 }}
            >
              <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "rgba(10,132,255,0.22)", letterSpacing: "-0.05em", lineHeight: 1, userSelect: "none", fontFamily: "var(--font-display), sans-serif" }}>
                {year.split(/[–-]/)[0].trim()}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────────────────────
export default function Cursus() {
  const t = useTranslations("experience");

  // Chronological order: oldest → newest
  const parcours: Step[] = [
    { year: "2010 - 2012", title: t("items.dut.title"),           type: "education" },
    { year: "2012 - 2015", title: t("items.master.title"),        type: "education" },
    { year: "2016 – 2017", title: t("items.ird.title"),           subtitle: t("items.ird.description"),           type: "work" },
    { year: "2017 – 2021", title: t("items.region.title"),        subtitle: t("items.region.description"),        type: "work" },
    { year: "2021 – 2022", title: t("items.squirrel_dev.title"),  subtitle: t("items.squirrel_dev.description"),  type: "work" },
    { year: "2022 – 2025", title: t("items.squirrel_lead.title"), subtitle: t("items.squirrel_lead.description"), type: "work" },
    { year: "2026 – aujourd'hui", title: t("items.willow.title"), subtitle: t("items.willow.description"),        type: "work" },
  ];

  return (
    <section
      id="cursus"
      style={{ position: "relative", background: "#04040F", padding: "72px 8vw" }}
    >
      {/* Top divider */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(10,132,255,0.3), transparent)",
      }}/>

      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          style={{ maxWidth: 720, marginBottom: 56 }}
        >
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF", display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ width: 24, height: 1, background: "#00D4FF", display: "inline-block", flexShrink: 0 }}/>
            {t("title")}
          </div>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", margin: 0 }}>
            {t("subtitle")}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* ── Desktop spine (centered) ── */}
          <motion.div
            className="hidden md:block"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{
              position: "absolute",
              left: "calc(50% - 0.5px)",
              top: 0, bottom: 0, width: 1,
              transformOrigin: "top",
              background: "linear-gradient(to bottom, #0A84FF, #00D4FF 50%, #00FFB3)",
              opacity: 0.35,
            }}
            aria-hidden
          />

          {/* ── Mobile spine (left aligned at center of 32px dot column) ── */}
          <motion.div
            className="md:hidden"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{
              position: "absolute",
              left: 15, // center of 32px column
              top: 0, bottom: 0, width: 1,
              transformOrigin: "top",
              background: "linear-gradient(to bottom, #0A84FF, #00D4FF 50%, #00FFB3)",
              opacity: 0.35,
            }}
            aria-hidden
          />

          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {parcours.map((step, index) => (
              <TimelineItem key={step.year + step.title} index={index} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
