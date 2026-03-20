import { forwardRef, useEffect, useRef } from "react";
import profileImg from "../assets/public.png";

/* ── Standard SVG icons ── */
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-10 7L2 7"/>
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12 19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 2.96 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const CONTACTS = [
  { Icon: MailIcon,     label: "Email",    val: "sakthiviswa61@gmail.com",   href: "mailto:sakthiviswa61@gmail.com" },
  { Icon: PhoneIcon,    label: "Phone",    val: "+91 7373567056",            href: "tel:+917373567056" },
  { Icon: MapPinIcon,   label: "Location", val: "Coimbatore, India",         href: null },
  { Icon: GithubIcon,   label: "GitHub",   val: "github.com/sakthiviswa",    href: "https://github.com/sakthiviswa" },
  { Icon: LinkedinIcon, label: "LinkedIn", val: "in/sakthinathan-v",         href: "https://linkedin.com/in/sakthinathan-v-374a202a2" },
];

/* ══════════════════════════════════════════
   FLOATING ORB + NEBULA GLOW  (all violet)
   ══════════════════════════════════════════ */

/* ── Twinkling violet star dust ── */
function NebulaStars() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const makeStars = () => Array.from({ length: 120 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.2 + 0.2,
      a:  Math.random(),
      da: (Math.random() - 0.5) * 0.004,
      hue: [265, 270, 275, 280, 290][Math.floor(Math.random() * 5)],
    }));
    resize();
    let s = makeStars();
    window.addEventListener("resize", () => { resize(); s = makeStars(); });
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      s.forEach((star) => {
        star.a += star.da;
        if (star.a <= 0.05 || star.a >= 0.95) star.da *= -1;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 60%, 85%, ${star.a * 0.7})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0 }} />
  );
}

/* ── Drifting violet nebula blobs ── */
function NebulaClouds() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const blobs = [
      { cx:0.72, cy:0.30, rx:320, ry:220, hue:270, sat:80, lit:50, baseA:0.07 },
      { cx:0.85, cy:0.65, rx:260, ry:180, hue:280, sat:75, lit:55, baseA:0.06 },
      { cx:0.60, cy:0.15, rx:200, ry:140, hue:265, sat:70, lit:60, baseA:0.05 },
      { cx:0.78, cy:0.80, rx:180, ry:120, hue:275, sat:65, lit:58, baseA:0.055 },
    ];
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach((b, i) => {
        const drift = Math.sin(t * 0.0006 + i * 1.4) * 18;
        const pulse = 1 + Math.sin(t * 0.0009 + i * 0.8) * 0.08;
        const cx = canvas.width  * b.cx + drift;
        const cy = canvas.height * b.cy + drift * 0.5;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.rx * pulse);
        g.addColorStop(0,    `hsla(${b.hue},${b.sat}%,${b.lit}%,${b.baseA * 1.6})`);
        g.addColorStop(0.45, `hsla(${b.hue},${b.sat}%,${b.lit - 5}%,${b.baseA})`);
        g.addColorStop(1,    `hsla(${b.hue},${b.sat}%,${b.lit - 15}%,0)`);
        ctx.save();
        ctx.scale(1, b.ry / b.rx);
        ctx.beginPath();
        ctx.arc(cx, cy * (b.rx / b.ry), b.rx * pulse, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.restore();
      });
      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0 }} />
  );
}

