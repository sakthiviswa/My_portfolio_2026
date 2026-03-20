import { forwardRef } from "react";
import SectionHeader from "../components/SectionHeader";

const EDU = [
  {
    side:"left",
    period:"2022 → 2026",
    school:"Sri Krishna College of Technology",
    location:"Coimbatore, India",
    degree:"B.E. Computer Science Engineering",
    score:"CGPA: 7.54",
    dotColor:"#f0c040",
    dotGlow:"rgba(240,192,64,0.7)",
    accent:"#f0c040",
    scoreBorder:"rgba(240,192,64,0.4)",
    scoreBg:"rgba(240,192,64,0.1)",
    cardBorder:"rgba(240,192,64,0.2)",
    desc:"Specialising in full-stack development, AI/ML fundamentals, data structures, and software engineering principles.",
  },
  {
    side:"right",
    period:"2021 → 2023",
    school:"Lotus Matric Hr. Sec. School",
    location:"Salem, Tamil Nadu",
    degree:"Higher Secondary (12th)",
    score:"Score: 86%",
    dotColor:"#c070ff",
    dotGlow:"rgba(192,112,255,0.7)",
    accent:"#c070ff",
    scoreBorder:"rgba(192,112,255,0.45)",
    scoreBg:"rgba(192,112,255,0.1)",
    cardBorder:"rgba(192,112,255,0.22)",
    desc:"Strong foundation in Mathematics, Computer Science & Physics — the spark that ignited the passion for engineering.",
  },
];

const Education = forwardRef(function Education(_, ref) {
  return (
    <section
      ref={ref}
      className="page-section"
      style={{
        background:
          "radial-gradient(ellipse at 80% 30%, rgba(106,31,160,0.28) 0%, transparent 58%)," +
          "#0d0118",
      }}
    >
      <SectionHeader eyebrow="ACADEMIC JOURNEY" title="Education" highlight="Map" />

      {/* Timeline grid */}
      <div style={{ position:"relative", maxWidth:"860px", width:"100%" }}>

        {/* Vertical center line */}
        <div style={{
          position:"absolute",
          left:"50%", top:"0", bottom:"0",
          width:"1px",
          background:"linear-gradient(180deg, transparent 0%, #f0c040 15%, #f0c040 85%, transparent 100%)",
          transform:"translateX(-50%)",
          pointerEvents:"none",
        }}/>

        {EDU.map((edu, i) => (
          <div key={i} style={{
            display:"grid",
            gridTemplateColumns:"1fr 60px 1fr",
            alignItems:"center",
            marginBottom: i < EDU.length - 1 ? "1.5rem" : 0,
          }}>

            {/* LEFT SLOT */}
            {edu.side === "left" ? (
              /* Card on the left */
              <div
                className="edu-card"
                style={{ border:`1px solid ${edu.cardBorder}`, textAlign:"right" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=edu.accent; e.currentTarget.style.transform="scale(1.02)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=edu.cardBorder; e.currentTarget.style.transform="scale(1)"; }}
              >
                <div className="edu-period" style={{ color:edu.accent }}>{edu.period}</div>
                <div className="edu-school" style={{ color:edu.accent }}>{edu.school}</div>
                <div className="edu-loc">{edu.location}</div>
                <span className="edu-score" style={{ border:`1px solid ${edu.scoreBorder}`, background:edu.scoreBg, color:edu.accent }}>{edu.score}</span>
              </div>
            ) : (
              /* Text on the left */
              <div className="edu-card-ghost" style={{ textAlign:"right", paddingRight:"1rem" }}>
                <div className="edu-degree">{edu.degree}</div>
                <p className="edu-desc">{edu.desc}</p>
              </div>
            )}

            {/* CENTER DOT */}
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", zIndex:2, paddingTop:"1.8rem", paddingBottom:"1.8rem" }}>
              <div style={{
                width:"18px", height:"18px", borderRadius:"50%",
                background:edu.dotColor,
                border:"3px solid #0d0118",
                boxShadow:`0 0 16px ${edu.dotGlow}`,
                flexShrink:0,
              }}/>
            </div>

            {/* RIGHT SLOT */}
            {edu.side === "right" ? (
              /* Card on the right */
              <div
                className="edu-card"
                style={{ border:`1px solid ${edu.cardBorder}`, textAlign:"left" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=edu.accent; e.currentTarget.style.transform="scale(1.02)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=edu.cardBorder; e.currentTarget.style.transform="scale(1)"; }}
              >
                <div className="edu-period" style={{ color:edu.accent }}>{edu.period}</div>
                <div className="edu-school" style={{ color:edu.accent }}>{edu.school}</div>
                <div className="edu-loc">{edu.location}</div>
                <span className="edu-score" style={{ border:`1px solid ${edu.scoreBorder}`, background:edu.scoreBg, color:edu.accent }}>{edu.score}</span>
              </div>
            ) : (
              /* Text on the right */
              <div className="edu-card-ghost" style={{ textAlign:"left", paddingLeft:"1rem" }}>
                <div className="edu-degree">{edu.degree}</div>
                <p className="edu-desc">{edu.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
});

export default Education;