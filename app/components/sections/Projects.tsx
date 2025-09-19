"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo } from "react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  imageSrc: string;
  liveUrl?: string;
  codeUrl?: string;
};

const PROJECTS: Project[] = [
  {
    title: "eConnect CRM",
    description:
      "CRM complet : gestion de prospects, campagnes emails, partenaires, sites en marque blanche, envois automatisés selon l’avancement des dossiers, eDoc. Projet full-stack (Go GraphQL, React, REST tiers). Modélisation, chiffrage, mise en œuvre.",
    tags: ["React", "Golang", "API GraphQL", "PostgreSQL", "eDoc", "CRM", "Docker", "CI/CD", "Agile", "Data Modeling"],
    imageSrc: "/projects/econnect.png",
  },
  {
    title: "Orthophoniste (Plateforme Ortho)",
    description:
      "Catalogue de podcasts pro, relation patient (objectifs/prescriptions), stats. Web app React, API REST Go, PostgreSQL.",
    tags: ["React", "Golang", "API REST", "PostgreSQL", "Google Analytics", "Stripe", "Docker", "CI/CD", "Data Modeling"],
    //imageSrc: "/projects/orthophonosite.jpg",
    imageSrc: "/projects/econnect.png",
  },
  {
    title: "QR Win – Back Office & APIs",
    description:
      "BO pour stores/enseignes, abonnements Stripe, stats, gestion users. QR codes pour mini-jeux, gains, wallet virtuel. APIs mobiles en Go (REST).",
    tags: ["React", "Golang", "API GraphQL", "PostgreSQL", "Stripe", "Wallet", "Admin BO", "Games", "Docker", "CI/CD", "Data Modeling"],
    //imageSrc: "/projects/qrwin.jpg",
    imageSrc: "/projects/econnect.png",
  },
  {
    title: "Happiz – Backend & Back Office",
    description:
      "Backend GraphQL pour app mobile de podcasts d’hypnose + Back office d’admin (contenus, users).",
    tags: ["React", "Golang", "API GraphQL", "PostgreSQL", "Admin BO", "Mobile backend", "Achat In App", "Firebase", "Docker", "CI/CD"],
    //imageSrc: "/projects/happiz.jpg",
    imageSrc: "/projects/econnect.png",
  },
  {
    title: "Léon – App Podcast guidée",
    description:
      "App de podcasts type guide touristique. Design modèle, APIs, i18n v2, pipeline contenu.",
    tags: ["Golang", "API GraphQL", "PostgreSQL", "i18n", "Achat In App", "Firebase", "Docker", "CI/CD"],
    //imageSrc: "/projects/leon.jpg",
    imageSrc: "/projects/econnect.png",
  },
  {
    title: "Raul – Paiements MangoPay",
    description:
      "Appli web pour gérer des paiements via MangoPay (flux, KYC/Wallets, conciliations).",
    tags: ["React", "Golang", "API REST", "MangoPay", "PostgreSQL", "Payments", "Docker", "CI/CD"],
    //imageSrc: "/projects/raul.jpg",
    imageSrc: "/projects/econnect.png",
  },
  {
    title: "PSG – Back Office Campagnes VIP",
    description:
      "BO pour campagnes SMS et préférences alimentaires des VIP invités aux matchs.",
    tags: ["React", "Golang", "API GraphQL", "Admin BO", "SMS Campaigns", "PostgreSQL", "Data Modeling", "Docker", "CI/CD"],
    //imageSrc: "/projects/psg.jpg",
    imageSrc: "/projects/econnect.png",
  },
  {
    title: "Fidelatoo",
    description:
      "App mobile de fidélité – écriture et optimisation de requêtes SQL.",
    tags: ["Golang", "API GraphQL", "PostgreSQL"],
    //imageSrc: "/projects/fidelatoo.jpg",
    imageSrc: "/projects/econnect.png",
  },
  {
    title: "Handimob",
    description:
      "PFE : app Android pour localiser les lieux accessibles PMR + commentaires.",
    tags: ["CakePHP", "Java Android", "MySQL"],
    //imageSrc: "/projects/handimob.jpg",
    imageSrc: "/projects/econnect.png",
  },
  {
    title: "Radar",
    description:
      "Stage : app Android de mise en relation selon centres d’intérêt et géoloc.",
    tags: ["Kohana", "PHP", "Java Android", "MySQL"],
    //imageSrc: "/projects/radar.jpg",
    imageSrc: "/projects/econnect.png",
  },
];

/* ---------- Icons ---------- */
function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="-mt-0.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17l10-10M7 7h10v10" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Card ---------- */
function ProjectCard({
  title,
  description,
  tags,
  imageSrc,
  liveUrl,
  codeUrl,
  index = 0,
}: Project & { index?: number }) {
  // Décalage progressif par index (stagger)
  const revealDelay = useMemo(() => 0.08 * index, [index]);

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm
                 transition-all duration-300"
      // Scroll reveal
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 14, delay: revealDelay }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      // Hover moderne : lift + scale + light tilt
      whileHover={{ y: -6, scale: 1.015, rotateX: 1.2, rotateY: -1.2 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Halo/Glow subtil au hover via pseudo-radial */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
        style={{ background: "radial-gradient(600px circle at 0% 0%, rgba(255,0,64,.25), transparent 40%)" }}
      />

      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={`${title} cover`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-5">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-600">{description}</p>

        {/* Tags */}
        <ul className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
              {t}
            </li>
          ))}
        </ul>

        {/* Actions */}
        {(liveUrl || codeUrl) && (
          <div className="mt-2 flex items-center gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/30"
                aria-label={`Visit ${title} live`}
              >
                <ExternalLinkIcon />
                Live
              </a>
            )}
            {codeUrl && (
              <a
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                aria-label={`Open ${title} source code`}
              >
                <CodeIcon />
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* ---------- Section ---------- */
export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 w-full bg-white px-6 py-20" aria-labelledby="projects-title">
      <div className="mx-auto max-w-6xl">
        {/* Header reveal */}
        <motion.header
          className="mb-10 flex flex-col items-center text-center md:mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
          viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-red-500">Portfolio</p>
          <h2 id="projects-title" className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Selected Projects
          </h2>
          <p className="mt-3 max-w-2xl text-gray-600">
            A blend of backend robustness and frontend polish. Here are a few highlights.
          </p>
        </motion.header>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
