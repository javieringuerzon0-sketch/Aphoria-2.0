# Implementation Plan - Aphoria 2.0 Luxury Digital Flagship

Overhaul the existing Aphoria skincare website into an immersive, clinical-grade luxury flagship system with Shopify integration.

## Phase 1: Foundation & Branding

- [ ] **Finalize index.html**: Add comprehensive SEO meta tags (OpenGraph, Twitter, Canonical), ensure Shopify SDK is loaded correctly.
- [ ] **Global Styles**: Finalize `index.css` with the 8px spacing system and design tokens.
- [ ] **Types & Constants**: Ensure all interfaces in `types.ts` and data in `constants.ts` strictly follow the system version 2.0 JSON specification.

## Phase 2: Core Interface Components

- [ ] **Navbar refinement**: Sticky blur effect, minimal centered logo, balanced items.
- [ ] **Hero Section**: Editorial layout (bottom-left copy), ghost buttons, slow-mo background.
- [ ] **Footer**: Minimalist structure with clinical calm.

## Phase 3: Content & Science

- [ ] **Manifesto Section**: High-impact centered display text (max 640px) with generous whitespace.
- [ ] **Science Section (Ingredient Grid)**: 4-column grid displaying mechanism of action with clinical nomenclature (Monospace).
- [ ] **Ritual Section (Protocol Timeline)**: Editorial numbered timeline (01, 02, 03).

## Phase 4: Shopify Commerce Integration

- [ ] **Product Gallery**: Alternating full-width layout (image left/copy right and reverse).
- [ ] **Product Contexts**: Implement `<shopify-context>` for each hero product.
- [ ] **Cart System**: Integration with `<shopify-cart>` drawer and centered product modals.
- [ ] **Conversion Section**: Invitatory CTA (deep green background) with diagnostic guide link.

## Phase 5: Verification & Polish

- [ ] **Motion Polish**: staggered reveal animations (Framer Motion).
- [ ] **Performance Audit**: Check Lighthouse scores, image optimization (WebP/Lazy).
- [ ] **Dark Mode/Contrast check**: Ensure WCAG 2.1 AA compliance.
