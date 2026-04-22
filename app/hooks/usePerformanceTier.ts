"use client";

import { useEffect, useState } from "react";

export type PerformanceTier = "high" | "medium" | "low";

export interface ClientCapabilities {
  tier: PerformanceTier;
  cores: number | null;
  memoryGB: number | null;
  connection: string | null;
  pixelRatio: number;
  prefersReducedMotion: boolean;
  isMobile: boolean;
}

function detect(): ClientCapabilities {
  const cores = navigator.hardwareConcurrency ?? null;
  const memoryGB = (navigator as any).deviceMemory ?? null;
  const connection = (navigator as any).connection?.effectiveType ?? null;
  const pixelRatio = window.devicePixelRatio ?? 1;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 900px)").matches;

  // Score: higher = more capable
  let score = 0;

  if (cores !== null) {
    if (cores >= 8) score += 3;
    else if (cores >= 4) score += 2;
    else score += 1;
  } else {
    score += 2; // unknown → assume medium
  }

  if (memoryGB !== null) {
    if (memoryGB >= 4) score += 3;
    else if (memoryGB >= 2) score += 2;
    else score += 0;
  } else {
    score += 2; // unknown (Safari, Firefox) → assume medium
  }

  if (connection !== null) {
    if (connection === "4g") score += 1;
    else if (connection === "3g") score += 0;
    else score -= 1; // 2g / slow-2g
  }

  if (prefersReducedMotion) score = 0;

  let tier: PerformanceTier;
  if (score >= 6) tier = "high";
  else if (score >= 3) tier = "medium";
  else tier = "low";

  return { tier, cores, memoryGB, connection, pixelRatio, prefersReducedMotion, isMobile };
}

export function usePerformanceTier() {
  const [caps, setCaps] = useState<ClientCapabilities | null>(null);

  useEffect(() => {
    setCaps(detect());
  }, []);

  return caps;
}
