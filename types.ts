export interface Ingredient {
  name: string;
  clinicalName: string;
  mechanism: string;
  benefitHeadline: string;
  benefitCopy: string;
}

export interface Product {
  id: string;
  handle: string;
  name: string;
  tagline: string;
  description: string;
  clinicalClassification: string;
}

export interface ProtocolStep {
  step: string;
  label: string;
  name: string;
  copy: string;
}

export interface Testimonial {
  text: string;
  author: string;
  context: string;
  sourceType: 'Clinical' | 'Editorial' | 'Expert';
}