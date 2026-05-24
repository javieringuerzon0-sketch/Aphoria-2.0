import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Lock } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { pixel } from '../lib/metaPixel';

const PAYPAL_CLIENT_ID =
  (import.meta as unknown as { env: Record<string, string | undefined> }).env
    .VITE_PAYPAL_CLIENT_ID || '';

interface Props {
  discountCode?: string;
  onClose: () => void;
}

interface PayPalCreateOrderResponse {
  id?: string;
  error?: string;
}

interface PayPalCaptureResponse {
  ok?: boolean;
  orderId?: string;
  amount?: number;
  currency?: string;
  email?: string | null;
  error?: string;
}

async function createOrderOnServer(
  items: ReturnType<typeof useCartStore.getState>['items'],
  email: string | undefined,
  discountCode: string | undefined
): Promise<string> {
  const res = await fetch('/api/paypal-create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: items.map((i) => ({
        sku: i.variantId,
        name: `${i.title} — ${i.variantTitle}`.trim(),
        price: i.price,
        quantity: i.quantity,
      })),
      email,
      discountCode,
    }),
  });
  const data = (await res.json()) as PayPalCreateOrderResponse;
  if (!data.id) throw new Error(data.error || 'No order ID from PayPal');
  return data.id;
}

async function captureOrderOnServer(orderID: string): Promise<PayPalCaptureResponse> {
  const res = await fetch('/api/paypal-capture-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderID }),
  });
  return (await res.json()) as PayPalCaptureResponse;
}

const PayPalCheckout: React.FC<Props> = ({ discountCode, onClose }) => {
  // Selective selectors — see CartDrawer for why we avoid destructuring.
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const totalItems = useCartStore((s) => s.totalItems);
  const clearCart = useCartStore((s) => s.clearCart);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!PAYPAL_CLIENT_ID) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 text-sm">
          PayPal is not configured. Use the card payment option above.
        </p>
        <button onClick={onClose} className="mt-4 text-aphoria-gold text-xs uppercase tracking-widest">
          Close
        </button>
      </div>
    );
  }

  const email =
    typeof window !== 'undefined' ? localStorage.getItem('omnisend_email') || undefined : undefined;

  const handleApprove = async (orderID: string) => {
    setPaying(true);
    setError(null);
    try {
      const result = await captureOrderOnServer(orderID);
      if (!result.ok || (result.error && !result.orderId)) {
        throw new Error(result.error || 'Payment capture failed');
      }
      pixel.purchase(result.amount || subtotal());
      clearCart();
      const params = new URLSearchParams({
        provider: 'paypal',
        order: result.orderId || orderID,
      });
      if (result.amount != null) params.set('total', result.amount.toFixed(2));
      window.location.href = `/thank-you?${params.toString()}`;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
      setPaying(false);
    }
  };

  const createOrder = async () => {
    pixel.initiateCheckout(subtotal(), totalItems());
    return createOrderOnServer(items, email, discountCode);
  };

  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase tracking-[0.24em] text-aphoria-mid text-center">
        Continue with your PayPal account
      </p>

      <PayPalButtons
        style={{ layout: 'vertical', color: 'gold', shape: 'pill', label: 'paypal', tagline: false, height: 48 }}
        disabled={paying}
        createOrder={createOrder}
        onApprove={async (data) => {
          await handleApprove(data.orderID);
        }}
        onError={(err) => {
          console.error('[PayPalButtons]', err);
          setError('PayPal error. Please try again or use card payment.');
        }}
        onCancel={() => setError(null)}
      />

      {error && (
        <p className="text-[12px] text-red-600 text-center">{error}</p>
      )}

      <div className="flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.22em] text-aphoria-mid pt-1">
        <Lock size={9} />
        Secure checkout · 30-Day Guarantee
      </div>
    </div>
  );
};

export default PayPalCheckout;
