import { forwardRef, useEffect, useRef, useState } from "react";
import SectionHeader from "../components/SectionHeader";

/* ── Standard SVG icons ── */
const GithubIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
const ForkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/>
    <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>
  </svg>
);
const CommitIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <circle cx="12" cy="12" r="3"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>
  </svg>
);
const RepoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <path d="M3 3h18v18H3zM3 9h18M9 21V9"/>
  </svg>
);
const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2Z"/>
  </svg>
);

/* ════════════════════════════════════════════
   CONFIG  ← your GitHub username here
════════════════════════════════════════════ */
const GITHUB_USERNAME = "sakthiviswa";

/* Contribution heatmap colours */
const LEVEL_COLORS = [
  "#1a0533",               // L0 – empty
  "rgba(106,31,160,0.5)",  // L1
  "rgba(155,64,212,0.75)", // L2
  "rgba(192,112,255,0.9)", // L3
  "#f0c040",               // L4 – gold
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* Animated counter */
function useCounter(target, duration = 1200, trigger) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger || !target) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, trigger]);
  return val;
}

/* ════════════════════════════════════════════
   FETCH helpers
════════════════════════════════════════════ */

/* REST API — public user info + repos (no token needed) */
async function fetchUserData(username) {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
  ]);
  if (!userRes.ok) throw new Error("GitHub user not found");
  const user  = await userRes.json();
  const repos = await reposRes.json();
  return { user, repos };
}

/*
  Contribution data requires the GraphQL API with a token.
  We fetch from a public proxy (github-contributions-api)
  which returns daily counts without authentication.
*/
async function fetchContributions(username) {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
  );
  if (!res.ok) throw new Error("Contributions fetch failed");
  const data = await res.json();
  // data.contributions: [{ date:"2024-03-20", count:3, level:0|1|2|3|4 }]
  return data.contributions || [];
}

