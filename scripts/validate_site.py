#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
LANDING = ROOT / "landing.html"
NOT_FOUND = ROOT / "404.html"
CNAME = ROOT / "CNAME"


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.title = []
        self.in_title = False
        self.scripts = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"])
        if tag == "title":
            self.in_title = True
        if tag == "script" and values.get("src"):
            self.scripts.append(values["src"])

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title.append(data.strip())


errors = []
if not INDEX.exists():
    errors.append("Missing root index.html")
else:
    html = INDEX.read_text(encoding="utf-8")
    parser = SiteParser()
    parser.feed(html)

    required_ids = {
        "main",
        "homeView",
        "signinView",
        "appView",
        "publicActions",
        "appActions",
        "menuButton",
        "sidebar",
        "signOut",
        "microsoftSignIn",
    }
    missing = sorted(required_ids - parser.ids)
    if missing:
        errors.append(f"Missing required DOM IDs: {', '.join(missing)}")

    required_text = [
        "From learning brief to approved release.",
        "Open publishing workspace",
        "Publishing dashboard",
        "function init()",
        "init();",
    ]
    for value in required_text:
        if value not in html:
            errors.append(f"Missing expected landing/application content: {value}")

    if not "".join(parser.title).strip():
        errors.append("HTML title is empty")

for route_file, route_name in ((LANDING, "landing alias"), (NOT_FOUND, "404 fallback")):
    if not route_file.exists():
        errors.append(f"Missing {route_name}: {route_file.name}")
        continue
    route_html = route_file.read_text(encoding="utf-8")
    if "/#home" not in route_html:
        errors.append(f"{route_file.name} must route visitors to /#home")

if not CNAME.exists() or CNAME.read_text(encoding="utf-8").strip() != "publish.skunkworksacademy.com":
    errors.append("CNAME must contain publish.skunkworksacademy.com")

if not (ROOT / ".nojekyll").exists():
    errors.append("Missing .nojekyll static-site safeguard")

if errors:
    print("Publish site validation failed:")
    for error in errors:
        print(f"- {error}")
    sys.exit(1)

print("Publish site validation passed.")
print("Validated root landing page, explicit landing alias, route fallback, application routes, custom domain and Pages safeguards.")
