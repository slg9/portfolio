"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const groups = [
  {
    key: "frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Material UI", "Framer Motion"],
  },
  {
    key: "backend",
    items: ["Go", "Node.js", "GraphQL", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    key: "ops",
    items: ["Docker", "CI/CD", "GitHub Actions", "Data modeling", "Monitoring", "Production delivery"],
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
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
              transition={{ duration: 0.55, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]"
            >
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
                    whileHover={{ y: -2 }}
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
