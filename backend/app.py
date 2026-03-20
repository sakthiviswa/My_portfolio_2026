"""
Portfolio Flask Backend — app.py
Real data: LeetCode GraphQL, GFG scrape, HackerRank REST
Fallback: hardcoded real values when APIs are unavailable
"""
import re, os, sys, json, requests
from datetime import datetime, timedelta

try:
    from flask import Flask, jsonify, request
    from flask_cors import CORS
    from flask_sqlalchemy import SQLAlchemy
    from bs4 import BeautifulSoup
except ImportError as e:
    print(f"\n[ERROR] Missing: {e}\nRun: pip install -r requirements.txt\n")
    sys.exit(1)

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000","http://127.0.0.1:3000",
                   "http://localhost:3001","http://127.0.0.1:3001",
                   "http://localhost:5173","http://127.0.0.1:5173"])

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH  = os.path.join(BASE_DIR, "portfolio.db")
app.config["SQLALCHEMY_DATABASE_URI"]        = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# ── Real usernames ─────────────────────────────────────
LEETCODE_USER   = "sakthinathaan"
GFG_USER        = "sakthivs051"
HACKERRANK_USER = "sakthiviswa61"

# ── Hardcoded fallback values (update these manually) ──
# These are shown when the live API/scrape fails
GFG_FALLBACK = {
    "username":     GFG_USER,
    "solved":       37,   # ← update when you solve more
    "school":       0,
    "basic":        4,
    "easy":         17,
    "medium":       15,
    "hard":         1,
    "coding_score": 106,
    "source":       "fallback",
}

HR_FALLBACK = {
    "username": HACKERRANK_USER,
    "solved":   45,        # ← update when you solve more
    "badges":   [],
    "stars":    ["5★ Python", "3★ Java"],
    "source":   "fallback",
}

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

# ── Cache ──────────────────────────────────────────────
_cache: dict = {}

def cache_get(k):
    if k in _cache:
        d, exp = _cache[k]
        if datetime.utcnow() < exp:
            return d
    return None

def cache_set(k, d, ttl=3600):
    _cache[k] = (d, datetime.utcnow() + timedelta(seconds=ttl))

def to_int(v):
    if isinstance(v, (int, float)): return int(v)
    if isinstance(v, str):
        m = re.search(r"(\d+)", v.replace(",", ""))
        return int(m.group(1)) if m else 0
    return 0

# ── DB Models ──────────────────────────────────────────
class ContactMessage(db.Model):
    __tablename__ = "contact_message"
    id         = db.Column(db.Integer, primary_key=True)
    name       = db.Column(db.String(120), nullable=False)
    email      = db.Column(db.String(200), nullable=False)
    message    = db.Column(db.Text,        nullable=False)
    is_read    = db.Column(db.Boolean,     default=False)
    created_at = db.Column(db.DateTime,    default=datetime.utcnow)
    def to_dict(self):
        return {"id":self.id,"name":self.name,"email":self.email,
                "message":self.message,"is_read":self.is_read,
                "created_at":self.created_at.isoformat()}

class PageView(db.Model):
    __tablename__ = "page_view"
    id      = db.Column(db.Integer, primary_key=True)
    section = db.Column(db.String(80), unique=True, nullable=False)
    views   = db.Column(db.Integer, default=0)
    def to_dict(self):
        return {"section":self.section,"views":self.views}

