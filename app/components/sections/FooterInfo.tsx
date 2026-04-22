"use client";
import React from "react";
import { Easing, motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from 'next-intl';

function TechPill({
  children,
  color,
  delay = 0,
}: {
  children: React.ReactNode;
  color: string;
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ease: ["easeIn", "easeInOut"] as Easing[], duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`align-middle inline-flex items-center rounded-full bg-gradient-to-r ${color} px-2.5 py-1 text-xs font-medium text-white shadow-sm mx-1 whitespace-nowrap`}
    >
      {children}
    </motion.span>
  );
}

export default function Footer() {
  const t = useTranslations('footer');
  const ease: Easing[] = ["easeIn", "easeInOut"];

  return (
    <footer
      id="footer"
      aria-labelledby="footer-heading"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "#04040F",
        textAlign: "center",
        padding: "32px 24px",
      }}
    >
      {/* Built-with sentence with pills */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease, duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        style={{
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.2)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px 0",
        }}
      >
        <span className="mx-1">{t('builtWith')}</span>
        <TechPill color="from-slate-700 to-slate-600" delay={0.25}>Next.js</TechPill>
        <span className="mx-1">, {t('styledBy')}</span>
        <TechPill color="from-sky-600 to-sky-500" delay={0.33}>Tailwind CSS</TechPill>
        <span className="mx-1">, {t('animatedBy')}</span>
        <TechPill color="from-pink-600 to-fuchsia-600" delay={0.41}>Framer Motion</TechPill>
        <span className="mx-1">{t('and')}</span>
        <TechPill color="from-emerald-600 to-teal-500" delay={0.49}>Lottie</TechPill>
        <span className="mx-1">, {t('deployedOn')}</span>
        <TechPill color="from-gray-700 to-gray-600" delay={0.57}>Vercel</TechPill>
        <span className="mx-1">.</span>
      </motion.p>

      {/* GitHub link */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease, duration: 0.7, delay: 0.6 }}
        viewport={{ once: true }}
        style={{ marginTop: 16 }}
      >
        <Link
          href="https://github.com/slg9/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "0.75rem",
            color: "rgba(10,132,255,0.5)",
            textDecoration: "none",
            transition: "color 180ms ease",
          }}
        >
          {t('viewSource')}
        </Link>
      </motion.div>

      {/* Copyright */}
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>
          {t('copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
