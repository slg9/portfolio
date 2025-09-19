"use client";
import { motion } from "framer-motion";

const fadeUp = (delay = 0, y = 20) => ({

});

const AboutMe = () => {
    const handleScroll = () => {
        const section = document.getElementById("Contact");
        if (section) section.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="aboutme"
            className="scroll-mt-24 flex flex-col items-center justify-center w-full px-6 py-16 bg-white"
        >
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
                    About me
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
                        I’m a developer passionate about crafting solid, scalable, and well-designed solutions.
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-600 leading-relaxed"
                        initial={{ opacity: 0, y:22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
                        viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
                    >
                        On the backend, I build robust APIs with a strong focus on quality, testing,
                        and automation. On the frontend, I enjoy designing modern, dynamic, and accessible
                        interfaces that put the user first.
                    </motion.p>

                    <motion.p
                        className="text-lg text-gray-600 leading-relaxed"
      
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.35 }}
                        viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
                    >
                        Driven by curiosity and attention to detail, I love working on projects that
                        are both meaningful and technically challenging, from the very first design
                        steps all the way to production.
                    </motion.p>

                    {/* Bouton */}
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
                            Get in touch
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
