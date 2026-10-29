import { Phone } from 'lucide-react';
import { ButtonLink } from '../components/ui/button';
import { BlankSlot } from '../components/ui/blank';
import { PhotoFrame } from '../components/ui/photo';
import { Text } from '../components/ui/claim';
import { blank } from '../content/types';
import { callFor } from '../lib/call';
import type { PageContent } from '../content/page';

export function Hero({ content }: { content: PageContent }) {
  const call = callFor(content);
  return (
    <section id="top" className="px-5 md:px-16 pt-10 pb-12 md:pt-16 md:pb-20">
      <div className="grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14 md:items-center">
        <div>
          {/* .gts-scan is the one light-bar glint, hero eyebrow only. */}
          <p className="gts-scan label-mono inline-block border-b border-[var(--rule)] pb-1.5 mb-6">
            <Text claim={content.eyebrow} />
          </p>

          <h1 className="h-display text-[clamp(2.5rem,9vw,4.5rem)] text-text mb-5">
            <Text claim={content.h1} />
          </h1>

          <p className="text-text-muted text-lg max-w-[52ch] mb-8">
            <Text claim={content.subhead} />
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {call ? (
              /* .gts-signal: exactly one per page, on the primary call button. */
              <ButtonLink href={call.href} size="call" className="gts-signal" data-call="hero">
                <Phone aria-hidden="true" className="w-5 h-5" strokeWidth={2} />
                Call 24/7 · {call.display}
              </ButtonLink>
            ) : (
              <BlankSlot claim={blank('Cowboys phone number')} className="h-14 px-6" />
            )}
            <ButtonLink href="#quote" variant="outline" size="call">
              {content.ghostLabel}
            </ButtonLink>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-8 list-none p-0">
            {content.proof.map((p, i) => (
              <li key={i} className="label-mono flex items-center gap-2">
                <span aria-hidden="true" className="w-4 h-0.5 bg-accent" />
                <Text claim={p} />
              </li>
            ))}
          </ul>
        </div>

        <PhotoFrame claim={content.heroPhoto} priority className="aspect-[4/3] md:aspect-[3/4]" />
      </div>
    </section>
  );
}
