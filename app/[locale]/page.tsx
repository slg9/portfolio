
import AboutMe from "../components/sections/AboutMe";
import Contact from "../components/sections/Contact";
import Cursus from "../components/sections/Cursus";
import Footer from "../components/sections/FooterInfo";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import ScrollStory from "../components/sections/ScrollStory";
import Techno from "../components/sections/techno";


export default function Home() {
  return (
    <main
      className="flex flex-col pt-16 scroll-pt-24">
      <Hero />
      <ScrollStory />
      <AboutMe />
      <Projects />
      <Techno />
      <Cursus />
      <Contact />
      <Footer />
    </main>
  );
}
