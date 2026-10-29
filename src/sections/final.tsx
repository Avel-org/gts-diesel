import { Phone } from 'lucide-react';
import { ButtonLink } from '../components/ui/button';
import { HazardStripe } from '../components/ui/hazard';
import { Text } from '../components/ui/claim';
import { QuoteForm } from './quote-form';
import { callFor } from '../lib/call';
import { business } from '../content/business';
import type { PageContent } from '../content/page';

/** Hazard stripe use 2 of 2. */
export function FinalCall({ content }: { content: PageContent }) {
  const call = callFor(content);
  return (
    <section id="quote" className="scroll-mt-16 border-t border-border">
      <HazardStripe />
      <div className="px-5 md:px-16 py-14 md:py-20 grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <h2 className="h-display text-[clamp(2.25rem,7vw,3.75rem)] text-text mb-4">
            <Text claim={content.finalTitle} />
          </h2>
          <p className="text-text-muted mb-7 max-w-[46ch]">
            Calling is the fastest way to get a truck moving. The form is here if you would
            rather write it down.
          </p>
          {call && (
            <ButtonLink href={call.href} size="call" data-call="final">
              <Phone aria-hidden="true" className="w-5 h-5" strokeWidth={2} />
              Call 24/7 · {call.display}
            </ButtonLink>
          )}
          <p className="label-mono mt-5">{business.hoursText}</p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
