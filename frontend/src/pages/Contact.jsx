import { forwardRef, useState } from "react";
import SectionHeader from "../components/SectionHeader";

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12 19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 2.96 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const CARDS = [
  { Icon:MailIcon,     label:"EMAIL",    val:"sakthiviswa61@gmail.com",  href:"mailto:sakthiviswa61@gmail.com" },
  { Icon:PhoneIcon,    label:"PHONE",    val:"+91 7373567056",           href:"tel:+917373567056" },
  { Icon:LinkedinIcon, label:"LINKEDIN", val:"sakthinathan-v",           href:"https://linkedin.com/in/sakthinathan-v-374a202a2" },
];

const Contact = forwardRef(function Contact(_, ref) {
  const [form,    setForm]    = useState({ name:"", email:"", message:"" });
  const [status,  setStatus]  = useState(null);
  const [errMsgs, setErrMsgs] = useState([]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onFocus  = e => e.target.style.borderColor = "rgba(240,192,64,0.55)";
  const onBlur   = e => e.target.style.borderColor = "rgba(240,192,64,0.22)";

  const validate = () => {
    const errs = [];
    if (!form.name.trim())                            errs.push("Name is required.");
    if (!form.email.trim())                           errs.push("Email is required.");
    else if (!/[^@]+@[^@]+\.[^@]+/.test(form.email)) errs.push("Enter a valid email address.");
    if (!form.message.trim())                         errs.push("Message is required.");
    else if (form.message.trim().length < 10)         errs.push("Message must be at least 10 characters.");
    return errs;
  };

  const onSubmit = async e => {
    e.preventDefault(); setErrMsgs([]);
    const errs = validate();
    if (errs.length) { setErrMsgs(errs); setStatus("error"); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ name:form.name.trim(), email:form.email.trim(), message:form.message.trim() }),
      });
      if (res.ok) { setStatus("success"); setForm({ name:"", email:"", message:"" }); setErrMsgs([]); }
      else {
        try { const data = await res.json(); setErrMsgs(data.messages || (data.message ? [data.message] : ["Something went wrong."])); }
        catch { setErrMsgs(["Something went wrong. Please try again."]); }
        setStatus("error");
      }
    } catch { setErrMsgs(["Network error — make sure the server is running."]); setStatus("error"); }
  };

  return (
    <section ref={ref} className="page-section"
      style={{ background:"radial-gradient(ellipse at 50% 50%, rgba(106,31,160,0.35) 0%, transparent 62%), #0d0118" }}>
      <SectionHeader eyebrow="LET'S COLLABORATE" title="Get In" highlight="Touch" />

      {/* Intro */}
      <p style={{ fontSize:"16px", color:"#c4a0e8", maxWidth:"500px", textAlign:"center", lineHeight:1.75, marginBottom:"2rem" }}>  {/* ↑ was 14px */}
        Open to internship opportunities, freelance projects, and collaborations.
        Let's build something extraordinary together.
      </p>

      {/* Info cards */}
      <div className="contact-cards">
        {CARDS.map(c => (
          <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="contact-card">
            <div style={{ color:"#f0c040", display:"flex", justifyContent:"center", marginBottom:"10px" }}><c.Icon /></div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:"11px", letterSpacing:"0.15em", color:"#8060a0", marginBottom:"7px" }}>{c.label}</div>  {/* ↑ was 9px */}
            <div style={{ fontSize:"13px", color:"#c070ff", wordBreak:"break-all" }}>{c.val}</div>  {/* ↑ was 11px */}
          </a>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="cf-form" noValidate>
        <div className="cf-grid">
          <div>
            <label className="cf-label" style={{ fontSize:"12px" }}>YOUR NAME</label>  {/* ↑ */}
            <input name="name" value={form.name} onChange={onChange} required
              placeholder="Recruiter Name" className="cf-input" onFocus={onFocus} onBlur={onBlur}
              style={{ fontSize:"15px" }}/>  {/* ↑ */}
          </div>
          <div>
            <label className="cf-label" style={{ fontSize:"12px" }}>EMAIL</label>
            <input name="email" type="email" value={form.email} onChange={onChange} required
              placeholder="you@company.com" className="cf-input" onFocus={onFocus} onBlur={onBlur}
              style={{ fontSize:"15px" }}/>
          </div>
        </div>

        <label className="cf-label" style={{ fontSize:"12px" }}>MESSAGE</label>
        <textarea name="message" value={form.message} onChange={onChange} required rows={4}
          placeholder="Tell me about your project or opportunity..."
          className="cf-textarea" onFocus={onFocus} onBlur={onBlur}
          style={{ fontSize:"15px" }}/>

        {status === "success" && (
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:"13px", letterSpacing:"0.15em",
            color:"#50fa7b", textAlign:"center", marginBottom:"10px" }}>
            ✦ MESSAGE SENT — I'LL REPLY WITHIN 24 HOURS ✦
          </p>
        )}

        {status === "error" && errMsgs.length > 0 && (
          <div style={{ marginBottom:"10px" }}>
            {errMsgs.map((msg, i) => (
              <p key={i} style={{ fontFamily:"'Cinzel',serif", fontSize:"13px", letterSpacing:"0.1em",
                color:"#ff6e6e", textAlign:"center", margin:"3px 0" }}>
                ✦ {msg.toUpperCase()} ✦
              </p>
            ))}
          </div>
        )}

        <button type="submit" disabled={status === "loading"} className="btn-gold"
          style={{ width:"100%", textAlign:"center", fontSize:"15px",  /* ↑ */
            opacity: status === "loading" ? 0.5 : 1,
            cursor:  status === "loading" ? "not-allowed" : "pointer" }}>
          {status === "loading" ? "SENDING..." : "SEND MESSAGE ✦"}
        </button>
      </form>

      {/* Footer */}
      <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"13px", color:"#8060a0", marginTop:"2rem", textAlign:"center" }}>  {/* ↑ was 11px */}
        © 2025 Sakthinathan V · Crafted with ✦ Passion
      </p>
    </section>
  );
});

export default Contact;