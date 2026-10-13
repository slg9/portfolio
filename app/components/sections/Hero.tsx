import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowDown, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { cvHref } from "../../lib/cv";
import portrait from "../../../public/sebastien-pro.webp";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const words = [t("word1"), t("word2"), t("word3")];
  const wordLines = words.map((word, i) => (
    <span className="line" key={word}>
      <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
    </span>
  ));

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          <span className="hero-name">{t("name")}</span>
          <span className="hero-words display">{wordLines}</span>
        </h1>

        <div className="hero-foot">
          <p className="lede">{t("lede")}</p>
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-solid">
              {t("primaryCta")}
              <ArrowDown size={18} weight="bold" aria-hidden />
            </a>
            <a href={cvHref(locale)} download className="btn btn-line">
              {t("tertiaryCta")}
              <DownloadSimple size={18} weight="bold" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      {/* Same layout as the copy, clipped to the part that crosses the portrait */}
      <div className="hero-copy hero-overlay" aria-hidden>
        <span className="hero-words display">{wordLines}</span>
        <div className="hero-foot">
          <p className="lede">{t("lede")}</p>
        </div>
      </div>

      <div className="hero-photo duo">
        <Image
          src={portrait}
          alt={`${t("name")}, ${t("jobTitle")}`}
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 767px) 100vw, 44vw"
          style={{ objectFit: "cover", objectPosition: "50% 22%" }}
        />
      </div>
    </section>
  );
}
