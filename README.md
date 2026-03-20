# Sakthinathan V — Portfolio
## React 18 + Tailwind CSS (Frontend) · Flask + SQLite (Backend)

---

## Project Structure

```
sakthi-portfolio/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js            ← proxies /api → Flask :5000
│   ├── tailwind.config.js        ← Royal Purple custom theme
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx               ← scroll tracking + pageview hits
│       ├── index.css             ← Tailwind + keyframes + snap scroll
│       ├── hooks/
│       │   └── usePageView.js    ← fires POST /api/pageview on scroll
│       ├── components/
│       │   ├── Navbar.jsx        ← Sticky nav + dot indicators
│       │   ├── StarField.jsx     ← Canvas animated stars
│       │   └── SectionHeader.jsx ← Reusable section title
│       └── pages/
│           ├── Hero.jsx          ← Page 1: Name, contacts, CTA
│           ├── Education.jsx     ← Page 2: Timeline (no skills)
│           ├── Skills.jsx        ← Page 3: Skills + filter tabs
│           ├── CodingProfiles.jsx← Page 4: LeetCode/GFG/HackerRank
│           ├── Projects.jsx      ← Page 5: Projects (fetches API)
│           ├── Experience.jsx    ← Page 6: Internship + Certs
│           └── Contact.jsx       ← Page 7: Form → POST /api/contact
│
└── backend/
    ├── app.py                    ← Flask REST API + SQLAlchemy models
    ├── requirements.txt
    ├── db_inspect.py             ← CLI inspector for the SQLite DB
    └── portfolio.db              ← SQLite file (auto-created on first run)
```

---

## Database Schema (SQLite)

### Table: `contact_message`
| Column       | Type     | Description                      |
|--------------|----------|----------------------------------|
| id           | INTEGER  | Primary key (auto-increment)     |
| name         | TEXT     | Sender's name                    |
| email        | TEXT     | Sender's email                   |
| message      | TEXT     | Message body                     |
| is_read      | BOOLEAN  | Read flag (default false)        |
| created_at   | DATETIME | UTC timestamp (auto)             |

### Table: `page_view`
| Column   | Type    | Description                          |
|----------|---------|--------------------------------------|
| id       | INTEGER | Primary key                          |
| section  | TEXT    | Section slug (unique): home, skills… |
| views    | INTEGER | Hit count (increments on each visit) |

---

## Quick Start

### 1. Backend (Flask + SQLite)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate
# Windows:   venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install
pip install -r requirements.txt

# Run  (portfolio.db is auto-created on first start)
python app.py
# → Running on http://localhost:5000
# → [DB] SQLite ready at .../portfolio.db
```

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
# → Running on http://localhost:3000
```

Open **http://localhost:3000**

---

## API Endpoints

| Method  | Endpoint                        | Description                        |
|---------|---------------------------------|------------------------------------|
| GET     | `/api/health`                   | Health + DB stats                  |
| GET     | `/api/skills?cat=Language`      | Skills list (optional filter)      |
| GET     | `/api/projects`                 | Projects list                      |
| GET     | `/api/coding-profiles`          | LeetCode / GFG / HackerRank        |
| POST    | `/api/contact`                  | Save message → SQLite              |
| GET     | `/api/messages`                 | All messages (admin)               |
| PATCH   | `/api/messages/<id>/read`       | Mark message as read               |
| DELETE  | `/api/messages/<id>`            | Delete a message                   |
| POST    | `/api/pageview`                 | Increment section view count       |
| GET     | `/api/pageviews`                | All section view counts            |

### POST /api/contact
```json
{ "name": "Recruiter", "email": "hr@co.com", "message": "Let's talk!" }
```

### POST /api/pageview
```json
{ "section": "skills" }
```

---

## Inspect the Database

```bash
cd backend
python db_inspect.py
```

Interactive menu — list messages, mark read, delete, view page-hit counts.

Or use any SQLite GUI tool (DB Browser for SQLite, TablePlus, DBeaver)
and open `backend/portfolio.db`.

---

## Customise

Update solved counts in `backend/app.py` → `CODING_PROFILES`:
```python
{"key": "leetcode",    "solved": 85, ...}   # ← your real count
{"key": "gfg",         "solved": 60, ...}
{"key": "hackerrank",  "solved": 45, ...}
```

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18 · Vite · Tailwind CSS 3    |
| Fonts     | Cinzel · Rajdhani · JetBrains Mono  |
| Backend   | Flask 3 · Flask-CORS                |
| ORM       | Flask-SQLAlchemy 3                  |
| Database  | SQLite (`portfolio.db`)             |
| Dev proxy | Vite proxy → Flask :5000            |