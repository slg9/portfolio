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
        const section = document.getElementById("Contact");
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
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref })
    const y = useParallax(scrollYProgress, -80)

    return (
        <section
            ref={ref}
            id="aboutme"
            className="scroll-mt-24 flex flex-col items-center justify-center w-full px-6 py-16 bg-white h-screen snap-start  "
        >
            <motion.div

                style={{ y }}>

                {/* Header */}
                <motion.header
                    className="mb-10 flex flex-col items-center text-center md:mb-14"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 60, damping: 12 }}
                    viewport={{ once: true, margin: "-20% 0px -10% 0px" }}

                >
                    <h2
                        id="projects-title"
                        className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl"
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
                            transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.05 }}
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
                            Côté back-end, je conçois des API robustes avec une exigence forte en qualité, tests et automatisation.
                            Côté front-end, j’aime créer des interfaces modernes, dynamiques et accessibles, centrées sur l’utilisateur.
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
                                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
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
                                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
                                    type="button"
                                    onClick={handleDownloadCV}
                                >
                                    Télécharger mon CV
                                </button>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutMe;
