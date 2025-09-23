"use client";
import React from "react";
import { Easing, motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const ease: Easing[] = ["easeIn","easeInOut"];

  return (
    <footer
      id="footer"
      className="relative isolate"
      aria-labelledby="footer-heading"
    >
      {/* Ligne top */}
      <div className="pointer-events-none absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700 md:snap-start" />

      {/* Background aura */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_20rem_at_50%_120%,rgba(56,189,248,0.08),transparent_60%)]" />

      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        {/* Message principal */}
        <motion.h2
          id="footer-heading"
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ease, duration: 0.7, delay: 0.05 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="text-center text-sm font-semibold tracking-tight text-slate-400 dark:text-slate-100"
        >
          Créé en 2025 par Sébastien Legros
        </motion.h2>

        {/* Stack badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            { label: "Next.js", color: "from-slate-900 to-slate-700" },
            { label: "Tailwind CSS", color: "from-sky-500 to-sky-400" },
            { label: "Framer Motion", color: "from-pink-500 to-fuchsia-500" },
            { label: "LottieFiles", color: "from-emerald-500 to-teal-400" },
            { label: "Vercel", color: "from-gray-900 to-gray-700" },
          ].map((t, i) => (
            <motion.span
              key={t.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ease, duration: 0.6, delay: 0.1 + i * 0.08 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${t.color} px-3 py-1.5 text-xs font-medium text-white shadow-sm`}
            >
              {t.label}
            </motion.span>
          ))}
        </div>

        {/* Lien GitHub / CI-CD */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease, duration: 0.7, delay: 0.5 }}
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
