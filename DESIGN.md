# Design — SIMI 3000

The source of truth for everything visual. Decisions here are Tobias's; agents implement them
and ask when something isn't covered. A section marked **Open** is not decided — it does not
mean "anything goes".

## Brand essence

**Open.** What a visitor should feel in the first three seconds, and what the site must never
feel like.

## Layout

One screen, three elements stacked on a single centred axis:

1. **Name** — "SIMI 3000", top centre.
2. **Photo** — huge, centred horizontally and vertically in the space between name and buttons.
3. **Contact buttons** — below the photo.

**Open:** whether everything fits one viewport without scrolling; the photo's maximum size;
where the Impressum/Datenschutz links sit (they must be reachable from the page).

## The photo and its effect

**Image:** `public/img/simi.avif` (AVIF, quality 40, ~257 KB) with `public/img/simi.jpg` as the
fallback, served through `<picture>`. Portrait, 1125 × 1500 (3:4). Simi standing in a cactus
garden.

**Effect — frosted glass that the cursor wipes clear:**

- **At rest** the whole photo sits behind a glassy, frosted blur: soft, milky, low-contrast, as
  if seen through frosted glass.
- **Reveal:** where the pointer moves over the photo, the real, sharp image shows through.
- **Trail:** the pointer leaves a trail of revealed image behind it, and the trail blurs over
  again, so the photo returns to frosted when the pointer stops or leaves.

Reference: a collage (not in the repo — third-party image) where a frosted rectangle with one
soft and one hard edge covers half a face. The quality to match is the frosting itself: a
strong, even blur that keeps colour and shape but no detail.

**Open:**
- Brush: size of the revealed area and how soft its edge is.
- Trail: how long a revealed spot stays clear before it's frosted again.
- Touch: whether dragging a finger reveals the same way (the page must work on phones).
- Reduced motion: what `prefers-reduced-motion` users see.
- Frost details: blur strength, and whether the glass adds a tint, brightening or grain.

## Colour

**Open.**

## Typography

**Open.** Typeface for the name and the buttons (and its licence/hosting).

## Contact / call to action

Two buttons: **E-Mail** (opens a `mailto:` link) and **Instagram** (opens the profile).
For now they are plain, unstyled buttons; styling comes later.

**Open:** the email address and Instagram handle; button order.

## Motion

**Open**, apart from the photo effect above.

## Voice and copy

German only. **Open:** how the name is set ("SIMI 3000" / "Simi 3000" / other), any text
beyond the name and buttons.

## Legal pages

**Open.** How Impressum and Datenschutz look.
