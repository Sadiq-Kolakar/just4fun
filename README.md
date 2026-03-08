# just4fun — The Amazing Spider-Man Fan Zone 🕷️

A Spider-Man fan website built with **pure HTML5, CSS3, and Vanilla JavaScript** — no frameworks, no build tools. Just open `index.html` and swing!

![Spider-Man Fan Zone — screenshot coming soon]()
*(Add a screenshot after opening the site in your browser)*

---

## 🚀 How to Run

No installation or build step required.

```bash
# Clone the repo
git clone https://github.com/Sadiq-Kolakar/just4fun.git
cd just4fun

# Open in your browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or simply drag `index.html` into any modern browser.

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🎬 Hero Section | Dark Spider-Man themed, optional video background |
| 🕸️ Web Cursor Trail | Canvas API cursor effect — red & blue web strands follow your mouse |
| 🎨 Glitch Effect | Spider-Verse chromatic-aberration CSS animation on headings |
| 📜 Scroll Reveals | Intersection Observer fade-in + slide-up on every section |
| 🖼️ Gallery | 6-card responsive grid with web-frame hover border animation |
| 💥 Click Burst | Click anywhere for a mini spider-web explosion |
| 🕸️ Thwip! Button | Fire web strands across the screen with one click |
| 📱 Responsive | Mobile hamburger menu, fluid grid, clamp() font sizes |

---

## 🎬 Adding Your Own Spider-Man Video Clip

1. Copy your `.mp4` file into the `assets/` folder (e.g. `assets/hero-clip.mp4`).
2. Open `index.html` and find the commented-out `<video>` block inside `.hero`.
3. Remove the `<!--` / `-->` comment tags to enable the video background.
4. Refresh the browser — done!

Full instructions are in [`assets/README.md`](assets/README.md).

---

## 🌀 How the Video-to-Animation Concept Works

The site turns Spider-Man clips into an immersive animated experience
through layered web technologies:

```
┌────────────────────────────────────────────┐
│  Video clip (HTML5 <video>, 35% opacity)   │
│  + SVG web-pattern overlay                  │
│  + CSS glitch / RGB-split on headings       │
│  + Canvas cursor web-trail                  │
│  + Scroll-triggered reveals                 │
│  + Click & Thwip! interactions              │
└────────────────────────────────────────────┘
```

No video editing required — just drop a clip in and the animations
do the rest.

---

## 📁 File Structure

```
index.html          — Main HTML page
css/
  style.css         — All styles, animations, glitch effects, responsive
js/
  canvas.js         — Canvas cursor web-trail (requestAnimationFrame)
  app.js            — Typewriter, scroll reveals, Thwip!, click burst
assets/
  README.md         — How to add custom video clips and images
README.md           — This file
```

---

## 🎨 Colour Scheme

| Role | Colour |
|------|--------|
| Primary (Spider Red) | `#E23636` |
| Secondary (Spider Blue) | `#2C5EA8` |
| Dark background | `#0a0a0a` / `#1a1a2e` |
| Accent | `#F5F5F5` |

Fonts: **Bangers** (headings) · **Roboto** (body) — via Google Fonts.

---

## 📜 Licence & Credits

This is a non-commercial fan project made **just for fun** 🕷️.  
Spider-Man and all related characters are trademarks of **Marvel Entertainment**.  
No copyright infringement is intended.
