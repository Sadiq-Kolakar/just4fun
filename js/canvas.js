/**
 * canvas.js — Spider-Man Fan Zone
 *
 * Handles the interactive web-slinging cursor trail drawn on a full-screen
 * <canvas> element that sits above all page content (pointer-events: none).
 *
 * How it works:
 *  1. We track the mouse position in a `mouse` object.
 *  2. On each animation frame we push a new {x, y, alpha} point onto the
 *     `trailPoints` array.
 *  3. We draw lines between consecutive points, using the alpha value to
 *     fade older segments out over time.
 *  4. Points whose alpha reaches 0 are removed from the array.
 *
 * Red (#E23636) and Blue (#2C5EA8) colours alternate for the main strands,
 * with White (#F5F5F5) as a third accent colour — matching Spider-Man's
 * classic costume palette.
 */

(function () {
  'use strict';

  /* ── DOM & context setup ─────────────────────────────────────── */
  const canvas = document.getElementById('webCanvas');
  const ctx    = canvas.getContext('2d');

  /* ── State ───────────────────────────────────────────────────── */
  const mouse = { x: -9999, y: -9999 }; // off-screen until first move

  /**
   * Each trail segment is stored as an object:
   *  { x, y, alpha, colorIndex }
   */
  const trailPoints = [];

  /** How many points to keep (longer = longer trail) */
  const MAX_TRAIL = 60;

  /** How fast each segment fades — smaller = slower */
  const FADE_SPEED = 0.025;

  /** Alternating colours for the web strands */
  const COLORS = ['#E23636', '#2C5EA8', '#F5F5F5'];
  let colorIdx = 0;

  /* ── Resize canvas to always fill the viewport ───────────────── */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* ── Track mouse movement ────────────────────────────────────── */
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Add a new trail point every time the mouse moves
    trailPoints.push({
      x:          e.clientX,
      y:          e.clientY,
      alpha:      1,
      colorIndex: colorIdx
    });

    // Cycle through colours
    colorIdx = (colorIdx + 1) % COLORS.length;

    // Cap the array length
    if (trailPoints.length > MAX_TRAIL) {
      trailPoints.shift();
    }
  }, { passive: true });

  /* ── Draw a custom spider dot at the cursor position ─────────── */
  function drawCursorDot() {
    if (mouse.x < 0) return;
    ctx.save();
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#E23636';
    ctx.shadowColor = '#E23636';
    ctx.shadowBlur  = 10;
    ctx.fill();
    ctx.restore();
  }

  /* ── Draw the web trail ──────────────────────────────────────── */
  function drawTrail() {
    if (trailPoints.length < 2) return;

    for (let i = 1; i < trailPoints.length; i++) {
      const prev = trailPoints[i - 1];
      const curr = trailPoints[i];

      if (curr.alpha <= 0) continue;

      ctx.save();
      ctx.globalAlpha = curr.alpha;
      ctx.strokeStyle = COLORS[curr.colorIndex];
      ctx.lineWidth   = Math.max(0.5, curr.alpha * 2);
      ctx.lineCap     = 'round';
      ctx.shadowColor = COLORS[curr.colorIndex];
      ctx.shadowBlur  = curr.alpha * 8;

      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(curr.x, curr.y);
      ctx.stroke();
      ctx.restore();
    }
  }

  /* ── Fade out old trail points ───────────────────────────────── */
  function fadeTrail() {
    for (let i = trailPoints.length - 1; i >= 0; i--) {
      trailPoints[i].alpha -= FADE_SPEED;
      if (trailPoints[i].alpha <= 0) {
        trailPoints.splice(i, 1);
      }
    }
  }

  /* ── Draw small web-node dots at every 5th trail point ────────── */
  function drawWebNodes() {
    for (let i = 0; i < trailPoints.length; i += 5) {
      const p = trailPoints[i];
      if (p.alpha <= 0) continue;
      ctx.save();
      ctx.globalAlpha = p.alpha * 0.6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = COLORS[p.colorIndex];
      ctx.shadowColor = COLORS[p.colorIndex];
      ctx.shadowBlur  = 6;
      ctx.fill();
      ctx.restore();
    }
  }

  /* ── Main animation loop (requestAnimationFrame) ─────────────── */
  function loop() {
    // Clear the entire canvas each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTrail();
    drawWebNodes();
    drawCursorDot();
    fadeTrail();

    requestAnimationFrame(loop);
  }

  // Kick off the animation loop
  loop();

})();
