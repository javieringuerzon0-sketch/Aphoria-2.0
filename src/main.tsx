import React from 'react';
import ReactDOM from 'react-dom/client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const PAYPAL_CLIENT_ID =
  (import.meta as unknown as { env: Record<string, string | undefined> }).env
    .VITE_PAYPAL_CLIENT_ID || '';

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <PayPalScriptProvider
        deferLoading={!PAYPAL_CLIENT_ID}
        options={{
          clientId: PAYPAL_CLIENT_ID,
          currency: 'USD',
          intent: 'capture',
          components: 'buttons,card-fields',
        }}
      >
        <App />
      </PayPalScriptProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
