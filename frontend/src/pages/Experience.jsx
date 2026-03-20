import { forwardRef, useEffect, useRef } from "react";
import SectionHeader from "../components/SectionHeader";

const CloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
);
const PenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);
const AwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);
const BarChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

function SectionStars() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const makeStars = () => Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3, a: Math.random(), da: (Math.random() - 0.5) * 0.007,
      col: Math.random() > 0.55 ? "#f0c040" : "#c070ff",
    }));
    resize();
    let s = makeStars();
    const onResize = () => { resize(); s = makeStars(); };
    window.addEventListener("resize", onResize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      s.forEach(star => {
        star.a += star.da;
        if (star.a <= 0 || star.a >= 1) star.da *= -1;
        ctx.beginPath(); ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.col; ctx.globalAlpha = Math.max(0, Math.min(1, star.a)); ctx.fill();
      });
      ctx.globalAlpha = 1; raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0 }}/>;
}

const BULLETS = [
  "Developed responsive UI components and intuitive layouts using React, enhancing UX for event creation and management.",
  "Integrated frontend with backend APIs, ensuring seamless data flow and application functionality.",
  "Collaborated with the team to troubleshoot issues and implement innovative solutions.",
];

const CERTS = [
  { Icon:CloudIcon,    name:"Cloud Computing",      issuer:"NPTEL / IIT",       year:"2025" },
  { Icon:PenIcon,      name:"Effective Writing",     issuer:"NPTEL / IIT",       year:"2025" },
  { Icon:AwardIcon,    name:"IAmNeo Certification",  issuer:"College Program",   year:"2024" },
  { Icon:BarChartIcon, name:"Google Data Analytics", issuer:"Google / Coursera", year:"2023" },
];

const Experience = forwardRef(function Experience(_, ref) {
  return (
    <section ref={ref} className="page-section"
      style={{
        position:"relative", overflow:"hidden",
        background:"radial-gradient(ellipse at 60% 18%, rgba(106,31,160,0.28) 0%, transparent 55%), #0d0118",
      }}>
      <SectionStars />
      <div style={{ position:"relative", zIndex:1, width:"100%", display:"flex", flexDirection:"column", alignItems:"center" }}>
        <SectionHeader eyebrow="PROFESSIONAL JOURNEY" title="Experience &" highlight="Certifications" />

        <div className="exp-grid">
          {/* Internship */}
          <div>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:"12px", letterSpacing:"0.2em", color:"#f0c040", marginBottom:"1.2rem" }}>  {/* ↑ was 10px */}
              ✦ INTERNSHIP EXPERIENCE
            </p>
            <div style={{ background:"rgba(30,6,64,0.9)", border:"1px solid rgba(240,192,64,0.18)",
              borderLeft:"3px solid #f0c040", borderRadius:"16px", padding:"1.8rem" }}>
              {/* Role */}
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:"19px", color:"#f0c040", fontWeight:700, marginBottom:"5px" }}>  {/* ↑ was 16px */}
                Front-End Developer &amp; UI/UX Designer
              </div>
              {/* Company */}
              <div style={{ fontSize:"15px", color:"#c070ff", fontWeight:600, marginBottom:"5px" }}>Virtuesense</div>  {/* ↑ was 13px */}
              {/* Period */}
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"12px", color:"#8060a0", marginBottom:"1.4rem" }}>  {/* ↑ was 10px */}
                May 2025 – June 2025 · Coimbatore, India
              </div>
              <ul style={{ listStyle:"none", padding:0 }}>
                {BULLETS.map((b,i) => (
                  <li key={i} style={{ fontSize:"14px", color:"#c4a0e8", paddingLeft:"18px",  /* ↑ was 12px */
                    position:"relative", lineHeight:1.7, marginBottom:"9px" }}>
                    <span style={{ position:"absolute", left:0, color:"#f0c040" }}>▸</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:"12px", letterSpacing:"0.2em", color:"#f0c040", marginBottom:"1.2rem" }}>  {/* ↑ was 10px */}
              ✦ CERTIFICATIONS
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
              {CERTS.map(c => (
                <div key={c.name}
                  style={{ background:"rgba(30,6,64,0.9)", border:"1px solid rgba(192,112,255,0.2)",
                    borderRadius:"12px", padding:"1.1rem 1.4rem",
                    display:"flex", alignItems:"center", gap:"16px", transition:"all 0.2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(240,192,64,0.45)"; e.currentTarget.style.transform="translateX(5px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(192,112,255,0.2)"; e.currentTarget.style.transform=""; }}>
                  <div style={{ color:"#f0c040", flexShrink:0 }}><c.Icon /></div>
                  <div>
                    {/* Cert name */}
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:"14px", color:"#f5e6ff", fontWeight:600, marginBottom:"3px" }}>{c.name}</div>  {/* ↑ was 12px */}
                    {/* Issuer */}
                    <div style={{ fontSize:"13px", color:"#c070ff", marginBottom:"2px" }}>{c.issuer}</div>  {/* ↑ was 11px */}
                    {/* Year */}
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"12px", color:"#8060a0" }}>{c.year}</div>  {/* ↑ was 10px */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Experience;