
import AboutMe from "../components/sections/AboutMe";
import Contact from "../components/sections/Contact";
import Cursus from "../components/sections/Cursus";
import Footer from "../components/sections/FooterInfo";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import Techno from "../components/sections/techno";


export default function Home() {
  return (
    <main
      className="flex flex-col scroll-pt-24"
      style={{ background: "#04040F" }}>
      <Hero />
      <AboutMe />
      <Projects />
      <Techno />
      <Cursus />
      <Contact />
      <Footer />
    </main>
  );
}
