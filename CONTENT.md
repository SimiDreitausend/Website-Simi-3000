# Content — what Simi can change

The contract between Simi's edits and the site's design. Anything listed here may be changed on
Simi's request; anything not listed is design and needs Tobias. Reviewers (human or agent) check
edits against this file.

## Editable

| What | Where | Rules |
|---|---|---|
| Impressum text | `public/impressum/index.html`, between the `CONTENT:impressum` markers | Plain paragraphs and links only |
| Datenschutz text | `public/datenschutz/index.html`, between the `CONTENT:datenschutz` markers | Plain paragraphs and links only |
| E-Mail address | `public/index.html`, between the `CONTENT:contact` markers (the `mailto:` link) | A valid address; the button text stays "E-Mail" |
| Instagram link | `public/index.html`, between the `CONTENT:contact` markers | A profile URL; the button text stays "Instagram" |
| Photo | `public/img/simi.avif` + `public/img/simi.jpg`; `width`/`height` and `alt` between the `CONTENT:photo` markers | Portrait 3:4. Encode AVIF with `avifenc -q 50` (see AGENTS.md), keep the JPEG as fallback, both under 1 MB, same file names |

## Not editable by content requests

Layout, colours, fonts, the photo effect, and anything else defined in DESIGN.md.
