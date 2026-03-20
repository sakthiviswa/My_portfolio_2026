"""
db_inspect.py — SQLite database inspector
Run: python db_inspect.py

Commands (interactive menu):
  1. List all contact messages
  2. List unread messages
  3. Mark message as read
  4. Delete a message
  5. Show page views
  6. Show database stats
  0. Exit
"""

import sqlite3, os, sys
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "portfolio.db")


def connect():
    if not os.path.exists(DB_PATH):
        print(f"\n❌  Database not found at: {DB_PATH}")
        print("    Start the Flask server first to auto-create it.\n")
        sys.exit(1)
    return sqlite3.connect(DB_PATH)


def table_exists(conn, name):
    cur = conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name=?", (name,)
    )
    return cur.fetchone() is not None


def list_messages(conn, unread_only=False):
    if not table_exists(conn, "contact_message"):
        print("  (no contact_message table yet)\n")
        return
    q = "SELECT id, name, email, message, is_read, created_at FROM contact_message"
    if unread_only:
        q += " WHERE is_read = 0"
    q += " ORDER BY created_at DESC"
    rows = conn.execute(q).fetchall()
    if not rows:
        print("  (no messages)\n")
        return
    print(f"\n{'─'*72}")
    for row in rows:
        _id, name, email, msg, is_read, ts = row
        status = "✅ read" if is_read else "🔵 unread"
        print(f"  #{_id}  [{status}]  {ts[:19]}")
        print(f"     Name   : {name}")
        print(f"     Email  : {email}")
        print(f"     Message: {msg[:100]}{'...' if len(msg) > 100 else ''}")
        print(f"{'─'*72}")
    print()


def mark_read(conn):
    msg_id = input("  Enter message ID to mark as read: ").strip()
    if not msg_id.isdigit():
        print("  Invalid ID.\n")
        return
    conn.execute(
        "UPDATE contact_message SET is_read = 1 WHERE id = ?", (int(msg_id),)
    )
    conn.commit()
    print(f"  ✅ Message #{msg_id} marked as read.\n")


def delete_message(conn):
    msg_id = input("  Enter message ID to delete: ").strip()
    if not msg_id.isdigit():
        print("  Invalid ID.\n")
        return
    conn.execute("DELETE FROM contact_message WHERE id = ?", (int(msg_id),))
    conn.commit()
    print(f"  🗑️  Message #{msg_id} deleted.\n")


def show_pageviews(conn):
    if not table_exists(conn, "page_view"):
        print("  (no page_view table yet)\n")
        return
    rows = conn.execute(
        "SELECT section, views FROM page_view ORDER BY views DESC"
    ).fetchall()
    if not rows:
        print("  (no page views recorded yet)\n")
        return
    total = sum(r[1] for r in rows)
    print(f"\n  {'Section':<20} {'Views':>8}")
    print(f"  {'─'*30}")
    for section, views in rows:
        bar = "█" * min(views // 2, 30)
        print(f"  {section:<20} {views:>8}  {bar}")
    print(f"  {'─'*30}")
    print(f"  {'TOTAL':<20} {total:>8}\n")


def show_stats(conn):
    print("\n  📊 Database Stats")
    print(f"  {'─'*40}")
    print(f"  Path: {DB_PATH}")

    size = os.path.getsize(DB_PATH)
    print(f"  Size: {size} bytes ({size/1024:.1f} KB)")

    if table_exists(conn, "contact_message"):
        total    = conn.execute("SELECT COUNT(*) FROM contact_message").fetchone()[0]
        unread   = conn.execute("SELECT COUNT(*) FROM contact_message WHERE is_read=0").fetchone()[0]
        print(f"  Messages: {total} total, {unread} unread")
    else:
        print("  Messages: table not created yet")

    if table_exists(conn, "page_view"):
        views = conn.execute("SELECT SUM(views) FROM page_view").fetchone()[0] or 0
        pages = conn.execute("SELECT COUNT(*) FROM page_view").fetchone()[0]
        print(f"  Page Views: {views} total across {pages} sections")
    else:
        print("  Page Views: table not created yet")

    print()


def menu():
    conn = connect()
    while True:
        print("╔══════════════════════════════════╗")
        print("║   Portfolio SQLite Inspector     ║")
        print("╠══════════════════════════════════╣")
        print("║  1. List all messages            ║")
        print("║  2. List unread messages         ║")
        print("║  3. Mark message as read         ║")
        print("║  4. Delete a message             ║")
        print("║  5. Show page views              ║")
        print("║  6. Database stats               ║")
        print("║  0. Exit                         ║")
        print("╚══════════════════════════════════╝")
        choice = input("  Choose: ").strip()
        print()
        if choice == "1":   list_messages(conn)
        elif choice == "2": list_messages(conn, unread_only=True)
        elif choice == "3": mark_read(conn)
        elif choice == "4": delete_message(conn)
        elif choice == "5": show_pageviews(conn)
        elif choice == "6": show_stats(conn)
        elif choice == "0":
            conn.close()
            print("  Bye!\n")
            break
        else:
            print("  Invalid choice.\n")


if __name__ == "__main__":
    menu()