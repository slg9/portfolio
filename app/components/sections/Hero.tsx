"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const linkedinUrl = "https://www.linkedin.com/in/sébastien-legros-23a85085";
const githubUrl = "https://github.com/slg9";
const mailUrl = "mailto:sebastien@neitsa.fr";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] snap-start isolate overflow-hidden"
    >
      {/* Background: grid + radial */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40rem_40rem_at_50%_-10%,rgba(99,102,241,.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,.02))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[length:32px_32px] bg-[linear-gradient(to_right,rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.05)_1px,transparent_1px)]" />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-24 text-center">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.1 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur"
        >
          👋 Hi, I am
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.2 }}
          className="text-5xl/tight font-extrabold tracking-[-0.02em] text-slate-900 sm:text-6xl"
        >
          Sébastien Legros
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.35 }}
          className="mt-3 text-lg text-slate-600"
        >
          And I am a Software engineer focused on clean architecture, delightful UX, and performance.
        </motion.p>

        {/* Photo + ring */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 16, delay: 0.45 }}
          className="relative mt-10"
        >
          <span className="absolute -inset-2 rounded-full bg-gradient-to-tr from-indigo-500/25 via-sky-400/25 to-emerald-400/25 blur-2xl" />
          <Image
            src="/sebastien.jpeg"
            alt="Sébastien Legros"
            width={240}
            height={240}
            priority
            className="md:w-[360px] md:h-[360px] relative rounded-full border border-white shadow-xl ring-2 ring-slate-200"
          />
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.6 }}
          className="mt-10 flex items-center gap-4"
        >
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Image src="/linkedin.png" alt="" width={18} height={18} aria-hidden />
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Image src="/github.png" alt="" width={18} height={18} aria-hidden />
          </a>
          <a
            href={mailUrl}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Image src="/gmail.png" alt="" width={18} height={18} aria-hidden />
          </a>
        </motion.div>

        {/* Small trust bar (facultatif) */}
        <div className="mt-6 text-xs text-slate-500">
          Available for full-stack / backend roles
        </div>
      </div>
    </section>
  );
}
