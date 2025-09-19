"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

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
  const delay = useMemo(() => 0.06 * index, [index]);

  return (
    <motion.div
      className="relative pl-10 pb-12 last:pb-0"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 14,delay }}
      viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
    >
      {/* Pastille (point) */}
      <motion.span
        className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-red-500 bg-white text-xs font-bold text-red-500 shadow-sm"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        •
      </motion.span>

      {/* Contenu */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {year} — {title}
        </h3>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        {tags && (
          <ul className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export default function Cursus() {
  const parcours: Step[] = [
    { year: "2012", title: "DUT Réseaux & Télécommunications" },
    {
      year: "2015",
      title: "Diplôme d’ingénieur Informatique & Télécommunications (MASTER)",
    },
    {
      year: "2016 – 2017",
      title: "Ingénieur d’études — IRD",
      subtitle: "MERN Stack, domotique, Android (Java)",
      tags: ["MERN Stack", "Domotique", "Java Android"],
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
      subtitle: "Front-end apps",
      tags: ["React", "Bootstrap", "Material UI", "Docker"],
    },
    {
      year: "2022 – 2025",
      title: "Ingénieur Logiciel / Lead Dev Web — Squirrel",
      subtitle: "Full-stack & lead technique",
      tags: ["React", "Golang", "PostgreSQL", "Docker", "CI/CD", "Data modeling"],
    },
  ];

  // Ligne verticale qui se dessine au scroll (scaleY piloté par scrollYProgress)
  const lineRef = useRef<HTMLDivElement | null>(null);

   // 👉 choper le <main> qui scrolle
   const containerRef = useRef<HTMLElement | null>(null);
   useEffect(() => {
     containerRef.current = document.querySelector("#cursus");
   }, []);

  const { scrollYProgress } = useScroll({
    container:containerRef,
    target: lineRef,
    offset: ["start 80%", "end 20%"], // ajustable : début/fin de l’animation
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="cursus" className="scroll-mt-24 w-full bg-gradient-to-b from-white to-gray-50 px-6 py-20  snap-start  ">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.header
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
          viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-red-500">Parcours</p>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Mon Cursus & Expérience
          </h2>
        </motion.header>

        {/* Timeline container */}
        <div ref={lineRef} className="relative">
          {/* Ligne verticale animée (se “dessine”) */}
          <motion.span
            aria-hidden
            className="absolute left-4 top-1 w-0.5 bg-gray-200 will-change-transform"
            style={{ scaleY, transformOrigin: "top"}}
          />

          {/* Items */}
          {parcours.map((step, i) => (
            <TimelineItem key={i} index={i} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
