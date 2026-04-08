import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import About from "@/components/About";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollThread from "@/components/ScrollThread";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollThread />
      <main>
        <Hero />
        <FeaturedProjects />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
