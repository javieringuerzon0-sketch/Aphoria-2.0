import type { VercelRequest, VercelResponse } from '@vercel/node';

const PROTOCOL_PDF_URL = 'https://aphoriabeauty.com/aphoria-clinical-protocol.pdf';
const DISCOUNT_CODE = 'APHORIA10';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, firstName } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const apiKey = process.env.OMNISEND_API_KEY?.trim();
  if (!apiKey) return res.status(500).json({ message: 'Newsletter not configured' });

  try {
    // Create / update contact in Omnisend (v3 identifiers format)
    // sendWelcomeEmail: true triggers the Welcome Series automation in Omnisend
    const contactRes = await fetch('https://api.omnisend.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({
        identifiers: [
          {
            type: 'email',
            id: email,
            channels: {
              email: {
                status: 'subscribed',
                statusDate: new Date().toISOString(),
              },
            },
          },
        ],
        ...(firstName && { firstName }),
        sendWelcomeEmail: true,
        tags: ['newsletter', 'website', 'newsletter-welcome'],
        customProperties: {
          discount_code: DISCOUNT_CODE,
          protocol_pdf_url: PROTOCOL_PDF_URL,
        },
      }),
    });

    if (!contactRes.ok) {
      const err = await contactRes.json().catch(() => ({}));
      return res.status(contactRes.status).json({ message: err.message || 'Subscription failed' });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
