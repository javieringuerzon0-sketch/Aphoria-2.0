import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash } from 'crypto';

const PIXEL_ID = '1672971890715223';
const GRAPH_API_VERSION = 'v21.0';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const accessToken = process.env.META_CAPI_ACCESS_TOKEN?.trim();
  if (!accessToken) return res.status(500).json({ message: 'CAPI not configured' });

  const { event_name, event_id, event_source_url, user_agent, fbc, fbp, email, value, currency, num_items } = req.body;

  if (!event_name || !event_id) {
    return res.status(400).json({ message: 'event_name and event_id are required' });
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
    || req.socket.remoteAddress
    || '';

  const userData: Record<string, unknown> = {
    client_ip_address: ip,
    client_user_agent: user_agent || req.headers['user-agent'] || '',
  };
  if (fbc) userData.fbc = fbc;
  if (fbp) userData.fbp = fbp;
  if (email) userData.em = [createHash('sha256').update(email.toLowerCase().trim()).digest('hex')];

  const customData: Record<string, unknown> = {};
  if (value !== undefined) customData.value = value;
  if (currency) customData.currency = currency;
  if (num_items !== undefined) customData.num_items = num_items;

  const payload = {
    data: [{
      event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id,
      event_source_url: event_source_url || '',
      action_source: 'website',
      user_data: userData,
      ...(Object.keys(customData).length > 0 && { custom_data: customData }),
    }],
  };

  try {
    const capiRes = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = await capiRes.json() as { events_received?: number; error?: { message: string } };
    if (!capiRes.ok) {
      return res.status(capiRes.status).json({ message: data.error?.message || 'CAPI request failed' });
    }
    return res.status(200).json({ success: true, events_received: data.events_received });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
