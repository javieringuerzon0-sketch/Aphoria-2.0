// Meta Pixel — Aphoria Beauty (ID: 1672971890715223)
// Pixel initialized in index.html. This module exposes typed helpers for events.
// Events fire to both browser pixel AND CAPI server-side (deduplication via event_id).

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

const genEventId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const fireCapiEvent = (
  eventName: string,
  eventId: string,
  extra?: Record<string, unknown>
) => {
  const payload = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: window.location.href,
    user_agent: navigator.userAgent,
    fbc: document.cookie.match(/_fbc=([^;]+)/)?.[1] ?? undefined,
    fbp: document.cookie.match(/_fbp=([^;]+)/)?.[1] ?? undefined,
    ...extra,
  };
  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {/* silent fail — browser pixel already tracked */});
};

const fire = (event: string, data?: Record<string, unknown>, eventId?: string) => {
  if (typeof window.fbq !== 'function') return;
  if (data && eventId) {
    window.fbq('track', event, data, { eventID: eventId });
  } else if (data) {
    window.fbq('track', event, data);
  } else {
    window.fbq('track', event);
  }
};

export const pixel = {
  viewContent: (productName: string, price: number, currency = 'USD') => {
    const eventId = genEventId();
    fire('ViewContent', {
      content_name: productName,
      content_type: 'product',
      value: price,
      currency,
    }, eventId);
    fireCapiEvent('ViewContent', eventId);
  },

  addToCart: (productName: string, price: number, quantity = 1, currency = 'USD') => {
    const eventId = genEventId();
    fire('AddToCart', {
      content_name: productName,
      content_type: 'product',
      value: price * quantity,
      currency,
      num_items: quantity,
    }, eventId);
    fireCapiEvent('AddToCart', eventId, { value: price * quantity, currency, num_items: quantity });
  },

  initiateCheckout: (value: number, numItems: number, currency = 'USD') => {
    const eventId = genEventId();
    fire('InitiateCheckout', {
      value,
      currency,
      num_items: numItems,
    }, eventId);
    fireCapiEvent('InitiateCheckout', eventId, { value, currency, num_items: numItems });
  },

  purchase: (value: number, currency = 'USD', email?: string) => {
    const eventId = genEventId();
    fire('Purchase', { value, currency }, eventId);
    fireCapiEvent('Purchase', eventId, { value, currency, ...(email && { email }) });
  },
};
