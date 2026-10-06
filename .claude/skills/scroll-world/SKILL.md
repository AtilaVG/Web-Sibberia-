---
name: scroll-world
description: Build a scroll-driven 3D "world" behind a web page (Three.js + GSAP ScrollTrigger) where one fixed scene evolves chapter by chapter as the user scrolls, like igloo.inc or landonorris.com, without hiding content or hurting performance. Use when asked for a 3D scene tied to scroll, an immersive scroll story, a hero that evolves into later sections, or "a world you scroll through".
---

# Scroll world

One fixed WebGL scene sits behind the page. Each chapter (`<section data-step="n">`)
owns a formation of the scene; scrolling into a chapter moves the scene from step
n-1 to step n. Reference implementation in this repo:
`assets/js/src/hero3d.js` (scene), `assets/js/pages/home.js` (scroll wiring),
`assets/css/home.css` (stage and chapters).

Load **gsap-scrolltrigger**, **gsap-performance** and the relevant **threejs-*** skills
for API details. This skill is the architecture and the non-negotiables.

## Non-negotiables

1. **Content never waits for animation.** No `opacity:0` (or `gsap.from` with
   opacity) waiting for ScrollTrigger. Text is visible in the HTML; motion uses
   transforms only. The page must read completely with JS off.
2. **Static fallback first.** The stage contains a real `<img>` (WebP, `alt=""`
   because it is decorative) that shows until WebGL is confirmed; the canvas fades
   in with a class (`.stage.is-3d`).
3. **Don't run where it hurts.** Skip WebGL when `navigator.connection.saveData`,
   `deviceMemory < 4`, or coarse pointer with `hardwareConcurrency <= 4`. After
   start, measure frames: if most of the first ~40 frames exceed 60 ms, dispose
   and fall back to the photo. Offer a `?3d=force` query flag for testing.
4. **Pause when not visible.** Render with `gsap.ticker`; add/remove the tick when
   the chapters range enters/leaves the viewport (ScrollTrigger `onToggle`) and on
   `visibilitychange`.
5. **Reduced motion.** No scrub, no intro: render one frame per chapter when it
   reaches the centre (instant change, no transition).
6. **Lazy-load the 3D bundle** after first paint; never block LCP.

## Architecture

```
<div class="stage" aria-hidden="true">       position:fixed; inset:0; z-index:0
  <canvas id="world"></canvas>
  <div class="stage-fallback"><img …></div>
</div>
<section class="chapter" data-step="0">…</section>   z-index:1, transparent, min-height:100svh
<section class="chapter" data-step="1">…</section>
…
<section class="sec">…</section>                  solid background: covers the stage
<footer>                                           position:relative; z-index:1
```

Scene module API (bundle with esbuild as an IIFE global):

```js
create(canvas, { count, offsetX, maxPixelRatio }) → {
  setProgress(0..N), setIntro(0..1), setPointer(x, y),
  render(timeSeconds), resize(), dispose()
}
```

- Precompute, per object, a position + quaternion for each step (`f[k]`, `q[k]`).
- In `render`, `k = floor(p)`, `u = p - k`; lerp/slerp between steps with a small
  per-object delay (`smooth(delay, 0.6 + delay, u)`) so motion flows instead of
  moving in lockstep; add an arc (`sin(u·π)`) for a natural jump between formations.
- Interpolate camera position/target per step too, and shift the group sideways
  per chapter (`shift[k]`) so objects sit opposite the text column.

Scroll wiring (one tween per chapter, ranges never overlap when chapters are at
least one viewport tall):

```js
chapters.forEach((ch) => {
  const step = +ch.dataset.step;
  if (!step) return;
  gsap.fromTo(state, { progress: step - 1 }, {
    progress: step, ease: "none", immediateRender: false,
    scrollTrigger: { trigger: ch, start: "top bottom", end: "center center", scrub: 1.2 }
  });
});
```

Giant type moves with `xPercent` scrub only (`.chapter .word`), never opacity.

## Rendering gotchas learned here

- `MeshPhysicalMaterial` transmission only refracts **opaque** objects: give the
  scene an opaque sky/floor (and opaque emissive cores) or glass/ice looks empty.
- `renderer.transmissionResolutionScale = 0.5` halves the cost of refraction
  with little visible loss; cap pixel ratio (~1.75 desktop, ~1.25 mobile).
- A custom `ShaderMaterial` sky must end with `#include <tonemapping_fragment>`
  and `#include <colorspace_fragment>`, or it renders darker than fog/floor and
  shows a hard horizon line.
- Match fog colour to the sky horizon colour for a seamless horizon.
- Create visibility ScrollTriggers **after** any pinned trigger (or measure the pin
  spacer), otherwise they ignore pin spacing and stop rendering early.
- Inside async callbacks (script `onload`), wrap GSAP/ScrollTrigger creation in
  `ctx.add(() => …)` from `gsap.matchMedia()` so they are reverted with the context.
- Canvas textures that contain text need fonts loaded first (`document.fonts.load`).
- Headless Chromium renders WebGL in software (~1 s/frame): test with `?3d=force`
  and long screenshot timeouts; judge performance on a real GPU.

## Checklist before shipping

- [ ] Page reads fully with JS disabled and with `prefers-reduced-motion: reduce`.
- [ ] Fallback photo shows on a throttled/low-memory device.
- [ ] No console errors; ticker stops when scrolled past the chapters and in a hidden tab.
- [ ] Each formation is complete when its chapter text reaches the centre.
- [ ] Text keeps contrast over the scene (scrim gradient on the text side).
