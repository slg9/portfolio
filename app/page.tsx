

import AboutMe from "./components/sections/AboutMe";
import Contact from "./components/sections/Contact";
import Cursus from "./components/sections/Cursus";
import Footer from "./components/sections/FooterInfo";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Techno from "./components/sections/techno";


import Hr from "./components/ui/Hr";


export default function Home() {


  return (

    <main
      className="flex flex-col gap-[32px] row-start-2 pt-16 scroll-pt-24  md:h-screen md:overflow-y-scroll md:snap-y md:snap-mandatory">
      <Hero />
      <AboutMe />
      <Projects />
      <Techno/>
      <Cursus />
      <Contact />
      <Footer/>
    </main>


  );
}
