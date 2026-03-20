import { forwardRef, useEffect, useRef, useState } from "react";
import SectionHeader from "../components/SectionHeader";

/* ── Brand SVG icons ── */
const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H19.7a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);
const GFGIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-1.44.24 4.43 4.43 0 0 1-1.659-.301 4.065 4.065 0 0 1-1.294-.862 3.963 3.963 0 0 1-.856-1.296 4.202 4.202 0 0 1-.302-1.594 4.24 4.24 0 0 1 .302-1.617 3.921 3.921 0 0 1 .856-1.293 4.107 4.107 0 0 1 1.294-.862 4.43 4.43 0 0 1 1.659-.301c.51 0 .993.08 1.44.24.447.159.84.39 1.167.695.327.305.571.66.714 1.05h-1.532a1.417 1.417 0 0 0-.462-.498 2.161 2.161 0 0 0-.631-.285 2.746 2.746 0 0 0-.696-.089c-.34 0-.658.06-.94.172a2.137 2.137 0 0 0-.731.492 2.188 2.188 0 0 0-.47.756 2.625 2.625 0 0 0-.165.952c0 .342.055.664.165.952.11.287.271.54.47.756.2.215.45.385.73.492.283.112.602.172.942.172.252 0 .496-.03.73-.09a2.16 2.16 0 0 0 .632-.285c.182-.127.337-.29.445-.498h1.549zm-10.2-1.735H6.12a2.04 2.04 0 0 0 .107.585c.11.287.272.54.47.756.2.215.449.385.73.492.283.112.6.172.94.172.252 0 .496-.03.73-.09a2.161 2.161 0 0 0 .632-.284c.181-.127.336-.29.444-.498h1.549c-.143.39-.387.745-.714 1.05a3.692 3.692 0 0 1-1.167.694 4.51 4.51 0 0 1-1.44.24 4.432 4.432 0 0 1-1.66-.3 4.064 4.064 0 0 1-1.293-.862 3.963 3.963 0 0 1-.856-1.296 4.202 4.202 0 0 1-.302-1.594c0-.568.1-1.103.302-1.617a3.921 3.921 0 0 1 .856-1.293 4.108 4.108 0 0 1 1.293-.862 4.432 4.432 0 0 1 1.66-.301c.574 0 1.11.1 1.595.302.485.201.9.484 1.228.843.327.36.566.784.705 1.264.075.27.117.553.124.84zm-1.488-.927a2.095 2.095 0 0 0-.462-.749 2.05 2.05 0 0 0-.714-.491 2.405 2.405 0 0 0-.94-.18c-.34 0-.657.06-.94.172a2.138 2.138 0 0 0-.73.492 2.1 2.1 0 0 0-.462.749h4.248zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
  </svg>
);
const HackerRankIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 11.885 0 13-.642 1.114-9.107 6-10.392 6-1.285 0-9.75-4.886-10.392-6C.963 17.885.963 7.115 1.608 6 2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v4.309H9.963V7.057a.258.258 0 0 0-.258-.258h-1.5a.258.258 0 0 0-.258.258v9.886c0 .143.115.258.258.258h1.5a.258.258 0 0 0 .258-.258V12.69h4.074v4.253c0 .143.115.258.258.258h1.498a.258.258 0 0 0 .258-.258V7.057a.258.258 0 0 0-.258-.258z"/>
  </svg>
);

/* ── animated counter ── */
function useCounter(target, trigger) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger || !target) return;
    let s = null;
    const step = ts => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 1300, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, trigger]);
  return val;
}

/* ── loading dots ── */
function Dots({ color }) {
  return (
    <div style={{ display:"flex", gap:"5px", justifyContent:"center", padding:"1rem 0" }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width:"7px", height:"7px", borderRadius:"50%", background:color,
          animation:`pd 1.1s ${i*0.18}s ease-in-out infinite`,
        }}/>
      ))}
      <style>{`@keyframes pd{0%,100%{opacity:.15;transform:scale(.7)}50%{opacity:1;transform:scale(1.2)}}`}</style>
    </div>
  );
}

