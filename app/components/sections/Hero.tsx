"use client";
import Image from "next/image";
import { Easing, motion } from "framer-motion";

const linkedinUrl = "https://www.linkedin.com/in/sébastien-legros-23a85085";
const githubUrl = "https://github.com/slg9";
const mailUrl = "mailto:slegros9@gmail.com";

export default function Hero() {
  const ease: Easing[] = ["anticipate", "backIn"];

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen py-10 md:snap-start md:snap-always"
    >
      {/* Background: radial glow */}
      <div className="
        pointer-events-none absolute inset-0 -z-10
        bg-[radial-gradient(40rem_40rem_at_50%_-10%,rgba(99,102,241,.18),transparent_60%)]
        dark:bg-[radial-gradient(40rem_40rem_at_50%_-10%,rgba(99,102,241,.10),transparent_60%)]
      " />
      {/* Subtle top fade */}
      <div className="
        pointer-events-none absolute inset-0 -z-10
        bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,.02))]
        dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,.03),transparent)]
      " />
      {/* Grid mask */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]
          bg-[length:32px_32px]
          bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)]
          dark:bg-[linear-gradient(to_right,rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.07)_1px,transparent_1px)]
        "
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-12 pb-24 text-center">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ease, duration: 0.7, damping: 30, delay: 0.1 }}
          className="
            mb-3 inline-flex items-center gap-2 rounded-full
            border border-slate-200/80 bg-white/60 px-3 py-1 text-md font-medium text-slate-700 shadow-sm backdrop-blur
            supports-[backdrop-filter]:bg-white/60
            dark:border-slate-700/60 dark:bg-white/10 dark:text-slate-200 dark:shadow-none
            dark:supports-[backdrop-filter]:bg-white/10
          "
        >
          👋 Salut, je m’appelle
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ease, duration: 2, damping: 30 }}
          className="text-5xl/tight font-extrabold tracking-[-0.02em] text-slate-900 sm:text-4xl dark:text-slate-100"
        >
          Sébastien Legros
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ ease, duration: 2, delay: 0.34, damping: 30 }}
          className="mt-3 max-w-[700px] text-lg text-slate-600 dark:text-slate-300"
        >
          Développeur full-stack spécialisé en{" "}
          <span className="font-semibold text-slate-900 dark:text-slate-100">React, TypeScript, Go et Node.js</span>. 
          Passionné par les{" "}
          <span className="px-1 rounded bg-sky-100 dark:bg-sky-400/15">architectures modernes</span> et les{" "}
          <span className="px-1 rounded bg-emerald-100 dark:bg-emerald-400/15">solutions techniques innovantes</span>.
        </motion.p>

        {/* Photo + ring */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0, rotate: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 80, damping: 40, duration: 0.9, delay: 0.48, ease }}
          className="relative mt-10"
        >
          <span className="absolute -inset-2 rounded-full bg-gradient-to-tr from-indigo-500/25 via-sky-400/25 to-emerald-400/25 blur-2xl" />
          <Image
            src="/sebastien.jpeg"
            alt="Sébastien Legros"
            width={240}
            height={240}
            priority
            className="
              relative rounded-full border border-white shadow-xl ring-2 ring-slate-200 md:h-[360px] md:w-[360px]
              dark:border-white/10 dark:ring-slate-700
            "
          />
        </motion.div>

        {/* CTA row */}
        <div className="my-10 flex items-center gap-4">
          {/* LinkedIn */}
          <motion.a
            initial={{ opacity: 0, y: 10, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ ease, duration: 0.6, delay: 0.62 }}
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md
              border-slate-200 bg-white text-slate-700
              dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:shadow-slate-900/30
            "
          >
            <Image src="/linkedin.png" alt="" width={18} height={18} aria-hidden />
          </motion.a>

          {/* GitHub */}
          <motion.a
            initial={{ opacity: 0, y: 10, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ ease, duration: 0.6, delay: 0.72 }}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md
              border-slate-200 bg-white text-slate-700
              dark:border-slate-700 dark:bg-slate-600 dark:text-slate-200 dark:hover:shadow-slate-900/30
            
              "

          >
            <Image src="/github.png" alt="" width={18} height={18} aria-hidden />
          </motion.a>

          {/* Mail (déjà contrasté) */}
          <motion.a
            initial={{ opacity: 0, y: 10, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ ease, duration: 0.6, delay: 0.82 }}
            href={mailUrl}
            className="
              inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md
              bg-gradient-to-r from-indigo-600 to-sky-500 text-white
              dark:from-indigo-800 dark:to-sky-800
            "
          >
            <Image src="/gmail.png" alt="" width={18} height={18} aria-hidden />
          </motion.a>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ease, duration: 0.7, delay: 0.95 }}
          className="mt-6 text-xs text-slate-500 dark:text-slate-400"
        >
          Disponible pour du full-stack / backend roles
        </motion.div>
      </div>
    </section>
  );
}
