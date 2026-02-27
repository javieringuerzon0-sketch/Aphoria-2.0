# Aphoria Beauty 2 — Claude Code Instructions

## ⛔ PROTECTED ASSETS — NEVER CHANGE THESE

The following image and video paths are **permanently locked**. Do NOT modify, replace, rename, or reassign them under any circumstance. These paths match the ACTUAL files on disk as of Feb 26, 2026.

### Hero Video
- `public/Hero video/hero-video.mp4` — main homepage hero video

### Product Images (in src/constants.ts)
- `/goldmask-landing/producto/goldmask-original.png` — Gold Mask galleryImg + 1pc variant
- `/goldmask-landing/producto/goldmask-2pcs-white.png` — Gold Mask 2pcs variant
- `/avocado-landing/producto/avocado-original.png` — Avocado Mask galleryImg + 1pc variant

### ProductHero Section Images
- `/seccion%20gold%20mask/imagen-section.original.png` — hero background
- `/seccion%20gold%20mask/imagen-producto.original.png` — product card

### Before/After Images
- `/BEFORE-AFTER/BEFORE.original.jpg`
- `/BEFORE-AFTER/AFTER.original.jpg`

### Clinical Index Images
- `/clinical%20index/deep-hydratation.original.png`
- `/clinical%20index/radiance-ativation.original.png`

### ProtocolTimeline Images
- `/goldmask-landing/apply/activate.png`
- `/goldmask-landing/apply/apply.png`
- `/goldmask-landing/apply/reveal.png`
- `/avocado-landing/apply/activate.png`
- `/avocado-landing/apply/apply.png`
- `/avocado-landing/apply/reveal.png`

### Product Videos
- `/goldmask-landing/video/video-producto.mp4`
- `/avocado-landing/video/grok-video-c8fb9fb1-688a-4603-85fb-811f93944263.mp4`
- `/section%20avocado/avocado-video.mp4`

### Bundle Images
- `/bundlee/goldmask-bundle.png`
- `/bundlee/avocado-bundelle.png`

### Recommendation Images (Diagnostic quiz)
- `/recomendation/goldmask/goldmask-original.png`
- `/recomendation/avocado/avocado-recomendation.png`

### UGC Images
- 8 PNGs in `public/goldmask-landing/ugc/`
- 14 files (JPG+PNG) in `public/avocado-landing/ugc/`

### Testimonio Images
- `public/testimonio/imagen.png`
- `public/testimonio/1.png`
- `public/testimonio/2.png`

### Gallery Front Images
- `public/productos front/colection-gold2.original.png`
- `public/productos front/seccion-avocado.original.png`

---

## Architecture Notes

- **galleryImg and variant img now share the same path** (simplified from previous two-field setup)
- **Correct Navbar**: `src/components/Navbar.tsx` is used by the app (React Router). `components/Navbar.tsx` is a legacy copy — update both
- **Correct ProtocolTimeline**: `src/components/ProtocolTimeline.tsx` — NOT the root-level `components/ProtocolTimeline.tsx`
- **Public folder paths with spaces**: encode as `%20` in src attributes (e.g. `productos%20front`, `seccion%20gold%20mask`, `clinical%20index`, `Hero%20video`)
- **`.original` suffix**: these are the source files that remain after cleanup. They are the definitive assets.
