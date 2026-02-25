import useLenis from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import PageWrapper from "./components/PageWrapper";
import Cursor from "./components/Cursor";
import { Toaster } from "react-hot-toast";

export default function App() {
  useLenis();

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      <Navbar />

      <Cursor />
      <PageWrapper>
        <main className="">
          <div className="overflow-hidden">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </div>
        </main>
      </PageWrapper>
      <Footer />
    </div>
  );
}
