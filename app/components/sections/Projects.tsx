"use client";
import Image from "next/image";
import { createPortal } from "react-dom";
import { animate, motion, MotionValue, useMotionValue, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

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
    imageSrc: "/projects/econnect.webp",
  },
  {
    title: "Begaiement (Plateforme Ortho)",
    description:
      "Catalogue de podcasts pro, relation patient (objectifs/prescriptions), stats. Web app React, API REST Go, PostgreSQL.",
    tags: ["React", "Golang", "API REST", "PostgreSQL", "Google Analytics", "Stripe", "Docker", "CI/CD", "Data Modeling"],
    //imageSrc: "/projects/orthophonosite.jpg",
    imageSrc: "/projects/begaiement.png",
  },
  {
    title: "QR Win – Back Office & APIs",
    description:
      "BO pour stores/enseignes, abonnements Stripe, stats, gestion users. QR codes pour mini-jeux, gains, wallet virtuel. APIs mobiles en Go (REST).",
    tags: ["React", "Golang", "API GraphQL", "PostgreSQL", "Stripe", "Wallet", "Admin BO", "Games", "Docker", "CI/CD", "Data Modeling"],
    //imageSrc: "/projects/qrwin.jpg",
    imageSrc: "/projects/qrwin.png",
  },
  {
    title: "Happiz – Backend & Back Office",
    description:
      "Backend GraphQL pour app mobile de podcasts d’hypnose + Back office d’admin (contenus, users).",
    tags: ["React", "Golang", "API GraphQL", "PostgreSQL", "Admin BO", "Mobile backend", "Achat In App", "Firebase", "Docker", "CI/CD"],
    //imageSrc: "/projects/happiz.jpg",
    imageSrc: "/projects/happiz.svg",
  },
  {
    title: "Léon – App Podcast guidée",
    description:
      "App de podcasts type guide touristique. Design modèle, APIs, i18n v2, pipeline contenu.",
    tags: ["Golang", "API GraphQL", "PostgreSQL", "i18n", "Achat In App", "Firebase", "Docker", "CI/CD"],
    //imageSrc: "/projects/leon.jpg",
    imageSrc: "/projects/leon.png",
  },
  {
    title: "Raoul – Paiements MangoPay",
    description:
      "Appli web pour gérer des paiements via MangoPay (flux, KYC/Wallets, conciliations).",
    tags: ["React", "Golang", "API REST", "MangoPay", "PostgreSQL", "Payments", "Docker", "CI/CD"],
    //imageSrc: "/projects/raul.jpg",
    imageSrc: "/projects/raoul.png",
  },
  {
    title: "PSG – Back Office Campagnes VIP",
    description:
      "BO pour campagnes SMS et préférences alimentaires des VIP invités aux matchs.",
    tags: ["React", "Golang", "API GraphQL", "Admin BO", "SMS Campaigns", "PostgreSQL", "Data Modeling", "Docker", "CI/CD"],
    //imageSrc: "/projects/psg.jpg",
    imageSrc: "/projects/psg.png",
  },
  {
    title: "Fidelatoo",
    description:
      "App mobile de fidélité – écriture et optimisation de requêtes SQL.",
    tags: ["Golang", "API GraphQL", "PostgreSQL"],
    //imageSrc: "/projects/fidelatoo.jpg",
    imageSrc: "/projects/fidelatoo.png",
  },
  {
    title: "Handimobi",
    description:
      "PFE : app Android pour localiser les lieux accessibles PMR + commentaires.",
    tags: ["CakePHP", "Java Android", "MySQL"],
    //imageSrc: "/projects/handimob.jpg",
    imageSrc: "/projects/handimobi.png",
  },
  {
    title: "Ladar",
    description:
      "Stage : app Android de mise en relation selon centres d’intérêt et géoloc.",
    tags: ["Kohana", "PHP", "Java Android", "MySQL"],
    //imageSrc: "/projects/radar.jpg",
    imageSrc: "/projects/ladar.png",
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
  const revealDelay = useMemo(() => 0.1 * (index % 3) + 0.1, [index]);
  const [open, setOpen] = useState(false);

  // id commun pour l’anim “shared element” (optionnelle)
  const imgLayoutId = useMemo(
    () => `project-image-${title.replace(/\s+/g, "-").toLowerCase()}`,
    [title]
  );

  return (
    <>
      <motion.article
        className="group relative my-5 overflow-hidden rounded-3xl ring-1 ring-slate-200/60 dark:ring-slate-400 bg-white/60 dark:bg-transparent backdrop-blur-sm shadow-[0_1px_0_0_rgba(0,0,0,0.04)] shrink-0 w-[72vw] sm:w-[300px] md:w-[340px]"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 14, delay: revealDelay }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        whileHover={{ y: -4, scale: 1.015, rotateX: 0.4, rotateY: -0.4 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Accent glow plus discret */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-15"
          style={{ background: "radial-gradient(520px circle at 10% 0%, rgba(59,130,246,.25), transparent 45%)" }}
        />

        {/* Cover image */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative aspect-[16/9] w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40"
          aria-label={`Agrandir ${title}`}
        >
          <motion.div layoutId={imgLayoutId} className="relative h-full w-full">
            <Image
              src={imageSrc}
              alt={`${title} cover`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 72vw, (max-width: 768px) 300px, 340px"
              priority={false}
            />
          </motion.div>
          {/* Film subtle pour la lisibilité au hover */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>

        {/* Content */}
        <div className="flex flex-col gap-4 p-5">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-300 line-clamp-2">
            {title}
          </h3>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-200 line-clamp-3">
            {description}
          </p>

          {/* Tags modernisés */}
          <ul className="mt-1 flex flex-wrap gap-2">
            {tags.map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-transparent px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-400 shadow-sm ring-1 ring-slate-200/60 hover:shadow-md hover:-translate-y-0.5 transition"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-sky-400" />
                {t}
              </li>
            ))}
          </ul>

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

        {/* Hairline intérieur pour le “finish” */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/60" />
      </motion.article>


      {/* Modal / Lightbox */}
      <Lightbox
        open={open}
        onClose={() => setOpen(false)}
        src={imageSrc}
        alt={`${title} cover large`}
        layoutId={imgLayoutId}     // marche encore mieux si tu utilises <LayoutGroup> autour de la grille
        title={title}
        liveUrl={liveUrl}
        codeUrl={codeUrl}
      />
    </>
  );
}

function Lightbox({
  open, onClose, src, alt, layoutId, title, liveUrl, codeUrl,
}: {
  open: boolean; onClose: () => void; src: string; alt: string;
  layoutId?: string; title?: string; liveUrl?: string | null; codeUrl?: string | null;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[100]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
        <motion.figure
          role="dialog" aria-modal="true" aria-label={alt}
          className="absolute inset-0 flex items-center justify-center p-4 md:p-6"
          initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div layoutId={layoutId} className="relative w-full max-w-5xl aspect-[16/9] overflow-hidden rounded-2xl bg-black shadow-2xl">
            <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" priority />
            <button onClick={onClose} aria-label="Fermer" className="absolute right-3 top-3 inline-grid h-9 w-9 place-items-center rounded-full bg-white/90 text-gray-900 shadow hover:bg-white">✕</button>
            {(title || liveUrl || codeUrl) && (
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 pb-4 pt-12 text-white">
                <span className="text-sm font-medium">{title}</span>
                <span className="flex gap-2">
                  {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow hover:bg-white">Live</a>}
                  {codeUrl && <a href={codeUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow hover:bg-white">Code</a>}
                </span>
              </figcaption>
            )}
          </motion.div>
        </motion.figure>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* ---------- Section ---------- */
export default function Projects() {
  const ref = useRef(null)
  const { scrollXProgress } = useScroll({ container: ref })
  const maskImage = useScrollOverflowMask(scrollXProgress)


  function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
    const left = `0%`
    const right = `100%`
    const leftInset = `20%`
    const rightInset = `80%`
    const transparent = `#0000`
    const opaque = `#000`
    const maskImage = useMotionValue(
      `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
    )

    useMotionValueEvent(scrollXProgress, "change", (value) => {
      if (value === 0) {
        animate(
          maskImage,
          `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
        )
      } else if (value === 1) {
        animate(
          maskImage,
          `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
        )
      } else if (
        scrollXProgress.getPrevious() === 0 ||
        scrollXProgress.getPrevious() === 1
      ) {
        animate(
          maskImage,
          `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
        )
      }
    })

    return maskImage
  }
  return (
    <section id="projects" className=" w-full bg-white dark:bg-transparent px-6 pt-6  md:h-screen md:snap-start md:snap-always   " aria-labelledby="projects-title">
      <div className="mx-auto max-w-6xl">
        {/* Header reveal */}
        <motion.header
          className="mb-8 flex flex-col items-center text-center md:mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.2 }}
          viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">Portfolio</p>
          <h2 id="projects-title" className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl bg-gradient-to-r from-fuchsia-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
            Quelques Projets
          </h2>
          <p className="mt-3 max-w-2xl text-gray-600 dark:text-slate-400">
            Alliance d’un back-end robuste et d’un front-end soigné. Voici une sélection
          </p>
        </motion.header>


        <motion.div className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory px-4  scrollbar-none" ref={ref} style={{ maskImage }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} {...p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
