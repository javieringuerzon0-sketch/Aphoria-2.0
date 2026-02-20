# Aphoria Beauty 2 — Claude Code Instructions

## ⛔ PROTECTED ASSETS — NEVER CHANGE THESE

The following image and video paths are **permanently locked**. Do NOT modify, replace, rename, or reassign them under any circumstance, regardless of what is requested for other parts of the code.

### Hero Video
- `public/Hero video/hero-video.mp4` — main homepage hero video

### Hero Images
- `public/Hero video/hero-avocado.png`
- `public/Hero video/hero-avacado2.png`
- `public/Hero video/hero-gold2.png`
- `public/Hero video/hero-gold3.png`
- `public/Hero video/hero-gold5.png`

### ProductDetail Hero Images (in src/constants.ts `variants['1pc'].img`)
- `/goldmask-landing/producto/producto 1 pcs.png` — 24 Gold Mask product image
- `/bundlee/bundlle-avocado-transparent.png` — Avocado Mask product image (RGBA transparent)

### Homepage Gallery Card Images (in src/constants.ts `galleryImg`)
- `/productos%20front/colection-gold2.png` — Gold Mask gallery card
- `/productos%20front/seccion-avocado.png` — Avocado gallery card

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

### Recommendation Images (Diagnostic quiz)
- `/recomendation/goldmask/goldmask-recomendation.png`
- `/recomendation/avocado/avocado-recomendation.png`

---

## Architecture Notes

- **Two image fields**: `galleryImg` (homepage cards) vs `variants['1pc'].img` (ProductDetail hero) — these are intentionally separate, never merge them
- **Background removal technique**: `mix-blend-mode: multiply` + `filter: brightness(1.35) contrast(1.05) saturate(1.1)` — requires white container background
- **Correct Navbar**: `src/components/Navbar.tsx` is used by the app (React Router). `components/Navbar.tsx` is a legacy copy — update both
- **Correct ProtocolTimeline**: `src/components/ProtocolTimeline.tsx` — NOT the root-level `components/ProtocolTimeline.tsx`
- **Public folder paths with spaces**: encode as `%20` in src attributes (e.g. `productos%20front`)
