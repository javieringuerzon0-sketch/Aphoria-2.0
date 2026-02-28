import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const apiKey = process.env.OMNISEND_API_KEY;
  if (!apiKey) return res.status(500).json({ message: 'Newsletter not configured' });

  try {
    const response = await fetch('https://api.omnisend.com/v3/contacts', {
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
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ message: err.message || 'Subscription failed' });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
