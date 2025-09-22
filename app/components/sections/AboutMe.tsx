"use client";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay = 0, y = 20) => ({

});

/* ---- Typing minimal ---- */
function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance])
}
const AboutMe = () => {
    const handleScroll = () => {
        const section = document.getElementById("contact");
        if (section) section.scrollIntoView({ behavior: "smooth" });
    };

    const handleDownloadCV = () => {
        // Permet de télécharger le CV (fichier PDF dans le dossier public)
        const lienCV = "/docs/Sebastien_Legros_CV.pdf";
        const a = document.createElement("a");
        a.href = lienCV;
        a.download = "Sebastien_Legros_CV.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }


    return (
        <section

            id="aboutme"
            className="scroll-mt-24 flex flex-col items-center justify-center w-full px-6 py-16 bg-white h-screen md:snap-start md:snap-always  "
        >
          
            <div>

                {/* Header */}
                <motion.header
                    className="mb-10 flex flex-col items-center text-center md:mb-14"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 60, damping: 12 ,delay:0.2}}
                    viewport={{ once: true, margin: "-20% 0px -10% 0px" }}

                >
                    <h2
                        id="projects-title"
                        className="text-3xl font-extrabold tracking-[-0.01em] text-slate-900 md:text-4xl bg-gradient-to-r from-fuchsia-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent"
                    >
                        À propos de moi
                    </h2>
                </motion.header>

                <div className="flex flex-col md:flex-row gap-12 items-center max-w-4xl">
                    {/* Texte */}
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <motion.h2
                            className="text-3xl font-bold text-gray-800"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.3 }}
                            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}

                        >
                            Je suis développeur, passionné par la création de solutions solides, évolutives et bien conçues.
                        </motion.h2>

                        <motion.p
                            className="text-lg text-gray-600 leading-relaxed"
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
                            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
                        >
                            Côté back-end, je conçois des API robustes avec une attention particulière à la qualité, la maintenabilité et l’automatisation..
                            Côté front-end, je développe en React, en intégrant les designs et en assurant la logique de l’application : récupération et affichage des données, interactions et fluidité de l’expérience utilisateur.
                        </motion.p>

                        <motion.p
                            className="text-lg text-gray-600 leading-relaxed"

                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.35 }}
                            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
                        >
                            Porté par la curiosité et le sens du détail, j’aime travailler sur des projets à la fois porteurs de sens et techniquement exigeants, depuis les premières étapes de conception jusqu’à la mise en production.
                        </motion.p>

                       

                        {/* Bouton */}
                        <div className="flex gap-5 ">
                            <motion.div

                                initial={{ opacity: 0, y: 26 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.5 }}
                                viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
                            >
                                <button
                                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" type="button"
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
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
