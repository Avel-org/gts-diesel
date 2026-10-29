/**
 * POST /api/quote — the quote form's handler, deployed as a Vercel function.
 *
 * Secrets come from the environment (hard rule 7): QUOTE_TO_EMAIL, EMAIL_API_KEY.
 * Accepts JSON (the enhanced path) or form-encoded (the no-JavaScript path).
 */

type Quote = { name: string; phone: string; location?: string; message: string };

const MAX = 4000;

function clean(v: unknown, limit = 400): string {
  return typeof v === 'string' ? v.trim().slice(0, limit) : '';
}

export function parseQuote(raw: Record<string, unknown>):
  | { ok: true; quote: Quote }
  | { ok: false; error: string } {
  // Honeypot: a filled "company" field means a bot. Accept, then drop it.
  if (clean(raw.company)) return { ok: false, error: 'dropped' };

  const name = clean(raw.name, 120);
  const phone = clean(raw.phone, 40);
  const message = clean(raw.message, MAX);
  const location = clean(raw.location, 200);

  if (!name || !phone || !message) return { ok: false, error: 'Name, phone and message are required.' };
  if (phone.replace(/\D/g, '').length < 10) return { ok: false, error: 'That phone number looks short.' };

  return { ok: true, quote: location ? { name, phone, location, message } : { name, phone, message } };
}

export function quoteEmail(q: Quote) {
  return {
    subject: `Quote request — ${q.name}`,
    text: [
      `Name: ${q.name}`,
      `Phone: ${q.phone}`,
      q.location ? `Location: ${q.location}` : null,
      '',
      q.message,
    ]
      .filter((l) => l !== null)
      .join('\n'),
  };
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
  }

  let raw: Record<string, unknown>;
  const type = request.headers.get('content-type') ?? '';
  try {
    raw = type.includes('application/json')
      ? ((await request.json()) as Record<string, unknown>)
      : Object.fromEntries(await request.formData());
  } catch {
    return Response.json({ error: 'Could not read that request.' }, { status: 400 });
  }

  const parsed = parseQuote(raw);
  if (!parsed.ok) {
    // A honeypot hit gets a 200 so the bot does not learn anything.
    if (parsed.error === 'dropped') return Response.json({ ok: true });
    return Response.json({ error: parsed.error }, { status: 422 });
  }

  const to = process.env.QUOTE_TO_EMAIL;
  const key = process.env.EMAIL_API_KEY;
  if (!to || !key) {
    console.error('[quote] QUOTE_TO_EMAIL or EMAIL_API_KEY is not set');
    return Response.json({ error: 'The form is not configured yet.' }, { status: 500 });
  }

  const { subject, text } = quoteEmail(parsed.quote);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: 'GTS Diesel site <noreply@gts-diesel.com>',
      to: [to],
      reply_to: parsed.quote.phone,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    console.error('[quote] send failed', res.status, await res.text().catch(() => ''));
    return Response.json({ error: 'Could not send that. Please call instead.' }, { status: 502 });
  }

  // No-JavaScript submits land here as a navigation, so redirect them back.
  if (!type.includes('application/json')) {
    return new Response(null, { status: 303, headers: { location: '/?quote=sent#quote' } });
  }
  return Response.json({ ok: true });
}
