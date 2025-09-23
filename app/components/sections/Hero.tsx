"use client";
import Image from "next/image";
import { Easing, motion } from "framer-motion";

const linkedinUrl = "https://www.linkedin.com/in/sébastien-legros-23a85085";
const githubUrl = "https://github.com/slg9";
const mailUrl = "mailto:sebastien@neitsa.fr";

export default function Hero() {
  const ease: Easing[] = ["anticipate","backIn"];

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] pb-24 pt-10 md:snap-start md:snap-always isolate overflow-hidden"
    >
      {/* Background: grid + radial */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40rem_40rem_at_50%_-10%,rgba(99,102,241,.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,.02))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[length:32px_32px] bg-[linear-gradient(to_right,rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.05)_1px,transparent_1px)]" />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-12 pb-24 text-center">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ease, duration: 0.7,damping:30, delay: 0.10 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1 text-md font-medium text-slate-600 shadow-sm backdrop-blur"
        >
          👋 Salut, je m’appelle
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0,y:-20, filter: "blur(6px)" }}
          animate={{ opacity: 1,y:0, filter: "blur(0px)" }}
          transition={{ ease, duration: 2, damping:30 }}
          className="text-5xl/tight font-extrabold tracking-[-0.02em] text-slate-900 sm:text-4xl"
        >
          Sébastien Legros
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ ease, duration: 2, delay: 0.34,damping:30 }}
          className="mt-3 text-lg text-slate-600 max-w-[700px]"
        >
          Ingénieur full-stack passionné par les{" "}
          <span className="font-semibold text-slate-900">architectures solides</span>, les{" "}
          <span className="bg-sky-100 px-1 rounded">applications performantes</span> et les{" "}
          <span className="bg-emerald-100 px-1 rounded">expériences utilisateurs intuitives</span>.
        </motion.p>

        {/* Photo + ring */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0, rotate: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 80, damping: 40, duration: 0.9, delay: 0.48, ease }}
          className="relative mt-10"
        >
          <span className="absolute -inset-2 rounded-full bg-gradient-to-tr from-indigo-500/25 via-sky-400/25 to-emerald-400/25 blur-2xl" />
          <Image
            src="/sebastien.jpeg"
            alt="Sébastien Legros"
            width={240}
            height={240}
            priority
            className="md:w-[360px] md:h-[360px] relative rounded-full border border-white shadow-xl ring-2 ring-slate-200"
          />
        </motion.div>

        {/* CTA row */}
        <div className="my-10 flex items-center gap-4">
          <motion.a
            initial={{ opacity: 0, y: 10, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ ease, duration: 0.6, delay: 0.62 }}
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Image src="/linkedin.png" alt="" width={18} height={18} aria-hidden />
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 10, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ ease, duration: 0.6, delay: 0.72 }}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Image src="/github.png" alt="" width={18} height={18} aria-hidden />
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 10, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ ease, duration: 0.6, delay: 0.82 }}
            href={mailUrl}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Image src="/gmail.png" alt="" width={18} height={18} aria-hidden />
          </motion.a>
        </div>

        {/* Small trust bar (facultatif) */}
        <motion.div
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ease, duration: 0.7, delay: 0.95 }}
          className="mt-6 text-xs text-slate-500"
        >
          Disponible pour du full-stack / backend roles
        </motion.div>
      </div>
    </section>
  );
}
