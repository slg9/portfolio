"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] px-4 py-4 text-left shadow-[0_14px_34px_rgba(0,0,0,0.05)]"
    >
      <div className="text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">{value}</div>
      <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">{label}</p>
    </motion.div>
  );
}

function WelcomeSignature({
  text,
  ready,
}: {
  text: string;
  ready: boolean;
}) {
  return (
    <div className="relative w-full max-w-[24rem]">
      <div className="relative inline-block overflow-hidden whitespace-nowrap">
        <div className="font-script invisible text-[2rem] leading-none sm:text-[2.4rem]">
          {text}
        </div>
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={ready ? { width: "100%", opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 1.9, delay: 0.18, ease: [0.2, 0.9, 0.2, 1] }}
          className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap"
        >
          <div className="font-script text-[2rem] leading-none text-[var(--accent)] sm:text-[2.4rem]">
            {text}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: "-10%", opacity: 0 }}
          animate={ready ? { x: "102%", opacity: [0, 1, 1, 0] } : { x: "-10%", opacity: 0 }}
          transition={{ duration: 1.8, delay: 0.18, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center"
          aria-hidden
        >
          <span className="relative block h-5 w-5">
            <span className="absolute left-1/2 top-1/2 h-4 w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-[24deg] rounded-full bg-[var(--accent)]" />
            <span className="absolute left-[52%] top-[58%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/75 blur-[1px]" />
          </span>
        </motion.div>
      </div>

      <motion.svg
        viewBox="0 0 320 36"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.25, delay: 1.45 }}
        className="mt-1 h-5 w-full max-w-[22rem] text-[var(--accent)]"
        aria-hidden
      >
        <motion.path
          d="M6 22 C 42 35, 92 8, 138 19 S 232 31, 314 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={ready ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.25, delay: 1.46, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const pathname = usePathname();
  const [introReady, setIntroReady] = useState(false);
  const cvHref = pathname.startsWith("/en")
    ? "/docs/Sebastien_Legros_CV_EN.pdf"
    : "/docs/Sebastien_Legros_CV_FR.pdf";
  const heroEase = [0.22, 1, 0.36, 1] as const;
  const revealUp = {
    hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  };
  const lineReveal = {
    hidden: { opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" },
    show: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
  };

  useEffect(() => {
    if (document.body.dataset.introReady === "true") {
      setIntroReady(true);
      return;
    }

    const onReady = () => setIntroReady(true);
    window.addEventListener("portfolio:intro-ready", onReady);
    return () => window.removeEventListener("portfolio:intro-ready", onReady);
  }, []);

  return (
    <motion.section
      id="hero"
      className="relative overflow-hidden px-6 pb-12 pt-10 md:px-10 md:pb-16 md:pt-20"
      initial={{ opacity: 0 }}
      animate={introReady ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.4, delay: 0.45, ease: heroEase }}
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_15%,rgba(181,93,50,0.16),transparent_26%),radial-gradient(circle_at_20%_20%,rgba(53,89,122,0.1),transparent_18%),linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(181,93,50,0.16),transparent_64%)] blur-3xl md:h-[34rem] md:w-[34rem]" />

      <motion.div
        initial="hidden"
        animate={introReady ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: {
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.18,
            },
          },
        }}
        className="mx-auto flex min-h-[calc(100svh-7rem)] max-w-5xl flex-col items-center justify-center text-center"
      >
        <WelcomeSignature text={t("welcome")} ready={introReady} />

        <motion.div
          variants={revealUp}
          transition={{ duration: 1.35, ease: heroEase }}
          className="relative mt-10 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(53,89,122,0.14),transparent_62%)] blur-2xl" />
          <div className="relative h-64 w-64 overflow-hidden rounded-full border border-white/40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),rgba(255,255,255,0.05))] shadow-[0_30px_90px_rgba(0,0,0,0.08)] md:h-80 md:w-80">
            <Image
              src="/sebastien.jpeg"
              alt="Sébastien Legros"
              fill
              priority
              className="object-cover object-center opacity-90 mix-blend-multiply [mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent,rgba(247,242,234,0.14)_62%,rgba(247,242,234,0.52)_100%)]" />
          </div>
        </motion.div>

        <motion.h1
          className="mt-8 max-w-3xl text-[1.9rem] font-extrabold tracking-[-0.06em] text-slate-950 dark:text-white sm:text-[2.55rem] md:text-[3.25rem]"
        >
          <motion.span
            variants={lineReveal}
            transition={{ duration: 1.15, ease: heroEase }}
            className="block will-change-transform"
          >
            {t("name")}
          </motion.span>
          <motion.span
            variants={lineReveal}
            transition={{ duration: 1.2, ease: heroEase }}
            className="mt-2 block text-[var(--accent)] will-change-transform"
          >
            {t("role")}
          </motion.span>
        </motion.h1>

        <motion.p
          variants={revealUp}
          transition={{ duration: 1.1, ease: heroEase }}
          className="mt-5 max-w-xl text-[13px] leading-7 text-slate-700 dark:text-slate-300 sm:text-sm"
        >
          {t("summary")}
        </motion.p>

        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: {
                delayChildren: 0.28,
                staggerChildren: 0.14,
              },
            },
          }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          <motion.a
            href="#projects"
            variants={{
              hidden: { opacity: 0, y: 18, scale: 0.96, filter: "blur(8px)" },
              show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
            }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.9, ease: heroEase }}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,0,0,0.16)] dark:bg-white dark:text-slate-950"
          >
            {t("primaryCta")}
          </motion.a>
          <motion.a
            href={cvHref}
            download
            variants={{
              hidden: { opacity: 0, y: 18, scale: 0.96, filter: "blur(8px)" },
              show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.9, ease: heroEase }}
            className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-slate-900 dark:text-white"
          >
            {t("tertiaryCta")}
          </motion.a>
          <motion.a
            href="#contact"
            variants={{
              hidden: { opacity: 0, y: 18, scale: 0.96, filter: "blur(8px)" },
              show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.9, ease: heroEase }}
            className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 underline decoration-[var(--accent)] decoration-2 underline-offset-4 dark:text-slate-200"
          >
            {t("secondaryCta")}
          </motion.a>
        </motion.div>

        <div className="mt-10 grid w-full max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Stat value={t("stats.years")} label={t("stats.yearsLabel")} />
          <Stat value={t("stats.projects")} label={t("stats.projectsLabel")} />
          <Stat value={t("stats.stack")} label={t("stats.stackLabel")} />
        </div>

        <motion.a
          href="#story"
          variants={revealUp}
          transition={{ duration: 1.05, ease: heroEase }}
          className="mt-12 inline-flex flex-col items-center gap-3 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            {t("scrollCue")}
          </span>
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [0.45, 1, 0.45] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6 }}
            className="inline-flex h-12 w-8 items-start justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] p-1"
          >
            <span className="h-3 w-1.5 rounded-full bg-[var(--accent)]" />
          </motion.span>
        </motion.a>
      </motion.div>
    </motion.section>
  );
}
