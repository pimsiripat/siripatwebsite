import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
