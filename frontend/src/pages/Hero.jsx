import { forwardRef } from "react";

/* ── Standard SVG icons (no emoji, no color libraries) ── */
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
  { Icon:MailIcon,     label:"Email",    val:"sakthiviswa61@gmail.com",        href:"mailto:sakthiviswa61@gmail.com" },
  { Icon:PhoneIcon,    label:"Phone",    val:"+91 7373567056",                 href:"tel:+917373567056" },
  { Icon:MapPinIcon,   label:"Location", val:"Coimbatore, India",              href:null },
  { Icon:GithubIcon,   label:"GitHub",   val:"github.com/sakthiviswa",         href:"https://github.com/sakthiviswa" },
  { Icon:LinkedinIcon, label:"LinkedIn", val:"in/sakthinathan-v",              href:"https://linkedin.com/in/sakthinathan-v-374a202a2" },
];

const Hero = forwardRef(function Hero({ goPage }, ref) {
  return (
    <section
      ref={ref}
      className="page-section"
      style={{
        background:
          "radial-gradient(ellipse at 22% 50%, rgba(106,31,160,0.45) 0%, transparent 55%), " +
          "radial-gradient(ellipse at 85% 15%, rgba(155,64,212,0.22) 0%, transparent 45%), " +
          "#0d0118",
      }}
    >
      <div className="hero-grid">
        {/* ── LEFT CONTENT ── */}
        <div className="anim-d1">
          <div className="hero-badge">✦ FULLSTACK DEVELOPER ✦</div>

          <h1 className="hero-name">SAKTHINATHAN V</h1>

          <p className="hero-sub">React.js · React Native · Python · Java · UI/UX</p>

          <p className="hero-bio">
            Aspiring software engineer pursuing B.E. Computer Science Engineering.
            Passionate about crafting immersive web &amp; mobile applications with
            user-centric design and clean, performant code.
          </p>

          {/* Contact info rows */}
          <div style={{ display:"flex", flexDirection:"column", gap:"9px", marginBottom:"0.5rem" }}>
            {CONTACTS.map(({ Icon, label, val, href }) => (
              <div key={label} className="contact-info-row">
                <span className="contact-info-icon">
                  <Icon />
                </span>
                <span className="contact-info-label">{label}</span>
                <span className="contact-info-val">
                  {href
                    ? <a href={href} target="_blank" rel="noreferrer">{val}</a>
                    : val}
                </span>
              </div>
            ))}
          </div>

          <div className="hero-btns">
            <button className="btn-gold" onClick={() => goPage(4)}>View Projects</button>
            <button className="btn-ghost" onClick={() => goPage(6)}>Let's Connect</button>
          </div>
        </div>

        {/* ── MOON DECORATION ── */}
        <div className="hero-moon-col" style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:"200px", height:"200px" }}>
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="moon-svg">
              <path d="M100 12 Q168 44 168 100 Q168 156 100 188 Q136 156 136 100 Q136 44 100 12Z" fill="#f0c040"/>
              <circle cx="126" cy="56"  r="5"   fill="#f0c040" opacity="0.9"/>
              <circle cx="148" cy="100" r="3.5" fill="#f0c040" opacity="0.7"/>
              <circle cx="132" cy="148" r="4"   fill="#f0c040" opacity="0.8"/>
              <circle cx="112" cy="174" r="2.5" fill="#f0c040" opacity="0.5"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <span>SCROLL</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
});

export default Hero;