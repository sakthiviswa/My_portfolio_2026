const LABELS = [
  "Home",
  "Education",
  "GitHub",
  "Skills",
  "Coding",
  "Projects",
  "Experience",
  "Contact",
];

export default function Navbar({ activePage, goPage }) {
  return (
    <nav className="portfolio-nav">
      {/* Logo */}
      <div className="nav-logo" style={{ fontSize: "1.3rem", letterSpacing: "0.08em" }}>
        SAKTHI<span>VISWA</span>
      </div>

      {/* Dot indicators */}
      <div className="nav-dots">
        {LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => goPage(i)}
            title={label}
            className={`nav-dot${activePage === i ? " active" : ""}`}
          />
        ))}
      </div>

      {/* Text links */}
      <div className="nav-links">
        {LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => goPage(i)}
            className={`nav-link${activePage === i ? " active" : ""}`}
            style={{ fontSize: "1rem", letterSpacing: "0.06em" }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}