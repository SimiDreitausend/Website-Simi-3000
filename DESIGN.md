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

**Tuned values** (in `sketches/frost/`). Sizes are fractions of the photo's width, so the look is
the same at every screen size. "Desktop" means `(hover: hover) and (pointer: fine)`; everything
else uses the mobile values.

| Setting | Desktop | Mobile | Meaning |
|---|---|---|---|
| `blur` | 0.03 | 0.04 | frost blur radius × photo width |
| `milk` | 0.40 | 0.15 | opacity of the white haze on the glass |
| `grain` | 0.25 | 0.06 | opacity of the noise texture on the glass |
| `brush` | 0.035 | 0.025 | radius of the clear spot × photo width |
| `soft` | 0.7 | 0.6 | share of the brush radius that is a soft edge |
| `trail` | 0.8 s | 0.6 s | how long a spot takes to frost over again |

**Idle hint (desktop only):** while the pointer is off the photo, the effect moves subtly on its
own, so visitors see it's interactive. It fades out the moment the pointer enters and back in
when it leaves. Not on mobile, not with reduced motion.
**Open:** the style — *drift* (one faint, soft clear spot wandering slowly) or *breathe* (the
frost slowly thickens and thins) — and its strength and speed. Starting point in the sketch:
drift, strength 0.3, spot size 0.12, speed 1.

## Cursor

**Desktop only:** a white cartoon glove pointing up replaces the pointer on the whole page,
links and buttons included. Files: `public/img/cursor.png` (41 × 48) and `cursor@2x.png`,
hotspot at the fingertip (22, 2). Phones keep their normal touch behaviour.

**Open:** licence of the source clip-art (origin unknown). Keep it only if its use is cleared;
otherwise redraw an original glove in the same spirit.

## Colour

**Open.**

## Typography

For now: **Arial** (system font, nothing to host) for everything. The real typeface is
**Open** and comes with the brand identity.

## Contact / call to action

Two buttons: **E-Mail** (opens a `mailto:` link) and **Instagram** (opens the profile).
For now they are plain, unstyled buttons; styling comes later.

- E-Mail: mail@simi3000.com
- Instagram: https://www.instagram.com/simi3.000/

**Open:** button order (sketch shows E-Mail first).

## Motion

**Open**, apart from the photo effect above.

## Voice and copy

German only. The name is always written **SIMI 3000** (capitals, one space). No text beyond
the name and the buttons.

## Legal pages

**Open.** How Impressum and Datenschutz look.
