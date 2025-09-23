"use client";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Lottie from "lottie-react";
// Place ton JSON ici (ou remplace par ton import/module)
import devAnimation from "@/public/lotties/dev-coding.json";

/* ---- Typing minimal ---- */
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
      className="scroll-mt-12 flex flex-col items-center justify-center w-full px-6 pt-10 pb-16 bg-white h-screen md:snap-start md:snap-always"
    >
      <div>
        {/* Header (animations identiques) */}
        <motion.header
          className="mb-10 flex flex-col items-center text-center md:mb-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
          viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
        >
          <h2
            id="projects-title"
            className="text-3xl font-extrabold tracking-[-0.01em] text-slate-900 md:text-4xl bg-gradient-to-r from-fuchsia-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent"
          >
            À propos de moi
          </h2>
        </motion.header>

        <div className="flex flex-col md:flex-row gap-12 items-center max-w-5xl">
          {/* Texte (animations identiques, contenu/format enrichi) */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <motion.h2
              className="text-3xl font-bold text-gray-800"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.3 }}
              viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            >
              Je suis{" "}
              <span className="underline decoration-4 decoration-fuchsia-400 underline-offset-4">
                développeur
              </span>
              , passionné par la création de{" "}
              <span className="bg-yellow-100 px-1.5 py-0.5 rounded-md font-semibold">
                solutions solides
              </span>
              ,{" "}
              <span className="bg-gradient-to-r from-sky-500 to-emerald-400 text-transparent bg-clip-text font-extrabold">
                évolutives
              </span>{" "}
              et <span className="font-black text-slate-900">bien conçues</span>.
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
              viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            >
              Côté <span className="font-semibold text-slate-900">back-end</span>, je conçois des{" "}
              <span className="bg-slate-900 text-white px-1.5 rounded-md">
                API robustes
              </span>{" "}
              avec un focus{" "}
              <span className="italic">qualité</span>,{" "}
              <span className="italic">maintenabilité</span> et{" "}
              <span className="italic">automatisation</span>. Côté{" "}
              <span className="font-semibold text-slate-900">front-end</span>, je développe en{" "}
              <span className="bg-sky-100 px-1 rounded">React</span>, j’intègre les designs et j’assure la{" "}
              <span className="font-semibold">logique applicative</span>
            </motion.p>

            <motion.p
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.35 }}
              viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            >
              Curieux et attentif au détail, j’aime les projets{" "}
              <span className="bg-pink-100 px-1 rounded">porteurs de sens</span> et{" "}
              <span className="bg-indigo-100 px-1 rounded">exigeants</span>, de la{" "}
              <span className="font-semibold">conception</span> à la{" "}
              <span className="font-semibold">mise en production</span>.
            </motion.p>

            {/* Boutons (animations identiques) */}
            <div className="flex gap-5">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.5 }}
                viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
              >
                <button
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  type="button"
                  onClick={handleDownloadCV}
                >
                  Télécharger mon CV
                </button>
              </motion.div>
            </div>
          </div>

          {/* Lottie à droite (nouvel élément, animation cohérente et discrète) */}
          <motion.aside
            className="flex-1 w-full max-w-[520px]"
            initial={{ opacity: 0, x:20,y: 20,rotate:10 }}
            whileInView={{ opacity: 1,x:0, y: 0 ,rotate:0}}
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
