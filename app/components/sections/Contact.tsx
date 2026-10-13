import { useLocale, useTranslations } from "next-intl";
import { DownloadSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import ContactForm from "../ContactForm";
import { sendMailjet } from "@/app/actions/SendMailjet";
import { cvHref, links } from "../../lib/cv";

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap contact-grid">
        <div className="contact-intro">
          <h2 id="contact-title" className="contact-title display">
            {t("title")}
          </h2>
          <p className="lede" style={{ marginTop: 28, fontWeight: 700, color: "inherit" }}>
            {t("subtitle")}
          </p>
          <p className="lede" style={{ marginTop: 12 }}>
            {t("description")}
          </p>
          <p className="status">{t("availability")}.</p>

          <a className="mail" href={`mailto:${links.email}`}>
            {links.email}
          </a>

          <div className="elsewhere">
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinLogo size={20} weight="bold" aria-hidden />
              LinkedIn
            </a>
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              <GithubLogo size={20} weight="bold" aria-hidden />
              GitHub
            </a>
            <a href={cvHref(locale)} download>
              <DownloadSimple size={20} weight="bold" aria-hidden />
              {t("cvCta")}
            </a>
          </div>
        </div>

        <ContactForm action={sendMailjet} />
      </div>
    </section>
  );
}
