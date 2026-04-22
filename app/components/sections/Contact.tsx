"use client";

import { motion } from "framer-motion";
import ContactForm from "../ContactForm";
import { sendMailjet } from "@/app/actions/SendMailjet";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
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

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]" style={{ maxWidth: 1152, margin: "0 auto" }}>
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 18, x: -16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        >
          {/* Tag */}
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF", display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ width: 24, height: 1, background: "#00D4FF", display: "inline-block", flexShrink: 0 }} />
            {t("title")}
          </div>

          <h2
            id="contact-title"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", margin: 0, maxWidth: 420 }}
          >
            {t("subtitle")}
          </h2>
          <p style={{ marginTop: 20, maxWidth: "48ch", fontSize: "1rem", lineHeight: 2, color: "#6B7A99", fontFamily: "var(--font-body), sans-serif" }}>
            {t("description")}
          </p>

          {/* Availability badge */}
          <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,255,179,0.08)", border: "1px solid rgba(0,255,179,0.2)", borderRadius: 999, padding: "6px 14px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00FFB3", boxShadow: "0 0 8px #00FFB3", animation: "pulse 2s ease-in-out infinite", flexShrink: 0 }} />
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#00FFB3" }}>
              {t("availability")}
            </span>
          </div>

          {/* Info rows */}
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
            <motion.a
              href="mailto:slegros9@gmail.com"
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              whileHover={{ y: -2, borderColor: "rgba(10,132,255,0.3)" }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(8,10,30,0.7)",
                padding: "14px 20px",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#F0F4FF",
                textDecoration: "none",
                boxShadow: "0 18px 48px rgba(0,0,0,0.18)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 10, background: "rgba(10,132,255,0.12)", border: "1px solid rgba(10,132,255,0.2)", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
                </svg>
              </span>
              slegros9@gmail.com
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/sébastien-legros-23a85085"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              whileHover={{ y: -2, borderColor: "rgba(10,132,255,0.3)" }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(8,10,30,0.7)",
                padding: "14px 20px",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#F0F4FF",
                textDecoration: "none",
                boxShadow: "0 18px 48px rgba(0,0,0,0.18)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 10, background: "rgba(10,132,255,0.12)", border: "1px solid rgba(10,132,255,0.2)", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A84FF">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </span>
              LinkedIn
            </motion.a>
          </div>
        </motion.div>

        {/* Right column — form card */}
        <motion.div
          initial={{ opacity: 0, y: 18, x: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          whileHover={{ y: -4 }}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(8,10,30,0.7)",
            padding: "32px",
            boxShadow: "0 20px 55px rgba(0,0,0,0.22)",
          }}
        >
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            style={{
              position: "absolute",
              top: 0,
              left: 32,
              right: 32,
              height: 1,
              transformOrigin: "left",
              background: "linear-gradient(90deg, #0A84FF, rgba(10,132,255,0.35), transparent)",
            }}
          />
          <ContactForm action={sendMailjet} />
          <p style={{ marginTop: 24, fontSize: "0.875rem", color: "#6B7A99" }}>
            {t("preferEmail")}{" "}
            <a
              style={{ fontWeight: 600, color: "#F0F4FF", textDecoration: "underline", textUnderlineOffset: 4 }}
              href="mailto:slegros9@gmail.com"
            >
              slegros9@gmail.com
            </a>
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}
