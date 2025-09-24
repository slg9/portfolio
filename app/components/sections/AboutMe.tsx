"use client";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Lottie from "lottie-react";
import devAnimation from "@/public/lotties/dev-coding.json";

/* ---- Parallax util ---- */
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const AboutMe = () => {
  const handleScroll = () => {
    const section = document.getElementById("contact");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadCV = () => {
    const lienCV = "/docs/Sebastien_Legros_CV-2025.pdf";
    const a = document.createElement("a");
    a.href = lienCV;
    a.download = "Sebastien_Legros_CV-2025.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section
      id="aboutme"
      className="
        relative isolate w-full h-screen scroll-mt-12
        flex flex-col items-center justify-center px-6 pt-10 pb-16
        md:snap-start md:snap-always
      "
    >
      {/* --- Background layers : adaptent le contraste en dark --- */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(50rem_40rem_at_50%_-10%,rgba(99,102,241,.12),transparent_60%)]
          dark:bg-[radial-gradient(50rem_40rem_at_50%_-10%,rgba(99,102,241,.10),transparent_60%)]
        "
      />
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(to_bottom,rgba(0,0,0,.02),transparent)]
          dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,.03),transparent)]
        "
      />
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]
          bg-[length:32px_32px]
          bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)]
          dark:bg-[linear-gradient(to_right,rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.07)_1px,transparent_1px)]
        "
      />

      <div className="w-full max-w-5xl">
        {/* Header */}
        <motion.header
          className="mb-10 flex flex-col items-center text-center md:mb-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
          viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
        >
          <h2
            id="projects-title"
            className="
              text-3xl md:text-4xl font-extrabold tracking-[-0.01em]
              text-slate-900 dark:text-slate-100
            "
          >
            À propos de moi
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Full-stack engineer — React, Go, PostgreSQL, Docker, CI/CD
          </p>
        </motion.header>

        <div className="relative overflow-hidden sm:py-10 flex flex-col md:flex-row items-center gap-12">
          {/* Texte */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <motion.h2
              className="text-3xl font-bold text-slate-900 dark:text-slate-100"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.3 }}
              viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            >
              Je suis{" "}
              <span className="underline decoration-4 decoration-fuchsia-400/70 underline-offset-4 dark:decoration-fuchsia-400/60">
                développeur
              </span>{" "}
              passionné par la création de{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                solutions solides
              </span>
              , évolutives et bien conçues.
            </motion.h2>

            <motion.p
              className="text-lg leading-relaxed text-slate-600 dark:text-slate-300"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
              viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            >
              Côté <span className="font-semibold">back-end</span>, je conçois des API
              robustes (Go, PostgreSQL) avec un fort accent sur la qualité, la
              maintenabilité et l’automatisation (CI/CD).
              Côté <span className="font-semibold">front-end</span>, je développe en
              React/TypeScript des interfaces accessibles, performantes et orientées
              produit.
            </motion.p>

            <motion.p
              className="text-lg leading-relaxed text-slate-600 dark:text-slate-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.35 }}
              viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            >
              Curieux et pragmatique, j’interviens de la conception à la mise en
              production (Docker, monitoring, bonnes pratiques), avec une attention
              constante portée à l’expérience utilisateur et à la performance.
            </motion.p>

            {/* Boutons */}
            <div className="flex gap-5 justify-center md:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.5 }}
                viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
              >
                <button
                  className="
                    inline-flex items-center justify-center rounded-lg
                    bg-gradient-to-r from-indigo-600 to-sky-500
                    px-5 py-3 text-sm font-semibold text-white shadow-sm
                    transition hover:-translate-y-0.5 hover:shadow-md
                    dark:from-indigo-500 dark:to-sky-500
                  "
                  type="button"
                  onClick={handleScroll}
                >
                  Contactez-moi
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.5 }}
                viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
              >
                <button
                  className="
                    inline-flex items-center justify-center rounded-lg
                    border px-5 py-3 text-sm font-medium shadow-sm transition
                    border-slate-200 bg-white text-slate-700
                    hover:-translate-y-0.5 hover:shadow-md
                    dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200
                    dark:hover:shadow-slate-900/30
                  "
                  type="button"
                  onClick={handleDownloadCV}
                >
                  Télécharger mon CV
                </button>
              </motion.div>
            </div>
          </div>

          {/* Lottie */}
          <motion.aside
            className="flex-1 w-full max-w-[520px]"
            initial={{ opacity: 0, x: 20, y: 20, rotate: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 30, delay: 0.2 }}
            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            aria-hidden="true"
          >
            <Lottie
              animationData={devAnimation}
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
};

export default AboutMe;
