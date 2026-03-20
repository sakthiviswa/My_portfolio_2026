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
        <div className="nav-logo">SAKTHI<span>VISWA</span></div>
  
        {/* Dot indicators — one per page */}
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
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    );
  }