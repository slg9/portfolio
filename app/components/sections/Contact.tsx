"use client";

import { motion } from "framer-motion";
import ContactForm from "../ContactForm";
import { sendMailjet } from "@/app/actions/SendMailjet";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <motion.section
      id="contact"
      className="px-6 py-16 md:px-10 md:py-20"
      aria-labelledby="contact-title"
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 18, x: -16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            {t("title")}
          </p>
          <h2
            id="contact-title"
            className="mt-4 max-w-lg text-3xl font-extrabold tracking-[-0.04em] text-slate-950 dark:text-white md:text-4xl"
          >
            {t("subtitle")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-700 dark:text-slate-300">
            {t("description")}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("availability")}
          </p>

          <div className="mt-8 space-y-3 text-sm">
            <a
              className="block rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 font-medium text-slate-900 shadow-[0_18px_48px_rgba(0,0,0,0.05)] dark:text-white"
              href="mailto:slegros9@gmail.com"
            >
              slegros9@gmail.com
            </a>
            <a
              className="block rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 font-medium text-slate-900 shadow-[0_18px_48px_rgba(0,0,0,0.05)] dark:text-white"
              href="https://www.linkedin.com/in/sébastien-legros-23a85085"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18, x: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          whileHover={{ y: -4 }}
          className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_20px_55px_rgba(0,0,0,0.05)] md:p-8"
        >
          <ContactForm action={sendMailjet} />
          <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
            {t("preferEmail")}{" "}
            <a className="font-semibold text-slate-950 underline underline-offset-4 dark:text-white" href="mailto:slegros9@gmail.com">
              slegros9@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
