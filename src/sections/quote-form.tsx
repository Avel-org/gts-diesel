import { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Field, Input, Textarea } from '../components/ui/field';
import { business } from '../content/business';

type State = 'idle' | 'sending' | 'sent' | 'error';

/** AC14: both the sent and the error state show the phone number. */
function CallFallback({ lead }: { lead: string }) {
  return (
    <p className="flex flex-wrap items-center gap-2 text-text">
      {lead}
      <a
        href={business.phoneHref}
        data-call="form-state"
        className="inline-flex items-center gap-1.5 min-h-11 font-semibold text-accent no-underline"
      >
        <Phone aria-hidden="true" className="w-4 h-4" strokeWidth={2} />
        {business.phoneDisplay}
      </a>
    </p>
  );
}

/**
 * Posts to api/quote. The form is a real POST target, so it still submits with
 * JavaScript off; the fetch path just avoids the page reload.
 */
export function QuoteForm() {
  const [state, setState] = useState<State>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState('sending');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState('sent');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div
        role="status"
        data-form-state="sent"
        className="flex flex-col gap-2 p-6 rounded-card border border-accent bg-surface-2"
      >
        <p className="h-display text-2xl text-text">Request sent.</p>
        <CallFallback lead="If the truck is down right now, don't wait on email —" />
      </div>
    );
  }

  return (
    <form
      method="post"
      action="/api/quote"
      onSubmit={onSubmit}
      data-form="quote"
      className="flex flex-col gap-4 p-6 rounded-card border border-border bg-surface"
    >
      <Field label="Your name" htmlFor="q-name">
        <Input id="q-name" name="name" required autoComplete="name" />
      </Field>
      <Field label="Phone" htmlFor="q-phone">
        <Input id="q-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
      </Field>
      <Field label="Where are you?" htmlFor="q-location" hint="Road and city, or the shop">
        <Input id="q-location" name="location" autoComplete="address-level2" />
      </Field>
      <Field label="What's going on?" htmlFor="q-message">
        <Textarea id="q-message" name="message" required />
      </Field>

      <div className="flex items-center gap-2.5 min-h-11">
        <input
          id="q-fleet"
          name="fleet"
          type="checkbox"
          value="yes"
          className="w-5 h-5 accent-[var(--accent)]"
        />
        <label htmlFor="q-fleet" className="text-text text-sm">
          This is for a fleet account
        </label>
      </div>

      {/* Honeypot: bots fill it, people never see it. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />

      <Button type="submit" size="call" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send request'}
      </Button>

      <p className="font-mono text-[11px] text-text-muted">
        We use this to answer your request. We don't share it.
      </p>

      {state === 'error' && (
        <div role="alert" data-form-state="error" className="border-l-2 border-accent pl-3">
          <CallFallback lead="That didn't send. Call instead, it's faster —" />
        </div>
      )}
    </form>
  );
}
