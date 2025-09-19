"use client";
import Image from "next/image";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const linkedinUrl = "https://www.linkedin.com/in/sébastien-legros-23a85085";
const githubUrl = "https://github.com/slg9";
const mailUrl = "mailto:sebastien@neitsa.fr";

/* ---- Typing minimal ---- */
function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance])
}

export default function Hero() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref })
    const y = useParallax(scrollYProgress, -60)
    return (
        <>
            <section
                ref={ref}
                id="hero"
                className="min-h-screen snap-start"
            >
                <motion.div
                    className="flex flex-col items-center text-center  space-y-4  "
                    style={{ y }}


                >
                    {/* Texte (typing) */}
                    <motion.p
                        className="text-lg font-semibold text-gray-600"

                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.15 }}
                    >
                        Hi, I am 
                    </motion.p>

                    <motion.h1
                        className="text-5xl font-extrabold text-gray-900"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.70 }}
                    >
                        Sébastien Legros
                    </motion.h1>

                    <motion.h2
                        className="text-2xl font-medium text-red-500"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.90 }}
                    >
                        And I am a software engineer
                    </motion.h2>

                    {/* Photo: bottom → top smooth */}
                    <motion.div
                        className="mt-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.5 }}

                    >
                        <Image
                            className="rounded-full border-4 border-gray-200 shadow-lg"
                            src="/sebastien.jpeg"
                            alt="Profile picture"
                            width={400}
                            height={400}
                            priority
                        />
                    </motion.div>

                    {/* Icônes: stagger manuel via delays */}
                    <div className="flex gap-6 mt-8">
                        <motion.a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="p-3 rounded-full bg-gray-100 hover:bg-red-100 transition-colors shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 220, damping: 18, delay: 1.4 }}
                        >
                            <Image aria-hidden src="/linkedin.png" alt="Linkedin icon" width={28} height={28} />
                        </motion.a>

                        <motion.a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="p-3 rounded-full bg-gray-100 hover:bg-red-100 transition-colors shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 220, damping: 18, delay: 1.6 }}
                        >
                            <Image aria-hidden src="/github.png" alt="Github icon" width={28} height={28} />
                        </motion.a>

                        <motion.a
                            href={mailUrl}
                            aria-label="Email"
                            className="p-3 rounded-full bg-gray-100 hover:bg-red-100 transition-colors shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 220, damping: 18, delay: 1.8 }}
                        >
                            <Image aria-hidden src="/gmail.png" alt="Gmail icon" width={28} height={28} />
                        </motion.a>
                    </div>
                </motion.div>
            </section>
          
        </>
    );
}
