"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

function Stat({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.92, rotateX: 10, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.55 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] px-4 py-4 text-left shadow-[0_14px_34px_rgba(0,0,0,0.05)]"
    >
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 0.9, delay: 0.08 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-4 top-0 h-px origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--accent)]/35 to-transparent"
      />
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
  const [heroVisible, setHeroVisible] = useState(false);
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
  const panelReveal = {
    hidden: { opacity: 0, y: 22, scale: 0.98, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
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

  useEffect(() => {
    if (!introReady) {
      setHeroVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setHeroVisible(true);
    }, 520);

    return () => window.clearTimeout(timer);
  }, [introReady]);

  return (
    <motion.section
      id="hero"
      className="relative overflow-hidden px-6 pb-12 pt-10 md:px-10 md:pb-16 md:pt-20"
      initial={{ opacity: 0 }}
      animate={heroVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.15, ease: heroEase }}
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_15%,rgba(181,93,50,0.16),transparent_26%),radial-gradient(circle_at_20%_20%,rgba(53,89,122,0.1),transparent_18%),linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_40%)]" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={heroVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.18, ease: heroEase }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[10rem] h-px w-[min(74vw,42rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-900/12 to-transparent dark:via-white/12" />
        <div className="absolute left-1/2 top-[10rem] h-[18rem] w-px -translate-x-1/2 bg-gradient-to-b from-[var(--accent)]/30 via-slate-900/8 to-transparent dark:via-white/12" />
      </motion.div>
      <motion.div
        initial="hidden"
        animate={heroVisible ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: {
            transition: {
              delayChildren: 0.06,
              staggerChildren: 0.22,
            },
          },
        }}
        className="mx-auto flex min-h-[calc(100svh-7rem)] max-w-5xl flex-col items-center justify-center text-center"
      >
        <WelcomeSignature text={t("welcome")} ready={heroVisible} />

        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.9, filter: "blur(18px)" }}
          animate={heroVisible ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, y: 44, scale: 0.9, filter: "blur(18px)" }}
          transition={{ duration: 1.45, delay: 0.34, ease: heroEase }}
          className="relative mt-10 flex items-center justify-center"
        >
          <div className="relative h-[17.5rem] w-[17.5rem] md:h-[22.5rem] md:w-[22.5rem]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.3, delay: 0.38, ease: heroEase }}
              className="absolute inset-[2%] rounded-full border border-slate-900/8 dark:border-white/10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.72, rotate: -22 }}
              animate={heroVisible ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.72, rotate: -22 }}
              transition={{ duration: 1.5, delay: 0.36, ease: heroEase }}
              className="absolute inset-[7%] rounded-full border-[14px] border-[var(--accent)] md:border-[16px]"
            />
            <motion.div
              initial={{ opacity: 0, x: -18, y: 18 }}
              animate={heroVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -18, y: 18 }}
              transition={{ duration: 1.05, delay: 0.58, ease: heroEase }}
              className="absolute left-[7%] top-[18%] h-10 w-10 rounded-tl-[1.2rem] border-l-2 border-t-2 border-[var(--accent)]/60"
            />
            <motion.div
              initial={{ opacity: 0, x: 18, y: -18 }}
              animate={heroVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 18, y: -18 }}
              transition={{ duration: 1.05, delay: 0.7, ease: heroEase }}
              className="absolute bottom-[18%] right-[7%] h-10 w-10 rounded-br-[1.2rem] border-b-2 border-r-2 border-slate-900/18 dark:border-white/22"
            />
            <div className="absolute inset-[12%] overflow-hidden rounded-full">
              <motion.div
                initial={{ opacity: 0, scale: 1.18, filter: "blur(18px)" }}
                animate={heroVisible ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 1.18, filter: "blur(18px)" }}
                transition={{ duration: 1.55, delay: 0.48, ease: heroEase }}
                className="h-full w-full"
              >
                <Image
                  src="/sebastien.png"
                  alt="Sébastien Legros"
                  fill
                  priority
                  className="object-cover object-center opacity-[0.98] drop-shadow-[0_22px_50px_rgba(15,23,42,0.14)]"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.h1
          className="font-display mt-8 max-w-3xl text-[1.72rem] font-extrabold tracking-[-0.07em] text-slate-950 dark:text-white sm:text-[2.3rem] md:text-[3rem]"
        >
          <div className="overflow-hidden">
            <motion.span
              variants={lineReveal}
              transition={{ duration: 1.65, delay: 0.66, ease: heroEase }}
              className="block will-change-transform"
            >
              {t("name")}
            </motion.span>
          </div>
          <div className="mt-2 overflow-hidden">
            <motion.span
              variants={lineReveal}
              transition={{ duration: 1.75, delay: 0.86, ease: heroEase }}
              className="block text-[var(--accent)] will-change-transform"
            >
              {t("role")}
            </motion.span>
          </div>
        </motion.h1>

        <motion.div
          variants={panelReveal}
          transition={{ duration: 1.35, delay: 1.12, ease: heroEase }}
          className="mt-5 max-w-lg"
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={heroVisible ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.85, delay: 1.2, ease: heroEase }}
            className="mx-auto mb-3 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          />
          <p className="text-[12px] leading-6 tracking-[-0.015em] text-slate-700 dark:text-slate-300 sm:text-[13px]">
            {t("summary")}
          </p>
        </motion.div>

        {heroVisible && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            <motion.a
              href="#projects"
              initial={{ opacity: 0, y: 24, scale: 0.95, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.85 }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 1.05, delay: 0.02, ease: heroEase }}
              className="group relative overflow-hidden rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,0,0,0.16)] dark:bg-white dark:text-slate-950"
            >
              <motion.span
                initial={{ x: "-120%", opacity: 0 }}
                whileInView={{ x: "140%", opacity: [0, 0.55, 0] }}
                viewport={{ once: true, amount: 0.85 }}
                transition={{ duration: 1.05, delay: 0.18, ease: heroEase }}
                className="pointer-events-none absolute inset-y-0 left-0 w-14 rotate-12 bg-white/25 blur-md dark:bg-slate-950/10"
              />
              <span className="relative">{t("primaryCta")}</span>
            </motion.a>
            <motion.a
              href={cvHref}
              download
              initial={{ opacity: 0, y: 24, scale: 0.95, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.85 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 1.05, delay: 0.12, ease: heroEase }}
              className="group relative overflow-hidden rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.85 }}
                transition={{ duration: 0.9, delay: 0.28, ease: heroEase }}
                className="absolute inset-x-3 bottom-0 h-px origin-left bg-gradient-to-r from-[var(--accent)] to-transparent"
              />
              <span className="relative">{t("tertiaryCta")}</span>
            </motion.a>
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 24, scale: 0.95, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.85 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 1.05, delay: 0.22, ease: heroEase }}
              className="group relative overflow-hidden rounded-full px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              <span className="relative">{t("secondaryCta")}</span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.85 }}
                transition={{ duration: 0.85, delay: 0.36, ease: heroEase }}
                className="absolute inset-x-3 bottom-1 h-[2px] origin-left rounded-full bg-[var(--accent)]"
              />
            </motion.a>
          </div>
        )}

        <div className="mt-10 grid w-full max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {heroVisible && (
            <>
              <Stat value={t("stats.years")} label={t("stats.yearsLabel")} index={0} />
              <Stat value={t("stats.projects")} label={t("stats.projectsLabel")} index={1} />
              <Stat value={t("stats.stack")} label={t("stats.stackLabel")} index={2} />
            </>
          )}
        </div>

        <motion.a
          href="#aboutme"
          variants={revealUp}
          transition={{ duration: 1.1, delay: 1.96, ease: heroEase }}
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
