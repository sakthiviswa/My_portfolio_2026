import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import StarField from "./components/StarField";
import Hero from "./pages/Hero";
import Education from "./pages/Education";
import GitHub from "./pages/GitHub";
import Skills from "./pages/Skills";
import CodingProfiles from "./pages/CodingProfiles";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";

/*  Pages in order — index matches dot position  */
const SECTIONS = [
  "home",
  "education",
  "github",
  "skills",
  "coding",
  "projects",
  "experience",
  "contact",
];

export default function App() {
  const [activePage, setActivePage] = useState(0);
  const pageRefs  = useRef([]);
  const viewFired = useRef(new Set());

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx     = pageRefs.current.indexOf(entry.target);
          const section = SECTIONS[idx];
          if (idx !== -1) setActivePage(idx);
          if (section && !viewFired.current.has(section)) {
            viewFired.current.add(section);
            fetch("/api/pageview", {
              method:  "POST",
              headers: { "Content-Type": "application/json" },
              body:    JSON.stringify({ section }),
            }).catch(() => {});
          }
        });
      },
      { threshold: 0.45 }
    );
    pageRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goPage = (idx) =>
    pageRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });

  const setRef = (idx) => (el) => { pageRefs.current[idx] = el; };

  return (
    <div style={{
      backgroundColor: "#0d0118",
      minHeight: "100vh",
      color: "#f5e6ff",
      fontFamily: "'Rajdhani', sans-serif",
      overflowX: "hidden",
    }}>
      <canvas id="starCanvas" />
      <StarField />
      <Navbar activePage={activePage} goPage={goPage} />

      {/* ── 8 pages ── */}
      <Hero           ref={setRef(0)} goPage={goPage} />
      <Education      ref={setRef(1)} />
      <GitHub         ref={setRef(2)} />
      <Skills         ref={setRef(3)} />
      <CodingProfiles ref={setRef(4)} />
      <Projects       ref={setRef(5)} />
      <Experience     ref={setRef(6)} />
      <Contact        ref={setRef(7)} />
    </div>
  );
}