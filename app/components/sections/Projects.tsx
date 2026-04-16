"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type FeaturedProject = {
  key: "econnect" | "begaiement" | "qrwin" | "happiz";
  imageSrc: string;
  stack: string[];
};

type ArchiveProject = {
  key: "leon" | "raoul" | "psg" | "fidelatoo" | "handimobi" | "ladar";
};

const featuredProjects: FeaturedProject[] = [
  {
    key: "econnect",
    imageSrc: "/projects/econnect.webp",
    stack: ["React", "Go", "GraphQL", "PostgreSQL", "Docker", "CI/CD"],
  },
  {
    key: "begaiement",
    imageSrc: "/projects/begaiement.png",
    stack: ["React", "Go", "REST", "PostgreSQL", "Analytics", "Stripe"],
  },
  {
    key: "qrwin",
    imageSrc: "/projects/qrwin.png",
    stack: ["React", "Go", "REST", "Stripe", "Wallet", "Back-office"],
  },
  {
    key: "happiz",
    imageSrc: "/projects/happiz.svg",
    stack: ["React", "Go", "GraphQL", "Mobile backend", "Firebase", "Admin"],
  },
];

const archiveProjects: ArchiveProject[] = [
  { key: "leon" },
  { key: "raoul" },
  { key: "psg" },
  { key: "fidelatoo" },
  { key: "handimobi" },
  { key: "ladar" },
];

export default function Projects() {
  const t = useTranslations("projects");
  const [expandedProject, setExpandedProject] = useState<string | null>(featuredProjects[0].key);

  return (
    <section id="projects" className="px-6 py-16 md:px-10 md:py-20" aria-labelledby="projects-title">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            {t("portfolio")}
          </p>
          <h2
            id="projects-title"
            className="mt-4 text-[1.9rem] font-extrabold tracking-[-0.04em] text-slate-950 dark:text-white md:text-[2.5rem]"
          >
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-[15px]">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mt-10 space-y-6">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.key}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              className="grid gap-5 rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_20px_55px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_28px_70px_rgba(0,0,0,0.08)] md:grid-cols-[0.92fr_1.08fr] md:p-6"
            >
              <div className="group relative overflow-hidden rounded-[1.5rem] bg-[var(--surface-strong)]">
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/18 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Image
                  src={project.imageSrc}
                  alt={t(`items.${project.key}.title`)}
                  width={900}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white md:text-[1.75rem]">
                    {t(`items.${project.key}.title`)}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    {t(`items.${project.key}.summary`)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setExpandedProject((current) => (current === project.key ? null : project.key))
                    }
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-[var(--accent)] dark:text-white"
                    aria-expanded={expandedProject === project.key}
                  >
                    {expandedProject === project.key ? t("hideDetails") : t("showDetails")}
                    <motion.span animate={{ rotate: expandedProject === project.key ? 45 : 0 }}>
                      +
                    </motion.span>
                  </button>

                  <motion.dl
                    initial={false}
                    animate={{
                      height: expandedProject === project.key ? "auto" : 0,
                      opacity: expandedProject === project.key ? 1 : 0,
                    }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 space-y-4 border-t border-[var(--line)] pt-5">
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                          {t("roleLabel")}
                        </dt>
                        <dd className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                          {t(`items.${project.key}.role`)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                          {t("impactLabel")}
                        </dt>
                        <dd className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                          {t(`items.${project.key}.impact`)}
                        </dd>
                      </div>
                    </div>
                  </motion.dl>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mt-10 rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:p-6"
        >
          <h3 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            {t("archiveTitle")}
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {archiveProjects.map((project) => (
              <article
                key={project.key}
                className="rounded-[1.5rem] border border-[var(--line)] bg-transparent p-5"
              >
                <h4 className="text-lg font-semibold text-slate-950 dark:text-white">
                  {t(`items.${project.key}.title`)}
                </h4>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {t(`items.${project.key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
