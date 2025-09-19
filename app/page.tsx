

import AboutMe from "./components/sections/AboutMe";
import Contact from "./components/sections/Contact";
import Cursus from "./components/sections/Cursus";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Hr from "./components/ui/Hr";

export default function Home() {

  return (
    
      <main className="flex flex-col gap-[32px] row-start-2 pt-16 ">
        <Hero/>
        <Hr/>
        <AboutMe/>
        <Hr/>
        <Projects/>
        <Hr/>
        <Cursus/>
        <Hr/>
        <Contact/>
      </main>
      
  
  );
}
