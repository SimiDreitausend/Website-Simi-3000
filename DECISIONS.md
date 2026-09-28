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

## D8 — Online first (2026-09-28)
Supersedes the priority in D1 and the order in D4. The first goal is getting simi3000.com online
with the designed teaser page; the edit-and-approval workflow comes after launch.
Order: foundation → DESIGN.md → teaser page (local) → go live on simi3000.com → Vorschau →
Simi's access and approval workflow → handover.

## D9 — DESIGN.md holds intent, code holds values (2026-09-28)
DESIGN.md stays short: what the site should be and feel like, and why. Exact sizes, timings and
other values live in the code, so they're never maintained twice. Contact details live in
CONTENT.md.

## D10 — Deploy on push to main via SFTP (2026-09-28)
GitHub Actions mirrors `public/` to one.com over SFTP (rclone) on every push to `main`, after the
checks pass, then smoke-tests the live site. Tobias has write access but not admin on the repo,
so Simi manages the secrets. Undo = revert and push.

## D11 — Vorschau on pull requests (2026-09-28)
Every pull request against `main` deploys the whole site to staging.simi3000.com (one slot,
latest wins), behind HTTP basic auth, with noindex header, disallow-all robots.txt and a
VORSCHAU label — all added to a copy during upload, never to `public/`.

## D12 — Four-eyes approval for every change (2026-09-28)
Supersedes D2. Every change — by Simi, by Tobias, or by an agent working for either — goes
**Vorschau → approval by the other person on GitHub → live**. Nobody publishes their own change.
Enforced by a ruleset on `main` (set up by Simi, who is the repo admin): pull request required,
one approval, stale approvals dismissed on new commits, approval of the latest push required,
`check` must pass, no bypass for anyone. Simi approves directly on GitHub (not via an agent).
Consequence for the access bucket: Simi's changes must be authored under Simi's own GitHub
account, so that Tobias is the one who approves them.

## Open
- The `main` ruleset (D12): Simi sets it up from the guide.
- Simi's Claude plan — needed for the access bucket.
