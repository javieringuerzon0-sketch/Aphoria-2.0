import React from 'react';
import { CartProvider, ShopifyProvider as HydrogenShopifyProvider } from '@shopify/hydrogen-react';

const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string;
const storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string;
const apiVersion = (import.meta.env.VITE_SHOPIFY_API_VERSION as string) || '2025-01';

interface Props {
  children: React.ReactNode;
}

/**
 * Wraps the app with Shopify context (cart + storefront).
 * If credentials are missing, children render normally — nothing breaks.
 */
const ShopifyProvider: React.FC<Props> = ({ children }) => {
  if (!storeDomain || !storefrontToken) {
    // No credentials yet — app works normally with constants.ts data
    return <>{children}</>;
  }

  return (
    <HydrogenShopifyProvider
      storeDomain={storeDomain}
      storefrontApiVersion={apiVersion}
      storefrontToken={storefrontToken}
      countryIsoCode="US"
      languageIsoCode="EN"
    >
      <CartProvider>
        {children}
      </CartProvider>
    </HydrogenShopifyProvider>
  );
};

export default ShopifyProvider;
