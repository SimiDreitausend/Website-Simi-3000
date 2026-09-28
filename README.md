# SIMI 3000 — Website

Teaser website for SIMI 3000, an art project by Simi. Live at https://simi3000.com.

## Layout

```
public/                  the website — the only folder that is deployed
  index.html             teaser page
  css/  js/  img/        its styles, scripts (frost effect, glove cursor) and images
  impressum/             Impressum
  datenschutz/           Datenschutzerklärung
scripts/check.py         pre-deploy checks
assets/                  source files for what's in public/ (not deployed)
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

**How a change goes live** (DECISIONS.md, D12): open a pull request → it appears on the
Vorschau → **the other person approves it on GitHub** → merge. Direct pushes to `main` are
blocked by a ruleset, and nobody can approve their own pull request.

**Every merge into `main` goes live** on https://simi3000.com within about a minute
(`.github/workflows/deploy.yml`):

1. `scripts/check.py` runs; if it fails, nothing is uploaded.
2. `public/` is mirrored to one.com over SFTP — the server ends up an exact copy, including
   deletions.
3. A smoke test fetches the pages, stylesheet, script and photo from the live site.

Watch it under the repository's **Actions** tab. To deploy again without a change, use
**Actions → Deploy → Run workflow**.

**Undo a bad deploy:** revert the commit in a new pull request (GitHub's **Revert** button on the
merged pull request does this); once it's approved and merged, the previous version is live.

**Credentials** are repository secrets `SFTP_HOST`, `SFTP_USER` and `SFTP_PASSWORD` (managed by
the repo owner under Settings → Secrets and variables → Actions). The server's host keys are
pinned in `.github/one-com-known-hosts`. On the server, the site lives in
`webroots/by-route/simi3000.com_` (the same folder serves `www.simi3000.com`).

## Vorschau (staging)

https://staging.simi3000.com — a complete copy of the site with a pull request's changes, behind
a login and hidden from search engines (`.github/workflows/staging.yml`).

- **Every pull request against `main`** deploys its version there, and again on every new
  commit. There is one Vorschau; the latest run wins. **Actions → Vorschau → Run workflow**
  deploys any branch by hand.
- Staging-only additions are made to a copy while uploading — `public/` never contains them:
  the login (`.htaccess` + a bcrypt `.htpasswd`), an `X-Robots-Tag: noindex` header, a
  `robots.txt` that disallows everything, and a black **VORSCHAU** label on every page.
- Login credentials are the secrets `STAGING_USER` and `STAGING_PASSWORD`.
- On the server it lives in `webroots/by-route/staging.simi3000.com_` (one.com subdomain).
