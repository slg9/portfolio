"use client";
import React from "react";
import { Easing, motion } from "framer-motion";
import Link from "next/link";

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
  const ease: Easing[] = ["easeIn", "easeInOut"];

  return (
    <footer id="footer" className="relative isolate" aria-labelledby="footer-heading">
      {/* Ligne top */}
      <div className="pointer-events-none absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700 md:snap-start" />

      {/* Background aura */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_20rem_at_50%_120%,rgba(56,189,248,0.08),transparent_60%)]" />

      <section className="mx-auto w-full max-w-6xl px-6 py-8">
   

        {/* Phrase avec pills inline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease, duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-slate-600 dark:text-slate-300 flex flex-wrap items-center justify-center gap-y-2"
        >
          <span className="mx-1">Construit avec</span>
          <TechPill color="from-slate-900 to-slate-700" delay={0.25}>Next.js</TechPill>
          <span className="mx-1">, habillé par</span>
          <TechPill color="from-sky-500 to-sky-400" delay={0.33}>Tailwind CSS</TechPill>
          <span className="mx-1">, animé par</span>
          <TechPill color="from-pink-500 to-fuchsia-500" delay={0.41}>Framer Motion</TechPill>
          <span className="mx-1">&</span>
          <TechPill color="from-emerald-500 to-teal-400" delay={0.49}>Lottie</TechPill>
          <span className="mx-1">, déployé sur</span>
          <TechPill color="from-gray-900 to-gray-700" delay={0.57}>Vercel</TechPill>
          <span className="mx-1">.</span>
        </motion.p>

        {/* Lien GitHub / CI-CD */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease, duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 text-center"
        >
          <Link
            href="https://github.com/slg9/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-sky-700 hover:underline dark:text-sky-300"
          >
            Voir le code source sur GitHub (CI/CD → Vercel)
          </Link>
        </motion.div>

        {/* Bas de page */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200/70 pt-6 sm:flex-row dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} Sébastien Legros — Tous droits réservés
          </p>
        </div>
      </section>
    </footer>
  );
}
