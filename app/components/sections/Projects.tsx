"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type FeaturedProject = {
  key: "econnect" | "begaiement" | "qrwin" | "happiz";
  imageSrc: string;
  stack: string[];
};

type ArchiveProject = {
  key:
    | "actuflux"
    | "prelys"
    | "cineactu"
    | "elearning"
    | "leon"
    | "raoul"
    | "psg"
    | "fidelatoo"
    | "handimobi"
    | "ladar";
};

const featuredProjects: FeaturedProject[] = [
  {
    key: "econnect",
    imageSrc: "/projects/econnect.webp",
    stack: ["React", "Go", "GraphQL", "PostgreSQL", "Docker", "CI/CD"],
  },
  {
    key: "begaiement",
    imageSrc: "/projects/begaiement.png",
    stack: ["React", "Go", "REST", "PostgreSQL", "Analytics", "Stripe"],
  },
  {
    key: "qrwin",
    imageSrc: "/projects/qrwin.png",
    stack: ["React", "Go", "REST", "Stripe", "Wallet", "Back-office"],
  },
  {
    key: "happiz",
    imageSrc: "/projects/happiz.svg",
    stack: ["React", "Go", "GraphQL", "Mobile backend", "Firebase", "Admin"],
  },
];

const archiveProjects: ArchiveProject[] = [
  { key: "actuflux" },
  { key: "prelys" },
  { key: "cineactu" },
  { key: "elearning" },
  { key: "leon" },
  { key: "raoul" },
  { key: "psg" },
  { key: "fidelatoo" },
  { key: "handimobi" },
  { key: "ladar" },
];

export default function Projects() {
  const t = useTranslations("projects");
  const [expandedProject, setExpandedProject] = useState<string | null>(featuredProjects[0].key);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      style={{
        position: "relative",
        background: "#04040F",
        padding: "72px 8vw",
      }}
    >
      {/* Top divider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(10,132,255,0.3), transparent)",
        }}
      />

      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ maxWidth: 720, position: "relative" }}
        >
          {/* Tag */}
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF", display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ width: 24, height: 1, background: "#00D4FF", display: "inline-block", flexShrink: 0 }} />
            {t("portfolio")}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <h2
              id="projects-title"
              style={{ fontSize: "clamp(1.9rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", margin: 0 }}
            >
              {t("title")}
            </h2>
            <span style={{ fontSize: "4rem", fontWeight: 800, color: "rgba(255,255,255,0.04)", letterSpacing: "-0.05em", lineHeight: 1, userSelect: "none" }}>
              {featuredProjects.length}
            </span>
          </div>
          <p style={{ marginTop: 16, maxWidth: "56ch", fontSize: "0.9375rem", lineHeight: 1.75, color: "#6B7A99" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Featured project cards */}
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 24 }}>
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.key}
              initial={{ opacity: 0, y: 26, scale: 0.975, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              whileHover={{ y: -4, borderColor: "rgba(10,132,255,0.3)", boxShadow: "0 28px 70px rgba(10,132,255,0.08)" }}
              transition={{ duration: 0.85, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              style={{
                position: "relative",
                overflow: "hidden",
                display: "grid",
                gap: 20,
                borderRadius: 22,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(8,10,30,0.7)",
                padding: "16px",
                boxShadow: "0 20px 55px rgba(0,0,0,0.22)",
              }}
              className="md:grid-cols-[0.92fr_1.08fr] md:p-6"
            >
              {/* Top accent line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 20,
                  right: 20,
                  height: 1,
                  transformOrigin: "left",
                  background: "linear-gradient(90deg, #0A84FF, rgba(10,132,255,0.35), transparent)",
                }}
              />

              {/* Image */}
              <div
                style={{ position: "relative", overflow: "hidden", borderRadius: 18, background: "rgba(10,12,40,0.8)" }}
                className="group"
              >
                <div style={{ position: "absolute", inset: 0, zIndex: 10, background: "linear-gradient(to top, rgba(0,0,0,0.18), transparent)", opacity: 0, transition: "opacity 300ms" }} className="group-hover:opacity-100 pointer-events-none" />
                <Image
                  src={project.imageSrc}
                  alt={t(`items.${project.key}.title`)}
                  width={900}
                  height={640}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 500ms" }}
                  className="group-hover:scale-[1.04]"
                />
              </div>

              {/* Content */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", margin: 0 }}>
                    {t(`items.${project.key}.title`)}
                  </h3>
                  <p style={{ marginTop: 12, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B7A99", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {t(`items.${project.key}.summary`)}
                  </p>

                  {/* Stack pills */}
                  <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {project.stack.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        style={{
                          borderRadius: 999,
                          border: "1px solid rgba(10,132,255,0.25)",
                          background: "rgba(10,132,255,0.08)",
                          padding: "6px 12px",
                          fontSize: "0.6875rem",
                          fontWeight: 500,
                          color: "#00D4FF",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Expand button */}
                  <motion.button
                    type="button"
                    onClick={() =>
                      setExpandedProject((current) => (current === project.key ? null : project.key))
                    }
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.18 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                    whileHover={{ x: 2 }}
                    style={{
                      marginTop: 20,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#F0F4FF",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "color 180ms ease",
                    }}
                    aria-expanded={expandedProject === project.key}
                  >
                    {expandedProject === project.key ? t("hideDetails") : t("showDetails")}
                    <motion.span animate={{ rotate: expandedProject === project.key ? 45 : 0 }} style={{ color: "#0A84FF", fontSize: "1.1rem" }}>
                      +
                    </motion.span>
                  </motion.button>

                  {/* Expanded details */}
                  <motion.dl
                    initial={false}
                    animate={{
                      height: expandedProject === project.key ? "auto" : 0,
                      opacity: expandedProject === project.key ? 1 : 0,
                    }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                      <div>
                        <dt style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF" }}>
                          {t("roleLabel")}
                        </dt>
                        <dd style={{ marginTop: 8, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B7A99" }}>
                          {t(`items.${project.key}.role`)}
                        </dd>
                      </div>
                      <div>
                        <dt style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF" }}>
                          {t("impactLabel")}
                        </dt>
                        <dd style={{ marginTop: 8, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B7A99" }}>
                          {t(`items.${project.key}.impact`)}
                        </dd>
                      </div>
                    </div>
                  </motion.dl>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Archive section */}
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(8,10,30,0.7)",
            padding: "24px",
            boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
            marginTop: 40,
          }}
          className="md:p-6"
        >
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{
              position: "absolute",
              top: 0,
              left: 24,
              right: 24,
              height: 1,
              transformOrigin: "left",
              background: "linear-gradient(90deg, #0A84FF, rgba(10,132,255,0.35), transparent)",
            }}
          />
          <h3 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", margin: 0 }}>
            {t("archiveTitle")}
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {archiveProjects.map((project) => (
              <motion.article
                key={project.key}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -3, borderColor: "rgba(10,132,255,0.3)" }}
                style={{
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "transparent",
                  padding: 20,
                }}
              >
                <h4 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#F0F4FF", margin: 0 }}>
                  {t(`items.${project.key}.title`)}
                </h4>
                <p style={{ marginTop: 12, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B7A99" }}>
                  {t(`items.${project.key}.description`)}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
