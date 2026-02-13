import { Ingredient, Product, ProtocolStep, Testimonial } from './types';

export const HERO_COPY = {
  h1: "Skincare Engineered for Visible Transformation",
  subheadline: "Clinical-grade eye treatments and facial protocols for hydration, firmness, and long-term skin vitality.",
  ctaPrimary: "Enter the Ritual",
  ctaSecondary: "Explore the Science"
};

export const MANIFESTO_COPY = {
  h2: "A New Standard in Clinical Skincare",
  body: "Aphoria formulates high-performance treatments engineered around specific biological targets — restoring hydration, supporting dermal matrix integrity, and improving elasticity through precision-dosed, clinically inspired ingredients."
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

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "p1",
    handle: "eye-recovery-mask",
    name: "Intensive Eye Recovery Mask",
    clinicalClassification: "Hydration + Firming Treatment",
    tagline: "Periorbital Dermal Matrix Support",
    description: "The periorbital zone loses lipid reserves and collagen density faster than other facial areas. This treatment addresses both mechanisms simultaneously."
  },
  {
    id: "p2",
    handle: "cellular-restoration-cream",
    name: "Cellular Restoration Cream",
    clinicalClassification: "Barrier Integration & Deep Remodeling",
    tagline: "Biomimetic Lipid Complex",
    description: "Formulated to mimic the skin's natural lipid structure for immediate integration and structural improvement."
  }
];

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