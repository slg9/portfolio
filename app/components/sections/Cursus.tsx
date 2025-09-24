"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";
import timelineAnimation from "@/public/lotties/timeline.json";
import Lottie from "lottie-react";

type Step = {
  year: string;
  title: string;
  subtitle?: string;
  tags?: string[];
};

function TimelineItem({
  year,
  title,
  subtitle,
  tags,
  index,
}: Step & { index: number }) {
  // petit décalage progressif pour le reveal
  const delay = useMemo(() => 0.4 * index, [index]);

  return (
    <motion.div
      className="relative pl-10 pb-6 last:pb-0"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 30, delay }}
      viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
    >
      {/* Pastille (point) */}
      <motion.span
        className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-indigo-500 dark:border-white bg-white dark:bg-transparent text-xs font-bold shadow-sm"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        •
      </motion.span>

      {/* Contenu */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-gray-900 dark:text-slate-400">
          {year} : {title}
        </h3>
        {subtitle && <p className="text-xs text-gray-600 dark:text-slate-300">{subtitle}</p>}
        {tags && (
          <ul className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-transparent px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-400 shadow-sm border border-slate-200/60 hover:shadow-md hover:-translate-y-0.5 transition"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-sky-400 text-xs" />
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Lottie à droite (nouvel élément, animation cohérente et discrète) */}

    </motion.div>
  );
}

export default function Cursus() {
  const parcours: Step[] = [
    { year: "2010 - 2012", title: "DUT Réseaux & Télécommunications" },
    {
      year: "2012 - 2015",
      title: "Diplôme d’ingénieur Informatique & Télécommunications (MASTER)",
    },
    {
      year: "2016 – 2017",
      title: "Ingénieur d’études — IRD",
      subtitle: "Création d’outils (applications web et mobiles) destinés à la collecte et à l’affichage de données dans le cadre d’un projet de recherche.",
      tags: ["MongoDB","Express","React","Nodejs", "Domotique", "Java Android"],
    },
    {
      year: "2017 – 2021",
      title: "Administrateur Systèmes & Réseaux — Région Réunion",
      subtitle: "Gestion d’infrastructure et sécurité",
      tags: ["Unix", "Windows Server", "Switch config", "Infra réseaux"],
    },
    {
      year: "2021 – 2022",
      title: "Développeur Web — Squirrel",
      subtitle: "Création d’interfaces réactives avec React, intégration d’API REST pour la gestion des données, et design system avec Material UI / Bootstrap",
      tags: ["React", "Bootstrap", "Material UI", "Docker"],
    },
    {
      year: "2022 – 2025",
      title: "Ingénieur Logiciel / Lead Dev Web — Squirrel",
      subtitle: "Responsabilité du lead technique et développement full-stack : conception d’architectures évolutives, implémentation front-end (React) et back-end (Golang/Node.js), conception et intégration d’API GraphQL/REST, modélisation des données et mise en place de pipelines CI/CD",
      tags: ["React", "Golang", "PostgreSQL","MongoDB","nodejs","Apollo GraphQL", "Docker", "CI/CD", "Data modeling"],
    },
  ];




  return (
    <section id="cursus" className=" w-full bg-white dark:bg-transparent px-6 py-20 md:snap-start md:snap-always  ">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.header
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.2 }}
          viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">Parcours</p>
          <h2 className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-slate-400 md:text-4xl">
            Mon Cursus & Expérience
          </h2>
        </motion.header>

        {/* Timeline container */}
        <div className="flex flex-col md:flex-row gap-12 items-center max-w-5xl">
          <div className="relative max-w-[700px]">
            {/* Ligne verticale animée (se “dessine”) */}
            <motion.span
              aria-hidden
              className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 origin-top will-change-transform"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 2, ease: "easeOut", damping: 30, delay: 0.5 }}
              viewport={{ once: true, amount: 0.25, margin: "-10% 0px -10% 0px" }}
            />

            {/* Items */}
            {parcours.map((step, i) => (
              <TimelineItem key={i} index={i} {...step} />
            ))}
          </div>
          <motion.aside
            className="flex-1 w-full max-w-[520px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            aria-hidden="true"
          >
            <Lottie
              animationData={timelineAnimation}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
              className="drop-shadow-sm"
            />
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
