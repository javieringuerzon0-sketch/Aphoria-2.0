/**
 * Newsletter Service for Omnisend Integration
 */

const OMNISEND_API_URL = 'https://api.omnisend.com/v3/contacts';

export interface NewsletterResponse {
    success: boolean;
    message?: string;
}

export const subscribeToNewsletter = async (email: string): Promise<NewsletterResponse> => {
    const apiKey = import.meta.env.VITE_OMNISEND_API_KEY;

    if (!apiKey) {
        console.warn('Omnisend API Key missing. Skipping real subscription.');
        return { success: true }; // Fallback for dev/missing config
    }

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
