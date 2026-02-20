/** GraphQL queries for Shopify Storefront API */

export const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      nodes {
        id
        handle
        title
        description
        productType
        tags
        variants(first: 10) {
          nodes {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
            availableForSale
          }
        }
        images(first: 5) {
          nodes {
            url
            altText
          }
        }
        metafields(identifiers: [
          { namespace: "custom", key: "tagline" }
          { namespace: "custom", key: "short_desc" }
          { namespace: "custom", key: "clinical_classification" }
        ]) {
          key
          value
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      productType
      tags
      variants(first: 10) {
        nodes {
          id
          title
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            url
            altText
          }
          availableForSale
        }
      }
      images(first: 10) {
        nodes {
          url
          altText
        }
      }
      metafields(identifiers: [
        { namespace: "custom", key: "tagline" }
        { namespace: "custom", key: "short_desc" }
        { namespace: "custom", key: "clinical_classification" }
        { namespace: "custom", key: "ugc" }
        { namespace: "custom", key: "ingredients" }
        { namespace: "custom", key: "video_url" }
      ]) {
        key
        value
      }
    }
  }
`;

export const CREATE_CART_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!], $discountCodes: [String!]) {
    cartCreate(input: { lines: $lines, discountCodes: $discountCodes }) {
      cart {
        id
        checkoutUrl
        lines(first: 20) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                  images(first: 1) {
                    nodes { url altText }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
      }
      userErrors { field message }
    }
  }
`;

export const ADD_TO_CART_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 20) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
                product {
                  title
                  images(first: 1) { nodes { url altText } }
                }
              }
            }
          }
        }
        cost {
          totalAmount { amount currencyCode }
        }
      }
      userErrors { field message }
    }
  }
`;

export const REMOVE_FROM_CART_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        totalQuantity
        lines(first: 20) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
              }
            }
          }
        }
        cost {
          totalAmount { amount currencyCode }
        }
      }
      userErrors { field message }
    }
  }
`;
