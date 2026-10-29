import { describe, expect, it } from 'vitest';
import handler, { parseQuote, quoteEmail } from '../api/quote';

const good = { name: 'Dom', phone: '(770) 555-0100', message: 'Clutch gone on I-75' };

describe('quote form validation', () => {
  it('accepts a complete request', () => {
    const r = parseQuote(good);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.quote.name).toBe('Dom');
  });

  it.each(['name', 'phone', 'message'])('rejects a missing %s', (field) => {
    const r = parseQuote({ ...good, [field]: '' });
    expect(r.ok).toBe(false);
  });

  it('rejects a phone number that is too short to call back', () => {
    const r = parseQuote({ ...good, phone: '770-555' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/short/i);
  });

  it('drops a honeypot submission', () => {
    const r = parseQuote({ ...good, company: 'Acme SEO' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe('dropped');
  });

  it('trims and caps long input rather than rejecting it', () => {
    const r = parseQuote({ ...good, message: ` ${'x'.repeat(9000)} ` });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.quote.message.length).toBe(4000);
  });

  it('omits location when it was left empty', () => {
    const r = parseQuote(good);
    if (r.ok) expect('location' in r.quote).toBe(false);
  });

  it('writes an email a dispatcher can act on', () => {
    const r = parseQuote({ ...good, location: 'I-75 near Marietta' });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const mail = quoteEmail(r.quote);
    expect(mail.subject).toBe('Quote request — Dom');
    expect(mail.text).toContain('Phone: (770) 555-0100');
    expect(mail.text).toContain('Location: I-75 near Marietta');
    expect(mail.text).toContain('Clutch gone on I-75');
  });
});

describe('hard rule 7: no secrets in the repo', () => {
  it('reads the mail settings from the environment only', () => {
    const src = parseQuote.toString() + quoteEmail.toString();
    expect(src).not.toMatch(/re_[A-Za-z0-9]{10,}|sk-[A-Za-z0-9]{10,}/);
  });
});

describe('with no mail settings configured', () => {
  // QUOTE_TO_EMAIL is still open (brief blank 9). The page ships anyway: the
  // phone number is the primary action, and the form must fail honestly.
  it('refuses cleanly instead of pretending to send', async () => {
    const before = { to: process.env.QUOTE_TO_EMAIL, key: process.env.EMAIL_API_KEY };
    delete process.env.QUOTE_TO_EMAIL;
    delete process.env.EMAIL_API_KEY;
    const res = await handler(
      new Request('https://gts-diesel.com/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(good),
      }),
    );
    expect(res.status).toBe(500);
    expect((await res.json()).error).toMatch(/not configured/i);
    if (before.to) process.env.QUOTE_TO_EMAIL = before.to;
    if (before.key) process.env.EMAIL_API_KEY = before.key;
  });

  it('still rejects a bot before it ever reaches the mail settings', async () => {
    const res = await handler(
      new Request('https://gts-diesel.com/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...good, company: 'Acme SEO' }),
      }),
    );
    expect(res.status).toBe(200);
  });
});