# ══════════════════════════════════════════════════════
#  LEETCODE — GraphQL public API (no auth needed)
# ══════════════════════════════════════════════════════
def fetch_leetcode(username):
    cached = cache_get(f"lc_{username}")
    if cached:
        return cached

    GRAPHQL = "https://leetcode.com/graphql"
    h = {**HEADERS, "Referer":"https://leetcode.com", "Content-Type":"application/json"}

    stats_q = {"query":"""
        query userProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile { ranking }
            submitStats { acSubmissionNum { difficulty count } }
          }
        }""", "variables":{"username":username}}

    cal_q = {"query":"""
        query userCalendar($username: String!, $year: Int) {
          matchedUser(username: $username) {
            userCalendar(year: $year) {
              submissionCalendar totalActiveDays streak
            }
          }
        }""", "variables":{"username":username,"year":datetime.utcnow().year}}

    cal_q_prev = {"query":"""
        query userCalendar($username: String!, $year: Int) {
          matchedUser(username: $username) {
            userCalendar(year: $year) { submissionCalendar }
          }
        }""", "variables":{"username":username,"year":datetime.utcnow().year - 1}}

    try:
        r1 = requests.post(GRAPHQL, json=stats_q, headers=h, timeout=15)
        r1.raise_for_status()
        mu   = r1.json()["data"]["matchedUser"]
        nums = mu["submitStats"]["acSubmissionNum"]
        easy   = next((x["count"] for x in nums if x["difficulty"]=="Easy"),   0)
        medium = next((x["count"] for x in nums if x["difficulty"]=="Medium"), 0)
        hard   = next((x["count"] for x in nums if x["difficulty"]=="Hard"),   0)
        total  = easy + medium + hard
        ranking = mu["profile"]["ranking"]

        streak, active_days, calendar = 0, 0, {}
        try:
            r2  = requests.post(GRAPHQL, json=cal_q, headers=h, timeout=15)
            cal = r2.json()["data"]["matchedUser"]["userCalendar"]
            streak      = cal.get("streak", 0)
            active_days = cal.get("totalActiveDays", 0)
            calendar    = json.loads(cal.get("submissionCalendar","{}"))
            # also merge previous year
            r3   = requests.post(GRAPHQL, json=cal_q_prev, headers=h, timeout=15)
            prev = json.loads(r3.json()["data"]["matchedUser"]["userCalendar"].get("submissionCalendar","{}"))
            for ts, cnt in prev.items():
                calendar[ts] = calendar.get(ts, 0) + cnt
        except Exception: pass

        result = {"username":username,"solved":total,"easy":easy,"medium":medium,
                  "hard":hard,"ranking":ranking,"streak":streak,
                  "active_days":active_days,"calendar":calendar}
        cache_set(f"lc_{username}", result)
        print(f"[LeetCode] ✓ solved={total} ranking={ranking}")
        return result

    except Exception as e:
        print(f"[LeetCode ERROR] {e}")
        return None

# ══════════════════════════════════════════════════════
#  GFG — multiple strategies → fallback to hardcoded
# ══════════════════════════════════════════════════════
def fetch_gfg(username):
    cached = cache_get(f"gfg_{username}")
    if cached:
        return cached

    # ── Strategy 1: GFG practice API ──────────────────
    for api_url in [
        f"https://practiceapi.geeksforgeeks.org/api/v1/user/info/?handle={username}",
        f"https://practiceapi.geeksforgeeks.org/api/vO/user/info/?handle={username}",
    ]:
        try:
            r = requests.get(api_url, headers={
                **HEADERS,
                "Referer": f"https://www.geeksforgeeks.org/user/{username}/",
                "Origin":  "https://www.geeksforgeeks.org",
            }, timeout=12)
            if r.status_code != 200:
                continue
            data = r.json()
            info = data.get("info") or data.get("user_details") or data.get("data") or data
            if not isinstance(info, dict):
                continue

            school = to_int(info.get("school_problem_solved") or info.get("school", 0))
            basic  = to_int(info.get("basic_problem_solved")  or info.get("basic",  0))
            easy   = to_int(info.get("easy_problem_solved")   or info.get("easy",   0))
            medium = to_int(info.get("medium_problem_solved") or info.get("medium", 0))
            hard   = to_int(info.get("hard_problem_solved")   or info.get("hard",   0))
            solved = (to_int(info.get("total_problems_solved") or info.get("problems_solved") or 0)
                      or school + basic + easy + medium + hard)
            score  = to_int(info.get("coding_score") or info.get("score", 0))

            if solved > 0:
                result = {"username":username,"solved":solved,"school":school,
                          "basic":basic,"easy":easy,"medium":medium,"hard":hard,
                          "coding_score":score,"source":"api"}
                cache_set(f"gfg_{username}", result)
                print(f"[GFG] ✓ API → solved={solved}")
                return result
        except Exception as e:
            print(f"[GFG API] {e}")

    # ── Strategy 2: scrape profile page ───────────────
    try:
        url  = f"https://www.geeksforgeeks.org/user/{username}/"
        r    = requests.get(url, headers=HEADERS, timeout=20)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "html.parser")

        # try __NEXT_DATA__ JSON
        nd_tag = soup.find("script", id="__NEXT_DATA__")
        if nd_tag and nd_tag.string:
            nd = json.loads(nd_tag.string)
            found = {}
            def walk(obj):
                if isinstance(obj, dict):
                    for k, v in obj.items():
                        kl = str(k).lower()
                        for diff in ("school","basic","easy","medium","hard"):
                            if diff in kl and "solved" in kl:
                                found.setdefault(diff, to_int(v))
                        if ("total" in kl or "problems" in kl) and "solved" in kl:
                            found.setdefault("solved", to_int(v))
                        if "score" in kl:
                            found.setdefault("score", to_int(v))
                        walk(v)
                elif isinstance(obj, list):
                    for item in obj: walk(item)
            walk(nd)
            school = found.get("school",0); basic  = found.get("basic",0)
            easy   = found.get("easy",0);   medium = found.get("medium",0)
            hard   = found.get("hard",0)
            solved = found.get("solved",0) or school+basic+easy+medium+hard
            if solved > 0:
                result = {"username":username,"solved":solved,"school":school,
                          "basic":basic,"easy":easy,"medium":medium,"hard":hard,
                          "coding_score":found.get("score",0),"source":"scrape"}
                cache_set(f"gfg_{username}", result)
                print(f"[GFG] ✓ scrape __NEXT_DATA__ → solved={solved}")
                return result

        # fallback text regex
        text = soup.get_text(" ")
        school = to_int(re.search(r"SCHOOL\s*\((\d+)\)", text, re.I))
        basic  = to_int(re.search(r"BASIC\s*\((\d+)\)",  text, re.I))
        easy   = to_int(re.search(r"EASY\s*\((\d+)\)",   text, re.I))
        medium = to_int(re.search(r"MEDIUM\s*\((\d+)\)", text, re.I))
        hard   = to_int(re.search(r"HARD\s*\((\d+)\)",   text, re.I))
        solved = school + basic + easy + medium + hard
        if solved > 0:
            result = {"username":username,"solved":solved,"school":school,
                      "basic":basic,"easy":easy,"medium":medium,"hard":hard,
                      "coding_score":0,"source":"scrape_text"}
            cache_set(f"gfg_{username}", result)
            print(f"[GFG] ✓ scrape text → solved={solved}")
            return result

    except Exception as e:
        print(f"[GFG scrape ERROR] {e}")

    # ── Strategy 3: hardcoded fallback (always works) ──
    print(f"[GFG] ⚠ using hardcoded fallback → solved={GFG_FALLBACK['solved']}")
    cache_set(f"gfg_{username}", GFG_FALLBACK, ttl=600)  # shorter TTL for fallback
    return GFG_FALLBACK

