import React, { useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";

function Section({ id, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mx-auto max-w-(--content-max-width) scroll-mt-20 px-6 py-16 sm:py-20"
    >
      {children}
    </section>
  );
}

function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const { hash } = window.location;
      if (!hash || hash === "#home") return;

      requestAnimationFrame(() => {
        try {
          document.querySelector(hash)?.scrollIntoView({ behavior: "auto" });
        } catch {
          // hash contains characters that are valid in URLs but invalid as CSS selectors
        }
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <Header />
      <main>
        <Hero />
        <Section id="about">
          <About />
        </Section>
        <Section id="skills">
          <Skills />
        </Section>
        <Section id="experience">
          <Experience />
        </Section>
        <Section id="projects">
          <Projects />
        </Section>
        <Section id="contact">
          <Contact />
        </Section>
        <HashScroll />
      </main>
      <Footer />
    </LazyMotion>
  );
}

export default App;
