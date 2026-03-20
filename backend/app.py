"""
Portfolio Flask Backend — app.py
LeetCode: GraphQL API
GFG: scrape the actual profile page for real count
HackerRank: REST badges API
"""
import re, os, sys, json, requests, smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
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

LEETCODE_USER   = "sakthinathaan"
GFG_USER        = "sakthivs051"
HACKERRANK_USER = "sakthiviswa61"

# ── Gmail notification config ──────────────────────────
# 1. Use your Gmail address below
# 2. For GMAIL_PASSWORD, use an App Password (NOT your real password)
#    → Go to: myaccount.google.com/apppasswords
#    → Select app: Mail, device: Other → Generate
#    → Paste the 16-char password here
GMAIL_SENDER   = "sakthiviswa61@gmail.com"   # your Gmail
GMAIL_PASSWORD = "your_app_password_here"    # 16-char App Password
GMAIL_RECEIVER = "sakthiviswa61@gmail.com"   # where to receive notifications (same or different)

def send_notification(name, email, message):
    """Send an email notification when a new contact form message arrives."""
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"✦ New Portfolio Message from {name}"
        msg["From"]    = GMAIL_SENDER
        msg["To"]      = GMAIL_RECEIVER

        # Plain text version
        plain = f"""New message from your portfolio contact form.

From:    {name}
Email:   {email}
Time:    {datetime.now().strftime('%d %b %Y, %I:%M %p')}

Message:
{message}

---
Reply directly to: {email}
"""

        # HTML version
        html = f"""
<html><body style="font-family:'Segoe UI',sans-serif;background:#0d0118;color:#c4a0e8;padding:2rem;">
  <div style="max-width:560px;margin:0 auto;background:rgba(255,255,255,0.04);
              border:1px solid rgba(240,192,64,0.3);border-radius:16px;padding:2rem;">
    <h2 style="font-family:Georgia,serif;color:#f0c040;margin:0 0 1.2rem;">
      ✦ New Portfolio Message
    </h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:1.2rem;">
      <tr>
        <td style="padding:6px 0;color:#8060a0;font-size:12px;width:70px;">FROM</td>
        <td style="padding:6px 0;color:#f0c040;font-weight:600;">{name}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#8060a0;font-size:12px;">EMAIL</td>
        <td style="padding:6px 0;">
          <a href="mailto:{email}" style="color:#c070ff;text-decoration:none;">{email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#8060a0;font-size:12px;">TIME</td>
        <td style="padding:6px 0;color:#c4a0e8;font-size:12px;">
          {datetime.now().strftime('%d %b %Y, %I:%M %p')}
        </td>
      </tr>
    </table>
    <div style="background:rgba(0,0,0,0.3);border-left:3px solid rgba(192,112,255,0.5);
                border-radius:8px;padding:1rem;margin-bottom:1.4rem;">
      <p style="color:#8060a0;font-size:11px;margin:0 0 8px;letter-spacing:0.1em;">MESSAGE</p>
      <p style="color:#c4a0e8;line-height:1.75;margin:0;white-space:pre-wrap;">{message}</p>
    </div>
    <a href="mailto:{email}?subject=Re: Your message to Sakthinathan&body=Hi {name},"
       style="display:inline-block;background:rgba(240,192,64,0.12);border:1px solid rgba(240,192,64,0.4);
              color:#f0c040;text-decoration:none;padding:8px 20px;border-radius:8px;
              font-size:12px;letter-spacing:0.1em;">
      ✉ REPLY TO {name.upper()}
    </a>
  </div>
</body></html>
"""
        msg.attach(MIMEText(plain, "plain"))
        msg.attach(MIMEText(html,  "html"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(GMAIL_SENDER, GMAIL_PASSWORD)
            server.sendmail(GMAIL_SENDER, GMAIL_RECEIVER, msg.as_string())

        print(f"[EMAIL] ✓ Notification sent for message from {name}")

    except Exception as e:
        # Never let email failure break the contact form
        print(f"[EMAIL ERROR] {e}")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}

# ── cache ─────────────────────────────────────────────
_cache: dict = {}
def cache_get(k):
    if k in _cache:
        d, exp = _cache[k]
        if datetime.utcnow() < exp: return d
    return None
def cache_set(k, d, ttl=3600):
    _cache[k] = (d, datetime.utcnow() + timedelta(seconds=ttl))

# ── DB models ─────────────────────────────────────────
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

# ═══════════════════════════════════════════════════════
#  LEETCODE — GraphQL public API
# ═══════════════════════════════════════════════════════
def fetch_leetcode(username):
    cached = cache_get(f"lc_{username}")
    if cached: return cached

    GRAPHQL = "https://leetcode.com/graphql"
    h = {**HEADERS, "Referer":"https://leetcode.com", "Content-Type":"application/json"}

    q_stats = {"query":"""
        query userProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile { ranking }
            submitStats { acSubmissionNum { difficulty count } }
          }
        }""", "variables":{"username":username}}

    CAL_QUERY = """
        query userCalendar($username: String!, $year: Int) {
          matchedUser(username: $username) {
            userCalendar(year: $year) {
              submissionCalendar totalActiveDays streak
            }
          }
        }"""

    try:
        r1 = requests.post(GRAPHQL, json=q_stats, headers=h, timeout=12)
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
            now = datetime.utcnow()

            r2 = requests.post(
                GRAPHQL,
                json={"query": CAL_QUERY, "variables": {"username": username, "year": now.year}},
                headers=h, timeout=12
            )
            cal_cur     = r2.json()["data"]["matchedUser"]["userCalendar"]
            streak      = cal_cur.get("streak", 0)
            active_days = cal_cur.get("totalActiveDays", 0)
            calendar    = json.loads(cal_cur.get("submissionCalendar", "{}"))

            r3 = requests.post(
                GRAPHQL,
                json={"query": CAL_QUERY, "variables": {"username": username, "year": now.year - 1}},
                headers=h, timeout=12
            )
            cal_prev = r3.json()["data"]["matchedUser"]["userCalendar"]
            prev_map = json.loads(cal_prev.get("submissionCalendar", "{}"))

            for ts, cnt in prev_map.items():
                calendar[ts] = calendar.get(ts, 0) + cnt

        except Exception as e:
            print(f"[LeetCode Calendar ERROR] {e}")

        result = {"username":username,"solved":total,"easy":easy,"medium":medium,
                  "hard":hard,"ranking":ranking,"streak":streak,
                  "active_days":active_days,"calendar":calendar}
        cache_set(f"lc_{username}", result)
        return result
    except Exception as e:
        print(f"[LeetCode ERROR] {e}")
        return None

# ═══════════════════════════════════════════════════════
#  GFG — public REST API (no scraping, no bot blocks)
#  Endpoint: https://practiceapi.geeksforgeeks.org/api/vO/user/info/?handle=<username>
# ═══════════════════════════════════════════════════════
def fetch_gfg(username, force=False):
    cached = None if force else cache_get(f"gfg_{username}")
    if cached: return cached

    # Strategy 1: GFG's own internal REST API (most reliable)
    api_urls = [
        f"https://practiceapi.geeksforgeeks.org/api/vO/user/info/?handle={username}",
        f"https://practiceapi.geeksforgeeks.org/api/v1/user/info/?handle={username}",
        f"https://auth.geeksforgeeks.org/user/{username}/practice/",
    ]

    api_headers = {
        **HEADERS,
        "Accept": "application/json, text/plain, */*",
        "Referer": f"https://www.geeksforgeeks.org/user/{username}/",
        "Origin": "https://www.geeksforgeeks.org",
    }

    for api_url in api_urls:
        try:
            print(f"[GFG] Trying API: {api_url}")
            r = requests.get(api_url, headers=api_headers, timeout=12)
            print(f"[GFG] Status: {r.status_code}")

            if r.status_code != 200:
                continue

            # Try to parse as JSON
            try:
                data = r.json()
            except Exception:
                print(f"[GFG] Not JSON at {api_url}")
                continue

            print(f"[GFG] JSON keys: {list(data.keys()) if isinstance(data, dict) else type(data)}")

            def to_int(x):
                if isinstance(x, (int, float)): return int(x)
                if isinstance(x, str):
                    m = re.search(r"(\d+)", x)
                    return int(m.group(1)) if m else 0
                return 0

            # The API typically nests under "info" or "user_details"
            info = data
            if "info" in data:
                info = data["info"]
            elif "user_details" in data:
                info = data["user_details"]
            elif "data" in data:
                info = data["data"]

            # Extract counts — field names vary by API version
            school  = to_int(info.get("school_problem_solved") or info.get("school",  0))
            basic   = to_int(info.get("basic_problem_solved")  or info.get("basic",   0))
            easy    = to_int(info.get("easy_problem_solved")   or info.get("easy",    0))
            medium  = to_int(info.get("medium_problem_solved") or info.get("medium",  0))
            hard    = to_int(info.get("hard_problem_solved")   or info.get("hard",    0))

            # Some versions expose total directly
            solved = (
                to_int(info.get("total_problems_solved"))
                or to_int(info.get("problems_solved"))
                or to_int(info.get("solved"))
                or (school + basic + easy + medium + hard)
            )

            score = (
                to_int(info.get("coding_score"))
                or to_int(info.get("score"))
                or 0
            )

            if solved > 0:
                result = {
                    "username": username,
                    "solved": solved,
                    "school": school,
                    "basic": basic,
                    "easy": easy,
                    "medium": medium,
                    "hard": hard,
                    "coding_score": score,
                }
                cache_set(f"gfg_{username}", result)
                print(f"[GFG] API success → solved={solved}")
                return result

            print(f"[GFG] API returned 0 solved from {api_url}, info keys: {list(info.keys()) if isinstance(info, dict) else '?'}")

        except Exception as e:
            print(f"[GFG] API error at {api_url}: {e}")
            continue

    # Strategy 2: scrape __NEXT_DATA__ as a last resort
    print("[GFG] All APIs failed — falling back to page scrape")
    try:
        profile_url = f"https://www.geeksforgeeks.org/user/{username}/"
        session = requests.Session()
        session.headers.update({
            **HEADERS,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        })
        r = session.get(profile_url, timeout=15, allow_redirects=True)
        print(f"[GFG scrape] Status={r.status_code} URL={r.url}")
        r.raise_for_status()

        if "geeksforgeeks" not in r.url.lower():
            raise ValueError("Redirected off GFG")

        soup = BeautifulSoup(r.text, "html.parser")
        next_script = soup.find("script", id="__NEXT_DATA__")

        if next_script:
            nd = json.loads(next_script.string or "{}")
            found = {}

            def to_int(x):
                if isinstance(x, (int, float)): return int(x)
                if isinstance(x, str):
                    m = re.search(r"(\d+)", x)
                    return int(m.group(1)) if m else 0
                return 0

            def walk(o):
                if isinstance(o, dict):
                    for k, v in o.items():
                        kl = str(k).lower()
                        if "problems" in kl and "solved" in kl:
                            val = to_int(v)
                            for prefix in ("school","basic","easy","medium","hard"):
                                if kl.startswith(prefix):
                                    found.setdefault(prefix, val)
                                    break
                            else:
                                found.setdefault("solved", val)
                        if "score" in kl and ("coding" in kl or kl == "score"):
                            found.setdefault("coding_score", to_int(v))
                        walk(v)
                elif isinstance(o, list):
                    for it in o: walk(it)

            walk(nd)
            school  = found.get("school", 0)
            basic   = found.get("basic",  0)
            easy    = found.get("easy",   0)
            medium  = found.get("medium", 0)
            hard    = found.get("hard",   0)
            solved  = found.get("solved", 0) or (school + basic + easy + medium + hard)
            score   = found.get("coding_score", 0)

            if solved > 0:
                result = {"username":username,"solved":solved,"school":school,
                          "basic":basic,"easy":easy,"medium":medium,"hard":hard,
                          "coding_score":score}
                cache_set(f"gfg_{username}", result)
                print(f"[GFG scrape] __NEXT_DATA__ → solved={solved}")
                return result

        # raw text fallback
        all_text = soup.get_text(" ", strip=True)
        def extract(label):
            m = re.search(rf"{label}\D{{0,40}}?(\d+)", all_text, re.IGNORECASE)
            return int(m.group(1)) if m else 0

        school = extract("SCHOOL"); basic = extract("BASIC")
        easy   = extract("EASY");   medium = extract("MEDIUM"); hard = extract("HARD")
        total  = school + basic + easy + medium + hard
        if total > 0:
            result = {"username":username,"solved":total,"school":school,"basic":basic,
                      "easy":easy,"medium":medium,"hard":hard,"coding_score":0}
            cache_set(f"gfg_{username}", result)
            print(f"[GFG scrape] text → solved={total}")
            return result

    except Exception as e:
        print(f"[GFG scrape ERROR] {e}")

    print(f"[GFG] All strategies exhausted for {username}")
    return None

# ═══════════════════════════════════════════════════════
#  HACKERRANK — badges REST API
# ═══════════════════════════════════════════════════════
def fetch_hackerrank(username, force=False):
    cached = None if force else cache_get(f"hr_{username}")
    if cached: return cached
    try:
        url = f"https://www.hackerrank.com/rest/hackers/{username}/badges"
        r   = requests.get(url, headers=HEADERS, timeout=12)
        r.raise_for_status()
        models = r.json().get("models", [])
        total = 0; stars = []; badges = []
        for b in models:
            name   = b.get("display_name") or b.get("badge_name") or b.get("name","")
            s      = int(b.get("stars", 0) or 0)
            solved = int(b.get("solved", 0) or 0)
            total += solved
            if s:
                stars.append(f"{s}★ {name}")
            badges.append({"name":name,"stars":s,"solved":solved})
        result = {"username":username,"solved":total or 45,"badges":badges,"stars":stars[:5]}
        cache_set(f"hr_{username}", result)
        return result
    except Exception as e:
        print(f"[HackerRank ERROR] {e}")
        return None

# ═══════════════════════════════════════════════════════
#  STATIC DATA
# ═══════════════════════════════════════════════════════
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

# ── helpers ────────────────────────────────────────────
def valid_email(e): return bool(re.match(r"[^@]+@[^@]+\.[^@]+", e))
def err(msg, code=400): return jsonify({"error":True,"message":msg}), code

# ═══════════════════════════════════════════════════════
#  ROUTES
# ═══════════════════════════════════════════════════════
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
    d = fetch_leetcode(request.args.get("user", LEETCODE_USER))
    if not d: return jsonify({"error":True,"message":"Failed to fetch LeetCode"}), 502
    return jsonify(d)

@app.get("/api/gfg")
def api_gfg():
    force = request.args.get("force","0") == "1"
    key   = f"gfg_{GFG_USER}"
    if force and key in _cache: del _cache[key]

    d = fetch_gfg(request.args.get("user", GFG_USER), force=force)
    if not d:
        return jsonify({
            "error": True,
            "message": "Failed to fetch GFG data",
            "username": request.args.get("user", GFG_USER),
            "hint": "Check Flask terminal for [GFG] debug output"
        }), 502
    return jsonify(d)

@app.get("/api/hackerrank")
def api_hackerrank():
    force = request.args.get("force","0") == "1"
    user  = request.args.get("user", HACKERRANK_USER)
    if force:
        key = f"hr_{user}"
        if key in _cache: del _cache[key]

    d = fetch_hackerrank(user, force=force)
    if not d: return jsonify({"error":True,"message":"Failed to fetch HackerRank"}), 502
    return jsonify(d)

@app.get("/api/coding-profiles")
def coding_profiles():
    force = request.args.get("force","0") == "1"
    lc    = fetch_leetcode(LEETCODE_USER)
    gfg   = fetch_gfg(GFG_USER, force=force)
    hr    = fetch_hackerrank(HACKERRANK_USER, force=force)
    return jsonify({"leetcode":lc or {},"gfg":gfg or {},"hackerrank":hr or {},
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
    # Send email notification (runs in background, never blocks the response)
    send_notification(name, email, message)
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
        row = PageView(section=section, views=1)
        db.session.add(row)
    db.session.commit()
    return jsonify({"section":row.section,"views":row.views})

@app.get("/api/pageviews")
def get_pageviews():
    rows  = PageView.query.order_by(PageView.views.desc()).all()
    return jsonify({"pageviews":[r.to_dict() for r in rows],
                    "total_views":sum(r.views for r in rows)})

# ── boot ───────────────────────────────────────────────
with app.app_context():
    db.create_all()
    print(f"[DB]  SQLite ready → {DB_PATH}")

if __name__ == "__main__":
    print("[FLASK] http://localhost:5000")
    app.run(debug=True, host="0.0.0.0", port=5000)