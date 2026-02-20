import { Ingredient, Product, ProtocolStep, Testimonial } from './types';

export const HERO_COPY = {
  h1: "You. In 28 Days. Radiant.",
  subheadline: "Join 10,000+ women who chose science over promises. Visible transformation, backed by clinical results. Money-back guaranteed.",
  ctaPrimary: "Get 60-Day Supply",
  ctaSecondary: "See Clinical Results",
  guarantee: "60-Day Money-Back Guarantee • Free Shipping • Dermatologist Tested"
};

export const MANIFESTO_COPY = {
  h2: "Where Medical-Grade Science Meets Luxury Skincare",
  body: "Aphoria engineers high-performance formulations targeting cellular regeneration, barrier restoration, and collagen synthesis. Every ingredient is precision-dosed at clinically-proven concentrations to deliver measurable, visible transformation—not temporary cosmetic effects."
};

export const SCIENCE_INGREDIENTS: Ingredient[] = [
  {
    name: "Avocado Extract",
    clinicalName: "Persea Gratissima Oil",
    mechanism: "Replenishes lipid barrier composition, reinforcing transepidermal water retention",
    benefitHeadline: "Deep Hydration",
    benefitCopy: "Lipid-rich barrier reinforcement for lasting moisture integrity"
  },
  {
    name: "Hydrolyzed Collagen",
    clinicalName: "Hydrolyzed Collagen (Molecular Weight < 3kDa)",
    mechanism: "Low-molecular-weight peptides penetrate superficial epidermis to support dermal matrix density",
    benefitHeadline: "Structural Firmness",
    benefitCopy: "Peptide-level support for skin elasticity and visible contouring"
  },
  {
    name: "Snail Secretion Filtrate",
    clinicalName: "Snail Secretion Filtrate",
    mechanism: "Naturally occurring allantoin and glycoproteins support cellular regeneration and texture refinement",
    benefitHeadline: "Cellular Renewal",
    benefitCopy: "Bioactive compounds that support natural regeneration cycles"
  },
  {
    name: "Colloidal Gold",
    clinicalName: "Gold (Au) Nanoparticles",
    mechanism: "Micro-conductive particles support cellular energy uptake and skin luminosity at the surface layer",
    benefitHeadline: "Radiance Activation",
    benefitCopy: "Surface-level revitalization for visible luminosity and skin tone refinement"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "24-gold-mask",
    handle: "24-gold-mask",
    name: "24 Gold Mask",
    category: "Skincare",
    tagline: "Radiance & Luminosity Treatment",
    description: "Gold-infused luxury mask that brightens, firms, and restores youthful radiance. Visible glow in minutes.",
    shortDesc: "A high-performance gold-infused treatment engineered with 24K nanoparticles and bio-active peptides to immediately firm, brighten, and restore youthful radiance.",
    clinicalClassification: "Luminosity Activation",
    reviews: 2847,
    size: "50ml",
    usage: "Apply 2-3 times weekly for 15-20 minutes",
    recommended: "Best for dull, aging skin",
    perUsePrice: 1.07,
    // HOMEPAGE GALLERY CARD IMAGE — NEVER CHANGE
    galleryImg: '/productos%20front/colection-gold2.png',
    benefits: ['Instant radiance', 'Firms & lifts', 'Reduces fine lines'],
    variants: {
      '1pc': {
        name: '50g Clinical Tube',
        price: 29.99,
        regularPrice: 59.99,
        id: 'REF_GOLD_S1',
        // PRODUCT IMAGE for /product/24-gold-mask — NEVER CHANGE
        img: '/goldmask-landing/producto/producto%201%20pcs.png'
      },
      '2pcs': {
        name: 'Double Protocol Set',
        price: 36.99,
        regularPrice: 119.98,
        id: 'REF_GOLD_M2',
        img: '/goldmask-landing/producto/producto%202%20pcs.png'
      }
    },
    ugc: [
      { id: 1, img: '/goldmask-landing/ugc/canvas-image-1765489180063.png', user: "@sofia_beauty", text: "My skin has never felt so firm. The glow is instant!" },
      { id: 2, img: '/goldmask-landing/ugc/canvas-image-1765490110626.png', user: "@luxury_skincare", text: "Pure excellence in a tube." },
      { id: 3, img: '/goldmask-landing/ugc/canvas-image-1765519390711.png', user: "@derm_expert", text: "Molecular synthesis at its finest. Highly recommend." },
      { id: 4, img: '/goldmask-landing/ugc/canvas-image-1765519474195.png', user: "@glow_up_daily", text: "15 minutes and I'm ready for the week." },
      { id: 5, img: '/goldmask-landing/ugc/canvas-image-1765519592416.png', user: "@beauty_log", text: "Unbelievable texture refinement." },
      { id: 6, img: '/goldmask-landing/ugc/canvas-image-1765519661800.png', user: "@clinical_results", text: "The data doesn't lie. 24K is the future." },
      { id: 7, img: '/goldmask-landing/ugc/canvas-image-1765519809768.png', user: "@skincare_junkie", text: "Obsessed with the immediate glow up." },
      { id: 8, img: '/goldmask-landing/ugc/canvas-image-1765519816775.png', user: "@glow_master", text: "Game changer for my routine." }
    ],
    ingredients: "Aqua/Water, 24K Colloidal Gold, Snail Secretion Filtrate, Hydrolyzed Peptides, Hyaluronic Acid, Glycerin, Tocopherol.",
    video: '/goldmask-landing/video/video-producto.mp4',
    accordions: [
      { title: "How to Use", content: "Apply a thin, even layer to cleansed skin. Leave for 15-20 minutes until the molecular synthesis is complete. Rinse with lukewarm water. Use 2-3 times per week for optimal dermal transformation." },
      { title: "Key Ingredients", content: "Aqua/Water, 24K Colloidal Gold, Snail Secretion Filtrate, Hydrolyzed Peptides, Hyaluronic Acid, Glycerin, Tocopherol." },
      { title: "Shipping & Returns", content: "Sterile delivery protocol. Orders > $50 qualify for priority shipping. 30-day laboratory satisfaction guarantee." }
    ],
    videoSection: {
      headline: "Beyond Cosmetics.",
      stats: [
        { val: "98%", label: "Instant Lift" },
        { val: "95%", label: "Brighter Tone" }
      ],
      desc: "Witness the immediate structural remodeling enabled by our 24K ionic-gradient technology. A non-invasive alternative to traditional dermal intervention."
    },
    // PROTOCOL STEPS for /product/24-gold-mask — images from goldmask-landing/apply goldmask/ — NEVER CHANGE
    protocolSteps: [
      {
        step: "01",
        label: "Activate",
        name: "Activate",
        copy: "Cleanse skin and prepare the surface for maximum ingredient absorption. Pat dry and ensure an even base for the gold treatment.",
        img: "/goldmask-landing/apply/activate.png"
      },
      {
        step: "02",
        label: "Apply",
        name: "Apply",
        copy: "Apply a generous, even layer of the 24K Gold Mask over the face and neck. Allow the 24K nanoparticles to begin their work.",
        img: "/goldmask-landing/apply/apply.png"
      },
      {
        step: "03",
        label: "Reveal",
        name: "Reveal",
        copy: "After 15-20 minutes, rinse with lukewarm water to reveal instantly firmer, brighter, more radiant skin. Your transformation begins.",
        img: "/goldmask-landing/apply/reveal.png"
      }
    ]
  },
  {
    id: "avocado-mask",
    handle: "avocado-mask",
    name: "Avocado Ceramide Mask",
    category: "Restorative Skincare",
    tagline: "Deep Hydration & Nourishment",
    description: "Rich in vitamins and essential fatty acids, this mask deeply nourishes, hydrates, and calms sensitive skin.",
    shortDesc: "A deeply nourishing, barrier-repairing treatment enriched with Avocado Oil and Ceramides to immediately hydrate, soothe, and strengthen compromised skin.",
    clinicalClassification: "Barrier Restoration",
    reviews: 1420,
    size: "60 patch",
    usage: "Apply 2-3 times weekly for 15-20 minutes",
    recommended: "Best for dry, sensitive skin",
    perUsePrice: 1.21,
    // HOMEPAGE GALLERY CARD IMAGE — NEVER CHANGE
    galleryImg: '/productos%20front/seccion-avocado.png',
    benefits: ['Deep hydration', 'Soothes irritation', 'Strengthens barrier'],
    variants: {
      '1pc': {
        name: '60 Patches',
        price: 33.99,
        regularPrice: 59.99,
        id: 'REF_AVO_S1',
        // PRODUCT IMAGE for /product/avocado-mask — transparent PNG (no background)
        img: '/bundlee/bundlle-avocado-transparent.png'
      }
    },
    ugc: [
      { id: 1, img: '/avocado-landing/ugc/2d271056-d75b-4b1a-b38b-740b742bb662.jpg', user: "@green_beauty", text: "Saved my dry skin overnight!" },
      { id: 2, img: '/avocado-landing/ugc/38e7a424-0c82-4d78-95f4-038f2e13ae20.jpg', user: "@skin_calm", text: "Redness gone in minutes." },
      { id: 3, img: '/avocado-landing/ugc/6073b40b-22db-4d45-ac46-db77e08dc785.jpg', user: "@barrier_pro", text: "My holy grail for winter skin." },
      { id: 4, img: '/avocado-landing/ugc/ca75aae7-e00b-49d6-a166-1d48fde59a70.jpg', user: "@glow_naturally", text: "Soothing, rich, and effective." },
      { id: 5, img: '/avocado-landing/ugc/canvas-image-1765494737512.png', user: "@clean_routine", text: "The texture is absolute luxury." },
      { id: 6, img: '/avocado-landing/ugc/canvas-image-1765519919814.png', user: "@derm_fav", text: "Ceramides made a huge difference." },
      { id: 7, img: '/avocado-landing/ugc/canvas-image-1765520585278.png', user: "@avocado_lover", text: "Instant hydration boost." },
      { id: 8, img: '/avocado-landing/ugc/canvas-image-1765520637566.png', user: "@skincare_sci", text: "Clinically proven barrier support." }
    ],
    ingredients: "Aqua/Water, Persea Gratissima (Avocado) Oil, Ceramide NP, Centella Asiatica, Hyaluronic Acid, Shea Butter, Tocopherol.",
    video: '/avocado-landing/video/grok-video-c8fb9fb1-688a-4603-85fb-811f93944263.mp4',
    accordions: [
      { title: "How to Use", content: "Apply a generous layer to clean skin. Relax for 15-20 minutes allowing the lipids to penetrate. Rinse gently or tissue off excess for overnight recovery. Use 2-3 times per week." },
      { title: "Key Ingredients", content: "Aqua/Water, Persea Gratissima (Avocado) Oil, Ceramide NP, Centella Asiatica, Hyaluronic Acid, Shea Butter, Tocopherol." },
      { title: "Shipping & Returns", content: "Sterile delivery protocol. Orders > $50 qualify for priority shipping. 30-day laboratory satisfaction guarantee." }
    ],
    videoSection: {
      headline: "Barrier Restoration.",
      stats: [
        { val: "99%", label: "Hydration Lock" },
        { val: "96%", label: "Redness Reduction" }
      ],
      desc: "Experience the profound lipid barrier repair powered by Avocado Ceramides. Structurally mimics your skin’s natural matrix for immediate calm and resilience."
    },
    protocolSteps: [
      {
        step: "01",
        label: "Soothe",
        name: "Soothe",
        copy: "Apply to clean, dry skin. The avocado-rich formula immediately begins to calm surface redness and prepare the barrier for deep restoration.",
        img: "/avocado-landing/apply/activate.png"
      },
      {
        step: "02",
        label: "Restore",
        name: "Restore",
        copy: "Leave on for 15-20 minutes. Ceramides and essential fatty acids integrate with your skin's natural lipid structure, reinforcing the protective barrier.",
        img: "/avocado-landing/apply/apply.png"
      },
      {
        step: "03",
        label: "Calm",
        name: "Calm",
        copy: "Gently rinse or tissue off. Experience a profound sense of comfort and a visibly resilient, hydrated complexion.",
        img: "/avocado-landing/apply/reveal.png"
      }
    ]
  }
];

