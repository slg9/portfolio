"use client";

import { useTranslations } from "next-intl";

type Step = {
  year: string;
  title: string;
  subtitle?: string;
  type?: "work" | "education";
};

function TimelineCard({
  year, title, subtitle, type = "work",
}: Step) {
  const t = useTranslations("experience");
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(8,10,30,0.7)",
        padding: "20px 24px",
        boxShadow: "0 18px 46px rgba(0,0,0,0.18)",
        width: "100%",
        transition: "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = "rgba(91,143,201,0.25)";
        e.currentTarget.style.boxShadow = "0 18px 46px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "0 18px 46px rgba(0,0,0,0.18)";
      }}
    >
      {/* Top accent */}
      <div
        style={{
          position: "absolute", top: 0, left: 20, right: 20, height: 1,
          background: "linear-gradient(90deg, #5B8FC9, rgba(91,143,201,0.35), transparent)",
        }}
      />
      {/* Badge */}
      <span style={{
        display: "inline-block", borderRadius: 999,
        padding: "2px 10px",
        fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
        marginBottom: 10,
        background: type === "work" ? "rgba(91,143,201,0.12)" : "rgba(91,143,201,0.1)",
        color: type === "work" ? "#5B8FC9" : "#5B8FC9",
        border: `1px solid ${type === "work" ? "rgba(91,143,201,0.25)" : "rgba(91,143,201,0.22)"}`,
      }}>
        {t(`badges.${type}`)}
      </span>
      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5B8FC9", marginBottom: 8 }}>
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
    </div>
  );
}

function TimelineDot() {
  return (
    <div
      style={{
        width: 14, height: 14, borderRadius: "50%",
        background: "#5B8FC9",
        flexShrink: 0, zIndex: 2,
      }}
    />
  );
}

function TimelineItem({ year, title, subtitle, type = "work", index }: Step & { index: number }) {
  const isEven = index % 2 === 0;

  return (
    <>
      {/* ── MOBILE layout: left spine + full-width card ── */}
      <div className="flex md:hidden" style={{ position: "relative", gap: 16 }}>
        <div style={{ flexShrink: 0, width: 32, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 22 }}>
          <TimelineDot />
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingTop: 8 }}>
          <TimelineCard year={year} title={title} subtitle={subtitle} type={type} />
        </div>
      </div>

      {/* ── DESKTOP layout: alternating 3-column grid ── */}
      <div
        className="hidden md:grid"
        style={{ gridTemplateColumns: "1fr 32px 1fr", gap: "0 24px", alignItems: "start" }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 8 }}>
          {isEven ? (
            <TimelineCard year={year} title={title} subtitle={subtitle} type={type} />
          ) : (
            <div style={{ textAlign: "right", paddingRight: 8, paddingTop: 4 }}>
              <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "rgba(91,143,201,0.22)", letterSpacing: "-0.05em", lineHeight: 1, userSelect: "none", fontFamily: "var(--font-display), sans-serif" }}>
                {year.match(/\d{4}/)?.[0]}
              </span>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20 }}>
          <TimelineDot />
        </div>

        <div style={{ paddingTop: 8 }}>
          {!isEven ? (
            <TimelineCard year={year} title={title} subtitle={subtitle} type={type} />
          ) : (
            <div style={{ paddingLeft: 8, paddingTop: 4 }}>
              <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "rgba(91,143,201,0.22)", letterSpacing: "-0.05em", lineHeight: 1, userSelect: "none", fontFamily: "var(--font-display), sans-serif" }}>
                {year.match(/\d{4}/)?.[0]}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Cursus() {
  const t = useTranslations("experience");

  const parcours: Step[] = [
    { year: t("items.dut.period"),           title: t("items.dut.title"),           type: "education" },
    { year: t("items.master.period"),        title: t("items.master.title"),        type: "education" },
    { year: t("items.ird.period"),           title: t("items.ird.title"),           subtitle: t("items.ird.description"),           type: "work" },
    { year: t("items.region.period"),        title: t("items.region.title"),        subtitle: t("items.region.description"),        type: "work" },
    { year: t("items.squirrel_dev.period"),  title: t("items.squirrel_dev.title"),  subtitle: t("items.squirrel_dev.description"),  type: "work" },
    { year: t("items.squirrel_lead.period"), title: t("items.squirrel_lead.title"), subtitle: t("items.squirrel_lead.description"), type: "work" },
    { year: t("items.willow.period"),        title: t("items.willow.title"),        subtitle: t("items.willow.description"),        type: "work" },
    { year: t("items.neitsa.period"),        title: t("items.neitsa.title"),        subtitle: t("items.neitsa.description"),        type: "work" },
  ];

  return (
    <section
      id="cursus"
      style={{ position: "relative", background: "#04040F", padding: "72px 8vw" }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(91,143,201,0.3), transparent)",
      }} />

      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", margin: 0 }}>
            {t("subtitle")}
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Desktop spine */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              left: "calc(50% - 0.5px)",
              top: 0, bottom: 0, width: 1,
              background: "linear-gradient(to bottom, rgba(91,143,201,0.5), rgba(91,143,201,0.15))",
            }}
            aria-hidden
          />

          {/* Mobile spine */}
          <div
            className="md:hidden"
            style={{
              position: "absolute",
              left: 15,
              top: 0, bottom: 0, width: 1,
              background: "linear-gradient(to bottom, rgba(91,143,201,0.5), rgba(91,143,201,0.15))",
            }}
            aria-hidden
          />

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
