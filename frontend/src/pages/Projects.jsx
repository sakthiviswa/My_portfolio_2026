import { forwardRef, useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66z"/>
  </svg>
);
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const DEFAULT = [
  { id:1, grad:"linear-gradient(135deg,#1a0533,#5a1090)", tag:"REACT · NEXT.JS · PYTHON · NLP",
    name:"FineReader — AI Text Summarization", period:"May 2025 – June 2025",
    Icon: BrainIcon, iconColor:"rgba(192,112,255,0.8)",
    bullets:[
      "Built with React & Next.js frontend + Python AI models for NLP processing.",
      "Automatically converts long paragraphs into concise, digestible summaries.",
      "Improves reading efficiency by extracting key information in seconds.",
    ], github:"https://github.com/sakthiviswa", live:"#" },
  { id:2, grad:"linear-gradient(135deg,#0d1b2a,#1b4060)", tag:"FIGMA · UI/UX DESIGN · REACT",
    name:"Real Estate & Food App UI/UX", period:"February 2024 – March 2024",
    Icon: HomeIcon, iconColor:"rgba(139,233,253,0.8)",
    bullets:[
      "Designed intuitive real estate booking app — property search, details & booking flow.",
      "Created food/smoothie app with visual appeal and seamless product navigation.",
      "Built Figma prototypes with consistent color schemes, typography & visual hierarchy.",
    ], github:"https://github.com/sakthiviswa", live:"#" },
];

const Projects = forwardRef(function Projects(_, ref) {
  const [projects, setProjects] = useState(DEFAULT);
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/projects").then(r=>r.json())
      .then(d => { if (d?.projects?.length) {
        setProjects(prev => prev.map((p, i) => ({ ...p, ...(d.projects[i] || {}), Icon: p.Icon, iconColor: p.iconColor })));
      }})
      .catch(()=>{}).finally(()=>setLoading(false));
  }, []);

  return (
    <section ref={ref} className="page-section"
      style={{ background:"radial-gradient(ellipse at 88% 55%, rgba(155,64,212,0.24) 0%, transparent 55%), #0d0118" }}>
      <SectionHeader eyebrow="WHAT I'VE BUILT" title="Featured" highlight="Projects" />

      {loading ? <p style={{ fontFamily:"'Cinzel',serif", color:"#8060a0", fontSize:"15px" }}>LOADING...</p>
        : <div className="proj-grid">
            {projects.map(p => (
              <div key={p.id} className="proj-card">
                {/* Thumbnail */}
                <div className="proj-thumb" style={{ background:p.grad }}>
                  <div className="proj-thumb-icon" style={{ color:p.iconColor }}><p.Icon /></div>
                  <div className="proj-overlay" />
                </div>

                {/* Body */}
                <div style={{ padding:"1.4rem 1.6rem" }}>
                  {/* Tag */}
                  <span style={{ display:"inline-block", background:"rgba(240,192,64,0.1)",
                    border:"1px solid rgba(240,192,64,0.32)", color:"#f0c040",
                    fontSize:"11px", fontWeight:700, letterSpacing:"0.12em",  /* ↑ was 9px */
                    padding:"4px 10px", borderRadius:"4px", marginBottom:"10px" }}>{p.tag}</span>

                  {/* Project name */}
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:"17px", color:"#f5e6ff", fontWeight:600, marginBottom:"5px" }}>{p.name}</div>  {/* ↑ was 15px */}

                  {/* Period */}
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"12px", color:"#8060a0", marginBottom:"14px" }}>  {/* ↑ was 10px */}
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#8060a0" strokeWidth="2" style={{ display:"inline", marginRight:"5px", verticalAlign:"middle" }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {p.period}
                  </div>

                  {/* Bullets */}
                  <ul style={{ listStyle:"none", padding:0, marginBottom:"16px" }}>
                    {p.bullets.map((b,i) => (
                      <li key={i} style={{ fontSize:"14px", color:"#c4a0e8", paddingLeft:"16px", position:"relative", lineHeight:1.65, marginBottom:"6px" }}>  {/* ↑ was 12px */}
                        <span style={{ position:"absolute", left:0, color:"#f0c040", fontSize:"9px", top:"3px" }}>◆</span>{b}
                      </li>
                    ))}
                  </ul>

                  {/* Buttons */}
                  <div style={{ display:"flex", gap:"10px" }}>
                    <a href={p.github} target="_blank" rel="noreferrer"
                      style={{ fontFamily:"'Cinzel',serif", fontSize:"11px", fontWeight:600, letterSpacing:"0.1em",  /* ↑ was 9px */
                        padding:"7px 16px", borderRadius:"7px", textDecoration:"none",
                        color:"#f0c040", border:"1px solid rgba(240,192,64,0.38)", background:"rgba(240,192,64,0.07)",
                        display:"inline-flex", alignItems:"center", gap:"5px" }}>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="#f0c040">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      GITHUB ↗
                    </a>
                    <a href={p.live}
                      style={{ fontFamily:"'Cinzel',serif", fontSize:"11px", fontWeight:600, letterSpacing:"0.1em",  /* ↑ was 9px */
                        padding:"7px 16px", borderRadius:"7px", textDecoration:"none",
                        color:"#c070ff", border:"1px solid rgba(192,112,255,0.32)", background:"rgba(192,112,255,0.07)" }}>
                      LIVE DEMO
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
      }
    </section>
  );
});

export default Projects;