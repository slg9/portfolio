import { useTranslations } from "next-intl";
import { CaretDown, Plus } from "@phosphor-icons/react/dist/ssr";

type FeaturedKey = "econnect" | "begaiement" | "qrwin" | "happiz";
type LayerKey = "ui" | "api" | "data" | "payments";

type Project = {
  key: FeaturedKey;
  color: string;
  fg: string;
  // cover word size, in % of the cover width
  k: number;
  stack: string[];
  // architecture cross-section, top (interface) to bottom (storage)
  layers: [LayerKey, string][];
};

const projects: Project[] = [
  {
    key: "econnect", color: "var(--c-econnect)", fg: "#f5f5f2", k: 62,
    stack: ["React", "Apollo", "Go", "GraphQL", "PostgreSQL", "Docker", "CI/CD"],
    layers: [["ui", "React, Apollo"], ["api", "Go, GraphQL"], ["data", "PostgreSQL"]],
  },
  {
    key: "begaiement", color: "var(--c-begaiement)", fg: "#f5f5f2", k: 56,
    stack: ["React", "Go", "REST", "PostgreSQL", "Stripe"],
    layers: [["ui", "React"], ["api", "Go, REST"], ["data", "PostgreSQL"]],
  },
  {
    key: "qrwin", color: "var(--c-qrwin)", fg: "#141414", k: 58,
    stack: ["React", "Apollo", "Go", "GraphQL", "Stripe", "Wallet"],
    layers: [["ui", "React, Apollo"], ["api", "Go, GraphQL"], ["payments", "Stripe, wallet"]],
  },
  {
    key: "happiz", color: "var(--c-happiz)", fg: "#f5f5f2", k: 44,
    stack: ["React", "Apollo", "Go", "GraphQL", "Firebase"],
    layers: [["ui", "React, Apollo"], ["api", "Go, GraphQL"], ["data", "Firebase"]],
  },
];

// Only technologies already named in each project's description.
const groups: { label: string; items: { key: string; stack: string[] }[] }[] = [
  {
    label: "archiveWeb",
    items: [
      { key: "actuflux", stack: ["Go", "Next.js", "Remotion", "FFmpeg"] },
      { key: "prelys", stack: ["React", "Apollo", "Go", "GraphQL"] },
      { key: "cineactu", stack: ["Next.js", "Supabase", "Redis", "Stripe"] },
      { key: "mentora", stack: ["Next.js", "Node.js", "Prisma", "PostgreSQL"] },
      { key: "preznt", stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Three.js"] },
      { key: "raoul", stack: ["React", "Apollo", "GraphQL", "MangoPay"] },
      { key: "psg", stack: ["React", "REST"] },
    ],
  },
  {
    label: "archiveMobile",
    items: [
      { key: "leon", stack: ["React", "Apollo", "GraphQL", "Go", "PostgreSQL"] },
      { key: "fidelatoo", stack: ["SQL"] },
      { key: "handimobi", stack: ["Android"] },
      { key: "ladar", stack: ["Android"] },
    ],
  },
];

function Chips({ items, label }: { items: string[]; label: string }) {
  if (items.length === 0) return null;
  return (
    <ul className="chips" aria-label={label}>
      {items.map((s, i) => (
        <li key={s} style={{ "--i": i } as React.CSSProperties}>{s}</li>
      ))}
    </ul>
  );
}

export default function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="section" aria-labelledby="projects-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2 id="projects-title" className="section-title">
          {t("title")}
        </h2>
        <p className="lede" style={{ marginTop: 20 }}>
          {t("subtitle")}
        </p>

        <ul className="shelf">
          {projects.map((p) => (
            <li
              key={p.key}
              className="project"
              style={{ "--c": p.color, "--fg": p.fg, "--k": p.k } as React.CSSProperties}
            >
              <div className="cover-wrap" aria-hidden>
                <div className="layers">
                  {p.layers.map(([layer, tech], i) => (
                    <div className="layer" key={layer} style={{ "--l": i } as React.CSSProperties}>
                      <span className="layer-name">{t(`layers.${layer}`)}</span>
                      <span className="layer-tech">{tech}</span>
                    </div>
                  ))}
                </div>
                <div className="cover">
                  <span className="cover-domain">{t(`domains.${p.key}`)}</span>
                  <span className="cover-word display">{t(`covers.${p.key}`)}</span>
                </div>
              </div>

              <div className="project-body">
                <h3>{t(`items.${p.key}.title`)}</h3>
                <p>{t(`items.${p.key}.summary`)}</p>
                <Chips items={p.stack} label={t("stackLabel")} />

                <details className="liner">
                  <summary>
                    <span className="open-label">{t("notes")}</span>
                    <span className="close-label">{t("closeNotes")}</span>
                    <Plus size={16} weight="bold" aria-hidden />
                  </summary>
                  <dl>
                    <div>
                      <dt>{t("roleLabel")}</dt>
                      <dd>{t(`items.${p.key}.role`)}</dd>
                    </div>
                    <div>
                      <dt>{t("impactLabel")}</dt>
                      <dd>{t(`items.${p.key}.impact`)}</dd>
                    </div>
                  </dl>
                </details>
              </div>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "clamp(72px, 9vw, 128px)" }}>
          <h3 className="section-title subsection-title">
            {t("archiveTitle")}
          </h3>
          <div className="sides">
            {groups.map((group) => (
              <div className="side" key={group.label}>
                <h4>{t(group.label)}</h4>
                <ul className="tracks">
                  {group.items.map(({ key, stack }) => (
                    <li key={key}>
                      <details className="track">
                        <summary>
                          <span className="track-head">
                            <b>{t(`items.${key}.title`)}</b>
                            <span className="track-short">{t(`items.${key}.short`)}</span>
                          </span>
                          <CaretDown size={18} weight="bold" className="track-caret" aria-hidden />
                          <span className="sr-only">{t("moreDetails")}</span>
                        </summary>
                        <p className="track-desc">{t(`items.${key}.description`)}</p>
                      </details>
                      <Chips items={stack} label={t("stackLabel")} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
