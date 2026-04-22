"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const groups = [
  {
    key: "web",
    items: ["React", "Blazor"],
  },
  {
    key: "api",
    items: ["Golang", "PostgreSQL", "SQL Server"],
  },
  {
    key: "software",
    items: ["C#", "XPO/XAF", "DevExpress", "WPF", "WinForms"],
  },
];

export default function Techno() {
  const t = useTranslations("technologies");

  return (
    <motion.section
      id="techno"
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
          transition={{ duration: 0.55, delay: 0.04 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            {t("title")}
          </p>
          <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {groups.map((group, index) => (
            <motion.article
              key={group.key}
              initial={{ opacity: 0, y: 30, scale: 0.96, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              className="relative overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]"
            >
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.12 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                className="absolute inset-x-6 top-0 h-px origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--accent)]/35 to-transparent"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                0{index + 1}
              </p>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                {t(`groups.${group.key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {t(`groups.${group.key}.description`)}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.45, delay: 0.16 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                    className="rounded-full border border-[var(--line)] px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
