"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Lottie from "lottie-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import devCodingAnimation from "@/public/lotties/dev-coding.json";

export default function PerformanceMonitor() {
  const t = useTranslations("loading");
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const words = useMemo(() => t("words").split("|"), [t]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.dataset.introReady = "false";

    const MIN_MS = reduceMotion ? 700 : 1400;
    const MAX_MS = 6000; // safety fallback

    let minDone = false;
    let loaded = false;
    let fired = false;

    function fire() {
      if (fired) return;
      fired = true;
      document.body.dataset.introReady = "true";
      window.dispatchEvent(new CustomEvent("portfolio:intro-ready"));
      setVisible(false);
      document.body.style.overflow = "";
    }

    function maybeReady() {
      if (minDone && loaded) fire();
    }

    // Minimum display time so the loader isn't a flash
    const minTimer = window.setTimeout(() => {
      minDone = true;
      maybeReady();
    }, MIN_MS);

    // Safety: fire no matter what after MAX_MS
    const maxTimer = window.setTimeout(fire, MAX_MS);

    // Wait for all resources (images, scripts, lazy chunks) to finish
    if (document.readyState === "complete") {
      loaded = true;
    } else {
      window.addEventListener("load", () => { loaded = true; maybeReady(); }, { once: true });
    }

    const wordTimer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 700);

    return () => {
      window.clearInterval(wordTimer);
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
      document.body.style.overflow = "";
    };
  }, [reduceMotion, words.length]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: reduceMotion ? 0.35 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] overflow-hidden bg-[var(--background)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(181,93,50,0.12),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(53,89,122,0.09),transparent_20%)]" />

          <div className="relative flex min-h-screen items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full max-w-md flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.6, ease: "easeInOut" }}
                className="w-full max-w-[18rem]"
              >
                <Lottie animationData={devCodingAnimation} loop />
              </motion.div>

              <div className="mt-2 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.35, 1, 0.35] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0 }}
                    className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
                  />
                  <motion.span
                    animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.35, 1, 0.35] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.18 }}
                    className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
                  />
                  <motion.span
                    animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.35, 1, 0.35] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.36 }}
                    className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
                  />
                </div>

                <div className="min-h-7 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
                  <span className="mr-2">{t("prefix")}</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[wordIndex]}
                      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                      transition={{ duration: 0.25 }}
                      className="inline-block font-semibold text-slate-950 dark:text-white"
                    >
                      {words[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
