export interface Ingredient {
  name: string;
  clinicalName: string;
  mechanism: string;
  benefitHeadline: string;
  benefitCopy: string;
}

export interface Variant {
  name: string;
  price: number;
  regularPrice: number;
  id: string;
  img: string;
  /** Shopify Storefront GID — e.g. "gid://shopify/ProductVariant/12345678" */
  shopifyVariantId?: string;
}

export interface Review {
  id: number;
  img: string;
  user: string;
  text: string;
}

export interface VideoSection {
  headline: string;
  stats: { val: string; label: string }[];
  desc: string;
}

export interface AccordionItem {
  title: string;
  content: string;
}

export interface Product {
  id: string;
  handle: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  shortDesc: string;
  clinicalClassification: string;
  reviews: number;
  variants: Record<string, Variant>;
  ugc: Review[];
  ingredients: string;
  video: string;
  accordions: AccordionItem[];
  videoSection: VideoSection;
  benefits?: string[];
  size?: string;
  usage?: string;
  recommended?: string;
  perUsePrice?: number;
  protocolSteps?: ProtocolStep[];
  // Image shown in homepage ProductGallery cards — never changes
  galleryImg?: string;
}

export interface ProtocolStep {
  step: string;
  label: string;
  name: string;
  copy: string;
  img?: string;
}

export interface Testimonial {
  text: string;
  author: string;
  context: string;
  sourceType: 'Clinical' | 'Editorial' | 'Expert';
}