/* ════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════ */
const GitHub = forwardRef(function GitHub(_, ref) {
  const sectionRef = useRef(null);
  const [visible,       setVisible]       = useState(false);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);

  /* GitHub data */
  const [user,          setUser]          = useState(null);
  const [repos,         setRepos]         = useState([]);
  const [contributions, setContributions] = useState([]); // [{date,count,level}]
  const [totalCommits,  setTotalCommits]  = useState(0);

  /* Merge refs */
  const setRef = (el) => {
    sectionRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };

  /* Trigger when visible */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Fetch on first visibility */
  useEffect(() => {
    if (!visible) return;
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const [{ user: u, repos: r }, contribs] = await Promise.all([
          fetchUserData(GITHUB_USERNAME),
          fetchContributions(GITHUB_USERNAME),
        ]);

        if (cancelled) return;

        setUser(u);

        /* Top 4 repos by stars */
        const sorted = [...r]
          .filter(repo => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 2);
        setRepos(sorted);

        setContributions(contribs);
        setTotalCommits(contribs.reduce((s, d) => s + d.count, 0));
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [visible]);

  /* Animated counters — fire once data is loaded */
  const dataReady     = !loading && !error && !!user;
  const cCommits      = useCounter(totalCommits,              1400, dataReady);
  const cRepos        = useCounter(user?.public_repos || 0,  900,  dataReady);
  const cFollowers    = useCounter(user?.followers || 0,     800,  dataReady);
  const cFollowing    = useCounter(user?.following || 0,     800,  dataReady);

  /* Build 52-week heatmap grid from contribution data */
  const buildGrid = () => {
    if (!contributions.length) return null;

    /* Group by ISO week (Sun-Sat) */
    const byDate = {};
    contributions.forEach(d => { byDate[d.date] = d; });

    /* Start from 52 weeks ago (most recent Sunday) */
    const today = new Date();
    const startDay = new Date(today);
    startDay.setDate(today.getDate() - 364);
    // align to Sunday
    startDay.setDate(startDay.getDate() - startDay.getDay());

    const weeks = [];
    let cur = new Date(startDay);
    for (let w = 0; w < 53; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const iso  = cur.toISOString().slice(0, 10);
        const info = byDate[iso];
        week.push({ date: iso, level: info ? info.level : 0, count: info ? info.count : 0 });
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  };

  /* Month labels for grid */
  const buildMonthLabels = (weeks) => {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const m = new Date(week[0].date).getMonth();
      if (m !== lastMonth) {
        labels.push({ idx: wi, label: MONTHS[m] });
        lastMonth = m;
      }
    });
    return labels;
  };

  const weeks       = contributions.length ? buildGrid() : null;
  const monthLabels = weeks ? buildMonthLabels(weeks) : [];

  const STATS = [
    { label:"COMMITS",   val:cCommits,   Icon:CommitIcon },
    { label:"REPOS",     val:cRepos,     Icon:RepoIcon   },
    { label:"FOLLOWERS", val:cFollowers, Icon:GithubIcon },
    { label:"FOLLOWING", val:cFollowing, Icon:FlameIcon  },
  ];

  /* ── RENDER ── */
  return (
    <section
      ref={setRef}
      className="page-section"
      style={{
        justifyContent: "flex-start",
        paddingTop: "90px",
        background:
          "radial-gradient(ellipse at 10% 60%, rgba(106,31,160,0.32) 0%, transparent 55%)," +
          "radial-gradient(ellipse at 90% 20%, rgba(155,64,212,0.18) 0%, transparent 45%)," +
          "#0d0118",
      }}
    >
      <SectionHeader eyebrow="OPEN SOURCE ACTIVITY" title="GitHub" highlight="Contributions" />

      {/* ── Loading / Error ── */}
      {loading && (
        <div style={{ textAlign:"center", padding:"3rem 0" }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"12px", letterSpacing:"0.2em", color:"#8060a0" }}>
            FETCHING GITHUB DATA...
          </div>
          {/* Pulsing dots */}
          <div style={{ display:"flex", gap:"8px", justifyContent:"center", marginTop:"1rem" }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width:"8px", height:"8px", borderRadius:"50%",
                background:"#6a1fa0",
                animation:`pulse 1.2s ${i*0.2}s ease-in-out infinite`,
              }}/>
            ))}
          </div>
          <style>{`@keyframes pulse{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}`}</style>
        </div>
      )}

      {error && (
        <div style={{
          background:"rgba(239,71,67,0.1)", border:"1px solid rgba(239,71,67,0.3)",
          borderRadius:"12px", padding:"1.2rem 2rem", maxWidth:"500px",
          textAlign:"center", marginTop:"1rem",
        }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"12px", color:"#EF4743", marginBottom:"8px" }}>
            FAILED TO LOAD GITHUB DATA
          </div>
          <div style={{ fontSize:"12px", color:"#8060a0" }}>{error}</div>
          <div style={{ fontSize:"11px", color:"#8060a0", marginTop:"8px" }}>
            Check that <strong style={{color:"#f0c040"}}>GITHUB_USERNAME</strong> in GitHub.jsx is correct.
          </div>
        </div>
      )}

      {/* ── Content once loaded ── */}
      {dataReady && (
        <>
          {/* Profile strip */}
          <div style={{
            display:"flex", alignItems:"center", gap:"1.2rem",
            background:"rgba(30,6,64,0.9)", border:"1px solid rgba(240,192,64,0.18)",
            borderRadius:"16px", padding:"1rem 1.6rem",
            maxWidth:"860px", width:"100%", marginBottom:"1.4rem",
          }}>
            {/* Real GitHub avatar */}
            <img
              src={user.avatar_url}
              alt={user.login}
              style={{ width:"56px", height:"56px", borderRadius:"50%", border:"2px solid rgba(240,192,64,0.35)", flexShrink:0, objectFit:"cover" }}
            />
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:"17px", fontWeight:700, color:"#f0c040" }}>
                {user.name || user.login}
              </div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", color:"#8060a0" }}>
                @{user.login}
              </div>
              {user.bio && (
                <div style={{ fontSize:"12px", color:"#c4a0e8", marginTop:"4px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {user.bio}
                </div>
              )}
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank" rel="noreferrer"
              className="btn-ghost"
              style={{ fontSize:"10px", padding:"7px 16px", whiteSpace:"nowrap", display:"inline-flex", alignItems:"center", gap:"6px" }}
            >
              <GithubIcon size={13} /> VIEW PROFILE ↗
            </a>
          </div>

          {/* Stat counters */}
          <div style={{
            display:"grid", gridTemplateColumns:"repeat(4,1fr)",
            gap:"12px", maxWidth:"860px", width:"100%", marginBottom:"1.4rem",
          }}>
            {STATS.map(({ label, val, Icon }) => (
              <div key={label} style={{
                background:"rgba(30,6,64,0.9)", border:"1px solid rgba(240,192,64,0.13)",
                borderRadius:"14px", padding:"1.1rem 1rem", textAlign:"center",
              }}>
                <div style={{ display:"flex", justifyContent:"center", color:"#f0c040", marginBottom:"6px" }}>
                  <Icon />
                </div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"1.9rem", fontWeight:500, color:"#f0c040", lineHeight:1 }}>
                  {val}
                </div>
                <div style={{ fontSize:"9px", letterSpacing:"0.12em", color:"#8060a0", marginTop:"5px" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Contribution heatmap */}
          {weeks && (
            <div style={{
              background:"rgba(30,6,64,0.9)", border:"1px solid rgba(240,192,64,0.13)",
              borderRadius:"16px", padding:"1.3rem 1.5rem",
              maxWidth:"860px", width:"100%", marginBottom:"1.4rem",
            }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:"10px", letterSpacing:"0.18em", color:"#8060a0", marginBottom:"10px" }}>
                ✦ CONTRIBUTION ACTIVITY — PAST 12 MONTHS · {totalCommits} TOTAL ✦
              </div>

              {/* Month label row */}
              <div style={{ display:"flex", marginBottom:"4px", paddingLeft:"0px", position:"relative", height:"14px" }}>
                {monthLabels.map(({ idx, label }) => (
                  <div key={`${idx}-${label}`} style={{
                    position:"absolute",
                    left:`${(idx / weeks.length) * 100}%`,
                    fontFamily:"'JetBrains Mono',monospace",
                    fontSize:"9px", color:"#8060a0",
                  }}>{label}</div>
                ))}
              </div>

              {/* Grid — render as columns (weeks) */}
              <div style={{ display:"flex", gap:"2px" }}>
                {weeks.map((week, wi) => (
                  <div key={wi} style={{ display:"flex", flexDirection:"column", gap:"2px", flex:1 }}>
                    {week.map((day, di) => (
                      <div
                        key={di}
                        title={`${day.date} — ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                        style={{
                          width:"100%",
                          aspectRatio:"1",
                          borderRadius:"2px",
                          background: LEVEL_COLORS[day.level] || LEVEL_COLORS[0],
                          cursor:"pointer",
                          transition:"transform 0.1s",
                          boxShadow: day.level === 4 ? "0 0 4px rgba(240,192,64,0.55)" : "none",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform="scale(1.8)"; e.currentTarget.style.zIndex="20"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.zIndex=""; }}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div style={{ display:"flex", alignItems:"center", gap:"5px", marginTop:"8px", justifyContent:"flex-end" }}>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"9px", color:"#8060a0" }}>Less</span>
                {LEVEL_COLORS.map((c, i) => (
                  <div key={i} style={{ width:"10px", height:"10px", borderRadius:"2px", background:c, border: i===0 ? "1px solid rgba(240,192,64,0.15)" : "none" }} />
                ))}
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"9px", color:"#8060a0" }}>More</span>
              </div>
            </div>
          )}

          {/* Pinned repos — real data */}
          {repos.length > 0 && (
            <div style={{ maxWidth:"860px", width:"100%" }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:"10px", letterSpacing:"0.18em", color:"#8060a0", marginBottom:"10px" }}>
                ✦ TOP REPOSITORIES ✦
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"12px" }}>
                {repos.map(repo => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank" rel="noreferrer"
                    style={{
                      display:"block", textDecoration:"none",
                      background:"rgba(30,6,64,0.9)", border:"1px solid rgba(240,192,64,0.13)",
                      borderRadius:"14px", padding:"1.1rem 1.3rem", transition:"border-color 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(240,192,64,0.45)"; e.currentTarget.style.transform="translateY(-3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(240,192,64,0.13)"; e.currentTarget.style.transform=""; }}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"5px" }}>
                      <div style={{ color:"#c070ff" }}><GithubIcon size={16}/></div>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"13px", fontWeight:500, color:"#c070ff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {repo.name}
                      </span>
                    </div>

                    <p style={{ fontSize:"11px", color:"#8060a0", lineHeight:1.55, marginBottom:"10px",
                      display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                      {repo.description || "No description"}
                    </p>

                    <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                      {repo.language && (
                        <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                          <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:"#c070ff" }} />
                          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"10px", color:"#8060a0" }}>{repo.language}</span>
                        </div>
                      )}
                      <div style={{ display:"flex", alignItems:"center", gap:"4px", color:"#f0c040" }}>
                        <StarIcon />
                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"10px", color:"#8060a0" }}>{repo.stargazers_count}</span>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:"4px", color:"#8060a0" }}>
                        <ForkIcon />
                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"10px" }}>{repo.forks_count}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
});

export default GitHub;