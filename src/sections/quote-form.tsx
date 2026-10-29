import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Field, Input, Textarea } from '../components/ui/field';

type State = 'idle' | 'sending' | 'sent' | 'error';

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
      <p role="status" className="p-6 rounded-card border border-accent bg-surface-2 text-text">
        Thanks — we have your request. For anything urgent, call now rather than wait.
      </p>
    );
  }

  return (
    <form
      method="post"
      action="/api/quote"
      onSubmit={onSubmit}
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
      <Field label="What do you need?" htmlFor="q-message">
        <Textarea id="q-message" name="message" required />
      </Field>
      {/* Honeypot: bots fill it, people never see it. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />

      <Button type="submit" size="call" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send request'}
      </Button>

      {state === 'error' && (
        <p role="alert" className="font-mono text-sm text-text border-l-2 border-accent pl-3">
          That did not send. Please call instead — it is faster.
        </p>
      )}
    </form>
  );
}
