

import AboutMe from "./components/sections/AboutMe";
import Contact from "./components/sections/Contact";
import Cursus from "./components/sections/Cursus";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";


import Hr from "./components/ui/Hr";


export default function Home() {


  return (

    <main
      className="flex flex-col gap-[32px] row-start-2 pt-16 scroll-pt-24  md:h-screen md:overflow-y-scroll md:snap-y md:snap-mandatory">



      <Hero />
      <section
        className="relative h-[60vh] bg-fixed bg-cover bg-center
             bg-[url('/images/bg-parallax.png')]"
        aria-label="Visuel de fond"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/80" />
      </section>

      <AboutMe />
      -
      <Projects />
      -
      <Cursus />

      <Contact />
    </main>


  );
}
