# Agent instructions — SIMI 3000

Rules for any AI agent (Claude, Codex, …) working in this repository. Humans: see README.md.

## What this is

The teaser website for SIMI 3000, an art project by Simi. One page: a photo with a visual
effect, plus a way to get in touch. German only. Live at https://simi3000.com.

The site is deliberately small. Current priority: get simi3000.com online with the designed
page. After launch, the workflow around it matters most: Simi, who is not technical, changes
text and images without ever seeing git, and nothing goes live without Tobias's approval. See
DECISIONS.md for why things are the way they are.

## Sources of truth

| Question | File |
|---|---|
| How should it look and feel? | DESIGN.md (intent; exact values are in the code) |
| What may Simi change, and where does it live? | CONTENT.md |
| Why is it built this way? What is still open? | DECISIONS.md |
| How do I run and deploy it? | README.md |

If a request contradicts one of these files, stop and ask — don't silently change the file or
work around it. Design decisions belong to Tobias: never invent visual direction that DESIGN.md
doesn't cover; ask instead.

## Hard rules

- **Only `public/` is deployed.** Everything the website serves lives there; everything else
  (docs, scripts, workflows) never reaches the server.
- **No build step, no dependencies.** Plain HTML/CSS/JS that opens as-is from a static server.
- **German only.** Every page has `<html lang="de">`. User-facing text is German; code,
  comments and docs are English.
- **Impressum and Datenschutz stay reachable from every page** (German law). Their text lives
  between the `CONTENT:… START/END` markers — change only what is between them.
- **The repository is public.** Never commit passwords, tokens, `.htpasswd` files, or anything
  private. Secrets live in GitHub Actions secrets.
- **Keep images small.** Compress before committing; `scripts/check.py` rejects files over 1 MB.
- **Photos:** AVIF via `<picture>` with a JPEG fallback. Encode with `avifenc` (Homebrew
  `libavif`), not macOS `sips` — sips writes tiled AVIFs that Chromium decodes but draws blank.
- **Tuned values live once, in CSS custom properties** (`public/css/home.css`); `frost.js` reads
  them from there. Change a value there, never duplicate it in JS or docs.
- **`assets/`** holds source files (e.g. the glove drawing) for what's exported into `public/`.
- Must work on a phone and on desktop, and respect `prefers-reduced-motion`.

## Verifying a change

1. `python3 scripts/check.py` passes (CI runs it on every push and pull request).
2. `python3 -m http.server 8030 -d public`, then open http://localhost:8030 at phone and desktop
   widths. Look at the actual change, including the legal pages if you touched shared markup.

## Git

- **`main` is live:** every merge into `main` deploys to simi3000.com.
- **Never push to `main`.** Every change goes through a pull request (DECISIONS.md, D12):
  1. Work on a branch, small commits with descriptive messages, then open a pull request.
  2. The pull request deploys to the Vorschau (https://staging.simi3000.com, login required).
  3. **The other person approves it on GitHub** — changes for Tobias are approved by Simi, and
     changes for Simi by Tobias. Never approve, or ask to auto-approve, on anyone's behalf.
  4. After approval it is merged and goes live.
- Push branches and open pull requests only when the person you're working for asks.