# ══════════════════════════════════════════════════════
#  HACKERRANK — badges REST API → fallback
# ══════════════════════════════════════════════════════
def fetch_hackerrank(username):
    cached = cache_get(f"hr_{username}")
    if cached:
        return cached

    try:
        url    = f"https://www.hackerrank.com/rest/hackers/{username}/badges"
        r      = requests.get(url, headers=HEADERS, timeout=12)
        r.raise_for_status()
        models = r.json().get("models", [])
        total  = 0; stars = []; badges = []
        for b in models:
            name   = b.get("display_name") or b.get("badge_name") or b.get("name","")
            s      = int(b.get("stars", 0) or 0)
            solved = int(b.get("solved", 0) or 0)
            total += solved
            if s: stars.append(f"{s}★ {name}")
            badges.append({"name":name,"stars":s,"solved":solved})

        result = {"username":username,"solved":total or HR_FALLBACK["solved"],
                  "badges":badges,"stars":stars[:5] or HR_FALLBACK["stars"],"source":"api"}
        cache_set(f"hr_{username}", result)
        print(f"[HackerRank] ✓ solved={result['solved']}")
        return result

    except Exception as e:
        print(f"[HackerRank ERROR] {e} → using fallback")
        cache_set(f"hr_{username}", HR_FALLBACK, ttl=600)
        return HR_FALLBACK

# ══════════════════════════════════════════════════════
#  STATIC DATA
# ══════════════════════════════════════════════════════
SKILLS = [
    {"name":"Python","level":"Advanced","pct":88,"cat":"Language"},
    {"name":"Java","level":"Advanced","pct":82,"cat":"Language"},
    {"name":"JavaScript","level":"Advanced","pct":85,"cat":"Language"},
    {"name":"C++","level":"Intermediate","pct":72,"cat":"Language"},
    {"name":"React.js","level":"Advanced","pct":88,"cat":"Framework"},
    {"name":"React Native","level":"Intermediate","pct":76,"cat":"Framework"},
    {"name":"Node.js","level":"Intermediate","pct":74,"cat":"Framework"},
    {"name":"MySQL","level":"Intermediate","pct":72,"cat":"Database"},
    {"name":"Firebase","level":"Intermediate","pct":68,"cat":"Database"},
    {"name":"Git","level":"Advanced","pct":84,"cat":"Tool"},
    {"name":"Figma","level":"Advanced","pct":80,"cat":"Tool"},
    {"name":"VS Code","level":"Expert","pct":95,"cat":"Tool"},
    {"name":"Postman","level":"Intermediate","pct":72,"cat":"Tool"},
]

PROJECTS = [
    {"id":1,"tag":"REACT · NEXT.JS · PYTHON · NLP",
     "name":"FineReader — AI Text Summarization","period":"May 2025 – June 2025",
     "bullets":["React & Next.js frontend + Python AI models for NLP.",
                "Converts long paragraphs into concise summaries.",
                "Improves reading efficiency instantly."],
     "github":"https://github.com/sakthiviswa","live":"#"},
    {"id":2,"tag":"FIGMA · UI/UX DESIGN · REACT",
     "name":"Real Estate & Food App UI/UX","period":"February 2024 – March 2024",
     "bullets":["Intuitive real estate booking app UI/UX.",
                "Food/smoothie app with seamless navigation.",
                "Figma prototypes with consistent visual hierarchy."],
     "github":"https://github.com/sakthiviswa","live":"#"},
]

