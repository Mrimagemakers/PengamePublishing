import { createClient } from '@supabase/supabase-js';
export const apiUrl = import.meta.env.VITE_GAMEPASS_API_URL;
export const auth = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  ? createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY) : null;
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
