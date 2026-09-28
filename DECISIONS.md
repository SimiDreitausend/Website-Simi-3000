# Decisions

Confirmed decisions, newest last. Re-read at every checkpoint so the project doesn't drift. To
change one, add a new entry that supersedes it — don't edit history.

## D1 — Goal (2026-09-28)
A German-only teaser for Simi's art project SIMI 3000: a photo with a blur-like visual effect
and a way to get in touch. The core requirement is the workflow: Simi (non-technical) updates
text and images on their own, and nothing goes live without Tobias's approval.

## D2 — Change flow (2026-09-28)
Every change goes **Vorschau → review → Tobias approves → Live**. Vorschau is a full copy of the
site on a password-protected, non-indexed staging subdomain. Simi never sees git (branches,
commits, pull requests).

## D3 — Fresh repository (2026-09-28)
The site lives in `SimiDreitausend/Website-Simi-3000`, started clean. The `ui-experiments` MVP
(scratch card, iOS-like style) is not carried over.

## D4 — Design before pipeline (2026-09-28)
Order: foundation → DESIGN.md → teaser page (previewed locally) → Vorschau → Live → Simi's
access → handover.

## D5 — Simi's access: easiest option wins (2026-09-28)
Decided in its own bucket by comparing Claude-based editing with a git-based CMS (e.g. Decap or
Sveltia, whose editorial workflow maps onto D2). No custom backend on one.com.

## D6 — Purpose-built docs (2026-09-28)
AGENTS.md (agent rules; CLAUDE.md imports it), DESIGN.md, CONTENT.md, DECISIONS.md, README.md.

## D7 — Static site, only `public/` deployed (2026-09-28)
Plain HTML/CSS/JS with no build step, hosted on one.com at simi3000.com. Only `public/` is
uploaded. The repository is public, so secrets live only in GitHub Actions secrets.

## Open
- one.com upload method (SSH/SFTP availability on the plan) — needed for the Vorschau bucket.
- Admin rights on the repo for branch protection — needed for the Live bucket.
- Simi's Claude plan — needed for the access bucket.
