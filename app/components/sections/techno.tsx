"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

type Skill = {
  name: string;
  level: number; // 0–100
  slug: string;  // nom de fichier dans /public/icons (peut inclure l'extension)
  color?: string;
};

const SKILLS: Skill[] = [
  { name: "React", level: 80, slug: "react.png", color: "#61dafb" },
  { name: "JavaScript", level: 80, slug: "javascript.png", color: "#f7df1e" },
  { name: "TypeScript", level: 70, slug: "typescript.png", color: "#3178c6" },
  { name: "Next.js", level: 60, slug: "next-js.svg", color: "#000000" },
  { name: "HTML/CSS", level: 90, slug: "html-css.svg", color: "#e34f26" },
  { name: "Tailwind CSS", level: 60, slug: "tailwind.png", color: "#38bdf8" },
  { name: "Material UI", level: 60, slug: "material-ui.svg", color: "#007fff" },
  { name: "Bootstrap", level: 70, slug: "bootstrap.png", color: "#7952b3" },
  { name: "Framer motion", level: 60, slug: "framer-motion.svg", color: "#bb4b96" },
  { name: "Golang", level: 70, slug: "golang.svg", color: "#00ADD8" },
  { name: "Apollo", level: 70, slug: "apollographql.svg", color: "#311C87" },
  { name: "Node.js", level: 60, slug: "nodejs.png", color: "#68a063" },
  { name: "PostgreSQL", level: 70, slug: "postgresql.png", color: "#336791" },
  { name: "MongoDB", level: 60, slug: "mongodb.png", color: "#3F9937" },
  { name: "Git", level: 70, slug: "git.svg", color: "#f34f29" },
  { name: "GitHub Actions", level: 60, slug: "githubaction.svg", color: "#2088FF" },
  { name: "Docker", level: 70, slug: "docker.svg", color: "#0db7ed" },
  { name: "Google Cloud Run", level: 60, slug: "google-cloud-run.svg", color: "#4285F4" },
  { name: "CapRover", level: 60, slug: "caprover.png", color: "#26a69a" },
  { name: "PHP", level: 60, slug: "php.png", color: "#777BB4" },
  { name: "CakePHP", level: 50, slug: "cakephp.png", color: "#D33C43" },
  { name: "Java", level: 50, slug: "java.svg", color: "#E32C2C" },
  { name: "Spring", level: 40, slug: "spring.spring", color: "#77BC20" },
];

export default function Techno() {
  return (
    <section
      id="techno"
      className="relative overflow-hidden min-h-screen py-20 md:snap-start md:snap-always "
      style={{ minHeight: "140vh" }}
    >
      <BackgroundFX />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-fuchsia-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
              Technologies & Expertise
            </span>
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-slate-400">
            Un écosystème moderne, des interfaces fluides, des backends robustes
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SKILLS.map((s, i) => (
            <SkillCard key={s.name} skill={s} index={i} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function SkillCard({ skill, index = 0 }: { skill: Skill; index?: number }) {
  // Tilt 3D fluide (hover)
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sy = useSpring(ry, { stiffness: 120, damping: 14 });

  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rx.set(((y / rect.height) - 0.5) * -10);
    ry.set(((x / rect.width) - 0.5) * 10);
  };

  const ringColor = skill.color || "#22d3ee";

  return (
    <motion.li
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.15  }} // stagger
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        perspective: 800,
        rotateX: sx,   // ← géré par Framer, n’écrase pas les autres transforms
        rotateY: sy,
        willChange: "transform",
      }}
      whileHover={{ scale: 1.015 }}
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
        style={{
          background: `radial-gradient(60% 60% at 50% 40%, ${hexToRgb(
            ringColor,
            0.35
          )} 0%, rgba(255,255,255,0) 60%)`,
        }}
        aria-hidden
      />

      <div className="relative flex items-center gap-4">
        {/* Logo avec fallback béton */}
        <div className="relative h-12 w-12 shrink-0 rounded-xl bg-white/50 ring-1 ring-black/5 overflow-hidden">
          <Logo slug={skill.slug} alt={skill.name} className="object-contain p-2" />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {skill.name}
          </h3>
        </div>
      </div>

      {/* Jauge */}
      <div className="mt-5 flex items-center gap-4">
        <div className="flex-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-gray-100/60 to-gray-200/30 dark:from-white/10 dark:to-white/5">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 * index + 0.1 }}
              style={{
                background: `linear-gradient(90deg, ${hexToRgb(
                  ringColor,
                  1
                )}, ${hexToRgb(ringColor, 0.65)})`,
              }}
            />
          </div>
        </div>
      </div>
    </motion.li>
  );
}

/* ==== Logo avec fallback data URL (aucun asset requis) ==== */
function Logo({
  slug,
  alt,
  className,
}: {
  slug: string;
  alt: string;
  className?: string;
}) {
  const transparentSvg =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><rect width='48' height='48' rx='12' fill='rgba(0,0,0,0.04)'/><path d='M24 12a12 12 0 1 0 0 24a12 12 0 0 0 0-24Zm0 6a6 6 0 1 1 0 12a6 6 0 0 1 0-12Z' fill='rgba(0,0,0,0.18)'/></svg>`
    );

  const initialList = useMemo(() => {
    const hasExt = /\.[a-zA-Z0-9]+$/.test(slug);
    if (hasExt) {
      const [name] = slug.split(/\.(?=[^.]+$)/);
      return [
        `/icons/${slug}`,
        `/icons/${name}.svg`,
        `/icons/${name}.png`,
        transparentSvg,
      ];
    }
    return [`/icons/${slug}.svg`, `/icons/${slug}.png`, transparentSvg];
  }, [slug]);

  const [sources, setSources] = useState(initialList);
  const src = sources[0] ?? transparentSvg;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="48px"
      className={className}
      unoptimized
      onError={() =>
        setSources((prev) => (prev.length > 1 ? prev.slice(1) : [transparentSvg]))
      }
    />
  );
}

/* ===== Background FX ===== */
function BackgroundFX() {
  return (
    <>
      {/* Grille subtile */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(80%_60%_at_50%_40%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(120, 120, 120, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(120, 120, 120, 0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(closest-side, #a78bfa, transparent)" }}
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-28 -right-16 h-96 w-96 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(closest-side, #22d3ee, transparent)" }}
        animate={{ x: [0, -18, 0], y: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

/* ===== utils ===== */
function hexToRgb(hex: string, alpha = 1) {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
