# Assets — Instructions for Custom Media

Place your own Spider-Man video clips and images in this folder, then
follow the instructions below to integrate them into the site.

---

## Adding a Video Background to the Hero Section

1. **Copy your video file** into this `assets/` folder.  
   Recommended filename: `hero-clip.mp4`  
   Supported formats: MP4 (H.264), WebM.

2. **Open `index.html`** in a text editor and find this commented-out block
   near the top of the `<section class="hero">`:

   ```html
   <!--
   <video class="hero-video" autoplay muted loop playsinline>
     <source src="assets/hero-clip.mp4" type="video/mp4" />
   </video>
   -->
   ```

3. **Remove the comment tags** (`<!--` and `-->`) to activate the video:

   ```html
   <video class="hero-video" autoplay muted loop playsinline>
     <source src="assets/hero-clip.mp4" type="video/mp4" />
   </video>
   ```

4. **Save** the file and refresh your browser — the hero section will now
   show your clip playing behind the animated overlay.

> **Tip:** For best results keep your clip under 10 MB and at least 1920 × 1080.
> The video opacity is set to `0.35` in `css/style.css` — adjust the
> `.hero-video { opacity: … }` rule to taste.

---

## Adding Custom Gallery Images

The gallery cards in `index.html` currently use coloured gradient
placeholders.  To replace them with real images:

1. Copy your image files (JPG / PNG / WebP) into `assets/`.
2. In `index.html`, find the `.card-placeholder` div inside each
   `.gallery-card` and replace it with a standard `<img>` tag:

   ```html
   <!-- Before -->
   <div class="card-placeholder" style="background: …">
     <span class="card-placeholder-icon">🕷️</span>
   </div>

   <!-- After -->
   <img src="assets/your-image.jpg"
        alt="Descriptive alt text"
        class="card-img"
        loading="lazy" />
   ```

3. Add the following rule to `css/style.css` if it is not already present:

   ```css
   .card-img {
     width: 100%;
     height: 100%;
     object-fit: cover;
     transition: transform 0.4s ease;
   }
   .gallery-card:hover .card-img {
     transform: scale(1.08);
   }
   ```

---

## How the Video-to-Animation Concept Works

The site converts the **energy of Spider-Man video clips** into animations
using a layered approach:

| Layer | Technology | Effect |
|-------|-----------|--------|
| Video clip | `<video>` HTML5 element | Plays silently as a full-bleed background |
| Web overlay | SVG + CSS | Radial spider-web pattern at low opacity |
| Glitch effect | CSS `::before` / `::after` + `@keyframes` | RGB channel-split on headings (Spider-Verse style) |
| Cursor trail | Canvas API (`requestAnimationFrame`) | Web-slinging line trail follows the mouse |
| Scroll reveals | `IntersectionObserver` | Content fades & slides in on scroll |
| Click bursts | DOM + CSS `@keyframes` | Mini web explosion on every click |
| Parallax blobs | `transform: translateY` on scroll | Depth effect on background elements |

Together, these layers make a static webpage *feel* like an animated
Spider-Verse sequence — no video editing software required.

---

## Recommended Free Resources

- **Pexels / Pixabay** — royalty-free Spider-Man fan art images  
- **Coverr.co** — free looping video clips  
- **Squoosh** — compress images/videos before adding them  

> ⚠️ Always ensure you have the right to use any media you add to this site.
> Spider-Man is a trademark of Marvel Entertainment.