/* ── visit link ── */
function VisitLink({ url, color }) {
  return (
    <a href={url} target="_blank" rel="noreferrer"
      style={{
        display:"inline-flex", alignItems:"center", gap:"5px",
        fontFamily:"'Cinzel',serif", fontSize:"9px",
        letterSpacing:"0.1em", color, opacity:0.75,
        textDecoration:"none", transition:"opacity 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.opacity="1"}
      onMouseLeave={e => e.currentTarget.style.opacity="0.75"}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
      VISIT PROFILE
    </a>
  );
}

/* ── heatmap helpers ── */
const HEAT = ["#160330","rgba(106,31,160,0.45)","rgba(155,64,212,0.7)","rgba(192,112,255,0.88)","#f0c040"];
const MON  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function buildWeeks(calendar) {
  const byDate = {};
  Object.entries(calendar).forEach(([ts, cnt]) => {
    const d = new Date(parseInt(ts)*1000).toISOString().slice(0,10);
    byDate[d] = (byDate[d]||0) + cnt;
  });
  const max = Math.max(...Object.values(byDate), 1);
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate()-364);
  start.setDate(start.getDate()-start.getDay());
  const weeks = [];
  const cur = new Date(start);
  for (let w=0; w<53; w++) {
    const week = [];
    for (let d=0; d<7; d++) {
      const iso = cur.toISOString().slice(0,10);
      const cnt = byDate[iso]||0;
      const lvl = cnt===0?0:cnt<=max*0.25?1:cnt<=max*0.5?2:cnt<=max*0.75?3:4;
      week.push({date:iso,count:cnt,level:lvl});
      cur.setDate(cur.getDate()+1);
    }
    weeks.push(week);
  }
  return weeks;
}
function buildMonthLabels(weeks) {
  const labels=[]; let last=-1;
  weeks.forEach((wk,wi)=>{
    const m=new Date(wk[0].date).getMonth();
    if(m!==last){labels.push({wi,label:MON[m]});last=m;}
  });
  return labels;
}

/* ════════════════════════════════════════════════
   ROW 1 — LEETCODE (full-width, with heatmap)
════════════════════════════════════════════════ */
function LeetCodeRow({ trigger }) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  const C="#FFA116", BG="rgba(255,161,22,0.08)", BD="rgba(255,161,22,0.25)";
  const URL="https://leetcode.com/u/sakthinathaan/";

  useEffect(()=>{
    fetch("/api/leetcode")
      .then(r=>r.json())
      .then(d=>{ if(d.error && !d.solved) throw new Error(); setData(d); })
      .catch(()=>setError(true))
      .finally(()=>setLoading(false));
  },[]);

  const solved  = data?.solved  || 0;
  const easy    = data?.easy    || 0;
  const medium  = data?.medium  || 0;
  const hard    = data?.hard    || 0;
  const streak  = data?.streak  || 0;
  const active  = data?.active_days || 0;
  const ranking = data?.ranking ? `#${Number(data.ranking).toLocaleString()}` : "—";
  const pct     = solved ? Math.round((solved/3455)*100) : 0;

  const aSolved = useCounter(solved,  trigger && !loading);
  const aEasy   = useCounter(easy,    trigger && !loading);
  const aMed    = useCounter(medium,  trigger && !loading);
  const aHard   = useCounter(hard,    trigger && !loading);

  const weeks   = data?.calendar ? buildWeeks(data.calendar) : null;
  const mLabels = weeks ? buildMonthLabels(weeks) : [];
  const r=44, circ=2*Math.PI*r, dash=(pct/100)*circ;

  return (
    <div style={{
      background:"rgba(14,2,36,0.97)", border:`1px solid ${BD}`,
      borderRadius:"20px", padding:"1.6rem 1.8rem", width:"100%",
    }}>
      {/* header */}
      <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"1.4rem" }}>
        <div style={{ width:"46px",height:"46px",borderRadius:"12px",
          background:BG,border:`1px solid ${BD}`,color:C,
          display:"flex",alignItems:"center",justifyContent:"center",
          padding:"10px",flexShrink:0 }}>
          <LeetCodeIcon/>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Cinzel',serif",fontSize:"18px",fontWeight:700,color:C }}>LeetCode</div>
          <a href={URL} target="_blank" rel="noreferrer"
            style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:"#8060a0",textDecoration:"none" }}>
            @sakthinathaan ↗
          </a>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",fontWeight:600,
            padding:"4px 12px",borderRadius:"20px",background:BG,border:`1px solid ${BD}`,color:C }}>
            {loading?"—":ranking}
          </div>
          <div style={{ fontSize:"9px",color:"#8060a0",marginTop:"3px",letterSpacing:"0.08em" }}>GLOBAL RANK</div>
        </div>
      </div>

      {loading && <Dots color={C}/>}
      {!loading && error && (
        <p style={{ fontSize:"12px",color:"rgba(255,100,100,0.7)",textAlign:"center",marginBottom:"1rem" }}>
          Could not load — check Flask is running on :5000
        </p>
      )}

      {!loading && (
        <div style={{ display:"grid",gridTemplateColumns:"auto 1fr",gap:"2rem",alignItems:"start" }}>

          {/* LEFT: donut + stats */}
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",minWidth:"200px" }}>
            <svg width="110" height="110" viewBox="0 0 110 110">
              <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9"/>
              <circle cx="55" cy="55" r={r} fill="none" stroke={C} strokeWidth="9"
                strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`}
                strokeDashoffset={(circ/4).toFixed(1)} strokeLinecap="round"/>
              <text x="55" y="50" textAnchor="middle" fill={C}
                fontFamily="JetBrains Mono,monospace" fontSize="22" fontWeight="700">{aSolved}</text>
              <text x="55" y="66" textAnchor="middle" fill="#8060a0"
                fontFamily="JetBrains Mono,monospace" fontSize="9">SOLVED</text>
              <text x="55" y="80" textAnchor="middle" fill={C}
                fontFamily="JetBrains Mono,monospace" fontSize="10" opacity="0.65">{pct}%</text>
            </svg>

            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px",width:"100%" }}>
              {[{l:"Easy",v:aEasy,c:"#00b8a3"},{l:"Medium",v:aMed,c:"#FFC01E"},{l:"Hard",v:aHard,c:"#EF4743"}].map(s=>(
                <div key={s.l} style={{ background:`${s.c}12`,border:`1px solid ${s.c}40`,
                  borderRadius:"10px",padding:"8px 4px",textAlign:"center" }}>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"16px",fontWeight:600,color:s.c }}>{s.v}</div>
                  <div style={{ fontSize:"9px",color:s.c,opacity:0.75,marginTop:"2px" }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",width:"100%" }}>
              {[{l:"Streak",v:streak,u:"days"},{l:"Active Days",v:active,u:"total"}].map(s=>(
                <div key={s.l} style={{ background:"rgba(255,161,22,0.06)",border:`1px solid ${BD}`,
                  borderRadius:"10px",padding:"8px 4px",textAlign:"center" }}>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"18px",fontWeight:600,color:C }}>{s.v}</div>
                  <div style={{ fontSize:"8px",color:"#8060a0",marginTop:"2px",letterSpacing:"0.05em" }}>
                    {s.l.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: heatmap */}
          <div>
            <div style={{ fontFamily:"'Cinzel',serif",fontSize:"10px",letterSpacing:"0.16em",
              color:"#8060a0",marginBottom:"10px" }}>
              ✦ CONTRIBUTION HEATMAP — PAST 12 MONTHS ✦
            </div>
            {weeks ? (
              <>
                <div style={{ position:"relative",height:"14px",marginBottom:"4px" }}>
                {mLabels.map(({wi,label})=>(
                    <span key={`${label}-${wi}`} style={{ position:"absolute",left:`${(wi/weeks.length)*100}%`,
                      fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",color:"#8060a0" }}>{label}</span>
                  ))}
                </div>
                <div style={{ display:"flex",gap:"2px" }}>
                  {weeks.map((wk,wi)=>(
                    <div key={wi} style={{ display:"flex",flexDirection:"column",gap:"2px",flex:1 }}>
                      {wk.map((day,di)=>(
                        <div key={di} title={`${day.date} — ${day.count} submission${day.count!==1?"s":""}`}
                          style={{ width:"100%",aspectRatio:"1",borderRadius:"2px",
                            background:HEAT[day.level],cursor:"pointer",transition:"transform 0.1s",
                            boxShadow:day.level===4?"0 0 4px rgba(240,192,64,0.5)":"none" }}
                          onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.7)";e.currentTarget.style.zIndex="10";}}
                          onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.zIndex="";}}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:"4px",marginTop:"8px",justifyContent:"flex-end" }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",color:"#8060a0" }}>Less</span>
                  {HEAT.map((c,i)=>(
                    <div key={i} style={{ width:"10px",height:"10px",borderRadius:"2px",background:c,
                      border:i===0?"1px solid rgba(240,192,64,0.15)":"none" }}/>
                  ))}
                  <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",color:"#8060a0" }}>More</span>
                </div>
              </>
            ):(
              <div style={{ display:"flex",alignItems:"center",justifyContent:"center",
                height:"120px",fontSize:"12px",color:"#8060a0",
                border:"1px dashed rgba(255,161,22,0.2)",borderRadius:"10px" }}>
                Calendar data unavailable
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════
   ROW 2 CARD — minimal: solved count + visit only
════════════════════════════════════════════════ */
function MinimalCard({ name, handle, url, color, bg, border, Icon, endpoint, trigger }) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);
  const [hov,     setHov]     = useState(false);

  useEffect(()=>{
    fetch(endpoint)
      .then(r=>r.json())
      .then(d=>{ if(d.error && !d.solved) throw new Error(); setData(d); })
      .catch(()=>setError(true))
      .finally(()=>setLoading(false));
  },[endpoint]);

  const solved  = data?.solved || 0;
  const animVal = useCounter(solved, trigger && !loading);

  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background:"rgba(14,2,36,0.97)",
        border:`1px solid ${hov ? color : border}`,
        borderRadius:"20px", padding:"1.8rem 1.8rem 1.4rem",
        transition:"all 0.25s",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? `0 12px 32px rgba(0,0,0,0.5)` : "none",
        display:"flex", flexDirection:"column",
      }}
    >
      {/* header */}
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"1.4rem" }}>
        <div style={{ width:"44px",height:"44px",borderRadius:"12px",
          background:bg, border:`1px solid ${border}`, color,
          display:"flex",alignItems:"center",justifyContent:"center",
          padding:"10px",flexShrink:0 }}>
          <Icon/>
        </div>
        <div>
          <div style={{ fontFamily:"'Cinzel',serif",fontSize:"16px",fontWeight:700,color }}>{name}</div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:"#8060a0" }}>
            @{handle}
          </div>
        </div>
      </div>

      {/* content */}
      {loading && <Dots color={color}/>}

      {!loading && error && (
        <p style={{ fontSize:"11px",color:"rgba(255,100,100,0.7)",textAlign:"center",flex:1,
          display:"flex",alignItems:"center",justifyContent:"center" }}>
          Could not load live data
        </p>
      )}

      {!loading && !error && (
        <div style={{ flex:1 }}>
          {/* big number */}
          <div style={{ marginBottom:"0.5rem" }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"4rem",
              fontWeight:700,lineHeight:1,color }}>
              {animVal || solved}
            </div>
            <div style={{ fontSize:"10px",letterSpacing:"0.14em",color:"#8060a0",
              marginTop:"6px",textTransform:"uppercase" }}>
              Problems Solved
            </div>
          </div>
        </div>
      )}

      {/* visit profile — always at bottom */}
      <div style={{ marginTop:"auto", paddingTop:"1rem",
        borderTop:`1px solid ${border}`, display:"flex", justifyContent:"flex-end" }}>
        <VisitLink url={url} color={color}/>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════ */
const CodingProfiles = forwardRef(function CodingProfiles(_, ref) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [total,   setTotal]   = useState(0);

  const setRef = el => {
    sectionRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };

  useEffect(()=>{
    const obs = new IntersectionObserver(
      ([e])=>{ if(e.isIntersecting) setVisible(true); },
      {threshold:0.2}
    );
    if(sectionRef.current) obs.observe(sectionRef.current);
    return ()=>obs.disconnect();
  },[]);

  useEffect(()=>{
    fetch("/api/coding-profiles")
      .then(r=>r.json())
      .then(d=>{
        const lc  = d.leetcode?.solved  || 0;
        const gfg = d.gfg?.solved       || 0;
        const hr  = d.hackerrank?.solved || 0;
        setTotal(lc + gfg + hr);
      })
      .catch(()=>{});
  },[]);

  const animTotal = useCounter(total, visible);

  return (
    <section ref={setRef} className="page-section" style={{
      justifyContent:"flex-start", paddingTop:"88px",
      background:
        "radial-gradient(ellipse at 80% 70%, rgba(106,31,160,0.28) 0%, transparent 55%)," +
        "radial-gradient(ellipse at 10% 20%, rgba(155,64,212,0.16) 0%, transparent 45%), #0d0118",
    }}>
      <SectionHeader eyebrow="PROBLEM SOLVING" title="Coding" highlight="Profiles"/>

      {/* total banner */}
      <div style={{ display:"inline-flex",alignItems:"center",gap:"14px",
        background:"rgba(240,192,64,0.06)",border:"1px solid rgba(240,192,64,0.22)",
        borderRadius:"14px",padding:"10px 28px",marginBottom:"1.8rem" }}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#f0c040">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"1.9rem",
            fontWeight:600,color:"#f0c040",lineHeight:1 }}>
            {animTotal || total}+
          </div>
          <div style={{ fontSize:"10px",letterSpacing:"0.14em",color:"#8060a0",
            marginTop:"4px",textTransform:"uppercase" }}>
            Problems Solved Across All Platforms
          </div>
        </div>
      </div>

      <div style={{ maxWidth:"1020px",width:"100%",display:"flex",flexDirection:"column",gap:"18px" }}>

        {/* ROW 1 — LeetCode full width + heatmap */}
        <LeetCodeRow trigger={visible}/>

        {/* ROW 2 — GFG + HackerRank: solved count + visit only */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"18px" }}>
          <MinimalCard
            name="GeeksForGeeks" handle="sakthivs051"
            url="https://www.geeksforgeeks.org/profile/sakthivs051?tab=activity"
            color="#2F8D46" bg="rgba(47,141,70,0.08)" border="rgba(47,141,70,0.28)"
            Icon={GFGIcon} endpoint="/api/gfg" trigger={visible}
          />
          <MinimalCard
            name="HackerRank" handle="sakthiviswa61"
            url="https://www.hackerrank.com/profile/sakthiviswa61"
            color="#00EA64" bg="rgba(0,234,100,0.08)" border="rgba(0,234,100,0.25)"
            Icon={HackerRankIcon} endpoint="/api/hackerrank" trigger={visible}
          />
        </div>

      </div>
    </section>
  );
});

export default CodingProfiles;