"use client";

import { useTranslations } from "next-intl";

const GROUP_ICONS = [
  /* Web */
  <svg key="web" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="4" fill="#6A9CD6" opacity="0.9" />
    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#6A9CD6" strokeWidth="1" opacity="0.3" />
    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#6A9CD6" strokeWidth="1" opacity="0.2" transform="rotate(60 24 24)" />
    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#6A9CD6" strokeWidth="1" opacity="0.2" transform="rotate(120 24 24)" />
  </svg>,

  /* API */
  <svg key="api" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="4" fill="#6A9CD6" opacity="0.9" />
    <line x1="24" y1="20" x2="24" y2="8" stroke="rgba(106,156,214,.25)" strokeWidth="1" />
    <line x1="24" y1="28" x2="24" y2="40" stroke="rgba(106,156,214,.25)" strokeWidth="1" />
    <line x1="20" y1="24" x2="8" y2="24" stroke="rgba(106,156,214,.25)" strokeWidth="1" />
    <line x1="28" y1="24" x2="40" y2="24" stroke="rgba(106,156,214,.25)" strokeWidth="1" />
    <circle cx="24" cy="8" r="3" stroke="rgba(106,156,214,.3)" strokeWidth="1" />
    <circle cx="24" cy="40" r="3" stroke="rgba(106,156,214,.3)" strokeWidth="1" />
    <circle cx="8" cy="24" r="3" stroke="rgba(106,156,214,.3)" strokeWidth="1" />
    <circle cx="40" cy="24" r="3" stroke="rgba(106,156,214,.3)" strokeWidth="1" />
  </svg>,

  /* Software */
  <svg key="software" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="10" width="36" height="28" rx="4" stroke="rgba(106,156,214,.3)" strokeWidth="1" />
    <rect x="6" y="10" width="36" height="8" rx="4" fill="rgba(106,156,214,.08)" />
    <rect x="6" y="14" width="36" height="4" fill="rgba(106,156,214,.08)" />
    <circle cx="12" cy="14" r="1.5" fill="#FF5F57" opacity="0.6" />
    <circle cx="17" cy="14" r="1.5" fill="#FFBD2E" opacity="0.6" />
    <circle cx="22" cy="14" r="1.5" fill="#27C93F" opacity="0.6" />
    <rect x="12" y="22" width="16" height="2" rx="1" fill="rgba(106,156,214,.3)" />
    <rect x="12" y="27" width="22" height="2" rx="1" fill="rgba(106,156,214,.2)" />
    <rect x="12" y="32" width="12" height="2" rx="1" fill="rgba(106,156,214,.15)" />
  </svg>,
];

const groups = [
  {
    key: "web",
    items: ["React", "Next.js", "TypeScript", "Blazor", "C#"],
  },
  {
    key: "api",
    items: ["Go", "Node.js", "ASP.NET Core", "GraphQL", "REST", "PostgreSQL", "SQL Server"],
  },
  {
    key: "software",
    items: ["C#", "XPO/XAF", "DevExpress", "WPF", "WinForms"],
  },
];

export default function Techno() {
  const t = useTranslations("technologies");

  return (
    <section
      id="techno"
      style={{
        position: "relative",
        background: "#04040F",
        padding: "72px 8vw",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(106,156,214,0.3), transparent)",
        }}
      />

      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <div style={{ maxWidth: 720 }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif", margin: "0 0 16px" }}>
            {t("subtitle")}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {groups.map((group, index) => {
            return (
              <article
                key={group.key}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 22,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(8,10,30,0.7)",
                  padding: 24,
                  boxShadow: "0 18px 50px rgba(0,0,0,0.18)",
                  transition: "border-color 180ms ease",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 24,
                    right: 24,
                    height: 1,
                    background: "linear-gradient(90deg, #6A9CD6, rgba(106,156,214,0.35), transparent)",
                  }}
                />

                <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {GROUP_ICONS[index]}
                </div>

                <h3 style={{ marginTop: 8, fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#F0F4FF", fontFamily: "var(--font-display), sans-serif" }}>
                  {t(`groups.${group.key}.title`)}
                </h3>
                <p style={{ marginTop: 12, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B7A99" }}>
                  {t(`groups.${group.key}.description`)}
                </p>

                <ul style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", padding: 0 }}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        borderRadius: 999,
                        border: "1px solid rgba(106,156,214,0.25)",
                        background: "rgba(106,156,214,0.08)",
                        padding: "6px 12px",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color: "#6A9CD6",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
