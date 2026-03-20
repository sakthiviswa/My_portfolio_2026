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

/* ── Sizes ── */
const SIZE  = 560;
const INNER = 218;

/* ── Stars ── */
function HeroStars() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const makeStars = () => Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.3,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.007,
      col: Math.random() > 0.55 ? "#f0c040" : "#c070ff",
    }));
    resize();
    let s = makeStars();
    window.addEventListener("resize", () => { resize(); s = makeStars(); });
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      s.forEach((star) => {
        star.a += star.da;
        if (star.a <= 0 || star.a >= 1) star.da *= -1;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle   = star.col;
        ctx.globalAlpha = Math.max(0, Math.min(1, star.a));
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0 }} />
  );
}

/* ── Equalizer ring + profile photo ── */
function EqualizerRing() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const CX = SIZE / 2, CY = SIZE / 2;
    const BARS = 110, MAX_H = 70;
    canvas.width = SIZE; canvas.height = SIZE;
    const bars = Array.from({ length: BARS }, () => ({
      phase: Math.random() * Math.PI * 2,
      speed: 0.014 + Math.random() * 0.02,
      minH:  6 + Math.random() * 8,
      maxH:  22 + Math.random() * (MAX_H - 22),
    }));
    const PALETTE = [
      { h:265, s:90, l:68 },
      { h:280, s:95, l:65 },
      { h:295, s:88, l:63 },
      { h:310, s:80, l:62 },
      { h: 45, s:95, l:60 },
      { h:280, s:95, l:65 },
    ];
    const colorAt = (angle) => {
      const norm = ((angle / (Math.PI * 2)) + 1) % 1;
      const total = PALETTE.length - 1;
      const pos = norm * total;
      const lo = Math.floor(pos), hi = Math.min(lo + 1, total);
      const mix = pos - lo;
      const a = PALETTE[lo], b = PALETTE[hi];
      return { h: a.h+(b.h-a.h)*mix, s: a.s+(b.s-a.s)*mix, l: a.l+(b.l-a.l)*mix };
    };
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      bars.forEach((bar, i) => {
        const angle  = (i / BARS) * Math.PI * 2 - Math.PI / 2;
        const height = bar.minH + (bar.maxH - bar.minH) * (0.5 + 0.5 * Math.sin(t * bar.speed + bar.phase));
        const x1 = CX + Math.cos(angle) * INNER, y1 = CY + Math.sin(angle) * INNER;
        const x2 = CX + Math.cos(angle) * (INNER + height), y2 = CY + Math.sin(angle) * (INNER + height);
        const { h, s, l } = colorAt(angle + Math.PI / 2);
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
        ctx.strokeStyle = `hsl(${h},${s}%,${l}%)`;
        ctx.lineWidth = 3; ctx.lineCap = "round";
        ctx.shadowColor = `hsl(${h},${s}%,${l+8}%)`; ctx.shadowBlur = 12;
        ctx.stroke(); ctx.shadowBlur = 0;
      });
      t++;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const PHOTO_D = INNER * 2 - 6;
  return (
    <div style={{ position:"relative", width:SIZE, height:SIZE, margin:"0 auto", flexShrink:0, zIndex:1 }}>
      <canvas ref={canvasRef} style={{ position:"absolute", top:0, left:0, width:SIZE, height:SIZE }} />
      <div style={{
        position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
        width:PHOTO_D, height:PHOTO_D, borderRadius:"50%", overflow:"hidden",
        border:"4px solid rgba(155,64,212,0.8)",
        boxShadow:"0 0 40px rgba(155,64,212,0.6), 0 0 80px rgba(106,31,160,0.35)",
      }}>
        <img src={profileImg} alt="Sakthinathan V"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }}
        />
      </div>
    </div>
  );
}

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
      <HeroStars />

      <div className="hero-grid" style={{ position:"relative", zIndex:1 }}>

        {/* LEFT: text */}
        <div className="anim-d1">

          {/* Badge */}
          <div className="hero-badge" style={{ fontSize:"15px", letterSpacing:"0.12em" }}>
            ✦ FULLSTACK DEVELOPER ✦
          </div>

          {/* Name */}
          <h1 className="hero-name" style={{ fontSize:"clamp(2.6rem, 5vw, 4.2rem)", lineHeight:1.05, marginBottom:"0.5rem" }}>
            SAKTHINATHAN V
          </h1>

          {/* Stack subtitle */}
          <p className="hero-sub" style={{ fontSize:"clamp(1rem, 1.8vw, 1.25rem)", marginBottom:"1rem", letterSpacing:"0.04em" }}>
            React.js · React Native · Python · Java · UI/UX
          </p>

          {/* Bio */}
          <p className="hero-bio" style={{ fontSize:"clamp(0.95rem, 1.4vw, 1.1rem)", lineHeight:1.75, marginBottom:"1.2rem" }}>
            Aspiring software engineer pursuing B.E. Computer Science Engineering.
            Passionate about crafting immersive web &amp; mobile applications with
            user-centric design and clean, performant code.
          </p>

          {/* Contact rows */}
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

        {/* RIGHT: photo + ring */}
        <div className="hero-moon-col" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"100%" }}>
          <EqualizerRing />
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