def valid_email(e): return bool(re.match(r"[^@]+@[^@]+\.[^@]+", e))
def err(msg, code=400): return jsonify({"error":True,"message":msg}), code

# ══════════════════════════════════════════════════════
#  ROUTES
# ══════════════════════════════════════════════════════
@app.get("/api/health")
def health():
    msgs  = db.session.query(ContactMessage).count()
    views = db.session.query(db.func.sum(PageView.views)).scalar() or 0
    return jsonify({"status":"ok","timestamp":datetime.utcnow().isoformat(),
                    "messages":msgs,"pageviews":int(views)})

@app.get("/api/skills")
def get_skills():
    cat  = request.args.get("cat")
    data = SKILLS if not cat else [s for s in SKILLS if s["cat"]==cat]
    return jsonify({"skills":data,"total":len(data)})

@app.get("/api/projects")
def get_projects():
    return jsonify({"projects":PROJECTS,"total":len(PROJECTS)})

@app.get("/api/leetcode")
def api_leetcode():
    d = fetch_leetcode(LEETCODE_USER)
    if not d: return jsonify({"error":True,"message":"Failed to fetch LeetCode"}), 502
    return jsonify(d)

@app.get("/api/gfg")
def api_gfg():
    force = request.args.get("force","0") == "1"
    if force: _cache.pop(f"gfg_{GFG_USER}", None)
    return jsonify(fetch_gfg(GFG_USER))

@app.get("/api/hackerrank")
def api_hackerrank():
    force = request.args.get("force","0") == "1"
    if force: _cache.pop(f"hr_{HACKERRANK_USER}", None)
    return jsonify(fetch_hackerrank(HACKERRANK_USER))

@app.get("/api/coding-profiles")
def coding_profiles():
    lc  = fetch_leetcode(LEETCODE_USER)
    gfg = fetch_gfg(GFG_USER)
    hr  = fetch_hackerrank(HACKERRANK_USER)
    return jsonify({"leetcode":lc or {},"gfg":gfg,"hackerrank":hr,
                    "fetched_at":datetime.utcnow().isoformat()})

@app.post("/api/contact")
def post_contact():
    body = request.get_json(silent=True) or {}
    name    = (body.get("name")    or "").strip()
    email   = (body.get("email")   or "").strip()
    message = (body.get("message") or "").strip()
    errors  = []
    if not name:                errors.append("Name required.")
    if not email:               errors.append("Email required.")
    elif not valid_email(email):errors.append("Invalid email.")
    if not message:             errors.append("Message required.")
    elif len(message)<10:       errors.append("Too short.")
    if errors: return jsonify({"error":True,"messages":errors}), 422
    r = ContactMessage(name=name, email=email, message=message)
    db.session.add(r); db.session.commit()
    return jsonify({"success":True,"id":r.id}), 201

@app.get("/api/messages")
def get_messages():
    rows = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify({"messages":[r.to_dict() for r in rows],"total":len(rows)})

@app.patch("/api/messages/<int:mid>/read")
def mark_read(mid):
    r = db.session.get(ContactMessage, mid)
    if not r: return err("Not found.",404)
    r.is_read = True; db.session.commit()
    return jsonify({"success":True})

@app.delete("/api/messages/<int:mid>")
def delete_msg(mid):
    r = db.session.get(ContactMessage, mid)
    if not r: return err("Not found.",404)
    db.session.delete(r); db.session.commit()
    return jsonify({"success":True,"deleted_id":mid})

@app.post("/api/pageview")
def post_pageview():
    body    = request.get_json(silent=True) or {}
    section = (body.get("section") or "").strip().lower()
    if not section: return err("section required.")
    row = PageView.query.filter_by(section=section).first()
    if row: row.views += 1
    else:
        row = PageView(section=section, views=1); db.session.add(row)
    db.session.commit()
    return jsonify({"section":row.section,"views":row.views})

@app.get("/api/pageviews")
def get_pageviews():
    rows = PageView.query.order_by(PageView.views.desc()).all()
    return jsonify({"pageviews":[r.to_dict() for r in rows],
                    "total_views":sum(r.views for r in rows)})

# ── Boot ────────────────────────────────────────────────
with app.app_context():
    db.create_all()
    print(f"[DB] SQLite ready → {DB_PATH}")

if __name__ == "__main__":
    print("[FLASK] http://localhost:5000")
    app.run(debug=True, host="0.0.0.0", port=5000)