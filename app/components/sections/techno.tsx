import { useTranslations } from "next-intl";

const groups = [
  { key: "web", items: ["React", "Next.js", "TypeScript", "Blazor", "C#"] },
  { key: "api", items: ["Go", "Node.js", "ASP.NET Core", "GraphQL", "REST", "PostgreSQL", "SQL Server"] },
  { key: "software", items: ["C#", "XPO/XAF", "DevExpress", "WPF", "WinForms"] },
] as const;

export default function Techno() {
  const t = useTranslations("technologies");

  return (
    <section id="techno" className="section" aria-labelledby="techno-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2 id="techno-title" className="section-title credits-head">
          {t("subtitle")}
        </h2>

        <div className="credits">
          {groups.map((group) => (
            <div className="credit" key={group.key}>
              <h3 className="display">{t(`groups.${group.key}.title`)}</h3>
              <p className="credit-items">{group.items.join(", ")}</p>
              <p>{t(`groups.${group.key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
