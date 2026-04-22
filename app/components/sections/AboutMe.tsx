"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

function Pillar({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26, scale: 0.97, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.75, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      className="relative overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.06)]"
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.12 * index, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        className="absolute inset-x-6 top-0 h-px origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--accent)]/40 to-transparent"
      />
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
        0{index + 1}
      </span>
      <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950 dark:text-white">
        {title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
    </motion.article>
  );
}

export default function AboutMe() {
  const t = useTranslations("about");
  const pathname = usePathname();
  const cvHref = pathname.startsWith("/en")
    ? "/docs/Sebastien_Legros_CV_EN.pdf"
    : "/docs/Sebastien_Legros_CV_FR.pdf";

  return (
    <section id="aboutme" className="px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {t("title")}
            </p>
            <h2 className="mt-4 max-w-lg text-[1.85rem] font-extrabold tracking-[-0.04em] text-slate-950 dark:text-white md:text-[2.4rem]">
              {t("subtitle")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:p-8"
          >
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="absolute inset-x-8 top-0 h-px origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--accent)]/40 to-transparent"
            />
            <p className="max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-[15px]">{t("body")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -2, scale: 1.01 }}
                className="relative overflow-hidden rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"
              >
                {t("contactMe")}
              </motion.a>
              <motion.a
                href={cvHref}
                download
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="relative overflow-hidden rounded-full border border-[var(--line)] px-6 py-3 text-sm font-semibold text-slate-900 dark:text-white"
              >
                {t("downloadCV")}
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["build", "scale", "ship"].map((item, index) => (
            <Pillar
              key={item}
              index={index}
              title={t(`pillars.${item}.title`)}
              description={t(`pillars.${item}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