export const FEATURED_PRODUCTS: Product[] = PRODUCTS;

export const PROTOCOL_STEPS: ProtocolStep[] = [
  {
    step: "01",
    label: "Morning",
    name: "Hydration Refinement",
    copy: "Prepare the skin barrier for daily environmental exposure. Activate hydration reserves. Set the foundation for treatment absorption."
  },
  {
    step: "02",
    label: "Evening",
    name: "Regeneration Support",
    copy: "Align treatment application with the skin's natural nocturnal repair cycle. Support cellular renewal during peak recovery hours."
  },
  {
    step: "03",
    label: "Weekly",
    name: "Intensive Restoration",
    copy: "A focused treatment protocol to address cumulative skin stressors. Deep nourishment for lasting structural improvement."
  }
];

export const TRUST_SIGNALS = {
  guarantee: {
    headline: "60-Day Risk-Free Guarantee",
    copy: "Try Aphoria risk-free for 60 days. If you don't see visible improvement in your skin, we'll refund you—no questions asked.",
    cta: "Start Your Trial"
  },
  badges: [
    { icon: "✓", text: "Dermatologist Tested & Approved" },
    { icon: "✓", text: "Free Shipping Worldwide" },
    { icon: "✓", text: "Cruelty-Free & Sustainable" },
    { icon: "✓", text: "Made in Switzerland" }
  ]
};

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "After twelve weeks of consistent use, the under-eye area showed measurable improvement in hydration and a visible reduction in fine line depth.",
    author: "Verified client",
    context: "Combination skin, 42",
    sourceType: "Clinical"
  },
  {
    text: "A masterclass in formulation. It bridges the gap between the dermatologist's office and the vanity.",
    author: "Dr. Elena Vance",
    context: "Board Certified Dermatologist",
    sourceType: "Expert"
  },
  {
    text: "Clinical excellence meet sensory refinement. The most sophisticated recovery protocol we've tested.",
    author: "British Vogue",
    context: "Beauty Editorial",
    sourceType: "Editorial"
  }
];