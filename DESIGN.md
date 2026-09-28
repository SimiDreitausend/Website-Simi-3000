# Design — SIMI 3000

The source of truth for everything visual. Decisions here are Tobias's; agents implement them
and ask when something isn't covered. A section marked **Open** is not decided — it does not
mean "anything goes".

## Brand essence

**Open** — deliberately postponed until after launch, with colour and typography.

## Layout

One screen, three elements stacked on a single centred axis:

1. **Name** — "SIMI 3000", top centre.
2. **Photo** — huge, centred horizontally and vertically in the space between name and buttons.
3. **Contact buttons** — below the photo.

The page never scrolls: name, photo and buttons always fit one viewport, on phone and desktop.
The photo takes all the space the other elements leave, keeping its 3:4 ratio.

Impressum and Datenschutz: small links at the very bottom.

## The photo and its effect

**Image:** `public/img/simi.avif` (AVIF, `avifenc -q 50`, ~246 KB) with `public/img/simi.jpg` as the
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

**Touch:** dragging a finger over the photo reveals it exactly like the mouse does.

**Reduced motion:** with `prefers-reduced-motion`, the photo stays frosted and nothing reveals.

**Open — tuned in `sketches/frost/`:** brush size and edge softness, how long the trail stays
clear, blur strength, milkiness, grain.

## Colour

**Open.**

## Typography

For now: **Arial** (system font, nothing to host) for everything. The real typeface is
**Open** and comes with the brand identity.

## Contact / call to action

Two buttons: **E-Mail** (opens a `mailto:` link) and **Instagram** (opens the profile).
For now they are plain, unstyled buttons; styling comes later.

- Instagram: https://www.instagram.com/simi3.000/

**Open:** the email address; button order.

## Motion

**Open**, apart from the photo effect above.

## Voice and copy

German only. The name is always written **SIMI 3000** (capitals, one space). No text beyond
the name and the buttons.

## Legal pages

**Open.** How Impressum and Datenschutz look.
