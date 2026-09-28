# SIMI 3000 — Website

Teaser website for SIMI 3000, an art project by Simi. Live at https://simi3000.com.

## Layout

```
public/                  the website — the only folder that is deployed
  index.html             teaser page
  impressum/             Impressum
  datenschutz/           Datenschutzerklärung
scripts/check.py         pre-deploy checks
AGENTS.md                rules for AI agents (CLAUDE.md imports it)
DESIGN.md                visual source of truth
CONTENT.md               what can be edited as content, and where
DECISIONS.md             why it's built this way; open questions
```

## Local preview

```bash
python3 -m http.server 8030 -d public
```

Then open http://localhost:8030. For a phone on the same Wi-Fi, use
`http://<your Mac's IP>:8030` (`ipconfig getifaddr en0`).

## Checks

```bash
python3 scripts/check.py
```

Confirms the required pages exist, every page is German and links to Impressum and Datenschutz,
local links resolve, and no file is over 1 MB. Standard library only; CI runs it on every push.

## Deployment

Not set up yet. Planned (see DECISIONS.md, D2 and D8): first, pushes to `main` deploy to
simi3000.com; later, pull requests deploy to a password-protected Vorschau subdomain and merge
to `main` after Tobias's approval.
