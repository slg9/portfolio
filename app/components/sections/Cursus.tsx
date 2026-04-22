"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Step = {
  year: string;
  title: string;
  subtitle?: string;
};

function TimelineItem({
  year,
  title,
  subtitle,
  index,
}: Step & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24, y: 18, scale: 0.98, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      whileHover={{ y: -4, x: 2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      className="relative pl-12"
    >
      <motion.span
        whileInView={{ scale: [0.75, 1.08, 1] }}
        transition={{ duration: 0.55, delay: index * 0.1 + 0.12, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-xs font-bold text-[var(--accent)]"
      >
        •
      </motion.span>
      <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] px-5 py-5 shadow-[0_18px_46px_rgba(0,0,0,0.05)]">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.85, delay: index * 0.1 + 0.14, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="absolute inset-x-5 top-0 h-px origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--accent)]/35 to-transparent"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{year}</p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950 dark:text-white">{title}</h3>
        {subtitle && <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{subtitle}</p>}
      </div>
    </motion.div>
  );
}

export default function Cursus() {
  const t = useTranslations("experience");

  const parcours: Step[] = [
    { year: "2026 – aujourd’hui", title: t("items.willow.title"), subtitle: t("items.willow.description") },
    { year: "2022 – 2025", title: t("items.squirrel_lead.title"), subtitle: t("items.squirrel_lead.description") },
    { year: "2021 – 2022", title: t("items.squirrel_dev.title"), subtitle: t("items.squirrel_dev.description") },
    { year: "2017 – 2021", title: t("items.region.title"), subtitle: t("items.region.description") },
    { year: "2016 – 2017", title: t("items.ird.title"), subtitle: t("items.ird.description") },
    { year: "2012 - 2015", title: t("items.master.title") },
    { year: "2010 - 2012", title: t("items.dut.title") },
  ];

  return (
    <motion.section
      id="cursus"
      className="px-6 py-16 md:px-10 md:py-20"
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            {t("title")}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-slate-950 dark:text-white md:text-4xl">
            {t("subtitle")}
          </h2>
        </motion.div>

        <div className="relative mt-8 space-y-8">
          <motion.span
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            className="absolute bottom-0 left-[13px] top-0 w-px origin-top bg-[var(--line)]"
            aria-hidden
          />
          {parcours.map((step, index) => (
            <TimelineItem key={step.year + step.title} index={index} {...step} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