/* ── Floating Orb: bobbing photo + layered violet halo rings ── */
function FloatingOrb() {
  const PHOTO_D = 480;  // ← increased from 360
  const WRAP_D  = 700;  // ← increased from 560

  return (
    <>
      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-14px) rotate(0.8deg); }
          66%       { transform: translateY(-8px) rotate(-0.5deg); }
        }
        @keyframes halo1Spin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes halo2Spin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(-360deg); }
        }
        @keyframes halo3Pulse {
          0%,100% { opacity:0.35; transform:translate(-50%,-50%) scale(1); }
          50%     { opacity:0.55; transform:translate(-50%,-50%) scale(1.03); }
        }
        @keyframes sheen {
          0%   { opacity:0; transform:translateX(-120%) rotate(35deg); }
          18%  { opacity:0.18; }
          40%  { opacity:0; transform:translateX(180%) rotate(35deg); }
          100% { opacity:0; transform:translateX(180%) rotate(35deg); }
        }
      `}</style>

      <div style={{
        position:"relative", width:WRAP_D, height:WRAP_D,
        flexShrink:0, animation:"orbFloat 7s ease-in-out infinite",
        zIndex:1, margin:"0 auto",
      }}>

        {/* Outermost nebula bloom */}
        <div style={{
          position:"absolute", top:"50%", left:"50%",
          width:WRAP_D * 1.55, height:WRAP_D * 1.55,
          borderRadius:"50%", transform:"translate(-50%,-50%)",
          background:"radial-gradient(circle, hsla(270,90%,65%,0.08) 0%, hsla(275,85%,60%,0.06) 35%, hsla(270,80%,50%,0.03) 65%, transparent 80%)",
          pointerEvents:"none",
        }} />

        {/* Halo ring 3 — slow pulse */}
        <div style={{
          position:"absolute", top:"50%", left:"50%",
          width:PHOTO_D + 170, height:PHOTO_D + 170,
          borderRadius:"50%",
          animation:"halo3Pulse 5s ease-in-out infinite",
          border:"1px solid hsla(270,85%,70%,0.18)",
          background:"radial-gradient(circle, transparent 40%, hsla(272,80%,65%,0.05) 70%, hsla(278,75%,55%,0.08) 100%)",
          boxShadow:"0 0 60px hsla(270,80%,65%,0.12), inset 0 0 40px hsla(275,75%,60%,0.06)",
          pointerEvents:"none",
        }} />

        {/* Halo ring 2 — slow CCW spin */}
        <div style={{
          position:"absolute", top:"50%", left:"50%",
          width:PHOTO_D + 110, height:PHOTO_D + 110,
          borderRadius:"50%",
          animation:"halo2Spin 22s linear infinite",
          backgroundImage:"conic-gradient(hsla(268,90%,72%,0.28) 0deg, transparent 20deg, hsla(278,80%,70%,0.22) 45deg, transparent 65deg, hsla(272,85%,68%,0.25) 120deg, transparent 140deg, hsla(280,80%,65%,0.20) 200deg, transparent 220deg, hsla(265,90%,72%,0.22) 300deg, transparent 320deg, hsla(268,90%,72%,0.28) 360deg)",
          WebkitMask:"radial-gradient(farthest-side, transparent calc(100% - 1.5px), white calc(100% - 1.5px))",
          mask:"radial-gradient(farthest-side, transparent calc(100% - 1.5px), white calc(100% - 1.5px))",
          pointerEvents:"none",
        }} />

        {/* Halo ring 1 — slow CW spin */}
        <div style={{
          position:"absolute", top:"50%", left:"50%",
          width:PHOTO_D + 60, height:PHOTO_D + 60,
          borderRadius:"50%",
          animation:"halo1Spin 30s linear infinite",
          backgroundImage:"conic-gradient(hsla(268,100%,75%,0.35) 0deg, transparent 15deg, hsla(278,85%,72%,0.30) 70deg, transparent 90deg, hsla(272,90%,70%,0.32) 160deg, transparent 175deg, hsla(282,80%,68%,0.28) 250deg, transparent 265deg, hsla(265,95%,72%,0.30) 330deg, transparent 345deg, hsla(268,100%,75%,0.35) 360deg)",
          WebkitMask:"radial-gradient(farthest-side, transparent calc(100% - 1px), white calc(100% - 1px))",
          mask:"radial-gradient(farthest-side, transparent calc(100% - 1px), white calc(100% - 1px))",
          pointerEvents:"none",
        }} />

        {/* Glassy violet border glow */}
        <div style={{
          position:"absolute", top:"50%", left:"50%",
          transform:"translate(-50%,-50%)",
          width:PHOTO_D + 24, height:PHOTO_D + 24,
          borderRadius:"50%", background:"transparent",
          boxShadow:[
            "0 0 0 1px hsla(270,90%,75%,0.30)",
            "0 0 30px hsla(272,85%,65%,0.35)",
            "0 0 70px hsla(275,80%,60%,0.20)",
            "0 0 120px hsla(278,75%,55%,0.12)",
            "inset 0 0 20px hsla(268,90%,75%,0.12)",
          ].join(", "),
          pointerEvents:"none",
        }} />

        {/* Photo */}
        <div style={{
          position:"absolute", top:"50%", left:"50%",
          transform:"translate(-50%,-50%)",
          width:PHOTO_D, height:PHOTO_D,
          borderRadius:"50%", overflow:"hidden",
          background:"hsla(270,30%,10%,1)",
          border:"4px solid rgba(155,64,212,0.8)",
          boxShadow:"0 0 40px rgba(155,64,212,0.6), 0 0 80px rgba(106,31,160,0.35)",
        }}>
          {/* sheen sweep */}
          <div style={{ position:"absolute", inset:0, zIndex:2, overflow:"hidden", borderRadius:"50%", pointerEvents:"none" }}>
            <div style={{
              position:"absolute", top:"-30%", left:0,
              width:"55%", height:"160%",
              background:"linear-gradient(to right, transparent, hsla(0,0%,100%,0.09), transparent)",
              animation:"sheen 6s ease-in-out infinite 1.5s",
            }} />
          </div>
          <img
            src={profileImg}
            alt="Sakthinathan V"
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block", position:"relative", zIndex:1 }}
          />
        </div>

      </div>
    </>
  );
}

/* ══════════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════════ */
const Hero = forwardRef(function Hero({ goPage }, ref) {
  return (
    <section
      ref={ref}
      className="page-section"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 22% 50%, rgba(106,31,160,0.45) 0%, transparent 55%), " +
          "radial-gradient(ellipse at 85% 15%, rgba(155,64,212,0.22) 0%, transparent 45%), " +
          "#0d0118",
      }}
    >
      <NebulaStars />
      <NebulaClouds />

      <div className="hero-grid" style={{ position:"relative", zIndex:1 }}>

        {/* LEFT: text */}
        <div className="anim-d1">

          <div className="hero-badge" style={{ fontSize:"15px", letterSpacing:"0.12em" }}>
            ✦ FULLSTACK DEVELOPER ✦
          </div>

          <h1 className="hero-name" style={{ fontSize:"clamp(2.6rem, 5vw, 4.2rem)", lineHeight:1.05, marginBottom:"0.5rem" }}>
            SAKTHINATHAN V
          </h1>

          <p className="hero-sub" style={{ fontSize:"clamp(1rem, 1.8vw, 1.25rem)", marginBottom:"1rem", letterSpacing:"0.04em" }}>
            React.js · React Native · Python · Java · UI/UX
          </p>

          <p className="hero-bio" style={{ fontSize:"clamp(0.95rem, 1.4vw, 1.1rem)", lineHeight:1.75, marginBottom:"1.2rem" }}>
            Aspiring software engineer pursuing B.E. Computer Science Engineering.
            Passionate about crafting immersive web &amp; mobile applications with
            user-centric design and clean, performant code.
          </p>

          <div style={{ display:"flex", flexDirection:"column", gap:"11px", marginBottom:"1.2rem" }}>
            {CONTACTS.map(({ Icon, label, val, href }) => (
              <div key={label} className="contact-info-row" style={{ fontSize:"1rem" }}>
                <span className="contact-info-icon" style={{ width:"20px", height:"20px" }}><Icon /></span>
                <span className="contact-info-label" style={{ fontSize:"0.9rem", minWidth:"72px" }}>{label}</span>
                <span className="contact-info-val" style={{ fontSize:"1rem" }}>
                  {href
                    ? <a href={href} target="_blank" rel="noreferrer">{val}</a>
                    : val}
                </span>
              </div>
            ))}
          </div>

          <div className="hero-btns">
            <button className="btn-gold"  onClick={() => goPage(4)} style={{ fontSize:"1rem", padding:"0.7rem 1.8rem" }}>View Projects</button>
            <button className="btn-ghost" onClick={() => goPage(6)} style={{ fontSize:"1rem", padding:"0.7rem 1.8rem" }}>Let's Connect</button>
          </div>
        </div>

        {/* RIGHT: Floating Orb */}
        <div className="hero-moon-col" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"100%" }}>
          <FloatingOrb />
        </div>

      </div>

      <div className="scroll-hint" style={{ position:"relative", zIndex:1 }}>
        <span>SCROLL</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
});

export default Hero;