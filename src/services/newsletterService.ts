/**
 * Newsletter Service for Omnisend Integration
 *
 * SECURITY WARNING: Sending API keys directly from the browser exposes them
 * to anyone who inspects network requests. For production, route this through
 * a server-side proxy (e.g. Vercel/Netlify serverless function, Cloudflare Worker)
 * that keeps the API key secret. Set VITE_NEWSLETTER_PROXY_URL to your proxy endpoint.
 *
 * Example proxy flow:
 *   Browser → POST /api/newsletter { email } → Proxy adds API key → Omnisend
 */

const OMNISEND_API_URL = 'https://api.omnisend.com/v3/contacts';

export interface NewsletterResponse {
    success: boolean;
    message?: string;
}

export const subscribeToNewsletter = async (email: string): Promise<NewsletterResponse> => {
    const proxyUrl = import.meta.env.VITE_NEWSLETTER_PROXY_URL;
    const apiKey = import.meta.env.VITE_OMNISEND_API_KEY;

    // Preferred: use a server-side proxy that keeps the API key secret
    if (proxyUrl) {
        try {
            const response = await fetch(proxyUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Subscription failed');
            }

            return { success: true };
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    // Fallback: direct Omnisend call (development only — API key exposed in browser)
    if (!apiKey) {
        console.warn('Newsletter: No proxy URL or API key configured. Email captured locally only.');
        return { success: true };
    }

    console.warn('Newsletter: Using direct Omnisend API call. API key is exposed in browser. Configure VITE_NEWSLETTER_PROXY_URL for production.');

    try {
        const response = await fetch(OMNISEND_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey,
            },
            body: JSON.stringify({
                email,
                status: 'subscribed',
                tags: ['newsletter', 'website'],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error subscribing to newsletter');
        }

        return { success: true };
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};
