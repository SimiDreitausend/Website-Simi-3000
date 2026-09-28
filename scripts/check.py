#!/usr/bin/env python3
"""Checks that public/ is safe to deploy. Standard library only; CI runs it on every push.

- the required pages exist
- every page is German, has a <title>, and links to Impressum and Datenschutz
- every local href/src points at a file that exists inside public/
- no file in public/ is larger than MAX_FILE_BYTES
"""

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
REQUIRED_PAGES = ["index.html", "impressum/index.html", "datenschutz/index.html"]
LEGAL_LINKS = {"/impressum/": "Impressum", "/datenschutz/": "Datenschutz"}
MAX_FILE_BYTES = 1_000_000


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.lang = None
        self.has_title = False
        self.refs = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.lang = attrs.get("lang")
        if tag == "title":
            self.has_title = True
        for name in ("href", "src"):
            if attrs.get(name):
                self.refs.append(attrs[name])


def resolve(page: Path, ref: str):
    """Map a local reference to the file a static server would serve, or None if external."""
    url = urlparse(ref)
    if url.scheme or url.netloc or ref.startswith("#"):
        return None
    path = unquote(url.path)
    if not path:
        return None
    target = PUBLIC / path.lstrip("/") if path.startswith("/") else page.parent / path
    if path.endswith("/"):
        target = target / "index.html"
    return target


def main() -> int:
    errors = []

    for rel in REQUIRED_PAGES:
        if not (PUBLIC / rel).is_file():
            errors.append(f"missing required page: public/{rel}")

    for file in sorted(PUBLIC.rglob("*")):
        if file.is_file() and file.stat().st_size > MAX_FILE_BYTES:
            errors.append(f"{file.relative_to(ROOT)} is {file.stat().st_size // 1000} KB "
                          f"(limit {MAX_FILE_BYTES // 1000} KB) — compress it")

    for page_path in sorted(PUBLIC.rglob("*.html")):
        name = page_path.relative_to(ROOT)
        page = Page()
        page.feed(page_path.read_text(encoding="utf-8"))

        if page.lang != "de":
            errors.append(f"{name}: <html> needs lang=\"de\"")
        if not page.has_title:
            errors.append(f"{name}: missing <title>")

        folder = page_path.parent.relative_to(PUBLIC).as_posix()
        page_url = "/" if folder == "." else f"/{folder}/"
        for link, label in LEGAL_LINKS.items():
            if link != page_url and link not in page.refs:
                errors.append(f"{name}: must link to {label} ({link})")

        for ref in page.refs:
            target = resolve(page_path, ref)
            if target is None:
                continue
            if not target.resolve().is_relative_to(PUBLIC):
                errors.append(f"{name}: {ref} points outside public/")
            elif not target.is_file():
                errors.append(f"{name}: broken link {ref}")

    for error in errors:
        print(f"✗ {error}")
    if errors:
        return 1
    print(f"✓ public/ ok ({sum(1 for _ in PUBLIC.rglob('*.html'))} pages)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
