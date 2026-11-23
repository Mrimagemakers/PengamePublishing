import { createClient } from '@supabase/supabase-js';
export const apiUrl = import.meta.env.VITE_GAMEPASS_API_URL;
// The PenGame Supabase project (sign-in only). The URL and publishable key are public by design;
// repo variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY override them.
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://isdikaghisuptqthlqqw.supabase.co';
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Skg0BrZbf1Qdqp6pDDT8ag_-WHgN3S3';
export const auth = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
export async function passApi(path, body) {
  if (!apiUrl) throw new Error('Game Pass is being connected. Membership sales are not open yet.');
  const session = auth ? (await auth.auth.getSession()).data.session : null;
  const response = await fetch(`${apiUrl}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json', ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Unable to connect. Please try again.');
  return data;
}
