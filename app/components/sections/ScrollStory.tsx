"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

const STEP_BREAKS = [0.34, 0.68];

export default function ScrollStory() {
  const t = useTranslations("story");
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.2,
  });
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value < STEP_BREAKS[0]) {
      setActiveStep(0);
      return;
    }
    if (value < STEP_BREAKS[1]) {
      setActiveStep(1);
      return;
    }
    setActiveStep(2);
  });

  const shellY = useTransform(progress, [0, 1], [42, -30]);
  const shellRotate = useTransform(progress, [0, 1], [-2, 1.2]);
  const progressWidth = useTransform(progress, [0, 1], ["10%", "100%"]);

  const wireframeOpacity = useTransform(progress, [0, 0.18, 0.32], [0.2, 0.95, 0.1]);
  const wireframeScale = useTransform(progress, [0, 0.3], [0.94, 1]);

  const introOpacity = useTransform(progress, [0.08, 0.2, 0.34], [0, 1, 0]);
  const introY = useTransform(progress, [0.08, 0.2, 0.34], [30, 0, -28]);

  const profileOpacity = useTransform(progress, [0.24, 0.42, 0.58], [0, 1, 0.4]);
  const profileY = useTransform(progress, [0.24, 0.42, 0.58], [34, 0, -20]);

  const projectOpacity = useTransform(progress, [0.5, 0.66, 0.82], [0, 0.92, 0.5]);
  const projectY = useTransform(progress, [0.5, 0.66, 0.82], [42, 0, -12]);
  const projectScale = useTransform(progress, [0.5, 0.66, 0.82], [0.88, 0.96, 0.99]);

  const contactOpacity = useTransform(progress, [0.7, 0.88, 1], [0, 1, 1]);
  const contactY = useTransform(progress, [0.7, 0.88, 1], [32, 0, 0]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative h-[320vh] px-6 py-8 md:px-10"
    >
      <div className="sticky top-20">
        <div className="mx-auto grid min-h-[78vh] max-w-6xl items-center gap-8 rounded-[2rem] border border-[var(--line)] bg-[color:var(--surface)]/92 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.06)] backdrop-blur md:p-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative min-h-[14rem] lg:min-h-[22rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              {t("eyebrow")}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                transition={{ duration: 0.35 }}
                className="mt-5"
              >
                <h2 className="max-w-lg text-[1.9rem] font-extrabold tracking-[-0.05em] text-slate-950 dark:text-white md:text-[2.7rem]">
                  {t(`steps.${activeStep}.title`)}
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-[15px]">
                  {t(`steps.${activeStep}.body`)}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap gap-2">
              {[0, 1, 2].map((step) => (
                <motion.span
                  key={step}
                  animate={{
                    backgroundColor: activeStep === step ? "var(--foreground)" : "rgba(23,23,23,0.06)",
                    color: activeStep === step ? "var(--background)" : "rgb(71 85 105)",
                  }}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold"
                >
                  {t(`steps.${step}.label`)}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.div
            style={{ y: shellY, rotate: shellRotate }}
            className="relative h-[26rem] overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-[#fbf7f1] shadow-[0_18px_60px_rgba(0,0,0,0.08)] md:h-[32rem]"
          >
            <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#db7f5a]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#d4ba72]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#6a8a77]" />
              <div className="ml-3 h-2 w-32 rounded-full bg-black/6" />
            </div>

            <motion.div style={{ width: progressWidth }} className="h-1 bg-[linear-gradient(90deg,var(--accent),#35597a)]" />

            <div className="relative h-[calc(100%-3.25rem)] overflow-hidden p-4 md:p-6">
              <motion.div
                style={{ opacity: wireframeOpacity, scale: wireframeScale }}
                className="absolute inset-4 rounded-[1.4rem] border border-dashed border-[var(--line)] bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:26px_26px] md:inset-6"
              />

              <motion.div
                style={{ opacity: introOpacity, y: introY }}
                className="absolute left-6 top-6 max-w-[17rem] rounded-[1.5rem] border border-[var(--line)] bg-white/88 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  {t("visual.hello")}
                </p>
                <h3 className="mt-3 text-xl font-extrabold tracking-[-0.04em] text-slate-950">
                  {t("visual.welcomeTitle")}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {t("visual.welcomeBody")}
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: profileOpacity, y: profileY }}
                className="absolute left-6 top-8 w-[12rem] rounded-[1.5rem] border border-[var(--line)] bg-white/92 p-4 shadow-[0_18px_44px_rgba(0,0,0,0.08)] md:w-[14rem]"
              >
                <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-[#efe4d4]">
                  <Image src="/sebastien-chatgpt.png" alt="Sébastien Legros" fill className="object-cover opacity-90 mix-blend-multiply" />
                </div>
                <p className="mt-4 text-center text-sm font-bold text-slate-950">Sébastien Legros</p>
                <p className="mt-1 text-center text-xs leading-5 text-slate-600">{t("visual.profileRole")}</p>
              </motion.div>

              <motion.div
                style={{ opacity: profileOpacity, y: profileY }}
                className="absolute right-6 top-8 max-w-[18rem] rounded-[1.5rem] border border-[var(--line)] bg-white/92 p-5 shadow-[0_18px_44px_rgba(0,0,0,0.08)]"
              >
                <div className="h-2.5 w-20 rounded-full bg-[var(--accent)]/30" />
                <div className="mt-4 h-4 w-full rounded-full bg-black/7" />
                <div className="mt-3 h-4 w-[82%] rounded-full bg-black/7" />
                <div className="mt-3 h-4 w-[65%] rounded-full bg-black/7" />
                <div className="mt-5 flex flex-wrap gap-2">
                  {["React", "Go", "PostgreSQL"].map((item) => (
                    <span key={item} className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] font-medium text-slate-700">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                style={{ opacity: projectOpacity, y: projectY, scale: projectScale }}
                className="absolute inset-x-10 bottom-24 rounded-[1.45rem] border border-[var(--line)] bg-white/92 p-3 shadow-[0_18px_42px_rgba(0,0,0,0.07)] md:inset-x-16 md:bottom-24 md:p-4"
              >
                <div className="grid items-center gap-3 md:grid-cols-[0.88fr_1.12fr]">
                  <div className="relative overflow-hidden rounded-[1rem] bg-[#efe4d4]">
                    <Image
                      src="/projects/econnect.webp"
                      alt="Projet eConnect"
                      width={900}
                      height={620}
                      className="h-36 w-full object-cover md:h-40"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                      {t("visual.caseStudy")}
                    </p>
                    <h3 className="mt-2 text-lg font-extrabold tracking-[-0.04em] text-slate-950">
                      {t("visual.caseTitle")}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-slate-600 md:text-sm">
                      {t("visual.caseBody")}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{ opacity: contactOpacity, y: contactY }}
                className="absolute inset-x-6 bottom-6 flex flex-wrap items-center justify-between gap-3 rounded-[1.2rem] border border-[var(--line)] bg-[var(--foreground)] px-4 py-3 text-white shadow-[0_16px_38px_rgba(0,0,0,0.14)]"
              >
                <span className="text-sm font-semibold">{t("visual.finalCta")}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
                  slegros9@gmail.com
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
