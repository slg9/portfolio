import { setRequestLocale } from "next-intl/server";
import AboutMe from "../components/sections/AboutMe";
import Contact from "../components/sections/Contact";
import Cursus from "../components/sections/Cursus";
import Footer from "../components/sections/FooterInfo";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import Techno from "../components/sections/techno";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <main id="top">
        <Hero />
        <AboutMe />
        <Projects />
        <Techno />
        <Cursus />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
