export {};

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'shopify-store': any;
            'shopify-context': any;
            'shopify-list-context': any;
            'shopify-cart': any;
            'shopify-data': any;
            'shopify-media': any;
            'shopify-money': any;
            'shopify-variant-selector': any;
        }
    }
}
